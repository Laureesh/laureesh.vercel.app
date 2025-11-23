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

interface BlogFormProps {
  post?: any
  authorId: string
}

export function BlogForm({ post, authorId }: BlogFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState<string>(post?.tags?.join(", ") || "")
  const router = useRouter()
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title") as string,
      slug: (formData.get("slug") as string).toLowerCase().replace(/\s+/g, "-"),
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      cover_image_url: formData.get("cover_image_url") as string,
      author_id: authorId,
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      read_time: Number.parseInt(formData.get("read_time") as string) || 5,
    }

    try {
      const supabase = createClient()

      if (post) {
        const { error } = await supabase.from("blog_posts").update(data).eq("id", post.id)

        if (error) throw error

        toast({
          title: "Success",
          description: "Post updated successfully",
        })
      } else {
        const { error } = await supabase.from("blog_posts").insert([data])

        if (error) throw error

        toast({
          title: "Success",
          description: "Post created successfully",
        })
      }

      router.push("/admin/blog")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save post",
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
          <Input id="title" name="title" defaultValue={post?.title || ""} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input id="slug" name="slug" defaultValue={post?.slug || ""} placeholder="blog-post-slug" required />
          <p className="text-xs text-muted-foreground">URL-friendly version of the title (lowercase, hyphens)</p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="excerpt">Excerpt *</Label>
          <Textarea id="excerpt" name="excerpt" defaultValue={post?.excerpt || ""} rows={3} required />
          <p className="text-xs text-muted-foreground">A brief summary of the post</p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="content">Content *</Label>
          <Textarea id="content" name="content" defaultValue={post?.content || ""} rows={12} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="cover_image_url">Cover Image URL</Label>
          <Input
            id="cover_image_url"
            name="cover_image_url"
            type="url"
            defaultValue={post?.cover_image_url || ""}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="web development, react, tutorial"
          />
          <p className="text-xs text-muted-foreground">Comma-separated list of tags</p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="read_time">Read Time (minutes)</Label>
          <Input id="read_time" name="read_time" type="number" defaultValue={post?.read_time || 5} min="1" />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="featured">Featured</Label>
            <p className="text-sm text-muted-foreground">Show on homepage</p>
          </div>
          <Switch id="featured" name="featured" defaultChecked={post?.featured || false} />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="published">Published</Label>
            <p className="text-sm text-muted-foreground">Make visible to public</p>
          </div>
          <Switch id="published" name="published" defaultChecked={post?.published || false} />
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : post ? "Update Post" : "Create Post"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
