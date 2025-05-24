"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Linkedin, MessageCircle } from "lucide-react"

interface UserCredentials {
  github: string
  linkedin: string
  discord: string
}

interface LoginModalProps {
  isOpen: boolean
  onLogin: (credentials: UserCredentials) => void
  onClose: () => void
}

export function LoginModal({ isOpen, onLogin, onClose }: LoginModalProps) {
  const [credentials, setCredentials] = useState<UserCredentials>({
    github: "",
    linkedin: "",
    discord: ""
  })
  const [isValidating, setIsValidating] = useState(false)
  const [errors, setErrors] = useState<Partial<UserCredentials>>({})

  const validateGitHubUsername = (username: string): boolean => {
    // GitHub username validation rules:
    // - Only alphanumeric characters and hyphens
    // - Cannot start or end with hyphen
    // - Cannot have consecutive hyphens
    // - 1-39 characters long
    const githubUsernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9]|-(?!-))*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/
    return githubUsernameRegex.test(username) && username.length >= 1 && username.length <= 39
  }

  const validateLinkedInUsername = (username: string): boolean => {
    // LinkedIn username validation rules:
    // - 3-100 characters
    // - Letters, numbers, and hyphens only
    // - Cannot start or end with hyphen
    const linkedinUsernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,98}[a-zA-Z0-9]$|^[a-zA-Z0-9]{3}$/
    return linkedinUsernameRegex.test(username) && username.length >= 3 && username.length <= 100
  }

  const validateDiscordUsername = (username: string): boolean => {
    // Discord username validation rules (new format):
    // - 2-32 characters
    // - Letters, numbers, periods, and underscores
    // - Cannot have consecutive periods
    // - Cannot start or end with period or underscore
    const discordUsernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._](?!\.\.)){0,30}[a-zA-Z0-9]$|^[a-zA-Z0-9]{2}$/
    return discordUsernameRegex.test(username) && username.length >= 2 && username.length <= 32
  }

  const checkGitHubUserExists = async (username: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`)
      return response.status === 200
    } catch {
      return false
    }
  }

  const handleInputChange = (platform: keyof UserCredentials, value: string) => {
    setCredentials(prev => ({ ...prev, [platform]: value }))
    // Clear error for this field when user starts typing
    if (errors[platform]) {
      setErrors(prev => ({ ...prev, [platform]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<UserCredentials> = {}

    // At least one username is required
    if (!credentials.github.trim() && !credentials.linkedin.trim() && !credentials.discord.trim()) {
      newErrors.github = "Please provide at least one username"
    }

    // Validate each provided username
    if (credentials.github.trim() && !validateGitHubUsername(credentials.github)) {
      newErrors.github = "Invalid GitHub username format"
    }

    if (credentials.linkedin.trim() && !validateLinkedInUsername(credentials.linkedin)) {
      newErrors.linkedin = "Invalid LinkedIn username format"
    }

    if (credentials.discord.trim() && !validateDiscordUsername(credentials.discord)) {
      newErrors.discord = "Invalid Discord username format"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (!validateForm()) {
      return
    }

    setIsValidating(true)

    // Only validate GitHub existence since LinkedIn and Discord don't have public APIs for this
    if (credentials.github.trim()) {
      const userExists = await checkGitHubUserExists(credentials.github)
      if (!userExists) {
        setErrors({ github: "GitHub user not found. Please check the username." })
        setIsValidating(false)
        return
      }
    }

    setIsValidating(false)

    onLogin(credentials)
    setCredentials({ github: "", linkedin: "", discord: "" })
    setErrors({})
  }

  const handleClose = () => {
    setCredentials({ github: "", linkedin: "", discord: "" })
    setErrors({})
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Github className="h-5 w-5" />
              <Linkedin className="h-5 w-5" />
              <MessageCircle className="h-5 w-5" />
            </div>
            Connect Your Accounts
          </DialogTitle>
          <DialogDescription>
            Enter your usernames for any of the platforms below. At least one is required.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="github" className="flex items-center gap-2 text-sm font-medium">
                <Github className="h-4 w-4" />
                GitHub Username
              </Label>
              <Input
                id="github"
                placeholder="github-username"
                value={credentials.github}
                onChange={(e) => handleInputChange("github", e.target.value)}
                disabled={isValidating}
                className={errors.github ? "border-red-500" : ""}
              />
              {errors.github && <p className="text-sm text-red-500 mt-1">{errors.github}</p>}
            </div>

            <div>
              <Label htmlFor="linkedin" className="flex items-center gap-2 text-sm font-medium">
                <Linkedin className="h-4 w-4" />
                LinkedIn Username
              </Label>
              <Input
                id="linkedin"
                placeholder="linkedin-username"
                value={credentials.linkedin}
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
                disabled={isValidating}
                className={errors.linkedin ? "border-red-500" : ""}
              />
              {errors.linkedin && <p className="text-sm text-red-500 mt-1">{errors.linkedin}</p>}
            </div>

            <div>
              <Label htmlFor="discord" className="flex items-center gap-2 text-sm font-medium">
                <MessageCircle className="h-4 w-4" />
                Discord Username
              </Label>
              <Input
                id="discord"
                placeholder="discord.username"
                value={credentials.discord}
                onChange={(e) => handleInputChange("discord", e.target.value)}
                disabled={isValidating}
                className={errors.discord ? "border-red-500" : ""}
              />
              {errors.discord && <p className="text-sm text-red-500 mt-1">{errors.discord}</p>}
            </div>
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isValidating}>
              {isValidating ? "Validating..." : "Connect"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 