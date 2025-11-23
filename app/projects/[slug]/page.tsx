import { createServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const supabase = await createServerClient()

  const { data: project } = await supabase
    .from("projects")
    .select("title, description")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} - Laureesh Volmar`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const supabase = await createServerClient()

  const { data: project } = await supabase.from("projects").select("*").eq("slug", slug).eq("published", true).single()

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen py-20">
      <div className="container max-w-4xl mx-auto px-4 md:px-6">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{project.title}</h1>
            <p className="text-xl text-muted-foreground mb-6 text-pretty">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies?.map((tech: string) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {project.demo_url && (
                <Button asChild>
                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.github_url && (
                <Button variant="outline" asChild>
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Source Code
                  </a>
                </Button>
              )}
            </div>
          </header>

          {project.image_url && (
            <div className="relative aspect-video rounded-lg overflow-hidden mb-8 border">
              <Image
                src={project.image_url || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {project.content && (
            <Card>
              <CardContent className="p-8 prose prose-slate dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: project.content }} />
              </CardContent>
            </Card>
          )}
        </article>
      </div>
    </main>
  )
}
