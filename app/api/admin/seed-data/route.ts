import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

// Sample categories
const categories = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Text Generation",
    slug: "text-generation",
    description: "AI tools for generating and editing text content",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Image Generation",
    slug: "image-generation",
    description: "AI tools for creating and editing images",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Code Assistant",
    slug: "code-assistant",
    description: "AI tools for coding and development",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Video Generation",
    slug: "video-generation",
    description: "AI tools for creating and editing videos",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "Audio Generation",
    slug: "audio-generation",
    description: "AI tools for creating and editing audio",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "Productivity",
    slug: "productivity",
    description: "AI tools to boost productivity and workflow",
  },
];

// Sample tools
const tools = [
  // Text Generation Tools
  {
    id: "650e8400-e29b-41d4-a716-446655440001",
    name: "ChatGPT",
    description: "Advanced AI language model for conversation, writing, and problem-solving",
    website_url: "https://chat.openai.com",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    category_id: "550e8400-e29b-41d4-a716-446655440001",
    pricing_model: "freemium",
    features: ["Conversation", "Text Generation", "Code Writing", "Translation"],
    slug: "chatgpt",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440002",
    name: "Claude",
    description: "AI assistant focused on helpful, harmless, and honest dialogue",
    website_url: "https://claude.ai",
    logo_url: "https://claude.ai/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440001",
    pricing_model: "freemium",
    features: ["Long Context", "Document Analysis", "Writing Assistant"],
    slug: "claude",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440003",
    name: "Jasper AI",
    description: "AI writing assistant for marketing content and copywriting",
    website_url: "https://www.jasper.ai",
    logo_url: "https://www.jasper.ai/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440001",
    pricing_model: "paid",
    features: ["Content Writing", "SEO Optimization", "Tone Matching"],
    slug: "jasper-ai",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440004",
    name: "Copy.ai",
    description: "AI-powered copywriting tool for marketing and sales",
    website_url: "https://www.copy.ai",
    logo_url: "https://www.copy.ai/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440001",
    pricing_model: "freemium",
    features: ["Copywriting", "Blog Posts", "Social Media"],
    slug: "copy-ai",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440005",
    name: "Grammarly",
    description: "AI writing assistant for grammar, style, and clarity",
    website_url: "https://www.grammarly.com",
    logo_url: "https://www.grammarly.com/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440001",
    pricing_model: "freemium",
    features: ["Grammar Check", "Style Suggestions", "Plagiarism Detection"],
    slug: "grammarly",
    status: "active",
  },
  // Image Generation Tools
  {
    id: "650e8400-e29b-41d4-a716-446655440006",
    name: "Midjourney",
    description: "AI art generator creating images from text descriptions",
    website_url: "https://www.midjourney.com",
    logo_url: "https://www.midjourney.com/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440002",
    pricing_model: "paid",
    features: ["Image Generation", "Art Creation", "Style Transfer"],
    slug: "midjourney",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440007",
    name: "DALL-E",
    description: "OpenAI's AI system creating images from text descriptions",
    website_url: "https://openai.com/dall-e-3",
    logo_url: "https://openai.com/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440002",
    pricing_model: "paid",
    features: ["Image Generation", "Text-to-Image", "Image Editing"],
    slug: "dalle",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440008",
    name: "Stable Diffusion",
    description: "Open-source AI image generation model",
    website_url: "https://stability.ai",
    logo_url: "https://stability.ai/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440002",
    pricing_model: "free",
    features: ["Image Generation", "Open Source", "Custom Models"],
    slug: "stable-diffusion",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440009",
    name: "Runway ML",
    description: "Creative suite for AI-powered image and video generation",
    website_url: "https://runwayml.com",
    logo_url: "https://runwayml.com/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440002",
    pricing_model: "freemium",
    features: ["Image Generation", "Video Editing", "AI Effects"],
    slug: "runway-ml",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440010",
    name: "Leonardo.ai",
    description: "AI image generation platform with advanced control",
    website_url: "https://leonardo.ai",
    logo_url: "https://leonardo.ai/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440002",
    pricing_model: "freemium",
    features: ["Image Generation", "3D Models", "Texture Generation"],
    slug: "leonardo-ai",
    status: "active",
  },
  // Code Assistant Tools
  {
    id: "650e8400-e29b-41d4-a716-446655440011",
    name: "GitHub Copilot",
    description: "AI pair programmer that suggests code as you type",
    website_url: "https://github.com/features/copilot",
    logo_url: "https://github.com/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440003",
    pricing_model: "paid",
    features: ["Code Completion", "Multi-language Support", "IDE Integration"],
    slug: "github-copilot",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440012",
    name: "Cursor",
    description: "AI-powered code editor with advanced autocomplete",
    website_url: "https://cursor.sh",
    logo_url: "https://cursor.sh/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440003",
    pricing_model: "freemium",
    features: ["Code Completion", "Chat Interface", "Code Refactoring"],
    slug: "cursor",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440013",
    name: "Replit",
    description: "Online IDE with AI code generation capabilities",
    website_url: "https://replit.com",
    logo_url: "https://replit.com/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440003",
    pricing_model: "freemium",
    features: ["Online IDE", "AI Code Generation", "Collaboration"],
    slug: "replit",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440014",
    name: "Tabnine",
    description: "AI code completion tool for faster development",
    website_url: "https://www.tabnine.com",
    logo_url: "https://www.tabnine.com/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440003",
    pricing_model: "freemium",
    features: ["Code Completion", "Multi-language", "Privacy-focused"],
    slug: "tabnine",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440015",
    name: "Codeium",
    description: "Free AI code completion and chat for developers",
    website_url: "https://codeium.com",
    logo_url: "https://codeium.com/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440003",
    pricing_model: "free",
    features: ["Code Completion", "Free Tier", "IDE Integration"],
    slug: "codeium",
    status: "active",
  },
  // Video Generation Tools
  {
    id: "650e8400-e29b-41d4-a716-446655440016",
    name: "Synthesia",
    description: "AI video generation platform for creating videos with AI avatars",
    website_url: "https://www.synthesia.io",
    logo_url: "https://www.synthesia.io/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440004",
    pricing_model: "paid",
    features: ["AI Avatars", "Multi-language", "Video Templates"],
    slug: "synthesia",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440017",
    name: "Pictory",
    description: "AI video generator that creates videos from text scripts",
    website_url: "https://pictory.ai",
    logo_url: "https://pictory.ai/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440004",
    pricing_model: "freemium",
    features: ["Text-to-Video", "Auto-editing", "Stock Footage"],
    slug: "pictory",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440018",
    name: "Luma AI",
    description: "AI-powered video generation and editing tools",
    website_url: "https://lumalabs.ai",
    logo_url: "https://lumalabs.ai/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440004",
    pricing_model: "freemium",
    features: ["Video Generation", "3D Scenes", "Neural Rendering"],
    slug: "luma-ai",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440019",
    name: "InVideo AI",
    description: "AI video creation platform for marketing and social media",
    website_url: "https://invideo.io",
    logo_url: "https://invideo.io/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440004",
    pricing_model: "freemium",
    features: ["Video Templates", "Text-to-Video", "Auto-editing"],
    slug: "invideo-ai",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440020",
    name: "Runway Gen-2",
    description: "AI video generation from text and images",
    website_url: "https://runwayml.com",
    logo_url: "https://runwayml.com/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440004",
    pricing_model: "freemium",
    features: ["Text-to-Video", "Image-to-Video", "Video Editing"],
    slug: "runway-gen2",
    status: "active",
  },
  // Audio Generation Tools
  {
    id: "650e8400-e29b-41d4-a716-446655440021",
    name: "ElevenLabs",
    description: "AI voice generation and text-to-speech platform",
    website_url: "https://elevenlabs.io",
    logo_url: "https://elevenlabs.io/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440005",
    pricing_model: "freemium",
    features: ["Voice Cloning", "Text-to-Speech", "Multi-language"],
    slug: "elevenlabs",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440022",
    name: "Mubert",
    description: "AI music generator for background music and soundtracks",
    website_url: "https://mubert.com",
    logo_url: "https://mubert.com/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440005",
    pricing_model: "freemium",
    features: ["Music Generation", "Royalty-free", "Custom Styles"],
    slug: "mubert",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440023",
    name: "Suno AI",
    description: "AI music creation platform for generating songs",
    website_url: "https://suno.ai",
    logo_url: "https://suno.ai/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440005",
    pricing_model: "freemium",
    features: ["Song Generation", "Lyrics Writing", "Multiple Genres"],
    slug: "suno-ai",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440024",
    name: "Uberduck",
    description: "AI voice synthesis and text-to-speech platform",
    website_url: "https://uberduck.ai",
    logo_url: "https://uberduck.ai/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440005",
    pricing_model: "freemium",
    features: ["Voice Cloning", "Celebrity Voices", "API Access"],
    slug: "uberduck",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440025",
    name: "AIVA",
    description: "AI composer creating original music for various purposes",
    website_url: "https://www.aiva.ai",
    logo_url: "https://www.aiva.ai/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440005",
    pricing_model: "freemium",
    features: ["Music Composition", "Multiple Styles", "Commercial License"],
    slug: "aiva",
    status: "active",
  },
  // Productivity Tools
  {
    id: "650e8400-e29b-41d4-a716-446655440026",
    name: "Notion AI",
    description: "AI-powered workspace for notes, docs, and project management",
    website_url: "https://www.notion.so",
    logo_url: "https://www.notion.so/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440006",
    pricing_model: "freemium",
    features: ["Note Taking", "AI Writing", "Task Management"],
    slug: "notion-ai",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440027",
    name: "Mem",
    description: "AI-powered note-taking app that organizes your thoughts",
    website_url: "https://mem.ai",
    logo_url: "https://mem.ai/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440006",
    pricing_model: "freemium",
    features: ["Auto-organization", "Smart Search", "Knowledge Graph"],
    slug: "mem",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440028",
    name: "Otter.ai",
    description: "AI meeting assistant for transcription and note-taking",
    website_url: "https://otter.ai",
    logo_url: "https://otter.ai/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440006",
    pricing_model: "freemium",
    features: ["Meeting Transcription", "Live Notes", "Action Items"],
    slug: "otter-ai",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440029",
    name: "Fireflies.ai",
    description: "AI meeting recorder and transcription service",
    website_url: "https://fireflies.ai",
    logo_url: "https://fireflies.ai/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440006",
    pricing_model: "freemium",
    features: ["Meeting Recording", "Transcription", "Search"],
    slug: "fireflies-ai",
    status: "active",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440030",
    name: "Jasper Chat",
    description: "AI chat assistant for quick answers and content creation",
    website_url: "https://www.jasper.ai/chat",
    logo_url: "https://www.jasper.ai/favicon.ico",
    category_id: "550e8400-e29b-41d4-a716-446655440006",
    pricing_model: "paid",
    features: ["Quick Answers", "Content Ideas", "Research Assistant"],
    slug: "jasper-chat",
    status: "active",
  },
];

export async function POST() {
  try {
    // Check if service role key is configured
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseServiceKey || supabaseServiceKey === "your_supabase_service_role_key") {
      return NextResponse.json(
        {
          success: false,
          error: "Service role key not configured",
          message:
            "Please set SUPABASE_SERVICE_ROLE_KEY in .env.local. You can find it in Supabase Dashboard → Settings → API → service_role key (secret)",
        },
        { status: 500 }
      );
    }

    const supabase = createAdminClient();

    // Insert Categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("categories")
      .upsert(categories, { onConflict: "slug" })
      .select();

    if (categoriesError) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to insert categories",
          details: categoriesError.message,
        },
        { status: 500 }
      );
    }

    // Insert Tools
    const { data: toolsData, error: toolsError } = await supabase
      .from("tools")
      .upsert(tools, { onConflict: "slug" })
      .select();

    if (toolsError) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to insert tools",
          details: toolsError.message,
        },
        { status: 500 }
      );
    }

    // Verify counts
    const { count: categoriesCount } = await supabase
      .from("categories")
      .select("*", { count: "exact", head: true });

    const { count: toolsCount } = await supabase
      .from("tools")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");

    return NextResponse.json({
      success: true,
      message: "Sample data inserted successfully",
      data: {
        categoriesInserted: categoriesData?.length || categories.length,
        toolsInserted: toolsData?.length || tools.length,
        totalCategories: categoriesCount,
        totalActiveTools: toolsCount,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Unexpected error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

