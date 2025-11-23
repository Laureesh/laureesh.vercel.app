import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectForm } from "@/components/project-form"

export default function NewProjectPage() {
  return (
    <div>
      <AdminHeader title="New Project" description="Add a new project to your portfolio" />

      <Card>
        <CardContent className="pt-6">
          <ProjectForm />
        </CardContent>
      </Card>
    </div>
  )
}
