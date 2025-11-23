import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Award, Target } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export const metadata = {
  title: "About - Laureesh Volmar",
  description:
    "Learn more about Laureesh Volmar, a full-stack developer with a 3.92 GPA from Georgia Gwinnett College.",
}

export default async function AboutPage() {
  const supabase = await createClient()

  // Fetch skills grouped by category
  const { data: skills } = await supabase.from("skills").select("*").order("order_index", { ascending: true })

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
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container max-w-screen-xl px-4 mx-auto py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">About Me</h1>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p className="text-lg leading-relaxed">
              I'm a passionate full-stack developer with a strong academic background and a drive to create meaningful
              digital experiences. Currently maintaining a 3.92 GPA at Georgia Gwinnett College, I combine theoretical
              knowledge with practical skills to build robust, scalable applications.
            </p>
            <p className="text-lg leading-relaxed">
              My journey in software development started with a curiosity about how things work behind the scenes. This
              curiosity has evolved into a deep passion for creating elegant solutions to complex problems, always with
              the end user in mind.
            </p>
            <p className="text-lg leading-relaxed">
              I specialize in modern web technologies including React, Next.js, TypeScript, and various backend
              frameworks. I'm constantly learning and adapting to new technologies to stay at the forefront of web
              development.
            </p>
          </div>
        </div>
      </section>

      {/* Education & Achievements */}
      <section className="border-y border-border/40 bg-muted/50">
        <div className="container max-w-screen-xl px-4 mx-auto py-16">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Education & Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <GraduationCap className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">Georgia Gwinnett College</p>
                <p className="text-muted-foreground">Computer Science</p>
                <p className="text-sm text-muted-foreground mt-2">GPA: 3.92</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Dean's List recipient for academic excellence and consistent high performance throughout college
                  career.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Focus Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Full-stack web development, UI/UX design, database architecture, and cloud deployment strategies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {skillsByCategory && (
        <section className="container max-w-screen-xl px-4 mx-auto py-16">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <Badge key={skill.id} variant="secondary" className="text-sm">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Values Section */}
      <section className="border-t border-border/40 bg-muted/50">
        <div className="container max-w-screen-xl px-4 mx-auto py-16">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Quality First</h3>
              <p className="text-muted-foreground leading-relaxed">
                I believe in writing clean, maintainable code that stands the test of time. Every project deserves
                attention to detail and best practices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Continuous Learning</h3>
              <p className="text-muted-foreground leading-relaxed">
                Technology evolves rapidly, and so do I. I'm committed to staying current with industry trends and
                expanding my skill set.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">User-Centric</h3>
              <p className="text-muted-foreground leading-relaxed">
                Great software isn't just about code—it's about solving real problems for real people. User experience
                is always my priority.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
