import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";

interface ProjectCardProps {
    name: string;
    description: string;
    url: string;
    language?: string;
}

export function ProjectCard({ name, description, url, language }: ProjectCardProps) {
    return (
        <Card className="group relative overflow-hidden border-muted/40 bg-card/50 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                        {name}
                    </CardTitle>
                    <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
            </CardHeader>
            <CardContent>
                <CardDescription className="line-clamp-3 text-base">
                    {description}
                </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                {language && (
                    <Badge variant="secondary" className="font-medium">
                        {language}
                    </Badge>
                )}
                <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline"
                >
                    View Project →
                </Link>
            </CardFooter>
        </Card>
    );
}
