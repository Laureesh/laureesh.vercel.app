"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { createBrowserClient } from "@/lib/supabase/client"
import { CheckCircle2, Trash2 } from "lucide-react"

interface ResumeActionsProps {
  resume: {
    id: string
    is_current: boolean
  }
}

export function ResumeActions({ resume }: ResumeActionsProps) {
  const { toast } = useToast()

  const handleSetCurrent = async () => {
    try {
      const supabase = createBrowserClient()

      // First, set all resumes to not current
      await supabase
        .from("resume_versions")
        .update({ is_current: false })
        .neq("id", "00000000-0000-0000-0000-000000000000")

      // Then set this one as current
      const { error } = await supabase.from("resume_versions").update({ is_current: true }).eq("id", resume.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Resume set as current",
      })

      window.location.reload()
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to update resume",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this resume?")) return

    try {
      const supabase = createBrowserClient()

      const { error } = await supabase.from("resume_versions").delete().eq("id", resume.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Resume deleted successfully",
      })

      window.location.reload()
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex gap-2">
      {!resume.is_current && (
        <Button variant="outline" size="sm" onClick={handleSetCurrent}>
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Set as Current
        </Button>
      )}
      <Button variant="destructive" size="sm" onClick={handleDelete}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
