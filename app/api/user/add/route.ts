import { NextRequest, NextResponse } from 'next/server'

interface UserCredentials {
  github: string
  linkedin: string
  discord: string
}

export async function POST(req: NextRequest) {
  try {
    const credentials: UserCredentials = await req.json()

    // Validate that at least one credential is provided
    if (!credentials.github?.trim() && !credentials.linkedin?.trim() && !credentials.discord?.trim()) {
      return NextResponse.json(
        { error: 'At least one credential is required' },
        { status: 400 }
      )
    }

    // Here you would typically save to a database
    // For now, we'll just log the user data and return success
    console.log('Adding user with credentials:', {
      github: credentials.github || null,
      linkedin: credentials.linkedin || null,
      discord: credentials.discord || null,
    })

    // TODO: Add database integration here
    // Example:
    // await db.users.create({
    //   data: {
    //     githubUsername: credentials.github || null,
    //     linkedinUsername: credentials.linkedin || null,
    //     discordUsername: credentials.discord || null,
    //     createdAt: new Date(),
    //   }
    // })

    return NextResponse.json(
      { 
        success: true, 
        message: 'User added successfully',
        credentials: {
          github: credentials.github || null,
          linkedin: credentials.linkedin || null,
          discord: credentials.discord || null,
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error adding user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 