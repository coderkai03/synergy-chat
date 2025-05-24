import { useState } from 'react'

interface UserCredentials {
  github: string
  linkedin: string
  discord: string
}

interface UseLoginReturn {
  isLoading: boolean
  error: string | null
  addUser: (credentials: UserCredentials) => Promise<boolean>
}

export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addUser = async (credentials: UserCredentials): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/user/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add user')
      }

      const result = await response.json()
      return result.success
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      setError(errorMessage)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, addUser }
} 