"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export function Comments() {
    const { theme } = useTheme();

    return (
        <div className="mt-10 border-t pt-10">
            <Giscus
                id="comments"
                repo="your-username/your-repo"
                repoId="your-repo-id"
                category="Announcements"
                categoryId="your-category-id"
                mapping="pathname"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="bottom"
                theme={theme === "dark" ? "dark" : "light"}
                lang="en"
                loading="lazy"
            />
        </div>
    );
}
