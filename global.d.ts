interface Hacker {
  id: string
  name: string
  avatar?: string
  role: string
  skills: string[]
  bio: string
  experience?: string
  contact: {
    email?: string
    github?: string
    linkedin?: string
  }
} 