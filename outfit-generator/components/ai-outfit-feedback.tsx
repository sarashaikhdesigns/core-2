"use client"

import { RefreshCw, Sparkles } from "lucide-react"

interface AIOutfitFeedbackProps {
  feedback: string
  isLoading: boolean
  onRefresh: () => void
}

export default function AIOutfitFeedback({ feedback, isLoading, onRefresh }: AIOutfitFeedbackProps) {
  return (
    <div className="border-4 border-[#9966cc] rounded-lg p-6 bg-[rgba(0,0,51,0.7)] shadow-[0_0_10px_rgba(255,102,255,0.7),_0_0_0_4px_#cc33ff,_0_0_20px_rgba(255,102,255,0.5)] relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2760%27%20height%3D%2760%27%20viewBox%3D%270%200%2060%2060%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20fill%3D%27none%27%20fill-rule%3D%27evenodd%27%3E%3Cg%20fill%3D%27%23cc66ff%27%20fill-opacity%3D%270.1%27%3E%3Cpath%20d%3D%27M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%27%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] bg-[rgba(153,51,255,0.05)] z-[-1] rounded-md"></div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-xl font-['Press_Start_2P'] text-[#ff66c4]">
          <Sparkles className="h-5 w-5 text-[#ffff00]" />
          AI FASHION ADVICE
        </h2>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center gap-1 px-3 py-2 bg-[#33ccff] text-white text-xs border-2 border-[#9966cc] rounded hover:bg-[#cc66ff] disabled:opacity-50"
        >
          <RefreshCw className="h-3 w-3" />
          Refresh
        </button>
      </div>

      <div className="min-h-[100px] text-white">
        {isLoading ? (
          <div className="flex items-center justify-center h-[100px]">
            <div className="animate-spin h-8 w-8 border-4 border-[#ff66c4] border-t-transparent rounded-full"></div>
          </div>
        ) : feedback ? (
          <div className="bg-[rgba(0,0,51,0.5)] p-4 border-2 border-[#9966cc] rounded-lg">
            {feedback.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-2 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[100px] text-[#33ccff]">
            Generate an outfit to get AI feedback!
          </div>
        )}
      </div>
    </div>
  )
}
