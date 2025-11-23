import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2 } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { SkillActions } from "@/components/skill-actions"
import { AddSkillDialog } from "@/components/add-skill-dialog"

export default async function AdminSkillsPage() {
  const supabase = await createClient()

  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .order("category", { ascending: true })
    .order("order_index", { ascending: true })

  const skillsByCategory = skills?.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, typeof skills>,
  )

  return (
    <div>
      <AdminHeader title="Skills" description="Manage your technical skills">
        <AddSkillDialog />
      </AdminHeader>

      {skillsByCategory && Object.keys(skillsByCategory).length > 0 ? (
        <div className="grid gap-6">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle>{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{skill.icon || "📦"}</div>
                        <div>
                          <p className="font-medium">{skill.name}</p>
                          <p className="text-sm text-muted-foreground">Proficiency: {skill.proficiency}%</p>
                        </div>
                      </div>
                      <SkillActions skillId={skill.id} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12">
          <div className="flex flex-col items-center text-center gap-4">
            <Code2 className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-xl font-semibold mb-2">No Skills</h3>
              <p className="text-muted-foreground mb-4">Start by adding your technical skills.</p>
              <AddSkillDialog />
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
