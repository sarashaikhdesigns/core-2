"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, X } from "lucide-react"

export default function CreatePage() {
  const [itemType, setItemType] = useState("outfit")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleImageUpload = () => {
    // In a real app, this would handle file uploads
    // For this demo, we'll just add a placeholder
    setImages([...images, `/placeholder.svg?height=400&width=300&text=Image ${images.length + 1}`])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate posting
    setTimeout(() => {
      setIsLoading(false)
      router.push("/feed")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#f9f5f2]">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Link href="/feed">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Create New {itemType.charAt(0).toUpperCase() + itemType.slice(1)}</h1>
          </div>
          <Button disabled={images.length === 0 || !title || isLoading} onClick={handleSubmit}>
            {isLoading ? "Posting..." : "Post"}
          </Button>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-6">
        <div className="mb-6">
          <Label htmlFor="item-type">What are you creating?</Label>
          <Select value={itemType} onValueChange={setItemType}>
            <SelectTrigger id="item-type" className="mt-2">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="outfit">Outfit</SelectItem>
              <SelectItem value="item">Clothing Item</SelectItem>
              <SelectItem value="collection">Collection</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <Label htmlFor="images">Upload Images</Label>
          <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[3/4] overflow-hidden rounded-md border border-gray-200 bg-white"
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Upload ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            {images.length < 5 && (
              <button
                onClick={handleImageUpload}
                className="flex aspect-[3/4] items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center text-gray-500">
                  <Upload className="mb-1 h-6 w-6" />
                  <span className="text-xs">Add Image</span>
                </div>
              </button>
            )}
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`${itemType === "outfit" ? "Summer casual" : itemType === "item" ? "Blue denim jacket" : "Work week essentials"}`}
            className="mt-2"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell others about this item..."
            className="mt-2"
            rows={4}
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category" className="mt-2">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {itemType === "outfit" ? (
                <>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="workout">Workout</SelectItem>
                  <SelectItem value="special">Special Occasion</SelectItem>
                </>
              ) : itemType === "item" ? (
                <>
                  <SelectItem value="tops">Tops</SelectItem>
                  <SelectItem value="bottoms">Bottoms</SelectItem>
                  <SelectItem value="outerwear">Outerwear</SelectItem>
                  <SelectItem value="shoes">Shoes</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="seasonal">Seasonal</SelectItem>
                  <SelectItem value="occasion">Occasion</SelectItem>
                  <SelectItem value="style">Style</SelectItem>
                  <SelectItem value="color">Color Scheme</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </main>
    </div>
  )
}
