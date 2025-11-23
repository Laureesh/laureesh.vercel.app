import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, FolderKanban } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { ProjectActions } from "@/components/project-actions"

export default async function AdminProjectsPage() {
  const supabase = await createClient()

  const { data: projects } = await supabase.from("projects").select("*").order("order_index", { ascending: true })

  return (
    <div>
      <AdminHeader title="Projects" description="Manage your portfolio projects">
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Link>
        </Button>
      </AdminHeader>

      {projects && projects.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              {project.image_url ? (
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img
                    src={project.image_url || "/placeholder.svg"}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <FolderKanban className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                  <ProjectActions projectId={project.id} />
                </div>
                <div className="flex gap-2 mt-2">
                  {project.published ? (
                    <Badge variant="default">Published</Badge>
                  ) : (
                    <Badge variant="secondary">Draft</Badge>
                  )}
                  {project.featured && <Badge variant="outline">Featured</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12">
          <div className="flex flex-col items-center text-center gap-4">
            <FolderKanban className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-xl font-semibold mb-2">No Projects</h3>
              <p className="text-muted-foreground mb-4">Start building your portfolio by adding your first project.</p>
              <Button asChild>
                <Link href="/admin/projects/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
