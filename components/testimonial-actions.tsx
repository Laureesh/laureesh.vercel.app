"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface TestimonialActionsProps {
  testimonialId: string
}

export function TestimonialActions({ testimonialId }: TestimonialActionsProps) {
  const router = useRouter()
  const { toast } = useToast()

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this testimonial?")) return

    const supabase = createClient()
    const { error } = await supabase.from("testimonials").delete().eq("id", testimonialId)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Success",
      description: "Testimonial deleted successfully",
    })
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
