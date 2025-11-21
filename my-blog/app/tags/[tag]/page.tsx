import { getSortedPostsData } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    const tags = new Set(posts.flatMap((post) => post.tags));
    return Array.from(tags).map((tag) => ({
        tag,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
    const { tag } = await params;
    return {
        title: `Posts tagged "${tag}" - My Professional Blog`,
        description: `Read all posts tagged with ${tag}.`,
    };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
    const { tag } = await params;
    const allPosts = getSortedPostsData();
    const filteredPosts = allPosts.filter((post) => post.tags.includes(tag));

    if (filteredPosts.length === 0) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mb-8 space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Tag: {tag}
                </h1>
                <p className="text-muted-foreground md:text-xl">
                    {filteredPosts.length} post{filteredPosts.length === 1 ? "" : "s"} found.
                </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    );
}
