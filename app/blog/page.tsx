"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, Search } from "lucide-react"
import Link from "next/link"
import { createBrowserClient } from "@/lib/supabase/client"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  cover_image_url: string | null
  created_at: string
  read_time: number
  tags: string[]
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createBrowserClient()
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })

      if (data) {
        setPosts(data)
        setFilteredPosts(data)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      setFilteredPosts(
        posts.filter(
          (post) =>
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query) ||
            post.tags?.some((tag) => tag.toLowerCase().includes(query)),
        ),
      )
    } else {
      setFilteredPosts(posts)
    }
  }, [searchQuery, posts])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container max-w-screen-xl px-4 mx-auto py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Blog</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Thoughts, tutorials, and insights on web development, programming best practices, and the ever-evolving
            world of technology.
          </p>
        </div>
      </section>

      <section className="container max-w-screen-xl px-4 mx-auto pb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts by title, content, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </section>

      {/* Blog Posts */}
      <section className="container max-w-screen-xl px-4 mx-auto pb-16">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  {post.cover_image_url && (
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <img
                        src={post.cover_image_url || "/placeholder.svg"}
                        alt={post.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <time>{new Date(post.created_at).toLocaleDateString()}</time>
                      <span>•</span>
                      <span>{post.read_time} min read</span>
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="p-12">
            <div className="flex flex-col items-center text-center gap-4">
              <BookOpen className="h-12 w-12 text-muted-foreground" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{searchQuery ? "No Posts Found" : "No Posts Yet"}</h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "Try a different search query."
                    : "Blog posts will appear here once they are published."}
                </p>
              </div>
            </div>
          </Card>
        )}
      </section>
    </div>
  )
}
