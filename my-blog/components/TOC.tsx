"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TOCProps {
    headings: { level: number; text: string; slug: string }[];
}

export function TOC({ headings }: TOCProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0% 0% -80% 0%" }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.slug);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            headings.forEach((heading) => {
                const element = document.getElementById(heading.slug);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <div className="hidden xl:block">
            <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto">
                <h4 className="mb-4 text-sm font-semibold">On This Page</h4>
                <ul className="space-y-2 text-sm">
                    {headings.map((heading) => (
                        <li
                            key={heading.slug}
                            style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
                        >
                            <a
                                href={`#${heading.slug}`}
                                className={cn(
                                    "block text-muted-foreground transition-colors hover:text-foreground",
                                    activeId === heading.slug && "font-medium text-foreground"
                                )}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(heading.slug)?.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }}
                            >
                                {heading.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
