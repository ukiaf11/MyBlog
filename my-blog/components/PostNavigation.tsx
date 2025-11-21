import Link from "next/link";
import { Post } from "@/lib/posts";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PostNavigationProps {
    prev: Post | null;
    next: Post | null;
}

export function PostNavigation({ prev, next }: PostNavigationProps) {
    return (
        <div className="grid gap-4 border-t pt-6 sm:grid-cols-2">
            {prev ? (
                <Link
                    href={`/blog/${prev.slug}`}
                    className="group flex flex-col gap-1 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Previous
                    </span>
                    <span className="font-medium leading-tight">{prev.title}</span>
                </Link>
            ) : (
                <div />
            )}
            {next && (
                <Link
                    href={`/blog/${next.slug}`}
                    className="group flex flex-col gap-1 rounded-lg border p-4 text-right transition-colors hover:bg-muted/50"
                >
                    <span className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                        Next
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="font-medium leading-tight">{next.title}</span>
                </Link>
            )}
        </div>
    );
}
