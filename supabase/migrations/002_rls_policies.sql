-- AI Tools Finder - Row Level Security Policies
-- Migration: 002_rls_policies.sql
-- Description: Enables RLS and creates policies for all tables

-- Enable Row Level Security on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraping_jobs ENABLE ROW LEVEL SECURITY;

-- Categories: Public read access
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

-- Tools: Public read access
CREATE POLICY "Tools are viewable by everyone"
  ON tools FOR SELECT
  USING (true);

-- Affiliate links: Public read access
CREATE POLICY "Affiliate links are viewable by everyone"
  ON affiliate_links FOR SELECT
  USING (true);

-- News articles: Public read access
CREATE POLICY "News articles are viewable by everyone"
  ON news_articles FOR SELECT
  USING (true);

-- Blog posts: Public read access for published posts only
CREATE POLICY "Published blog posts are viewable by everyone"
  ON blog_posts FOR SELECT
  USING (status = 'published');

-- Scraping jobs: Admin-only access (will be configured in Story 1.3)
-- For now, deny all access - will be updated when authentication is set up
CREATE POLICY "Scraping jobs are admin-only"
  ON scraping_jobs FOR SELECT
  USING (false);

