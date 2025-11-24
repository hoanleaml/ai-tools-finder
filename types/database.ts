// Database TypeScript Types for AI Tools Finder
// Generated from Supabase schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tools: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          website_url: string;
          logo_url: string | null;
          category_id: string | null;
          pricing_model: string | null;
          features: Json | null;
          slug: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          website_url: string;
          logo_url?: string | null;
          category_id?: string | null;
          pricing_model?: string | null;
          features?: Json | null;
          slug?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          website_url?: string;
          logo_url?: string | null;
          category_id?: string | null;
          pricing_model?: string | null;
          features?: Json | null;
          slug?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      affiliate_links: {
        Row: {
          id: string;
          tool_id: string;
          affiliate_url: string;
          program_name: string | null;
          commission_rate: number | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tool_id: string;
          affiliate_url: string;
          program_name?: string | null;
          commission_rate?: number | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tool_id?: string;
          affiliate_url?: string;
          program_name?: string | null;
          commission_rate?: number | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      news_articles: {
        Row: {
          id: string;
          title: string;
          summary: string | null;
          content: string | null;
          source_url: string;
          source_name: string | null;
          image_url: string | null;
          published_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          summary?: string | null;
          content?: string | null;
          source_url: string;
          source_name?: string | null;
          image_url?: string | null;
          published_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          summary?: string | null;
          content?: string | null;
          source_url?: string;
          source_name?: string | null;
          image_url?: string | null;
          published_at?: string | null;
          created_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string | null;
          author_id: string | null;
          status: string;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content: string;
          excerpt?: string | null;
          author_id?: string | null;
          status?: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: string;
          excerpt?: string | null;
          author_id?: string | null;
          status?: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      scraping_jobs: {
        Row: {
          id: string;
          source_url: string;
          status: string;
          error_message: string | null;
          tools_found: number;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          source_url: string;
          status?: string;
          error_message?: string | null;
          tools_found?: number;
          created_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          source_url?: string;
          status?: string;
          error_message?: string | null;
          tools_found?: number;
          created_at?: string;
          completed_at?: string | null;
        };
      };
    };
  };
}

// Convenience type aliases
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Tool = Database["public"]["Tables"]["tools"]["Row"];
export type AffiliateLink = Database["public"]["Tables"]["affiliate_links"]["Row"];
export type NewsArticle = Database["public"]["Tables"]["news_articles"]["Row"];
export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
export type ScrapingJob = Database["public"]["Tables"]["scraping_jobs"]["Row"];

