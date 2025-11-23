import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, BookOpen } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { BlogActions } from "@/components/blog-actions"

export default async function AdminBlogPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

  return (
    <div>
      <AdminHeader title="Blog Posts" description="Manage your blog content">
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Link>
        </Button>
      </AdminHeader>

      {posts && posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      {post.published ? (
                        <Badge variant="default">Published</Badge>
                      ) : (
                        <Badge variant="secondary">Draft</Badge>
                      )}
                      {post.featured && <Badge variant="outline">Featured</Badge>}
                    </div>
                  </div>
                  <BlogActions postId={post.id} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{post.read_time} min read</span>
                  <span>•</span>
                  <span>{post.views || 0} views</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12">
          <div className="flex flex-col items-center text-center gap-4">
            <BookOpen className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-xl font-semibold mb-2">No Blog Posts</h3>
              <p className="text-muted-foreground mb-4">
                Start sharing your knowledge by creating your first blog post.
              </p>
              <Button asChild>
                <Link href="/admin/blog/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
