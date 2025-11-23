"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { createBrowserClient } from "@/lib/supabase/client"
import { Upload } from "lucide-react"

export function ResumeUploadForm() {
  const [title, setTitle] = useState("")
  const [version, setVersion] = useState("")
  const [fileUrl, setFileUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const supabase = createBrowserClient()

      const { error } = await supabase.from("resume_versions").insert({
        title,
        version,
        file_url: fileUrl,
        is_current: false,
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "Resume uploaded successfully",
      })

      setTitle("")
      setVersion("")
      setFileUrl("")

      window.location.reload()
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to upload resume",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload New Resume</CardTitle>
        <CardDescription>
          Add a new version of your resume. You can upload the PDF to a service and paste the URL.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Software Engineer Resume"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="version">Version</Label>
            <Input
              id="version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="e.g., 2.0, Jan 2024"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fileUrl">PDF URL</Label>
            <Input
              id="fileUrl"
              type="url"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="https://example.com/resume.pdf"
              required
            />
            <p className="text-xs text-muted-foreground">Upload your PDF to a hosting service and paste the URL here</p>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            <Upload className="h-4 w-4 mr-2" />
            {isSubmitting ? "Uploading..." : "Upload Resume"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
