import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Eye, MousePointerClick, TrendingUp } from "lucide-react"

export default async function AdminAnalyticsPage() {
  const supabase = await createServerClient()

  // Get total page views
  const { count: totalViews } = await supabase.from("analytics").select("*", { count: "exact", head: true })

  // Get total blog views
  const { data: blogPosts } = await supabase.from("blog_posts").select("views")

  const totalBlogViews = blogPosts?.reduce((sum, post) => sum + (post.views || 0), 0) || 0

  // Get contact messages count
  const { count: messagesCount } = await supabase.from("contact_messages").select("*", { count: "exact", head: true })

  // Get page views by path
  const { data: pageViews } = await supabase.from("analytics").select("page_path")

  const pageViewsGrouped = pageViews?.reduce((acc: Record<string, number>, { page_path }) => {
    acc[page_path] = (acc[page_path] || 0) + 1
    return acc
  }, {})

  const topPages = Object.entries(pageViewsGrouped || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)

  // Get recent page views
  const { data: recentViews } = await supabase
    .from("analytics")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track visitor engagement and page performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews || 0}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Views</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBlogViews}</div>
            <p className="text-xs text-muted-foreground">Across all posts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messagesCount || 0}</div>
            <p className="text-xs text-muted-foreground">Total inquiries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalViews ? (((messagesCount || 0) / totalViews) * 100).toFixed(1) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Conversion rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages on your site</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map(([path, count]) => (
                <div key={path} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{path}</span>
                  <Badge variant="secondary">{count} views</Badge>
                </div>
              ))}
              {topPages.length === 0 && <p className="text-sm text-muted-foreground">No page views yet</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest page views</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentViews?.map((view) => (
                <div key={view.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{view.page_path}</span>
                  <span className="text-muted-foreground">{new Date(view.created_at).toLocaleString()}</span>
                </div>
              ))}
              {!recentViews ||
                (recentViews.length === 0 && <p className="text-sm text-muted-foreground">No recent views</p>)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
