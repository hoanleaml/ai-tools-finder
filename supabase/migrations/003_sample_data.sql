-- AI Tools Finder - Sample Data
-- Migration: 003_sample_data.sql
-- Description: Insert sample categories and tools for testing

-- Insert Categories
INSERT INTO categories (id, name, slug, description) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Text Generation', 'text-generation', 'AI tools for generating and editing text content'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Image Generation', 'image-generation', 'AI tools for creating and editing images'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Code Assistant', 'code-assistant', 'AI tools for coding and development'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Video Generation', 'video-generation', 'AI tools for creating and editing videos'),
  ('550e8400-e29b-41d4-a716-446655440005', 'Audio Generation', 'audio-generation', 'AI tools for creating and editing audio'),
  ('550e8400-e29b-41d4-a716-446655440006', 'Productivity', 'productivity', 'AI tools to boost productivity and workflow')
ON CONFLICT (slug) DO NOTHING;

-- Insert Sample Tools
INSERT INTO tools (id, name, description, website_url, logo_url, category_id, pricing_model, features, slug, status) VALUES
  -- Text Generation Tools
  ('650e8400-e29b-41d4-a716-446655440001', 'ChatGPT', 'Advanced AI language model for conversation, writing, and problem-solving', 'https://chat.openai.com', 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', '550e8400-e29b-41d4-a716-446655440001', 'freemium', '["Conversation", "Text Generation", "Code Writing", "Translation"]'::jsonb, 'chatgpt', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440002', 'Claude', 'AI assistant focused on helpful, harmless, and honest dialogue', 'https://claude.ai', 'https://claude.ai/favicon.ico', '550e8400-e29b-41d4-a716-446655440001', 'freemium', '["Long Context", "Document Analysis", "Writing Assistant"]'::jsonb, 'claude', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440003', 'Jasper AI', 'AI writing assistant for marketing content and copywriting', 'https://www.jasper.ai', 'https://www.jasper.ai/favicon.ico', '550e8400-e29b-41d4-a716-446655440001', 'paid', '["Content Writing", "SEO Optimization", "Tone Matching"]'::jsonb, 'jasper-ai', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440004', 'Copy.ai', 'AI-powered copywriting tool for marketing and sales', 'https://www.copy.ai', 'https://www.copy.ai/favicon.ico', '550e8400-e29b-41d4-a716-446655440001', 'freemium', '["Copywriting", "Blog Posts", "Social Media"]'::jsonb, 'copy-ai', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440005', 'Grammarly', 'AI writing assistant for grammar, style, and clarity', 'https://www.grammarly.com', 'https://www.grammarly.com/favicon.ico', '550e8400-e29b-41d4-a716-446655440001', 'freemium', '["Grammar Check", "Style Suggestions", "Plagiarism Detection"]'::jsonb, 'grammarly', 'active'),
  
  -- Image Generation Tools
  ('650e8400-e29b-41d4-a716-446655440006', 'Midjourney', 'AI art generator creating images from text descriptions', 'https://www.midjourney.com', 'https://www.midjourney.com/favicon.ico', '550e8400-e29b-41d4-a716-446655440002', 'paid', '["Image Generation", "Art Creation", "Style Transfer"]'::jsonb, 'midjourney', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440007', 'DALL-E', 'OpenAI''s AI system creating images from text descriptions', 'https://openai.com/dall-e-3', 'https://openai.com/favicon.ico', '550e8400-e29b-41d4-a716-446655440002', 'paid', '["Image Generation", "Text-to-Image", "Image Editing"]'::jsonb, 'dalle', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440008', 'Stable Diffusion', 'Open-source AI image generation model', 'https://stability.ai', 'https://stability.ai/favicon.ico', '550e8400-e29b-41d4-a716-446655440002', 'free', '["Image Generation", "Open Source", "Custom Models"]'::jsonb, 'stable-diffusion', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440009', 'Runway ML', 'Creative suite for AI-powered image and video generation', 'https://runwayml.com', 'https://runwayml.com/favicon.ico', '550e8400-e29b-41d4-a716-446655440002', 'freemium', '["Image Generation", "Video Editing", "AI Effects"]'::jsonb, 'runway-ml', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440010', 'Leonardo.ai', 'AI image generation platform with advanced control', 'https://leonardo.ai', 'https://leonardo.ai/favicon.ico', '550e8400-e29b-41d4-a716-446655440002', 'freemium', '["Image Generation", "3D Models", "Texture Generation"]'::jsonb, 'leonardo-ai', 'active'),
  
  -- Code Assistant Tools
  ('650e8400-e29b-41d4-a716-446655440011', 'GitHub Copilot', 'AI pair programmer that suggests code as you type', 'https://github.com/features/copilot', 'https://github.com/favicon.ico', '550e8400-e29b-41d4-a716-446655440003', 'paid', '["Code Completion", "Multi-language Support", "IDE Integration"]'::jsonb, 'github-copilot', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440012', 'Cursor', 'AI-powered code editor with advanced autocomplete', 'https://cursor.sh', 'https://cursor.sh/favicon.ico', '550e8400-e29b-41d4-a716-446655440003', 'freemium', '["Code Completion", "Chat Interface", "Code Refactoring"]'::jsonb, 'cursor', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440013', 'Replit', 'Online IDE with AI code generation capabilities', 'https://replit.com', 'https://replit.com/favicon.ico', '550e8400-e29b-41d4-a716-446655440003', 'freemium', '["Online IDE", "AI Code Generation", "Collaboration"]'::jsonb, 'replit', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440014', 'Tabnine', 'AI code completion tool for faster development', 'https://www.tabnine.com', 'https://www.tabnine.com/favicon.ico', '550e8400-e29b-41d4-a716-446655440003', 'freemium', '["Code Completion", "Multi-language", "Privacy-focused"]'::jsonb, 'tabnine', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440015', 'Codeium', 'Free AI code completion and chat for developers', 'https://codeium.com', 'https://codeium.com/favicon.ico', '550e8400-e29b-41d4-a716-446655440003', 'free', '["Code Completion", "Free Tier", "IDE Integration"]'::jsonb, 'codeium', 'active'),
  
  -- Video Generation Tools
  ('650e8400-e29b-41d4-a716-446655440016', 'Synthesia', 'AI video generation platform for creating videos with AI avatars', 'https://www.synthesia.io', 'https://www.synthesia.io/favicon.ico', '550e8400-e29b-41d4-a716-446655440004', 'paid', '["AI Avatars", "Multi-language", "Video Templates"]'::jsonb, 'synthesia', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440017', 'Pictory', 'AI video generator that creates videos from text scripts', 'https://pictory.ai', 'https://pictory.ai/favicon.ico', '550e8400-e29b-41d4-a716-446655440004', 'freemium', '["Text-to-Video", "Auto-editing", "Stock Footage"]'::jsonb, 'pictory', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440018', 'Luma AI', 'AI-powered video generation and editing tools', 'https://lumalabs.ai', 'https://lumalabs.ai/favicon.ico', '550e8400-e29b-41d4-a716-446655440004', 'freemium', '["Video Generation", "3D Scenes", "Neural Rendering"]'::jsonb, 'luma-ai', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440019', 'InVideo AI', 'AI video creation platform for marketing and social media', 'https://invideo.io', 'https://invideo.io/favicon.ico', '550e8400-e29b-41d4-a716-446655440004', 'freemium', '["Video Templates", "Text-to-Video", "Auto-editing"]'::jsonb, 'invideo-ai', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440020', 'Runway Gen-2', 'AI video generation from text and images', 'https://runwayml.com', 'https://runwayml.com/favicon.ico', '550e8400-e29b-41d4-a716-446655440004', 'freemium', '["Text-to-Video", "Image-to-Video", "Video Editing"]'::jsonb, 'runway-gen2', 'active'),
  
  -- Audio Generation Tools
  ('650e8400-e29b-41d4-a716-446655440021', 'ElevenLabs', 'AI voice generation and text-to-speech platform', 'https://elevenlabs.io', 'https://elevenlabs.io/favicon.ico', '550e8400-e29b-41d4-a716-446655440005', 'freemium', '["Voice Cloning", "Text-to-Speech", "Multi-language"]'::jsonb, 'elevenlabs', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440022', 'Mubert', 'AI music generator for background music and soundtracks', 'https://mubert.com', 'https://mubert.com/favicon.ico', '550e8400-e29b-41d4-a716-446655440005', 'freemium', '["Music Generation", "Royalty-free", "Custom Styles"]'::jsonb, 'mubert', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440023', 'Suno AI', 'AI music creation platform for generating songs', 'https://suno.ai', 'https://suno.ai/favicon.ico', '550e8400-e29b-41d4-a716-446655440005', 'freemium', '["Song Generation", "Lyrics Writing", "Multiple Genres"]'::jsonb, 'suno-ai', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440024', 'Uberduck', 'AI voice synthesis and text-to-speech platform', 'https://uberduck.ai', 'https://uberduck.ai/favicon.ico', '550e8400-e29b-41d4-a716-446655440005', 'freemium', '["Voice Cloning", "Celebrity Voices", "API Access"]'::jsonb, 'uberduck', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440025', 'AIVA', 'AI composer creating original music for various purposes', 'https://www.aiva.ai', 'https://www.aiva.ai/favicon.ico', '550e8400-e29b-41d4-a716-446655440005', 'freemium', '["Music Composition", "Multiple Styles", "Commercial License"]'::jsonb, 'aiva', 'active'),
  
  -- Productivity Tools
  ('650e8400-e29b-41d4-a716-446655440026', 'Notion AI', 'AI-powered workspace for notes, docs, and project management', 'https://www.notion.so', 'https://www.notion.so/favicon.ico', '550e8400-e29b-41d4-a716-446655440006', 'freemium', '["Note Taking", "AI Writing", "Task Management"]'::jsonb, 'notion-ai', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440027', 'Mem', 'AI-powered note-taking app that organizes your thoughts', 'https://mem.ai', 'https://mem.ai/favicon.ico', '550e8400-e29b-41d4-a716-446655440006', 'freemium', '["Auto-organization", "Smart Search", "Knowledge Graph"]'::jsonb, 'mem', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440028', 'Otter.ai', 'AI meeting assistant for transcription and note-taking', 'https://otter.ai', 'https://otter.ai/favicon.ico', '550e8400-e29b-41d4-a716-446655440006', 'freemium', '["Meeting Transcription", "Live Notes", "Action Items"]'::jsonb, 'otter-ai', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440029', 'Fireflies.ai', 'AI meeting recorder and transcription service', 'https://fireflies.ai', 'https://fireflies.ai/favicon.ico', '550e8400-e29b-41d4-a716-446655440006', 'freemium', '["Meeting Recording", "Transcription", "Search"]'::jsonb, 'fireflies-ai', 'active'),
  
  ('650e8400-e29b-41d4-a716-446655440030', 'Jasper Chat', 'AI chat assistant for quick answers and content creation', 'https://www.jasper.ai/chat', 'https://www.jasper.ai/favicon.ico', '550e8400-e29b-41d4-a716-446655440006', 'paid', '["Quick Answers", "Content Ideas", "Research Assistant"]'::jsonb, 'jasper-chat', 'active')
ON CONFLICT (slug) DO NOTHING;

-- Verify data insertion
SELECT 
  (SELECT COUNT(*) FROM categories) as categories_count,
  (SELECT COUNT(*) FROM tools WHERE status = 'active') as active_tools_count;

