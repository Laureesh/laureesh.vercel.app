"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Check, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface MessageActionsProps {
  messageId: string
  isRead: boolean
}

export function MessageActions({ messageId, isRead }: MessageActionsProps) {
  const router = useRouter()
  const { toast } = useToast()

  async function handleMarkAsRead() {
    const supabase = createClient()
    const { error } = await supabase.from("contact_messages").update({ read: true }).eq("id", messageId)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to mark message as read",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Success",
      description: "Message marked as read",
    })
    router.refresh()
  }

  async function handleDelete() {
    const supabase = createClient()
    const { error } = await supabase.from("contact_messages").delete().eq("id", messageId)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Success",
      description: "Message deleted",
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
        {!isRead && (
          <DropdownMenuItem onClick={handleMarkAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark as Read
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
