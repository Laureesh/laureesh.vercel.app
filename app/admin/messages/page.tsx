import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { MessageActions } from "@/components/message-actions"
import { Mail } from "lucide-react"

export default async function AdminMessagesPage() {
  const supabase = await createClient()

  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div>
      <AdminHeader title="Messages" description="View and manage contact form submissions" />

      {messages && messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{message.name}</h3>
                        {!message.read && <Badge variant="default">New</Badge>}
                        {message.replied && <Badge variant="secondary">Replied</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                      {message.subject && <p className="text-sm font-medium mt-1">Subject: {message.subject}</p>}
                    </div>
                    <MessageActions messageId={message.id} isRead={message.read} />
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.message}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Received: {new Date(message.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12">
          <div className="flex flex-col items-center text-center gap-4">
            <Mail className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-xl font-semibold mb-2">No Messages</h3>
              <p className="text-muted-foreground">Contact form submissions will appear here.</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
