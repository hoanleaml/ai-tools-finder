-- AI Tools Finder - Initial Database Schema
-- Migration: 001_initial_schema.sql
-- Description: Creates all core tables for AI Tools Finder application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on slug for categories
CREATE INDEX idx_categories_slug ON categories(slug);

-- Tools table
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  website_url VARCHAR(500) NOT NULL,
  logo_url VARCHAR(500),
  category_id UUID REFERENCES categories(id),
  pricing_model VARCHAR(50), -- 'free', 'freemium', 'paid', 'one-time'
  features JSONB, -- Array of feature strings
  slug VARCHAR(255) UNIQUE,
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'pending', 'archived'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for tools table
CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_status ON tools(status);
CREATE INDEX idx_tools_slug ON tools(slug);
CREATE INDEX idx_tools_name ON tools(name);

-- Trigger for tools updated_at
CREATE TRIGGER update_tools_updated_at BEFORE UPDATE ON tools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Affiliate links table
CREATE TABLE affiliate_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  affiliate_url TEXT NOT NULL,
  program_name VARCHAR(255),
  commission_rate NUMERIC(5,2), -- Percentage
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'pending', 'expired'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for affiliate_links table
CREATE INDEX idx_affiliate_links_tool ON affiliate_links(tool_id);
CREATE INDEX idx_affiliate_links_status ON affiliate_links(status);

-- Trigger for affiliate_links updated_at
CREATE TRIGGER update_affiliate_links_updated_at BEFORE UPDATE ON affiliate_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- News articles table
CREATE TABLE news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  summary TEXT,
  content TEXT,
  source_url TEXT NOT NULL,
  source_name VARCHAR(255),
  image_url VARCHAR(500),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for news_articles table
CREATE INDEX idx_news_published ON news_articles(published_at DESC);
CREATE INDEX idx_news_source ON news_articles(source_name);

-- Blog posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID, -- References auth.users (Supabase Auth)
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'review', 'published'
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for blog_posts table
CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_status ON blog_posts(status);
CREATE INDEX idx_blog_published ON blog_posts(published_at DESC);

-- Trigger for blog_posts updated_at
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Scraping jobs table
CREATE TABLE scraping_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'
  error_message TEXT,
  tools_found INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Indexes for scraping_jobs table
CREATE INDEX idx_scraping_jobs_status ON scraping_jobs(status);
CREATE INDEX idx_scraping_jobs_created ON scraping_jobs(created_at DESC);

-- Trigger for categories updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

