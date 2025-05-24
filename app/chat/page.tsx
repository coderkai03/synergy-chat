"use client"

import { useRef, useEffect, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HackerCard } from "@/components/hacker-card"
import { LoginModal } from "@/components/login-modal"
import { Loader2, Send, LogOut, User } from "lucide-react"
import hackers from "@/data/mockHackers.json"

type TeammateResponse = {
  userIds: string[]
  explanation: string
}

export default function ChatPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: { hackers }
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Check login status on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("github_username")
    if (savedUser) {
      setIsLoggedIn(true)
      setCurrentUser(savedUser)
    }
  }, [])

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

  const handleLogin = (username: string) => {
    setCurrentUser(username)
    setIsLoggedIn(true)
    localStorage.setItem("github_username", username)
    setShowLoginModal(false)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("github_username")
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }
    
    handleSubmit(e)
  }

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-50">
      <header className="border-b p-4 bg-white">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">⚡ynergy</h1>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{currentUser}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setShowLoginModal(true)}>
              <User className="h-4 w-4" />
              Login
            </Button>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <h2 className="text-xl font-semibold mb-2">Welcome to Hackathon Teammate Finder!</h2>
            <p className="max-w-md">
              Ask me to find teammates with specific skills, interests, or experience for your hackathon project.
            </p>
            {!isLoggedIn && (
              <p className="text-sm text-orange-600 mt-2">
                You&apos;ll need to login with your GitHub username to start chatting.
              </p>
            )}
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
        <form onSubmit={handleFormSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder={
              isLoggedIn 
                ? "Ask about finding teammates..." 
                : "Login to start chatting..."
            }
            className="flex-1"
            disabled={!isLoggedIn}
          />
          <Button type="submit" disabled={isLoading || (!isLoggedIn && !input.trim())}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>

      <LoginModal 
        isOpen={showLoginModal}
        onLogin={handleLogin}
        onClose={() => setShowLoginModal(false)}
      />
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
