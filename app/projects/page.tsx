"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { createBrowserClient } from "@/lib/supabase/client"

interface Project {
  id: string
  title: string
  slug: string
  description: string
  image_url: string | null
  demo_url: string | null
  github_url: string | null
  technologies: string[]
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const [allTechnologies, setAllTechnologies] = useState<string[]>([])

  useEffect(() => {
    async function fetchProjects() {
      const supabase = createBrowserClient()
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("order_index", { ascending: true })

      if (data) {
        setProjects(data)
        setFilteredProjects(data)

        const techSet = new Set<string>()
        data.forEach((project: Project) => {
          project.technologies?.forEach((tech: string) => techSet.add(tech))
        })
        setAllTechnologies(Array.from(techSet).sort())
      }
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    if (selectedTech) {
      setFilteredProjects(projects.filter((project) => project.technologies?.includes(selectedTech)))
    } else {
      setFilteredProjects(projects)
    }
  }, [selectedTech, projects])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container max-w-screen-xl px-4 mx-auto py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Projects</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A collection of projects showcasing my skills in full-stack development, from concept to deployment. Each
            project represents a unique challenge and learning opportunity.
          </p>
        </div>
      </section>

      {allTechnologies.length > 0 && (
        <section className="container max-w-screen-xl px-4 mx-auto pb-8">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTech === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTech(null)}
            >
              All
            </Button>
            {allTechnologies.map((tech) => (
              <Button
                key={tech}
                variant={selectedTech === tech ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTech(tech)}
              >
                {tech}
              </Button>
            ))}
          </div>
        </section>
      )}

      {/* Projects Grid */}
      <section className="container max-w-screen-xl px-4 mx-auto pb-16">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden group hover:shadow-lg transition-shadow flex flex-col">
                <Link href={`/projects/${project.slug}`}>
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {project.image_url ? (
                      <img
                        src={project.image_url || "/placeholder.svg"}
                        alt={project.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Code2 className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </Link>
                <CardHeader>
                  <CardTitle>
                    <Link href={`/projects/${project.slug}`} className="hover:text-primary">
                      {project.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    {project.demo_url && (
                      <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
                        <Link href={project.demo_url} target="_blank">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Demo
                        </Link>
                      </Button>
                    )}
                    {project.github_url && (
                      <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
                        <Link href={project.github_url} target="_blank">
                          <Github className="h-4 w-4 mr-1" />
                          Code
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12">
            <div className="flex flex-col items-center text-center gap-4">
              <Code2 className="h-12 w-12 text-muted-foreground" />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {selectedTech ? `No Projects with ${selectedTech}` : "No Projects Yet"}
                </h3>
                <p className="text-muted-foreground">
                  {selectedTech
                    ? "Try selecting a different technology."
                    : "Projects will appear here once they are published."}
                </p>
              </div>
            </div>
          </Card>
        )}
      </section>
    </div>
  )
}
