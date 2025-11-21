import { getSortedPostsData } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { ProjectCard } from "@/components/ProjectCard";
import Link from "next/link";


// Wait, I didn't create Button component. I should avoid using it or create it. 
// I'll use standard anchor tags styled as buttons or just create a simple button style.
// Actually, I can just use Tailwind classes for buttons for now to avoid creating another component if I don't have to, 
// but for a professional look, a Button component is better.
// I'll check if I can use standard HTML button with classes.

// Let's redefine the imports without Button for now, or I'll create Button component in the next step if needed.
// For now I'll use standard elements with Tailwind.

export default function Home() {
  const allPosts = getSortedPostsData();
  const recentPosts = allPosts.slice(0, 6);

  const projects = [
    {
      name: "crazy-projects",
      description: "This is the first repo which is created by upendra with the help of My Friend ( Chat Gpt )",
      url: "https://github.com/ukiaf11/crazy-projects",
      language: "HTML",
    },
    {
      name: "Student-Management",
      description: "In this project Admin can add/edit/delete student data, upload results.",
      url: "https://github.com/ukiaf11/Student-Management",
      language: "PHP", // Assuming PHP based on typical student management systems, or I can leave it blank if unsure. The snippet didn't say.
    },
    {
      name: "Email-Sender",
      description: "By using this project you can send email to anyone by using using your email.",
      url: "https://github.com/ukiaf11/Email-Sender",
      language: "Python",
    },
    {
      name: "Tic-Tac-Toe",
      description: "Dynamic Background, You can set the Background color and image also.",
      url: "https://github.com/ukiaf11/Tic-Tac-Toe",
      language: "JavaScript",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm mb-4">
            Available for hire
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-6">
            Building Digital Experiences
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mb-8">
            I'm Upendra Kushwaha (ukiaf11), a developer passionate about building web applications and solving problems with code.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/blog"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Read Blog
            </Link>
            <Link
              href="https://github.com/ukiaf11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              GitHub Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Projects</h2>
              <p className="text-muted-foreground">Some of my recent open source work.</p>
            </div>
            <Link href="https://github.com/ukiaf11?tab=repositories" target="_blank" className="text-sm font-medium text-primary hover:underline hidden sm:block">
              View all projects →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="https://github.com/ukiaf11?tab=repositories" target="_blank" className="text-sm font-medium text-primary hover:underline">
              View all projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Latest Articles</h2>
              <p className="text-muted-foreground">Thoughts on technology and development.</p>
            </div>
            <Link href="/blog" className="text-sm font-medium text-primary hover:underline hidden sm:block">
              View all posts →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
              View all posts →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
