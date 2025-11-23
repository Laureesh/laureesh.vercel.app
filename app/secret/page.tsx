"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock, Sparkles } from "lucide-react"

export default function SecretPage() {
  const [password, setPassword] = useState("")
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.toLowerCase() === "rolex") {
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  if (unlocked) {
    return (
      <main className="min-h-screen py-20 flex items-center justify-center">
        <div className="container max-w-2xl mx-auto px-4 md:px-6 text-center">
          <div className="animate-bounce mb-8">
            <Sparkles className="h-24 w-24 mx-auto text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">You Found It!</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Welcome to the secret page. You've unlocked the hidden easter egg!
          </p>
          <Card className="text-left">
            <CardHeader>
              <CardTitle>Secret Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Congratulations on finding this hidden page! This is a special easter egg for those curious enough to
                explore.
              </p>
              <p className="text-muted-foreground">
                "The journey of a thousand miles begins with a single step." - Lao Tzu
              </p>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Thanks for taking the time to explore my portfolio. I hope you enjoyed discovering this little secret!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-20 flex items-center justify-center">
      <div className="container max-w-md mx-auto px-4 md:px-6">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Lock className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle>Protected Page</CardTitle>
            <CardDescription>Enter the password to unlock this secret page</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={error ? "border-destructive" : ""}
              />
              {error && <p className="text-sm text-destructive">Incorrect password. Try again!</p>}
              <Button type="submit" className="w-full">
                Unlock
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
