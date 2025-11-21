import { Post } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

interface RelatedPostsProps {
    posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
    if (posts.length === 0) return null;

    return (
        <div className="space-y-4 border-t pt-6">
            <h3 className="text-2xl font-bold tracking-tight">Related Posts</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    );
}
