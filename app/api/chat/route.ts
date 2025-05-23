import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

type Hacker = {
  id: string
  name: string
  role: string
  skills: string[]
}

export async function POST(req: Request) {
  const { messages, hackers } = await req.json()

  // Create a system prompt for JSON output
  const systemPrompt = `
    You are a helpful hackathon teammate finder assistant. Your job is to help students find teammates for hackathons.
    
    When users ask about finding teammates with specific skills, interests, or for specific roles, you must respond with valid JSON in exactly this format:
    
    {
      "explanation": "Your friendly explanation of why you're suggesting these teammates",
      "userIds": ["hacker-id-1", "hacker-id-2"]
    }
    
    Here's our current database of available hackers:
    ${(hackers as Hacker[]).map((hacker) => `ID ${hacker.id}: ${hacker.name} - ${hacker.role} - Skills: ${hacker.skills.join(", ")}`).join("\n")}
    
    Only include hacker IDs that match the user's request. If there are no matches, return an empty array for userIds but still provide a helpful explanation.
    
    IMPORTANT: Your response must be valid JSON only, no other text before or after.
  `

  try {
    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in streamText:", error)
    return Response.json({ error: "Failed to generate suggestions" }, { status: 500 })
  }
}
