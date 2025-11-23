"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function AddTestimonialDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      author_name: formData.get("author_name") as string,
      author_role: formData.get("author_role") as string,
      author_company: formData.get("author_company") as string,
      author_avatar_url: formData.get("author_avatar_url") as string,
      content: formData.get("content") as string,
      rating: Number.parseInt(formData.get("rating") as string) || 5,
      featured: formData.get("featured") === "on",
      order_index: Number.parseInt(formData.get("order_index") as string) || 0,
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.from("testimonials").insert([data])

      if (error) throw error

      toast({
        title: "Success",
        description: "Testimonial added successfully",
      })
      setOpen(false)
      router.refresh()
      e.currentTarget.reset()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add testimonial",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Testimonial</DialogTitle>
          <DialogDescription>Add a testimonial from a client or colleague</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="author_name">Author Name *</Label>
            <Input id="author_name" name="author_name" placeholder="John Doe" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="author_role">Role</Label>
            <Input id="author_role" name="author_role" placeholder="Senior Developer" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="author_company">Company</Label>
            <Input id="author_company" name="author_company" placeholder="Tech Corp" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="author_avatar_url">Avatar URL</Label>
            <Input
              id="author_avatar_url"
              name="author_avatar_url"
              type="url"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="content">Testimonial *</Label>
            <Textarea id="content" name="content" rows={4} placeholder="Write the testimonial here..." required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input id="rating" name="rating" type="number" min="1" max="5" defaultValue="5" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="order_index">Order Index</Label>
            <Input id="order_index" name="order_index" type="number" defaultValue="0" />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="featured">Featured</Label>
              <p className="text-sm text-muted-foreground">Show on homepage</p>
            </div>
            <Switch id="featured" name="featured" />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Testimonial"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
