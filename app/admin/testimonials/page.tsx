import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { TestimonialActions } from "@/components/testimonial-actions"
import { AddTestimonialDialog } from "@/components/add-testimonial-dialog"

export default async function AdminTestimonialsPage() {
  const supabase = await createClient()

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("order_index", { ascending: true })

  return (
    <div>
      <AdminHeader title="Testimonials" description="Manage client and colleague testimonials">
        <AddTestimonialDialog />
      </AdminHeader>

      {testimonials && testimonials.length > 0 ? (
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      {testimonial.author_avatar_url ? (
                        <img
                          src={testimonial.author_avatar_url || "/placeholder.svg"}
                          alt={testimonial.author_name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-semibold text-primary">
                            {testimonial.author_name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold">{testimonial.author_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.author_role}
                          {testimonial.author_company && ` at ${testimonial.author_company}`}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed mb-3">{testimonial.content}</p>
                    <div className="flex gap-2">
                      {testimonial.featured && <Badge variant="outline">Featured</Badge>}
                      <Badge variant="secondary">Rating: {testimonial.rating}/5</Badge>
                    </div>
                  </div>
                  <TestimonialActions testimonialId={testimonial.id} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12">
          <div className="flex flex-col items-center text-center gap-4">
            <Award className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-xl font-semibold mb-2">No Testimonials</h3>
              <p className="text-muted-foreground mb-4">Start collecting testimonials from clients and colleagues.</p>
              <AddTestimonialDialog />
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
