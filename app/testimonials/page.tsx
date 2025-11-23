import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export const metadata = {
  title: "Testimonials - Laureesh Volmar",
  description: "What people say about working with me.",
}

interface Testimonial {
  id: string
  author_name: string
  author_role: string | null
  author_company: string | null
  author_avatar_url: string | null
  content: string
  rating: number
  featured: boolean
}

export default async function TestimonialsPage() {
  const supabase = await createServerClient()

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("order_index", { ascending: true })

  return (
    <main className="min-h-screen py-20">
      <div className="container max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Testimonials</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Kind words from colleagues, clients, and collaborators.
          </p>
        </div>

        {testimonials && testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial: Testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.author_avatar_url || undefined} />
                      <AvatarFallback>
                        {testimonial.author_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{testimonial.author_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.author_role}
                        {testimonial.author_company && ` at ${testimonial.author_company}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary text-primary" : "text-muted"}`}
                      />
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No testimonials available yet.</p>
          </div>
        )}
      </div>
    </main>
  )
}
