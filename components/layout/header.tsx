"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">AI Tools Finder</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/tools"
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              Tools
            </Link>
            <Link
              href="/news"
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              News
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild className="hidden md:inline-flex">
            <Link href="/admin">Admin</Link>
          </Button>
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-foreground/60 hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden border-t bg-background"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              href="/tools"
              className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tools
            </Link>
            <Link
              href="/news"
              className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              News
            </Link>
            <Link
              href="/blog"
              className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <div className="pt-2 border-t">
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                  Admin
                </Link>
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

