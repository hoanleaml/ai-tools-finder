import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // AI Tools Domains
      { protocol: "https", hostname: "claude.ai" },
      { protocol: "https", hostname: "chat.openai.com" },
      { protocol: "https", hostname: "www.jasper.ai" },
      { protocol: "https", hostname: "www.copy.ai" },
      { protocol: "https", hostname: "www.grammarly.com" },
      { protocol: "https", hostname: "www.midjourney.com" },
      { protocol: "https", hostname: "openai.com" },
      { protocol: "https", hostname: "stability.ai" },
      { protocol: "https", hostname: "runwayml.com" },
      { protocol: "https", hostname: "leonardo.ai" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "cursor.sh" },
      { protocol: "https", hostname: "replit.com" },
      { protocol: "https", hostname: "www.tabnine.com" },
      { protocol: "https", hostname: "codeium.com" },
      { protocol: "https", hostname: "www.synthesia.io" },
      { protocol: "https", hostname: "pictory.ai" },
      { protocol: "https", hostname: "lumalabs.ai" },
      { protocol: "https", hostname: "invideo.io" },
      { protocol: "https", hostname: "elevenlabs.io" },
      { protocol: "https", hostname: "mubert.com" },
      { protocol: "https", hostname: "suno.ai" },
      { protocol: "https", hostname: "uberduck.ai" },
      { protocol: "https", hostname: "www.aiva.ai" },
      { protocol: "https", hostname: "www.notion.so" },
      { protocol: "https", hostname: "mem.ai" },
      { protocol: "https", hostname: "otter.ai" },
      { protocol: "https", hostname: "fireflies.ai" },
      // Wikimedia (for ChatGPT logo)
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
};

export default nextConfig;
