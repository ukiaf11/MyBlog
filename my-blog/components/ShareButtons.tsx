"use client";

import { Facebook, Linkedin, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";

export function ShareButtons() {
    const pathname = usePathname();
    const url = typeof window !== "undefined" ? window.location.origin + pathname : "";

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Share:</span>
            <a
                href={`https://twitter.com/intent/tweet?url=${url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 hover:bg-muted"
            >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Share on Twitter</span>
            </a>
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 hover:bg-muted"
            >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Share on Facebook</span>
            </a>
            <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 hover:bg-muted"
            >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">Share on LinkedIn</span>
            </a>
        </div>
    );
}
