import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Portfolio. Built with Next.js, AI SDK,
            and advanced AI technologies.
          </div>

          {/* Social Links */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a href="mailto:your.email@example.com">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
