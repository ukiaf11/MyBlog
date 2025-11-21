"use client";

import { useState, useEffect } from "react";
import { PostCard } from "@/components/PostCard";
import { Post } from "@/lib/posts";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

    useEffect(() => {
        // Fetch posts from an API route we'll create
        fetch("/api/posts")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setFilteredPosts(data);
            });
    }, []);

    useEffect(() => {
        const lowerQuery = query.toLowerCase();
        const filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(lowerQuery) ||
            post.description.toLowerCase().includes(lowerQuery) ||
            post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        );
        setFilteredPosts(filtered);
    }, [query, posts]);

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mb-8 space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Search</h1>
                <input
                    type="text"
                    placeholder="Search posts..."
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
                {filteredPosts.length === 0 && (
                    <p className="col-span-full text-center text-muted-foreground">No posts found.</p>
                )}
            </div>
        </div>
    );
}
