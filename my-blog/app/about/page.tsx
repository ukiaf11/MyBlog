export const metadata = {
    title: "About - My Professional Blog",
    description: "Learn more about me and this blog.",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto max-w-3xl px-4 py-10">
            <h1 className="mb-8 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About Me
            </h1>
            <div className="prose prose-neutral dark:prose-invert">
                <p>
                    Hello! I&apos;m Upendra Kushwaha, a passionate developer and writer.
                </p>
                <p>
                    This blog is built with Next.js, Tailwind CSS, and MDX. It&apos;s designed to be fast, accessible, and easy to maintain.
                </p>
                <h2>My Tech Stack</h2>
                <ul>
                    <li>Next.js 14+ (App Router)</li>
                    <li>Tailwind CSS</li>
                    <li>MDX</li>
                    <li>Vercel</li>
                </ul>
            </div>
        </div>
    );
}
