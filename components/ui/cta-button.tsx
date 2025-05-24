"use client"

import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

interface CTAButtonProps {
  onClick: (credentials: UserCredentials) => void
  children: React.ReactNode
  icon?: LucideIcon
  variant?: "default" | "outline"
}

export function CTAButton({ 
  children, 
  icon: Icon, 
  variant = "default",
}: CTAButtonProps) {
  return (
    <Button 
      size="lg" 
      variant={variant}
      className={`px-10 py-4 text-lg`}
    >
      {Icon && <Icon className="h-6 w-6 mr-3" />}
      {children}
    </Button>
  )
} 