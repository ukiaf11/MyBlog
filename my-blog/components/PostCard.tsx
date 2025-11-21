import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
    return (
        <article className="group relative flex flex-col space-y-2 rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
                <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                    {post.title}
                </Link>
            </h2>
            <p className="line-clamp-3 text-muted-foreground">{post.description}</p>
            <div className="mt-auto pt-4">
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span key={tag} className="relative z-10 rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}
