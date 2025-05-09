"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ApiKeySetupProps {
  onApiKeySaved: (apiKey: string) => void
}

export default function ApiKeySetup({ onApiKeySaved }: ApiKeySetupProps) {
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      setError("Please enter a valid API key")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Test the API key with a simple request
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London&aqi=no`)

      if (!response.ok) {
        throw new Error("Invalid API key or API request failed")
      }

      // If successful, save the API key to localStorage
      localStorage.setItem("weatherApiKey", apiKey)
      onApiKeySaved(apiKey)
    } catch (err) {
      setError("Failed to validate API key. Please check and try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto border-[3px] border-[#9966cc] bg-[rgba(0,0,51,0.7)] shadow-[0_0_10px_rgba(255,102,255,0.7)]">
      <CardHeader>
        <CardTitle className="text-[#ff66c4] text-2xl font-bold text-center font-['Press_Start_2P']">
          Weather API Setup
        </CardTitle>
        <CardDescription className="text-[#33ccff] text-center">
          Enhance your outfit generator with weather-based recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-[#ffff00]">
              Get your free API key from{" "}
              <a
                href="https://www.weatherapi.com/signup.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#66ff99] underline"
              >
                WeatherAPI.com
              </a>
            </p>
            <Input
              type="text"
              placeholder="Enter your Weather API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-[rgba(0,0,51,0.5)] border-[#9966cc] text-white"
            />
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSaveApiKey}
          disabled={isLoading}
          className="w-full bg-[#33ccff] hover:bg-[#cc66ff] border-[3px] border-[#9966cc] font-['Press_Start_2P'] text-xs"
        >
          {isLoading ? "Validating..." : "Save API Key"}
        </Button>
      </CardFooter>
    </Card>
  )
}
