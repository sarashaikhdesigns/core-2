"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Settings, Share2, Shuffle } from "lucide-react"

// Sample clothing items with colors
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

export default function ClosetPage({ params }: { params: { username: string } }) {
  const { username } = params
  const [activeTab, setActiveTab] = useState("items")
  const [currentOutfit, setCurrentOutfit] = useState({
    top: clothingItems.tops[0],
    bottom: clothingItems.bottoms[0],
    shoes: clothingItems.shoes[0],
    accessory: clothingItems.accessories[0],
  })
  const [savedOutfits, setSavedOutfits] = useState<any[]>([])

  // This would be fetched from a database in a real app
  const user = {
    name: username.charAt(0).toUpperCase() + username.slice(1),
    username,
    bio: "Fashion enthusiast | Y2K style | Sharing my daily outfits",
    followers: 1243,
    following: 567,
    isFollowing: false,
  }

  const randomizeItem = (category: "top" | "bottom" | "shoes" | "accessory") => {
    const categoryMap = {
      top: "tops",
      bottom: "bottoms",
      shoes: "shoes",
      accessory: "accessories",
    }

    const items = clothingItems[categoryMap[category]]
    const randomItem = items[Math.floor(Math.random() * items.length)]

    setCurrentOutfit({
      ...currentOutfit,
      [category]: randomItem,
    })
  }

  const randomizeAll = () => {
    setCurrentOutfit({
      top: clothingItems.tops[Math.floor(Math.random() * clothingItems.tops.length)],
      bottom: clothingItems.bottoms[Math.floor(Math.random() * clothingItems.bottoms.length)],
      shoes: clothingItems.shoes[Math.floor(Math.random() * clothingItems.shoes.length)],
      accessory: clothingItems.accessories[Math.floor(Math.random() * clothingItems.accessories.length)],
    })
  }

  const saveOutfit = () => {
    setSavedOutfits([...savedOutfits, { ...currentOutfit, id: Date.now() }])
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-[var(--y2k-border)] bg-[rgba(0,0,51,0.7)]">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Link href="/feed">
              <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--y2k-border)] bg-[var(--y2k-purple)] text-white hover:bg-[var(--y2k-pink)]">
                <ArrowLeft className="h-5 w-5" />
              </button>
            </Link>
            <h1 className="font-[var(--font-press-start-2p)] text-sm text-[var(--y2k-yellow)]">
              {user.name}&apos;s Closet
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--y2k-border)] bg-[var(--y2k-blue)] text-white hover:bg-[var(--y2k-pink)]">
              <Share2 className="h-5 w-5" />
            </button>
            {username === "me" && (
              <Link href="/settings">
                <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--y2k-border)] bg-[var(--y2k-green)] text-white hover:bg-[var(--y2k-pink)]">
                  <Settings className="h-5 w-5" />
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8 y2k-container">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex gap-4">
              <Avatar className="h-20 w-20 border-4 border-[var(--y2k-border)]">
                <AvatarImage
                  src={`/placeholder.svg?height=80&width=80&text=${username.charAt(0).toUpperCase()}`}
                  alt={user.name}
                />
                <AvatarFallback className="bg-[var(--y2k-pink)] text-white">
                  {username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-[var(--font-press-start-2p)] text-lg text-[var(--y2k-pink)]">{user.name}</h2>
                <p className="text-sm text-[var(--y2k-blue)]">@{user.username}</p>
                <p className="mt-2 text-sm">{user.bio}</p>
                <div className="mt-2 flex gap-4 text-sm">
                  <p className="text-[var(--y2k-yellow)]">
                    <span className="font-semibold">{user.followers}</span> followers
                  </p>
                  <p className="text-[var(--y2k-green)]">
                    <span className="font-semibold">{user.following}</span> following
                  </p>
                </div>
              </div>
            </div>
            {username !== "me" && (
              <button className="y2k-button y2k-button-secondary">{user.isFollowing ? "FOLLOWING" : "FOLLOW"}</button>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="grid w-full grid-cols-3 gap-2">
            <button
              className={`y2k-tab ${activeTab === "items" ? "y2k-tab-active" : ""}`}
              onClick={() => setActiveTab("items")}
            >
              ITEMS
            </button>
            <button
              className={`y2k-tab ${activeTab === "outfits" ? "y2k-tab-active" : ""}`}
              onClick={() => setActiveTab("outfits")}
            >
              OUTFITS
            </button>
            <button
              className={`y2k-tab ${activeTab === "generator" ? "y2k-tab-active" : ""}`}
              onClick={() => setActiveTab("generator")}
            >
              GENERATOR
            </button>
          </div>
        </div>

        {activeTab === "items" && (
          <div className="y2k-container">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {Object.entries(clothingItems).flatMap(([category, items]) =>
                items.map((item) => (
                  <div key={`${category}-${item.id}`} className="y2k-card">
                    <div className="y2k-card-header">
                      <h3 className="y2k-card-title">{category.toUpperCase()}</h3>
                    </div>
                    <div className="y2k-item-image" style={{ backgroundColor: item.color, color: item.textColor }}>
                      {item.name}
                    </div>
                    <div className="y2k-item-name">{item.name}</div>
                  </div>
                )),
              )}
            </div>
          </div>
        )}

        {activeTab === "outfits" && (
          <div className="y2k-container">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {savedOutfits.length > 0 ? (
                savedOutfits.map((outfit, index) => (
                  <div key={outfit.id} className="y2k-card">
                    <div className="y2k-card-header">
                      <h3 className="y2k-card-title">OUTFIT #{index + 1}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-2">
                      <div
                        className="aspect-square rounded-md border-2 border-[var(--y2k-border)]"
                        style={{ backgroundColor: outfit.top.color, color: outfit.top.textColor }}
                      >
                        <div className="flex h-full items-center justify-center text-center text-sm">
                          {outfit.top.name}
                        </div>
                      </div>
                      <div
                        className="aspect-square rounded-md border-2 border-[var(--y2k-border)]"
                        style={{ backgroundColor: outfit.bottom.color, color: outfit.bottom.textColor }}
                      >
                        <div className="flex h-full items-center justify-center text-center text-sm">
                          {outfit.bottom.name}
                        </div>
                      </div>
                      <div
                        className="aspect-square rounded-md border-2 border-[var(--y2k-border)]"
                        style={{ backgroundColor: outfit.shoes.color, color: outfit.shoes.textColor }}
                      >
                        <div className="flex h-full items-center justify-center text-center text-sm">
                          {outfit.shoes.name}
                        </div>
                      </div>
                      <div
                        className="aspect-square rounded-md border-2 border-[var(--y2k-border)]"
                        style={{ backgroundColor: outfit.accessory.color, color: outfit.accessory.textColor }}
                      >
                        <div className="flex h-full items-center justify-center text-center text-sm">
                          {outfit.accessory.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center">
                  <p className="text-[var(--y2k-yellow)]">No saved outfits yet. Create some in the generator!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "generator" && (
          <div className="y2k-container">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="y2k-card">
                <div className="y2k-card-header">
                  <h3 className="y2k-card-title">TOP</h3>
                  <button
                    onClick={() => randomizeItem("top")}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--y2k-border)] bg-[var(--y2k-purple)] text-white hover:bg-[var(--y2k-pink)]"
                  >
                    <Shuffle className="h-4 w-4" />
                  </button>
                </div>
                <div
                  className="y2k-item-image"
                  style={{ backgroundColor: currentOutfit.top.color, color: currentOutfit.top.textColor }}
                >
                  {currentOutfit.top.name}
                </div>
                <div className="y2k-item-name">{currentOutfit.top.name}</div>
              </div>

              <div className="y2k-card">
                <div className="y2k-card-header">
                  <h3 className="y2k-card-title">BOTTOM</h3>
                  <button
                    onClick={() => randomizeItem("bottom")}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--y2k-border)] bg-[var(--y2k-purple)] text-white hover:bg-[var(--y2k-pink)]"
                  >
                    <Shuffle className="h-4 w-4" />
                  </button>
                </div>
                <div
                  className="y2k-item-image"
                  style={{ backgroundColor: currentOutfit.bottom.color, color: currentOutfit.bottom.textColor }}
                >
                  {currentOutfit.bottom.name}
                </div>
                <div className="y2k-item-name">{currentOutfit.bottom.name}</div>
              </div>

              <div className="y2k-card">
                <div className="y2k-card-header">
                  <h3 className="y2k-card-title">SHOES</h3>
                  <button
                    onClick={() => randomizeItem("shoes")}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--y2k-border)] bg-[var(--y2k-purple)] text-white hover:bg-[var(--y2k-pink)]"
                  >
                    <Shuffle className="h-4 w-4" />
                  </button>
                </div>
                <div
                  className="y2k-item-image"
                  style={{ backgroundColor: currentOutfit.shoes.color, color: currentOutfit.shoes.textColor }}
                >
                  {currentOutfit.shoes.name}
                </div>
                <div className="y2k-item-name">{currentOutfit.shoes.name}</div>
              </div>

              <div className="y2k-card">
                <div className="y2k-card-header">
                  <h3 className="y2k-card-title">ACCESSORY</h3>
                  <button
                    onClick={() => randomizeItem("accessory")}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--y2k-border)] bg-[var(--y2k-purple)] text-white hover:bg-[var(--y2k-pink)]"
                  >
                    <Shuffle className="h-4 w-4" />
                  </button>
                </div>
                <div
                  className="y2k-item-image"
                  style={{ backgroundColor: currentOutfit.accessory.color, color: currentOutfit.accessory.textColor }}
                >
                  {currentOutfit.accessory.name}
                </div>
                <div className="y2k-item-name">{currentOutfit.accessory.name}</div>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <button onClick={randomizeAll} className="y2k-button y2k-button-primary">
                <Shuffle className="h-5 w-5" />
                DRESS ME
              </button>
              <button onClick={saveOutfit} className="y2k-button y2k-button-secondary">
                SAVE THIS OUTFIT
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
