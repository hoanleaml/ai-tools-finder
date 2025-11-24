"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Share2, Twitter, Facebook, Linkedin, Mail, Copy, Check } from "lucide-react";
import { useState } from "react";

interface SocialShareProps {
  toolName: string;
  toolDescription: string;
  toolUrl: string;
  toolImage?: string | null;
}

export function SocialShare({
  toolName,
  toolDescription,
  toolUrl,
  toolImage,
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${toolUrl}` : toolUrl;
  const shareText = `Check out ${toolName} - ${toolDescription}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Check out ${toolName}`);
    const body = encodeURIComponent(`${shareText}\n\n${fullUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleWebShare = async () => {
      if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: toolName,
          text: shareText,
          url: fullUrl,
        });
        setShareOpen(false);
      } catch (err) {
        // User cancelled or error
      }
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
  };

  return (
    <Popover open={shareOpen} onOpenChange={setShareOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="lg">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="end">
        <div className="space-y-2">
          <h4 className="mb-3 text-sm font-semibold">Share this tool</h4>

          {/* Web Share API (mobile) */}
          {typeof navigator !== "undefined" && navigator.share && (
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleWebShare}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share via...
            </Button>
          )}

          {/* Social platforms */}
          <Button
            variant="ghost"
            className="w-full justify-start"
            asChild
          >
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="mr-2 h-4 w-4" />
              Twitter/X
            </a>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            asChild
          >
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </a>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            asChild
          >
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </a>
          </Button>

          {/* Copy link */}
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleCopyLink}
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy link
              </>
            )}
          </Button>

          {/* Email */}
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleEmailShare}
          >
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
