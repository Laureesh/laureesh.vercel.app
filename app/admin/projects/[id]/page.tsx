import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectForm } from "@/components/project-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: project, error } = await supabase.from("projects").select("*").eq("id", id).single()

  if (error || !project) {
    notFound()
  }

  return (
    <div>
      <AdminHeader title="Edit Project" description="Update your project details" />

      <Card>
        <CardContent className="pt-6">
          <ProjectForm project={project} />
        </CardContent>
      </Card>
    </div>
  )
}
