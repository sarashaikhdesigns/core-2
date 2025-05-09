import { NextResponse } from "next/server"

// This would be expanded with more sophisticated logic in a real application
const getOutfitSuggestions = (weatherCondition: string, temperature: number) => {
  // Cold weather (below 10°C)
  if (temperature < 10) {
    return {
      tops: ["Winter Jacket", "Thick Sweater", "Thermal Shirt"],
      bottoms: ["Thermal Pants", "Wool Pants", "Heavy Jeans"],
      shoes: ["Winter Boots", "Insulated Shoes", "Waterproof Boots"],
      accessories: ["Beanie", "Gloves", "Scarf"],
    }
  }
  // Cool weather (10-18°C)
  else if (temperature < 18) {
    return {
      tops: ["Light Sweater", "Long Sleeve Shirt", "Light Jacket"],
      bottoms: ["Jeans", "Chinos", "Casual Pants"],
      shoes: ["Sneakers", "Casual Shoes", "Loafers"],
      accessories: ["Light Scarf", "Watch", "Beanie"],
    }
  }
  // Warm weather (18-25°C)
  else if (temperature < 25) {
    return {
      tops: ["T-Shirt", "Polo Shirt", "Short Sleeve Button-Up"],
      bottoms: ["Shorts", "Light Jeans", "Casual Pants"],
      shoes: ["Sneakers", "Loafers", "Casual Sandals"],
      accessories: ["Sunglasses", "Watch", "Cap"],
    }
  }
  // Hot weather (above 25°C)
  else {
    return {
      tops: ["Light T-Shirt", "Tank Top", "Linen Shirt"],
      bottoms: ["Shorts", "Light Skirt", "Linen Pants"],
      shoes: ["Sandals", "Flip Flops", "Light Sneakers"],
      accessories: ["Sunglasses", "Hat", "Minimal Jewelry"],
    }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const weatherCondition = searchParams.get("condition") || "clear"
  const temperature = Number.parseFloat(searchParams.get("temp") || "20")

  const suggestions = getOutfitSuggestions(weatherCondition, temperature)

  return NextResponse.json({
    success: true,
    data: suggestions,
  })
}
