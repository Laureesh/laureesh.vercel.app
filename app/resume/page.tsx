import { createServerClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, MapPin, Phone, Mail, Linkedin, Github } from "lucide-react"
import { DownloadResumeButton } from "@/components/download-resume-button"

export const metadata = {
  title: "Resume - Laureesh Volmar",
  description: "View and download my resume.",
}

export default async function ResumePage() {
  const supabase = await createServerClient()

  const { data: currentResume } = await supabase.from("resume_versions").select("*").eq("is_current", true).single()

  return (
    <main className="min-h-screen py-20">
      <div className="container max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Resume</h1>
          <p className="text-xl text-muted-foreground text-pretty">View and download my latest resume</p>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <DownloadResumeButton />
            {currentResume && (
              <Button asChild size="lg" variant="outline">
                <a href={currentResume.file_url} download target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  Download from Database
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-6" id="resume-content">
          {/* Header */}
          <Card>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl">LAUREESH VOLMAR</CardTitle>
              <CardDescription className="text-base mt-2">
                Software Development Intern | Backend & Web Applications
              </CardDescription>
              <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Lawrenceville, Georgia
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  (678) 755-9200
                </span>
                <a href="mailto:laureesh1@gmail.com" className="flex items-center gap-1 hover:text-primary">
                  <Mail className="h-4 w-4" />
                  laureesh1@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/laureesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" />
                  linkedin.com/in/laureesh
                </a>
                <a
                  href="https://github.com/Laureesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                  github.com/Laureesh
                </a>
              </div>
            </CardHeader>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Motivated IT student specializing in backend and web development with strong skills in Java, MySQL, and
                cloud technologies. Experienced collaborating on Agile team projects and delivering secure, efficient
                applications using SDLC best practices.
              </p>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h3 className="font-semibold">Georgia Gwinnett College, School of Science & Technology</h3>
                    <p className="text-muted-foreground">
                      Bachelor of Science in Information Technology (Software Development)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">May 2027</p>
                    <p className="text-muted-foreground">GPA: 3.92/4.00</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Relevant Coursework:</span> Software Development, Web Development,
                    Cloud Computing, Data Structures, Object-Oriented Programming, Database Management, Computer
                    Networks
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold">Certified Medication Aide</h3>
                    <p className="text-muted-foreground">Northridge Health & Rehabilitation</p>
                  </div>
                  <p className="text-sm text-muted-foreground">July 2023 - March 2025</p>
                </div>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>
                    Administered 100+ daily medication doses with zero documentation errors, ensuring patient safety and
                    compliance.
                  </li>
                  <li>Collaborated with 5 healthcare professionals to improve daily workflow efficiency by 20%.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold">Fulfillment Center Warehouse Associate</h3>
                    <p className="text-muted-foreground">Amazon</p>
                  </div>
                  <p className="text-sm text-muted-foreground">June 2021 - August 2022</p>
                </div>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>
                    Processed 1,200+ customer orders weekly, exceeding daily productivity goals by 10% through accuracy
                    and workflow efficiency.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-start flex-wrap gap-2">
                <p className="text-muted-foreground">Certiport - Information Technology Specialist in Networking</p>
                <p className="text-sm text-muted-foreground">November 2024</p>
              </div>
            </CardContent>
          </Card>

          {/* Academic Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold">Text-Based Adventure Game</h3>
                    <p className="text-sm text-muted-foreground">MySQL, Java, VS Code</p>
                  </div>
                  <p className="text-sm text-muted-foreground">August 2025 - December 2025</p>
                </div>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>
                    Collaborated in a 4-person Agile team to develop a Java-based client simulation using MySQL for data
                    persistence.
                  </li>
                  <li>
                    Implemented functional requirements for navigation, inventory, combat, and database integration
                    through the SDLC process.
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold">Personal Portfolio Website</h3>
                    <p className="text-sm text-muted-foreground">HTML, CSS, JavaScript, GitHub Pages</p>
                  </div>
                  <p className="text-sm text-muted-foreground">March 2024 - June 2024</p>
                </div>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Built and deployed a responsive personal portfolio using HTML, CSS, and JavaScript.</li>
                  <li>
                    Integrated GitHub Pages hosting, custom form submission (Formspree), and SEO metadata for better
                    visibility.
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold">Network Security Simulation</h3>
                    <p className="text-sm text-muted-foreground">Cisco Packet Tracer</p>
                  </div>
                  <p className="text-sm text-muted-foreground">August 2024 - December 2024</p>
                </div>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>
                    Designed and simulated a secure multi-router business network using Cisco Packet Tracer, configuring
                    VLANs, ACLs, and firewalls to enhance security and segmentation.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">Programming:</span>
                  <span className="text-muted-foreground ml-2">Java, Python, JavaScript, PHP</span>
                </div>
                <div>
                  <span className="font-semibold">Web & Database:</span>
                  <span className="text-muted-foreground ml-2">HTML, CSS, React, MySQL</span>
                </div>
                <div>
                  <span className="font-semibold">Cloud & Tools:</span>
                  <span className="text-muted-foreground ml-2">AWS, GitHub Copilot, Gemini</span>
                </div>
                <div>
                  <span className="font-semibold">Methodologies:</span>
                  <span className="text-muted-foreground ml-2">Agile, SDLC, Automation Workflows</span>
                </div>
                <div>
                  <span className="font-semibold">IDEs:</span>
                  <span className="text-muted-foreground ml-2">VS Code, IntelliJ, Eclipse, WebStorm</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
