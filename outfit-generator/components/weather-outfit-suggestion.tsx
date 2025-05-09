"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, CloudRain, Sun, Snowflake, Wind, Loader2 } from "lucide-react"

interface WeatherData {
  location: {
    name: string
    region: string
    country: string
  }
  current: {
    temp_c: number
    condition: {
      text: string
      icon: string
    }
    wind_kph: number
    precip_mm: number
    humidity: number
    feelslike_c: number
  }
}

interface OutfitSuggestion {
  top: string
  bottom: string
  shoes: string
  accessory: string
  icon: React.ReactNode
}

interface WeatherOutfitSuggestionProps {
  apiKey: string
}

export default function WeatherOutfitSuggestion({ apiKey }: WeatherOutfitSuggestionProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState<string>("")

  useEffect(() => {
    // Get user's location if possible
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          await fetchWeatherData(`${latitude},${longitude}`)
        },
        (error) => {
          console.error("Geolocation error:", error)
          // Fallback to a default location
          fetchWeatherData("London")
        },
      )
    } else {
      // Fallback for browsers without geolocation
      fetchWeatherData("London")
    }
  }, [apiKey])

  const fetchWeatherData = async (query: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=no`)

      if (!response.ok) {
        throw new Error("Failed to fetch weather data")
      }

      const data = await response.json()
      setWeatherData(data)
      setLocation(query)
    } catch (err) {
      console.error("Weather API error:", err)
      setError("Failed to load weather data. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (location.trim()) {
      fetchWeatherData(location)
    }
  }

  const getOutfitSuggestion = (): OutfitSuggestion => {
    if (!weatherData) {
      return {
        top: "Loading...",
        bottom: "Loading...",
        shoes: "Loading...",
        accessory: "Loading...",
        icon: <Loader2 className="h-8 w-8 animate-spin text-[#33ccff]" />,
      }
    }

    const temp = weatherData.current.temp_c
    const condition = weatherData.current.condition.text.toLowerCase()
    const isRaining = condition.includes("rain") || condition.includes("drizzle")
    const isSnowing = condition.includes("snow") || condition.includes("blizzard")
    const isSunny = condition.includes("sunny") || condition.includes("clear")
    const isWindy = weatherData.current.wind_kph > 20

    // Cold weather (below 10°C)
    if (temp < 10) {
      return {
        top: isSnowing ? "Thick Winter Jacket" : "Warm Sweater",
        bottom: "Thermal Pants",
        shoes: "Winter Boots",
        accessory: "Beanie and Gloves",
        icon: isSnowing ? (
          <Snowflake className="h-8 w-8 text-[#33ccff]" />
        ) : (
          <Wind className="h-8 w-8 text-[#9966cc]" />
        ),
      }
    }
    // Cool weather (10-18°C)
    else if (temp < 18) {
      return {
        top: isRaining ? "Waterproof Jacket" : "Light Sweater",
        bottom: "Jeans",
        shoes: isRaining ? "Waterproof Boots" : "Sneakers",
        accessory: isRaining ? "Umbrella" : "Scarf",
        icon: isRaining ? (
          <CloudRain className="h-8 w-8 text-[#33ccff]" />
        ) : (
          <Cloud className="h-8 w-8 text-[#9966cc]" />
        ),
      }
    }
    // Warm weather (18-25°C)
    else if (temp < 25) {
      return {
        top: "T-Shirt",
        bottom: isWindy ? "Jeans" : "Shorts or Skirt",
        shoes: "Sneakers or Sandals",
        accessory: isSunny ? "Sunglasses" : "Light Scarf",
        icon: isSunny ? <Sun className="h-8 w-8 text-[#ffff00]" /> : <Cloud className="h-8 w-8 text-[#9966cc]" />,
      }
    }
    // Hot weather (above 25°C)
    else {
      return {
        top: "Light T-Shirt",
        bottom: "Shorts or Light Skirt",
        shoes: "Sandals",
        accessory: "Sunglasses and Hat",
        icon: <Sun className="h-8 w-8 text-[#ffff00]" />,
      }
    }
  }

  const suggestion = getOutfitSuggestion()

  return (
    <Card className="mb-8 border-[3px] border-[#9966cc] bg-[rgba(0,0,51,0.7)] shadow-[0_0_10px_rgba(255,102,255,0.7)]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[#ff66c4] text-xl font-['Press_Start_2P']">Weather-Based Outfit</CardTitle>
        <form onSubmit={handleLocationSearch} className="flex gap-2">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City or Zip"
            className="px-2 py-1 text-sm bg-[rgba(0,0,51,0.5)] border-[2px] border-[#9966cc] rounded text-white"
          />
          <button
            type="submit"
            className="px-2 py-1 text-sm bg-[#33ccff] hover:bg-[#cc66ff] border-[2px] border-[#9966cc] rounded text-white"
          >
            Search
          </button>
        </form>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-[#33ccff]" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : weatherData ? (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 border-[2px] border-[#9966cc] rounded-lg bg-[rgba(0,0,51,0.5)]">
              <div className="flex flex-col items-center">
                {suggestion.icon}
                <img
                  src={`https:${weatherData.current.condition.icon}`}
                  alt={weatherData.current.condition.text}
                  width={64}
                  height={64}
                />
              </div>
              <div>
                <h3 className="text-[#ffff00] font-['Press_Start_2P'] text-sm">
                  {weatherData.location.name}, {weatherData.location.country}
                </h3>
                <p className="text-[#33ccff] text-xl font-bold">{weatherData.current.temp_c}°C</p>
                <p className="text-white text-sm">Feels like: {weatherData.current.feelslike_c}°C</p>
                <p className="text-white text-sm">{weatherData.current.condition.text}</p>
              </div>
            </div>
            <div className="p-4 border-[2px] border-[#9966cc] rounded-lg bg-[rgba(0,0,51,0.5)]">
              <h3 className="text-[#ffff00] font-['Press_Start_2P'] text-sm mb-2">Recommended Outfit</h3>
              <ul className="space-y-1 text-white">
                <li>
                  <span className="text-[#66ff99] font-bold">Top:</span> {suggestion.top}
                </li>
                <li>
                  <span className="text-[#66ff99] font-bold">Bottom:</span> {suggestion.bottom}
                </li>
                <li>
                  <span className="text-[#66ff99] font-bold">Shoes:</span> {suggestion.shoes}
                </li>
                <li>
                  <span className="text-[#66ff99] font-bold">Accessory:</span> {suggestion.accessory}
                </li>
              </ul>
              <button
                className="mt-4 w-full py-2 bg-[#ff66c4] hover:bg-[#cc66ff] border-[2px] border-[#9966cc] rounded text-white font-['Press_Start_2P'] text-xs"
                onClick={() => {
                  // This would ideally connect to your existing outfit generator
                  // For now, we'll just scroll to it
                  document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Apply Suggestion
              </button>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
