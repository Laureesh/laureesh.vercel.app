"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function DownloadResumeButton() {
  const { toast } = useToast()

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/Laureesh_Volmar_Resume.pdf"
    link.download = "Laureesh_Volmar_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Download Started",
      description: "Your resume PDF is being downloaded.",
    })
  }

  return (
    <Button onClick={handleDownload} size="lg">
      <Download className="h-4 w-4 mr-2" />
      Download PDF
    </Button>
  )
}
