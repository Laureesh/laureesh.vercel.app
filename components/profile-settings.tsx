"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface ProfileSettingsProps {
  profile: any
}

export function ProfileSettings({ profile }: ProfileSettingsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      full_name: formData.get("full_name") as string,
      bio: formData.get("bio") as string,
      github_url: formData.get("github_url") as string,
      linkedin_url: formData.get("linkedin_url") as string,
      twitter_url: formData.get("twitter_url") as string,
      website_url: formData.get("website_url") as string,
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.from("profiles").update(data).eq("id", profile.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input id="full_name" name="full_name" defaultValue={profile?.full_name || ""} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            defaultValue={profile?.bio || ""}
            rows={4}
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="github_url">GitHub URL</Label>
          <Input
            id="github_url"
            name="github_url"
            type="url"
            defaultValue={profile?.github_url || ""}
            placeholder="https://github.com/username"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="linkedin_url">LinkedIn URL</Label>
          <Input
            id="linkedin_url"
            name="linkedin_url"
            type="url"
            defaultValue={profile?.linkedin_url || ""}
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="twitter_url">Twitter URL</Label>
          <Input
            id="twitter_url"
            name="twitter_url"
            type="url"
            defaultValue={profile?.twitter_url || ""}
            placeholder="https://twitter.com/username"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="website_url">Website URL</Label>
          <Input
            id="website_url"
            name="website_url"
            type="url"
            defaultValue={profile?.website_url || ""}
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}
