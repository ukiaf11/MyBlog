import { getSortedPostsData } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const metadata = {
    title: "Blog - My Professional Blog",
    description: "Read my latest thoughts and tutorials.",
};

export default function BlogPage() {
    const allPosts = getSortedPostsData();

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mb-8 space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Blog</h1>
                <p className="text-muted-foreground md:text-xl">
                    All articles, tutorials, and thoughts.
                </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {allPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    );
}
