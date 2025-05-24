interface Hacker {
  id: string
  name: string
  avatar?: string
  role: string
  skills: string[]
  bio: string
  experience?: string
  contact: {
    discord?: string
    github?: string
    linkedin?: string
  }
}

interface UserCredentials {
  github: string
  linkedin: string
  discord: string
}

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  credentials: UserCredentials
}