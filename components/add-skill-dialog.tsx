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
import { Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function AddSkillDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      proficiency: Number.parseInt(formData.get("proficiency") as string) || 0,
      icon: formData.get("icon") as string,
      order_index: Number.parseInt(formData.get("order_index") as string) || 0,
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.from("skills").insert([data])

      if (error) throw error

      toast({
        title: "Success",
        description: "Skill added successfully",
      })
      setOpen(false)
      router.refresh()
      e.currentTarget.reset()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add skill",
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
          Add Skill
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Skill</DialogTitle>
          <DialogDescription>Add a new technical skill to your portfolio</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Skill Name *</Label>
            <Input id="name" name="name" placeholder="React" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category *</Label>
            <Input id="category" name="category" placeholder="Frontend, Backend, Database, Tools" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="proficiency">Proficiency (0-100)</Label>
            <Input id="proficiency" name="proficiency" type="number" min="0" max="100" defaultValue="50" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="icon">Icon (emoji or text)</Label>
            <Input id="icon" name="icon" placeholder="⚛️" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="order_index">Order Index</Label>
            <Input id="order_index" name="order_index" type="number" defaultValue="0" />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Skill"}
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
