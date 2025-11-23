import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createServerClient } from "@/lib/supabase/server"
import { CodeBlock } from "@/components/code-block"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createServerClient()

  const { data: post } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).single()

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} - Laureesh Volmar`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createServerClient()

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*, profiles(*)")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (!post) {
    notFound()
  }

  // Increment view count
  await supabase
    .from("blog_posts")
    .update({ views: (post.views || 0) + 1 })
    .eq("id", post.id)

  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .neq("id", post.id)
    .limit(3)

  // Filter related posts by matching tags
  const related = relatedPosts?.filter((p) => p.tags?.some((tag: string) => post.tags?.includes(tag))).slice(0, 3)

  await supabase.from("analytics").insert({
    page_path: `/blog/${slug}`,
    referrer: null,
  })

  return (
    <div className="flex flex-col">
      <section className="container max-w-4xl mx-auto px-4 py-16">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>

        {post.cover_image_url && (
          <div className="aspect-video bg-muted relative overflow-hidden rounded-lg mb-8">
            <img
              src={post.cover_image_url || "/placeholder.svg"}
              alt={post.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <time>{new Date(post.created_at).toLocaleDateString()}</time>
          <span>•</span>
          <span>{post.read_time} min read</span>
          <span>•</span>
          <span>{post.views || 0} views</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">{post.title}</h1>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="prose prose-lg max-w-none dark:prose-invert">
          {post.content.split("\n\n").map((block: string, index: number) => {
            // Check if block is a code block (starts with ``` and ends with ```)
            if (block.trim().startsWith("```") && block.trim().endsWith("```")) {
              const lines = block.trim().split("\n")
              const language = lines[0].replace("```", "").trim() || "text"
              const code = lines.slice(1, -1).join("\n")
              return <CodeBlock key={index} code={code} language={language} />
            }

            return (
              <p key={index} className="leading-relaxed mb-4">
                {block}
              </p>
            )
          })}
        </div>
      </section>

      {related && related.length > 0 && (
        <section className="border-t border-border/40 bg-muted/50">
          <div className="container max-w-4xl mx-auto px-4 py-16">
            <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    {relatedPost.cover_image_url && (
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        <img
                          src={relatedPost.cover_image_url || "/placeholder.svg"}
                          alt={relatedPost.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-base">{relatedPost.title}</CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">{relatedPost.excerpt}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
