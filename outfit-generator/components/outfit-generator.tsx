"use client"

import { useState, useEffect, useRef } from "react"
import { RefreshCw, Save, Upload } from "lucide-react"
import AIOutfitFeedback from "./ai-outfit-feedback"

// Sample clothing items with colors (from your original script)
const clothingItems = {
  tops: [
    { id: 1, name: "White T-Shirt", color: "#ffffff", textColor: "#000000" },
    { id: 2, name: "Black Sweater", color: "#1f2937", textColor: "#ffffff" },
    { id: 3, name: "Blue Button-Up", color: "#3b82f6", textColor: "#ffffff" },
    { id: 4, name: "Red Polo", color: "#ef4444", textColor: "#ffffff" },
    { id: 5, name: "Green Hoodie", color: "#10b981", textColor: "#ffffff" },
  ],
  bottoms: [
    { id: 1, name: "Blue Jeans", color: "#1d4ed8", textColor: "#ffffff" },
    { id: 2, name: "Black Pants", color: "#111827", textColor: "#ffffff" },
    { id: 3, name: "Khaki Chinos", color: "#92400e", textColor: "#ffffff" },
    { id: 4, name: "Gray Shorts", color: "#9ca3af", textColor: "#000000" },
    { id: 5, name: "Navy Skirt", color: "#1e3a8a", textColor: "#ffffff" },
  ],
  shoes: [
    { id: 1, name: "White Sneakers", color: "#f9fafb", textColor: "#000000" },
    { id: 2, name: "Black Boots", color: "#1f2937", textColor: "#ffffff" },
    { id: 3, name: "Brown Loafers", color: "#92400e", textColor: "#ffffff" },
    { id: 4, name: "Red Heels", color: "#dc2626", textColor: "#ffffff" },
    { id: 5, name: "Blue Sandals", color: "#60a5fa", textColor: "#000000" },
  ],
  accessories: [
    { id: 1, name: "Silver Watch", color: "#d1d5db", textColor: "#000000" },
    { id: 2, name: "Gold Necklace", color: "#f59e0b", textColor: "#000000" },
    { id: 3, name: "Black Belt", color: "#111827", textColor: "#ffffff" },
    { id: 4, name: "Red Scarf", color: "#ef4444", textColor: "#ffffff" },
    { id: 5, name: "Blue Hat", color: "#3b82f6", textColor: "#ffffff" },
  ],
}

export default function OutfitGenerator() {
  // State for current outfit
  const [currentOutfit, setCurrentOutfit] = useState({
    top: null,
    bottom: null,
    shoes: null,
    accessory: null,
  })

  // State for saved outfits
  const [savedOutfits, setSavedOutfits] = useState([])

  // State for custom items
  const [customItems, setCustomItems] = useState({
    tops: [],
    bottoms: [],
    shoes: [],
    accessories: [],
  })

  // State for active tab
  const [activeTab, setActiveTab] = useState("generator")

  // State for AI feedback
  const [aiFeedback, setAiFeedback] = useState("")
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false)

  // Refs for file inputs
  const fileInputRefs = {
    tops: useRef(null),
    bottoms: useRef(null),
    shoes: useRef(null),
    accessories: useRef(null),
  }

  // Initialize on component mount
  useEffect(() => {
    // Load saved outfits from localStorage
    const savedOutfitsFromStorage = localStorage.getItem("savedOutfits")
    if (savedOutfitsFromStorage) {
      setSavedOutfits(JSON.parse(savedOutfitsFromStorage))
    }

    // Load custom items from localStorage
    const customItemsFromStorage = localStorage.getItem("customItems")
    if (customItemsFromStorage) {
      setCustomItems(JSON.parse(customItemsFromStorage))
    }

    // Generate initial outfit
    randomizeOutfit()
  }, [])

  // Save outfits to localStorage when they change
  useEffect(() => {
    localStorage.setItem("savedOutfits", JSON.stringify(savedOutfits))
  }, [savedOutfits])

  // Save custom items to localStorage when they change
  useEffect(() => {
    localStorage.setItem("customItems", JSON.stringify(customItems))
  }, [customItems])

  // Get AI feedback when outfit changes
  useEffect(() => {
    if (currentOutfit.top && currentOutfit.bottom && currentOutfit.shoes && currentOutfit.accessory) {
      getAIFeedback()
    }
  }, [currentOutfit])

  // Get a random item from a category
  const getRandomItem = (category) => {
    // Combine default and custom items
    const allItems = [...clothingItems[category], ...customItems[category]]
    return allItems[Math.floor(Math.random() * allItems.length)]
  }

  // Randomize the entire outfit
  const randomizeOutfit = () => {
    setCurrentOutfit({
      top: getRandomItem("tops"),
      bottom: getRandomItem("bottoms"),
      shoes: getRandomItem("shoes"),
      accessory: getRandomItem("accessories"),
    })
  }

  // Randomize a specific item
  const randomizeItem = (category) => {
    const categoryMap = {
      tops: "top",
      bottoms: "bottom",
      shoes: "shoes",
      accessories: "accessory",
    }

    const key = categoryMap[category]
    setCurrentOutfit((prev) => ({
      ...prev,
      [key]: getRandomItem(category),
    }))
  }

  // Handle file upload
  const handleFileUpload = (category, event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const newItem = {
        id: Date.now(),
        name: file.name.split(".")[0],
        imageUrl: e.target.result,
        isCustom: true,
      }

      // Add to custom items
      setCustomItems((prev) => ({
        ...prev,
        [category]: [...prev[category], newItem],
      }))

      // Update current outfit with the new item
      const categoryMap = {
        tops: "top",
        bottoms: "bottom",
        shoes: "shoes",
        accessories: "accessory",
      }

      const key = categoryMap[category]
      setCurrentOutfit((prev) => ({
        ...prev,
        [key]: newItem,
      }))
    }
    reader.readAsDataURL(file)
  }

  // Save the current outfit
  const saveOutfit = () => {
    setSavedOutfits((prev) => [...prev, { ...currentOutfit }])
  }

  // Delete a saved outfit
  const deleteOutfit = (index) => {
    setSavedOutfits((prev) => prev.filter((_, i) => i !== index))
  }

  // Use a saved outfit
  const useOutfit = (index) => {
    const outfitToUse = savedOutfits[index]
    setCurrentOutfit({ ...outfitToUse })
    setActiveTab("generator")
  }

  // Get AI feedback for the current outfit
  const getAIFeedback = async () => {
    if (!currentOutfit.top || !currentOutfit.bottom || !currentOutfit.shoes || !currentOutfit.accessory) {
      return
    }

    setIsLoadingFeedback(true)

    try {
      const response = await fetch("/api/outfit-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          outfit: {
            top: currentOutfit.top.name,
            bottom: currentOutfit.bottom.name,
            shoes: currentOutfit.shoes.name,
            accessory: currentOutfit.accessory.name,
          },
        }),
      })

      const data = await response.json()
      setAiFeedback(data.feedback)
    } catch (error) {
      console.error("Error getting AI feedback:", error)
      setAiFeedback("Couldn't get AI feedback at this time. Try again later!")
    } finally {
      setIsLoadingFeedback(false)
    }
  }

  // Trigger file input click
  const triggerFileInput = (category) => {
    fileInputRefs[category].current.click()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2 text-[#ff66c4] font-['Press_Start_2P'] text-shadow-[3px_3px_0_#cc66ff,_-3px_-3px_0_#33ccff]">
          WARDROBE
        </h1>
        <div className="inline-block px-4 py-1 mb-6 text-xl text-[#ffff00] font-['Press_Start_2P'] bg-[rgba(0,0,51,0.7)] border-2 border-[#9966cc] rounded">
          DRESS TO IMPRESS!
        </div>

        <div className="flex justify-center gap-2 p-2 mb-6 bg-[rgba(0,0,51,0.5)] border-2 border-[#9966cc] rounded-lg">
          <button
            className={`px-6 py-3 text-sm font-['Press_Start_2P'] border-2 border-[#9966cc] rounded ${
              activeTab === "generator"
                ? "bg-[#cc66ff] text-white shadow-[0_0_10px_rgba(204,102,255,0.7)]"
                : "bg-[rgba(0,0,51,0.7)] text-[#33ccff]"
            }`}
            onClick={() => setActiveTab("generator")}
          >
            GENERATOR
          </button>
          <button
            className={`px-6 py-3 text-sm font-['Press_Start_2P'] border-2 border-[#9966cc] rounded ${
              activeTab === "saved"
                ? "bg-[#cc66ff] text-white shadow-[0_0_10px_rgba(204,102,255,0.7)]"
                : "bg-[rgba(0,0,51,0.7)] text-[#33ccff]"
            }`}
            onClick={() => setActiveTab("saved")}
          >
            SAVED OUTFITS ({savedOutfits.length})
          </button>
        </div>
      </header>

      <main>
        {activeTab === "generator" ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Top */}
              <div className="bg-[rgba(0,0,51,0.7)] border-3 border-[#9966cc] rounded-lg overflow-hidden shadow-[0_0_10px_rgba(153,51,255,0.3)]">
                <div className="flex justify-between items-center p-3 border-b-2 border-[#9966cc] bg-[rgba(153,51,255,0.2)]">
                  <h3 className="text-sm font-['Press_Start_2P'] text-[#ffff00] text-shadow-[1px_1px_0_#cc66ff]">
                    TOP
                  </h3>
                  <div className="flex gap-2">
                    <button
                      className="flex items-center justify-center w-8 h-8 bg-[#cc66ff] border-2 border-[#9966cc] rounded text-white hover:bg-[#ff66c4] hover:scale-105 transition-all"
                      onClick={() => randomizeItem("tops")}
                    >
                      <RefreshCw size={16} />
                    </button>
                    <button
                      className="flex items-center justify-center w-8 h-8 bg-[#cc66ff] border-2 border-[#9966cc] rounded text-white hover:bg-[#ff66c4] hover:scale-105 transition-all relative"
                      onClick={() => triggerFileInput("tops")}
                    >
                      <Upload size={16} />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#33ccff] text-white text-xs py-1 px-2 rounded border border-[#9966cc] whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                        Upload your own
                      </span>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRefs.tops}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileUpload("tops", e)}
                    />
                  </div>
                </div>
                <div
                  className="aspect-square flex items-center justify-center text-white text-sm text-center p-4 bg-[rgba(0,0,0,0.3)] bg-center bg-no-repeat bg-cover relative overflow-hidden"
                  style={{
                    backgroundColor: currentOutfit.top?.color || "#cccccc",
                    color: currentOutfit.top?.textColor || "#ffffff",
                    backgroundImage: currentOutfit.top?.imageUrl ? `url(${currentOutfit.top.imageUrl})` : "none",
                  }}
                >
                  {!currentOutfit.top?.imageUrl && (currentOutfit.top?.name || "Select an item")}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5%200h1L0%205v1H5V0zm1%205v1H5L0%201V0h1l5%205z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30 pointer-events-none"></div>
                </div>
                <div className="p-3 border-t-2 border-[#9966cc] text-center text-sm text-[#33ccff] bg-[rgba(0,0,51,0.5)]">
                  {currentOutfit.top?.name || "None selected"}
                </div>
              </div>

              {/* Bottom */}
              <div className="bg-[rgba(0,0,51,0.7)] border-3 border-[#9966cc] rounded-lg overflow-hidden shadow-[0_0_10px_rgba(153,51,255,0.3)]">
                <div className="flex justify-between items-center p-3 border-b-2 border-[#9966cc] bg-[rgba(153,51,255,0.2)]">
                  <h3 className="text-sm font-['Press_Start_2P'] text-[#ffff00] text-shadow-[1px_1px_0_#cc66ff]">
                    BOTTOM
                  </h3>
                  <div className="flex gap-2">
                    <button
                      className="flex items-center justify-center w-8 h-8 bg-[#cc66ff] border-2 border-[#9966cc] rounded text-white hover:bg-[#ff66c4] hover:scale-105 transition-all"
                      onClick={() => randomizeItem("bottoms")}
                    >
                      <RefreshCw size={16} />
                    </button>
                    <button
                      className="flex items-center justify-center w-8 h-8 bg-[#cc66ff] border-2 border-[#9966cc] rounded text-white hover:bg-[#ff66c4] hover:scale-105 transition-all relative"
                      onClick={() => triggerFileInput("bottoms")}
                    >
                      <Upload size={16} />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#33ccff] text-white text-xs py-1 px-2 rounded border border-[#9966cc] whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                        Upload your own
                      </span>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRefs.bottoms}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileUpload("bottoms", e)}
                    />
                  </div>
                </div>
                <div
                  className="aspect-square flex items-center justify-center text-white text-sm text-center p-4 bg-[rgba(0,0,0,0.3)] bg-center bg-no-repeat bg-cover relative overflow-hidden"
                  style={{
                    backgroundColor: currentOutfit.bottom?.color || "#cccccc",
                    color: currentOutfit.bottom?.textColor || "#ffffff",
                    backgroundImage: currentOutfit.bottom?.imageUrl ? `url(${currentOutfit.bottom.imageUrl})` : "none",
                  }}
                >
                  {!currentOutfit.bottom?.imageUrl && (currentOutfit.bottom?.name || "Select an item")}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5%200h1L0%205v1H5V0zm1%205v1H5L0%201V0h1l5%205z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30 pointer-events-none"></div>
                </div>
                <div className="p-3 border-t-2 border-[#9966cc] text-center text-sm text-[#33ccff] bg-[rgba(0,0,51,0.5)]">
                  {currentOutfit.bottom?.name || "None selected"}
                </div>
              </div>

              {/* Shoes */}
              <div className="bg-[rgba(0,0,51,0.7)] border-3 border-[#9966cc] rounded-lg overflow-hidden shadow-[0_0_10px_rgba(153,51,255,0.3)]">
                <div className="flex justify-between items-center p-3 border-b-2 border-[#9966cc] bg-[rgba(153,51,255,0.2)]">
                  <h3 className="text-sm font-['Press_Start_2P'] text-[#ffff00] text-shadow-[1px_1px_0_#cc66ff]">
                    SHOES
                  </h3>
                  <div className="flex gap-2">
                    <button
                      className="flex items-center justify-center w-8 h-8 bg-[#cc66ff] border-2 border-[#9966cc] rounded text-white hover:bg-[#ff66c4] hover:scale-105 transition-all"
                      onClick={() => randomizeItem("shoes")}
                    >
                      <RefreshCw size={16} />
                    </button>
                    <button
                      className="flex items-center justify-center w-8 h-8 bg-[#cc66ff] border-2 border-[#9966cc] rounded text-white hover:bg-[#ff66c4] hover:scale-105 transition-all relative"
                      onClick={() => triggerFileInput("shoes")}
                    >
                      <Upload size={16} />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#33ccff] text-white text-xs py-1 px-2 rounded border border-[#9966cc] whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                        Upload your own
                      </span>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRefs.shoes}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileUpload("shoes", e)}
                    />
                  </div>
                </div>
                <div
                  className="aspect-square flex items-center justify-center text-white text-sm text-center p-4 bg-[rgba(0,0,0,0.3)] bg-center bg-no-repeat bg-cover relative overflow-hidden"
                  style={{
                    backgroundColor: currentOutfit.shoes?.color || "#cccccc",
                    color: currentOutfit.shoes?.textColor || "#ffffff",
                    backgroundImage: currentOutfit.shoes?.imageUrl ? `url(${currentOutfit.shoes.imageUrl})` : "none",
                  }}
                >
                  {!currentOutfit.shoes?.imageUrl && (currentOutfit.shoes?.name || "Select an item")}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5%200h1L0%205v1H5V0zm1%205v1H5L0%201V0h1l5%205z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30 pointer-events-none"></div>
                </div>
                <div className="p-3 border-t-2 border-[#9966cc] text-center text-sm text-[#33ccff] bg-[rgba(0,0,51,0.5)]">
                  {currentOutfit.shoes?.name || "None selected"}
                </div>
              </div>

              {/* Accessory */}
              <div className="bg-[rgba(0,0,51,0.7)] border-3 border-[#9966cc] rounded-lg overflow-hidden shadow-[0_0_10px_rgba(153,51,255,0.3)]">
                <div className="flex justify-between items-center p-3 border-b-2 border-[#9966cc] bg-[rgba(153,51,255,0.2)]">
                  <h3 className="text-sm font-['Press_Start_2P'] text-[#ffff00] text-shadow-[1px_1px_0_#cc66ff]">
                    ACCESSORY
                  </h3>
                  <div className="flex gap-2">
                    <button
                      className="flex items-center justify-center w-8 h-8 bg-[#cc66ff] border-2 border-[#9966cc] rounded text-white hover:bg-[#ff66c4] hover:scale-105 transition-all"
                      onClick={() => randomizeItem("accessories")}
                    >
                      <RefreshCw size={16} />
                    </button>
                    <button
                      className="flex items-center justify-center w-8 h-8 bg-[#cc66ff] border-2 border-[#9966cc] rounded text-white hover:bg-[#ff66c4] hover:scale-105 transition-all relative"
                      onClick={() => triggerFileInput("accessories")}
                    >
                      <Upload size={16} />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#33ccff] text-white text-xs py-1 px-2 rounded border border-[#9966cc] whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                        Upload your own
                      </span>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRefs.accessories}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileUpload("accessories", e)}
                    />
                  </div>
                </div>
                <div
                  className="aspect-square flex items-center justify-center text-white text-sm text-center p-4 bg-[rgba(0,0,0,0.3)] bg-center bg-no-repeat bg-cover relative overflow-hidden"
                  style={{
                    backgroundColor: currentOutfit.accessory?.color || "#cccccc",
                    color: currentOutfit.accessory?.textColor || "#ffffff",
                    backgroundImage: currentOutfit.accessory?.imageUrl
                      ? `url(${currentOutfit.accessory.imageUrl})`
                      : "none",
                  }}
                >
                  {!currentOutfit.accessory?.imageUrl && (currentOutfit.accessory?.name || "Select an item")}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5%200h1L0%205v1H5V0zm1%205v1H5L0%201V0h1l5%205z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30 pointer-events-none"></div>
                </div>
                <div className="p-3 border-t-2 border-[#9966cc] text-center text-sm text-[#33ccff] bg-[rgba(0,0,51,0.5)]">
                  {currentOutfit.accessory?.name || "None selected"}
                </div>
              </div>
            </div>

            {/* AI Feedback */}
            <AIOutfitFeedback feedback={aiFeedback} isLoading={isLoadingFeedback} onRefresh={getAIFeedback} />

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                className="flex items-center gap-2 px-6 py-3 bg-[#33ccff] text-white font-['Press_Start_2P'] text-sm border-3 border-[#9966cc] rounded-lg shadow-[0_0_10px_rgba(153,51,255,0.3)] hover:bg-[#cc66ff] hover:scale-105 transition-all"
                onClick={randomizeOutfit}
              >
                <RefreshCw size={16} />
                DRESS ME
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 bg-[#ff66c4] text-white font-['Press_Start_2P'] text-sm border-3 border-[#9966cc] rounded-lg shadow-[0_0_10px_rgba(153,51,255,0.3)] hover:bg-[#cc66ff] hover:scale-105 transition-all"
                onClick={saveOutfit}
              >
                <Save size={16} />
                SAVE THIS OUTFIT
              </button>
            </div>
          </div>
        ) : (
          <div className="border-4 border-[#9966cc] rounded-lg p-6 bg-[rgba(0,0,51,0.7)] shadow-[0_0_10px_rgba(255,102,255,0.7),_0_0_0_4px_#cc33ff,_0_0_20px_rgba(255,102,255,0.5)] relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2760%27%20height%3D%2760%27%20viewBox%3D%270%200%2060%2060%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20fill%3D%27none%27%20fill-rule%3D%27evenodd%27%3E%3Cg%20fill%3D%27%23cc66ff%27%20fill-opacity%3D%270.1%27%3E%3Cpath%20d%3D%27M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%27%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] bg-[rgba(153,51,255,0.05)] z-[-1] rounded-md"></div>

            <div className="max-h-[600px] overflow-y-auto pr-2 space-y-4">
              {savedOutfits.length === 0 ? (
                <p className="text-center text-white py-8">
                  No saved outfits yet. Generate and save some outfits first!
                </p>
              ) : (
                savedOutfits.map((outfit, index) => (
                  <div
                    key={index}
                    className="bg-[rgba(0,0,51,0.7)] border-3 border-[#9966cc] rounded-lg p-4 shadow-[0_0_10px_rgba(153,51,255,0.3)]"
                  >
                    <div className="font-['Press_Start_2P'] text-sm text-[#ffff00] mb-3 text-shadow-[1px_1px_0_#cc66ff]">
                      Outfit #{index + 1}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                      {/* Top */}
                      <div
                        className="aspect-square p-2 rounded border-2 border-[#9966cc] flex items-center justify-center text-white text-xs text-center bg-center bg-cover bg-no-repeat relative overflow-hidden"
                        style={{
                          backgroundColor: outfit.top?.color || "#cccccc",
                          color: outfit.top?.textColor || "#ffffff",
                          backgroundImage: outfit.top?.imageUrl ? `url(${outfit.top.imageUrl})` : "none",
                        }}
                      >
                        {!outfit.top?.imageUrl && `Top: ${outfit.top?.name || "None"}`}
                      </div>

                      {/* Bottom */}
                      <div
                        className="aspect-square p-2 rounded border-2 border-[#9966cc] flex items-center justify-center text-white text-xs text-center bg-center bg-cover bg-no-repeat relative overflow-hidden"
                        style={{
                          backgroundColor: outfit.bottom?.color || "#cccccc",
                          color: outfit.bottom?.textColor || "#ffffff",
                          backgroundImage: outfit.bottom?.imageUrl ? `url(${outfit.bottom.imageUrl})` : "none",
                        }}
                      >
                        {!outfit.bottom?.imageUrl && `Bottom: ${outfit.bottom?.name || "None"}`}
                      </div>

                      {/* Shoes */}
                      <div
                        className="aspect-square p-2 rounded border-2 border-[#9966cc] flex items-center justify-center text-white text-xs text-center bg-center bg-cover bg-no-repeat relative overflow-hidden"
                        style={{
                          backgroundColor: outfit.shoes?.color || "#cccccc",
                          color: outfit.shoes?.textColor || "#ffffff",
                          backgroundImage: outfit.shoes?.imageUrl ? `url(${outfit.shoes.imageUrl})` : "none",
                        }}
                      >
                        {!outfit.shoes?.imageUrl && `Shoes: ${outfit.shoes?.name || "None"}`}
                      </div>

                      {/* Accessory */}
                      <div
                        className="aspect-square p-2 rounded border-2 border-[#9966cc] flex items-center justify-center text-white text-xs text-center bg-center bg-cover bg-no-repeat relative overflow-hidden"
                        style={{
                          backgroundColor: outfit.accessory?.color || "#cccccc",
                          color: outfit.accessory?.textColor || "#ffffff",
                          backgroundImage: outfit.accessory?.imageUrl ? `url(${outfit.accessory.imageUrl})` : "none",
                        }}
                      >
                        {!outfit.accessory?.imageUrl && `Accessory: ${outfit.accessory?.name || "None"}`}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button
                        className="flex items-center gap-1 px-3 py-2 bg-[#cc66ff] text-white text-xs border-2 border-[#9966cc] rounded hover:bg-[#ff66c4]"
                        onClick={() => deleteOutfit(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        Delete
                      </button>
                      <button
                        className="flex items-center gap-1 px-3 py-2 bg-[#33ccff] text-white text-xs border-2 border-[#9966cc] rounded hover:bg-[#cc66ff]"
                        onClick={() => useOutfit(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                        Use This
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
