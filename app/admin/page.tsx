import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminHeader } from "@/components/admin-header"
import { createClient } from "@/lib/supabase/server"
import { FolderKanban, BookOpen, MessageSquare, Award, TrendingUp } from "lucide-react"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Fetch counts
  const [
    { count: projectsCount },
    { count: publishedProjectsCount },
    { count: blogPostsCount },
    { count: publishedBlogPostsCount },
    { count: unreadMessagesCount },
    { count: testimonialsCount },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }).eq("published", true),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("read", false),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
  ])

  // Fetch recent messages
  const { data: recentMessages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  // Fetch recent blog posts
  const { data: recentPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div>
      <AdminHeader title="Dashboard" description="Welcome back! Here's an overview of your portfolio." />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">{publishedProjectsCount || 0} published</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Blog Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogPostsCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">{publishedBlogPostsCount || 0} published</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadMessagesCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Unread messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Testimonials</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testimonialsCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Total testimonials</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            {recentMessages && recentMessages.length > 0 ? (
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="flex flex-col gap-1 pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{message.name}</p>
                      {!message.read && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">New</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{message.email}</p>
                    <p className="text-sm line-clamp-2">{message.message}</p>
                    <p className="text-xs text-muted-foreground">{new Date(message.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No messages yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Blog Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {recentPosts && recentPosts.length > 0 ? (
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex flex-col gap-1 pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm line-clamp-1">{post.title}</p>
                      {!post.published && (
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">Draft</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {post.views || 0} views
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No blog posts yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
