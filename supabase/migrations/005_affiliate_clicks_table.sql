-- AI Tools Finder - Affiliate Clicks Tracking Table
-- Migration: 005_affiliate_clicks_table.sql
-- Description: Creates table to track affiliate link clicks

-- Affiliate clicks tracking table
CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_link_id UUID REFERENCES affiliate_links(id) ON DELETE SET NULL,
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  clicked_at TIMESTAMPTZ DEFAULT NOW(),
  user_session_id VARCHAR(255),
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer TEXT
);

-- Indexes for affiliate_clicks table
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_tool ON affiliate_clicks(tool_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_affiliate_link ON affiliate_clicks(affiliate_link_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_clicked_at ON affiliate_clicks(clicked_at DESC);

-- Enable RLS
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;

-- Allow public to insert clicks (for tracking)
CREATE POLICY "Anyone can track affiliate clicks"
  ON affiliate_clicks FOR INSERT
  TO public
  WITH CHECK (true);

-- Only allow reading clicks via service role (admin access)
-- Public users cannot read click data for privacy

