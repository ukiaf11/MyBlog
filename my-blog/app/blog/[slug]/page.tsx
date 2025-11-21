import { getPostData, getSortedPostsData, getRelatedPosts, getAdjacentPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { TOC } from "@/components/TOC";
import { Comments } from "@/components/Comments";
import { PostNavigation } from "@/components/PostNavigation";
import { RelatedPosts } from "@/components/RelatedPosts";
import { ProgressBar } from "@/components/ProgressBar";
import { ShareButtons } from "@/components/ShareButtons";
import { Newsletter } from "@/components/Newsletter";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostData(slug);
    if (!post) {
        return {};
    }
    return {
        title: post.title,
        description: post.description,
    };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostData(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(slug, post.tags);
    const { prev, next } = getAdjacentPosts(slug);

    return (
        <article className="container mx-auto px-4 py-10">
            <ProgressBar />
            <div className="mb-8 space-y-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                    <span>•</span>
                    <span>{post.author || "Antigravity"}</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    {post.title}
                </h1>
                <div className="flex justify-center gap-2">
                    {post.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1fr_300px]">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <MDXRemote
                        source={post.content}
                        options={{
                            mdxOptions: {
                                rehypePlugins: [
                                    rehypeSlug,
                                    [
                                        rehypeAutolinkHeadings,
                                        { behavior: "wrap" },
                                    ],
                                    [
                                        rehypePrettyCode,
                                        {
                                            theme: "github-dark",
                                            keepBackground: false,
                                        },
                                    ],
                                ],
                            },
                        }}
                    />
                    <div className="mt-8 flex justify-between items-center">
                        <ShareButtons />
                    </div>
                    <PostNavigation prev={prev} next={next} />
                    <RelatedPosts posts={relatedPosts} />
                    <div className="my-8">
                        <Newsletter />
                    </div>
                    <Comments />
                </div>
                <TOC headings={post.headings} />
            </div>
        </article>
    );
}
