import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent } from "@/components/ui/card"
import { BlogForm } from "@/components/blog-form"
import { createClient } from "@/lib/supabase/server"

export default async function NewBlogPostPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div>
      <AdminHeader title="New Blog Post" description="Create a new blog post" />

      <Card>
        <CardContent className="pt-6">
          <BlogForm authorId={user!.id} />
        </CardContent>
      </Card>
    </div>
  )
}
