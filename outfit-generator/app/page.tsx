import OutfitGenerator from "@/components/outfit-generator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Outfit Generator",
  description: "Generate outfits with AI-powered suggestions and commentary",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <OutfitGenerator />
    </div>
  )
}
