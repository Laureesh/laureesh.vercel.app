import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code2, Sparkles, Zap } from "lucide-react"
import { createServerClient } from "@/lib/supabase/server"
import { AnimatedSection } from "@/components/animated-section"

export default async function HomePage() {
  const supabase = await createServerClient()

  await supabase.from("analytics").insert({
    page_path: "/",
    referrer: null,
  })

  // Fetch featured projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("order_index", { ascending: true })
    .limit(3)

  // Fetch featured blog posts
  const { data: blogPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(3)

  // Fetch testimonials
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("featured", true)
    .order("order_index", { ascending: true })
    .limit(3)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <AnimatedSection>
        <section className="container max-w-screen-xl px-4 mx-auto py-24 md:py-32">
          <div className="flex flex-col items-center text-center gap-8">
            <Badge variant="secondary" className="px-4 py-1.5">
              <Sparkles className="h-3 w-3 mr-1" />
              Available for opportunities
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance max-w-4xl">
              Full-Stack Developer & Problem Solver
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
              Building elegant solutions with modern technologies. Specialized in React, Next.js, and TypeScript with a
              3.92 GPA from Georgia Gwinnett College.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Features Section */}
      <section className="border-y border-border/40 bg-muted/50">
        <div className="container max-w-screen-xl px-4 mx-auto py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Full-Stack Expertise</h3>
              <p className="text-muted-foreground">
                Proficient in both frontend and backend development with modern frameworks and tools.
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Performance Focused</h3>
              <p className="text-muted-foreground">
                Optimized solutions that deliver exceptional user experiences and fast load times.
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Modern Design</h3>
              <p className="text-muted-foreground">
                Clean, accessible interfaces built with attention to detail and user needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {projects && projects.length > 0 && (
        <AnimatedSection delay={0.2}>
          <section className="container max-w-screen-xl px-4 mx-auto py-16">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
                  <p className="text-muted-foreground mt-2">Some of my recent work</p>
                </div>
                <Button variant="ghost" asChild>
                  <Link href="/projects">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      {project.image_url ? (
                        <img
                          src={project.image_url || "/placeholder.svg"}
                          alt={project.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Code2 className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <AnimatedSection delay={0.3}>
          <section className="bg-muted/50 border-y border-border/40">
            <div className="container max-w-screen-xl px-4 mx-auto py-16">
              <div className="flex flex-col gap-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tight">What People Say</h2>
                  <p className="text-muted-foreground mt-2">Testimonials from clients and colleagues</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {testimonials.map((testimonial) => (
                    <Card key={testimonial.id}>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          {testimonial.author_avatar_url ? (
                            <img
                              src={testimonial.author_avatar_url || "/placeholder.svg"}
                              alt={testimonial.author_name}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-xl font-semibold text-primary">
                                {testimonial.author_name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div>
                            <CardTitle className="text-base">{testimonial.author_name}</CardTitle>
                            <CardDescription className="text-sm">
                              {testimonial.author_role}{" "}
                              {testimonial.author_company && `at ${testimonial.author_company}`}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">{testimonial.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* Blog Preview */}
      {blogPosts && blogPosts.length > 0 && (
        <AnimatedSection delay={0.4}>
          <section className="container max-w-screen-xl px-4 mx-auto py-16">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Latest Posts</h2>
                  <p className="text-muted-foreground mt-2">Thoughts on development and technology</p>
                </div>
                <Button variant="ghost" asChild>
                  <Link href="/blog">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      {post.cover_image_url && (
                        <div className="aspect-video bg-muted relative overflow-hidden">
                          <img
                            src={post.cover_image_url || "/placeholder.svg"}
                            alt={post.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <time>{new Date(post.created_at).toLocaleDateString()}</time>
                          <span>•</span>
                          <span>{post.read_time} min read</span>
                        </div>
                        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-muted/50">
        <div className="container max-w-screen-xl px-4 mx-auto py-16">
          <div className="flex flex-col items-center text-center gap-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-2xl text-balance">
              Ready to bring your project to life?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl text-balance">
              Let's work together to create something amazing. Get in touch to discuss your ideas.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                Start a Conversation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
