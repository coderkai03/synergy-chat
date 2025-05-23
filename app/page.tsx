"use client"

import { useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HackerCard } from "@/components/hacker-card"
import { Loader2, Send } from "lucide-react"
import hackers from "@/data/mockHackers.json"

type TeammateResponse = {
  userIds: string[]
  explanation: string
}

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: { hackers }
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Helper function to parse JSON response
  const parseTeammateResponse = (content: string): TeammateResponse | null => {
    try {
      return JSON.parse(content.trim())
    } catch {
      return null
    }
  }

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-50">
      <header className="border-b p-4 bg-white">
        <h1 className="text-2xl font-bold text-center">⚡ynergy</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <h2 className="text-xl font-semibold mb-2">Welcome to Hackathon Teammate Finder!</h2>
            <p className="max-w-md">
              Ask me to find teammates with specific skills, interests, or experience for your hackathon project.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
              <ExamplePrompt text="Find me a frontend developer with React experience" />
              <ExamplePrompt text="I need a UI/UX designer for my team" />
              <ExamplePrompt text="Looking for someone with AI/ML experience" />
              <ExamplePrompt text="Find teammates interested in healthcare tech" />
            </div>
          </div>
        ) : (
          messages.map((message) => {
            // For assistant messages, try to parse JSON response
            const responseData = message.role === "assistant" ? parseTeammateResponse(message.content) : null
            const suggestedHackers = responseData?.userIds.map(id => hackers.find(h => h.id === id)).filter(Boolean) || []

            return (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <Avatar className="h-8 w-8">
                    {message.role === "user" ? (
                      <>
                        <AvatarFallback>You</AvatarFallback>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      </>
                    ) : (
                      <>
                        <AvatarFallback>AI</AvatarFallback>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      </>
                    )}
                  </Avatar>
                  <div>
                    <div
                      className={`rounded-lg p-4 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {/* Display explanation for JSON responses, full content for user messages or failed parsing */}
                      {responseData ? responseData.explanation : message.content}
                    </div>

                    {/* Render hacker cards for suggested teammates */}
                    {message.role === "assistant" && suggestedHackers.length > 0 && (
                      <div className="mt-3 space-y-3">
                        {suggestedHackers.map((hacker) => (
                          <HackerCard key={hacker?.id} hacker={hacker as Hacker} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-white">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about finding teammates..."
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </div>
  )
}

// Helper component for example prompts
function ExamplePrompt({ text }: { text: string }) {
  const { setInput } = useChat()

  return (
    <Button
      variant="outline"
      className="justify-start h-auto py-2 px-3 text-left text-sm"
      onClick={() => setInput(text)}
    >
      {text}
    </Button>
  )
}
