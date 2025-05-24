"use client"

// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Github } from "lucide-react"
import { SynergyLogo } from "@/lib/synergy-logo"
import Link from "next/link"

// interface HeaderProps {
//   isLoggedIn: boolean
//   currentUser: string | null
//   onSignIn: () => void
// }

export function Header() {
  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 -space-x-3 hover:opacity-80 transition-opacity">
            <SynergyLogo size="md" />
            <h1 className="text-2xl font-bold">ynergy</h1>
          </Link>
          
          {/* {isLoggedIn ? (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-xs">{currentUser?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{currentUser}</span>
              </div>
              <Button onClick={() => window.location.href = '/chat'} size="sm">
                Go to Chat
              </Button>
            </div>
          ) : (
            <Button onClick={onSignIn} variant="outline" size="sm">
              <Github className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          )} */}
        </div>
      </div>
    </header>
  )
} 