import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { outfit } = await req.json()

    if (!outfit || !outfit.top || !outfit.bottom || !outfit.shoes || !outfit.accessory) {
      return NextResponse.json({ error: "Missing outfit information" }, { status: 400 })
    }

    const prompt = `
      I've put together an outfit with the following items:
      - Top: ${outfit.top}
      - Bottom: ${outfit.bottom}
      - Shoes: ${outfit.shoes}
      - Accessory: ${outfit.accessory}

      Please provide a fun, enthusiastic, and detailed fashion critique of this outfit. 
      Include comments on the style, color coordination, and occasions where this outfit would be appropriate.
      Also provide one specific suggestion to enhance this outfit.
      Keep your response under 150 words and make it sound like a Y2K-era fashion magazine.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.7,
      maxTokens: 300,
    })

    return NextResponse.json({ feedback: text })
  } catch (error) {
    console.error("Error generating outfit feedback:", error)
    return NextResponse.json({ error: "Failed to generate outfit feedback" }, { status: 500 })
  }
}
