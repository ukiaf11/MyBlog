import { getSortedPostsData } from "@/lib/posts";

export async function GET() {
    const posts = getSortedPostsData();
    const siteUrl = "https://your-blog-url.com";

    const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>My Professional Blog</title>
    <link>${siteUrl}</link>
    <description>Sharing thoughts on technology, programming, and life.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${posts
            .map((post) => {
                return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.description}]]></description>
      </item>`;
            })
            .join("")}
  </channel>
</rss>`;

    return new Response(rssXml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
