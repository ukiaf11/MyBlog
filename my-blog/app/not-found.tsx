import Link from "next/link";

export default function NotFound() {
    return (
        <div className="container flex h-[calc(100vh-200px)] flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">404</h1>
            <h2 className="text-xl font-semibold text-muted-foreground">Page Not Found</h2>
            <p className="max-w-[500px] text-muted-foreground">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link href="/" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Go Home
            </Link>
        </div>
    );
}
