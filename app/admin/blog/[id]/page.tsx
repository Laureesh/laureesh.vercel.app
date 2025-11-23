import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent } from "@/components/ui/card"
import { BlogForm } from "@/components/blog-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post, error } = await supabase.from("blog_posts").select("*").eq("id", id).single()

  if (error || !post) {
    notFound()
  }

  return (
    <div>
      <AdminHeader title="Edit Blog Post" description="Update your blog post" />

      <Card>
        <CardContent className="pt-6">
          <BlogForm post={post} authorId={post.author_id} />
        </CardContent>
      </Card>
    </div>
  )
}
