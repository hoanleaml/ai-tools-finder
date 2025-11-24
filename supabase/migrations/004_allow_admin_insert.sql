-- AI Tools Finder - Allow Admin Insert
-- Migration: 004_allow_admin_insert.sql
-- Description: Allow authenticated admin users to insert categories and tools

-- Allow authenticated admin users to insert categories
CREATE POLICY "Admins can insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Allow authenticated admin users to insert tools
CREATE POLICY "Admins can insert tools"
  ON tools FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Allow authenticated admin users to update categories
CREATE POLICY "Admins can update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Allow authenticated admin users to update tools
CREATE POLICY "Admins can update tools"
  ON tools FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

