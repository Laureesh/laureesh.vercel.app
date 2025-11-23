import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Skills - Laureesh Volmar",
  description: "Technical skills and expertise across frontend, backend, and DevOps technologies.",
}

interface Skill {
  id: string
  name: string
  category: string
  proficiency: number
  icon: string | null
}

export default async function SkillsPage() {
  const supabase = await createServerClient()

  const { data: skills } = await supabase.from("skills").select("*").order("order_index", { ascending: true })

  const groupedSkills = skills?.reduce((acc: Record<string, Skill[]>, skill: Skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <main className="min-h-screen py-20">
      <div className="container max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Skills & Expertise</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            A comprehensive overview of my technical skills and proficiencies across various domains.
          </p>
        </div>

        <div className="space-y-12">
          {groupedSkills &&
            Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="h-1 w-12 bg-primary rounded-full" />
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map((skill) => (
                    <Card key={skill.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-lg">{skill.name}</h3>
                          <Badge variant="secondary">{skill.proficiency}%</Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  )
}
