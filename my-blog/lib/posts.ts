import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type Post = {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    content: string;
    author?: string;
    readingTime: string;
    headings: { level: number; text: string; slug: string }[];
};

export function getSortedPostsData(): Post[] {
    // Get file names under /posts
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".mdx" from file name to get slug
        const slug = fileName.replace(/\.mdx$/, "");

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Calculate reading time
        const words = matterResult.content.split(/\s+/g).length;
        const minutes = Math.ceil(words / 200);
        const readingTime = `${minutes} min read`;

        // Extract headings
        const headings = [];
        const headingRegex = /^(#{1,6})\s+(.*)$/gm;
        let match;
        while ((match = headingRegex.exec(matterResult.content)) !== null) {
            headings.push({
                level: match[1].length,
                text: match[2],
                slug: match[2].toLowerCase().replace(/[^\w]+/g, "-"),
            });
        }

        // Combine the data with the id
        return {
            slug,
            content: matterResult.content,
            readingTime,
            headings,
            ...(matterResult.data as any),
        };
    });
    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getPostData(slug: string): Post | undefined {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
        return undefined;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    // Calculate reading time
    const words = matterResult.content.split(/\s+/g).length;
    const minutes = Math.ceil(words / 200);
    const readingTime = `${minutes} min read`;

    // Extract headings
    const headings = [];
    const headingRegex = /^(#{1,6})\s+(.*)$/gm;
    let match;
    while ((match = headingRegex.exec(matterResult.content)) !== null) {
        headings.push({
            level: match[1].length,
            text: match[2],
            slug: match[2].toLowerCase().replace(/[^\w]+/g, "-"),
        });
    }

    return {
        slug,
        content: matterResult.content,
        readingTime,
        headings,
        ...(matterResult.data as any),
    };
}

export function getRelatedPosts(currentSlug: string, tags: string[], limit: number = 3): Post[] {
    const allPosts = getSortedPostsData();
    return allPosts
        .filter((post) => post.slug !== currentSlug && post.tags.some((tag) => tags.includes(tag)))
        .slice(0, limit);
}

export function getAdjacentPosts(currentSlug: string): { prev: Post | null; next: Post | null } {
    const allPosts = getSortedPostsData();
    const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);

    const prev = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    const next = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

    return { prev, next };
}
