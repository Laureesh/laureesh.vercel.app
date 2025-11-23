"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface ProjectFormProps {
  project?: any
}

export function ProjectForm({ project }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [technologies, setTechnologies] = useState<string>(project?.technologies?.join(", ") || "")
  const router = useRouter()
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title") as string,
      slug: (formData.get("slug") as string).toLowerCase().replace(/\s+/g, "-"),
      description: formData.get("description") as string,
      content: formData.get("content") as string,
      image_url: formData.get("image_url") as string,
      demo_url: formData.get("demo_url") as string,
      github_url: formData.get("github_url") as string,
      technologies: technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
      order_index: Number.parseInt(formData.get("order_index") as string) || 0,
    }

    try {
      const supabase = createClient()

      if (project) {
        const { error } = await supabase.from("projects").update(data).eq("id", project.id)

        if (error) throw error

        toast({
          title: "Success",
          description: "Project updated successfully",
        })
      } else {
        const { error } = await supabase.from("projects").insert([data])

        if (error) throw error

        toast({
          title: "Success",
          description: "Project created successfully",
        })
      }

      router.push("/admin/projects")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save project",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title *</Label>
          <Input id="title" name="title" defaultValue={project?.title || ""} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input id="slug" name="slug" defaultValue={project?.slug || ""} placeholder="project-slug" required />
          <p className="text-xs text-muted-foreground">URL-friendly version of the title (lowercase, hyphens)</p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea id="description" name="description" defaultValue={project?.description || ""} rows={3} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            defaultValue={project?.content || ""}
            rows={6}
            placeholder="Detailed project description..."
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            name="image_url"
            type="url"
            defaultValue={project?.image_url || ""}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="demo_url">Demo URL</Label>
            <Input
              id="demo_url"
              name="demo_url"
              type="url"
              defaultValue={project?.demo_url || ""}
              placeholder="https://demo.example.com"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="github_url">GitHub URL</Label>
            <Input
              id="github_url"
              name="github_url"
              type="url"
              defaultValue={project?.github_url || ""}
              placeholder="https://github.com/user/repo"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="technologies">Technologies</Label>
          <Input
            id="technologies"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            placeholder="React, Next.js, TypeScript, Tailwind CSS"
          />
          <p className="text-xs text-muted-foreground">Comma-separated list of technologies</p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="order_index">Order Index</Label>
          <Input id="order_index" name="order_index" type="number" defaultValue={project?.order_index || 0} min="0" />
          <p className="text-xs text-muted-foreground">Lower numbers appear first</p>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="featured">Featured</Label>
            <p className="text-sm text-muted-foreground">Show on homepage</p>
          </div>
          <Switch id="featured" name="featured" defaultChecked={project?.featured || false} />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="published">Published</Label>
            <p className="text-sm text-muted-foreground">Make visible to public</p>
          </div>
          <Switch id="published" name="published" defaultChecked={project?.published || false} />
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : project ? "Update Project" : "Create Project"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
