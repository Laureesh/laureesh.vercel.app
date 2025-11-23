import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResumeUploadForm } from "@/components/resume-upload-form"
import { ResumeActions } from "@/components/resume-actions"
import { FileText } from "lucide-react"

export default async function AdminResumePage() {
  const supabase = await createServerClient()

  const { data: resumes } = await supabase.from("resume_versions").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Resume Management</h1>
        <p className="text-muted-foreground">Upload and manage your resume versions</p>
      </div>

      <ResumeUploadForm />

      <Card>
        <CardHeader>
          <CardTitle>All Resume Versions</CardTitle>
          <CardDescription>Manage your uploaded resumes. Only one can be set as current.</CardDescription>
        </CardHeader>
        <CardContent>
          {resumes && resumes.length > 0 ? (
            <div className="space-y-4">
              {resumes.map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-semibold">{resume.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Version {resume.version} • {new Date(resume.created_at).toLocaleDateString()}
                        {resume.is_current && <span className="ml-2 text-primary font-medium">• Current</span>}
                      </p>
                    </div>
                  </div>
                  <ResumeActions resume={resume} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">No resumes uploaded yet</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
