import { ContactForm } from "@/components/contact-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

export const metadata = {
  title: "Contact - Laureesh Volmar",
  description: "Get in touch with Laureesh Volmar for project inquiries, collaborations, or just to say hello.",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container max-w-screen-xl px-4 mx-auto py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Get in Touch</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Have a project in mind or want to collaborate? I'd love to hear from you. Fill out the form below or reach
            out through any of the contact methods.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container max-w-screen-xl px-4 mx-auto pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Mail className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Email</CardTitle>
                <CardDescription>Send me an email anytime</CardDescription>
              </CardHeader>
              <CardContent>
                <a href="mailto:contact@laureeshvolmar.com" className="text-primary hover:underline">
                  contact@laureeshvolmar.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MapPin className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Location</CardTitle>
                <CardDescription>Based in Georgia, USA</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Available for remote work and local opportunities</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Phone className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Response Time</CardTitle>
                <CardDescription>Typically within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">I strive to respond to all inquiries promptly</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
