"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, Share2, Plus, Search, Home, User, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Feed() {
  const [activeTab, setActiveTab] = useState("following")

  return (
    <div className="min-h-screen bg-[#f9f5f2]">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="text-xl font-bold">
            StyleShare
          </Link>
          <div className="relative mx-auto hidden w-full max-w-md md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search closets and users..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="flex items-center gap-4">
            <Link href="/create">
              <Button size="icon" variant="ghost">
                <Plus className="h-5 w-5" />
                <span className="sr-only">Create</span>
              </Button>
            </Link>
            <Link href="/notifications">
              <Button size="icon" variant="ghost">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
            </Link>
            <Link href="/profile">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=Me" alt="Profile" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="following" className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="following" onClick={() => setActiveTab("following")}>
              Following
            </TabsTrigger>
            <TabsTrigger value="discover" onClick={() => setActiveTab("discover")}>
              Discover
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mx-auto max-w-2xl space-y-6">
          {[1, 2, 3, 4].map((post) => (
            <div key={post} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 p-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40&text=U${post}`} alt={`User ${post}`} />
                  <AvatarFallback>U{post}</AvatarFallback>
                </Avatar>
                <div>
                  <Link href={`/profile/user${post}`} className="font-medium hover:underline">
                    {activeTab === "following" ? `Friend ${post}` : `User ${post}`}
                  </Link>
                  <p className="text-xs text-gray-500">Posted a new outfit</p>
                </div>
              </div>

              <div className="aspect-square bg-gray-100">
                <img
                  src={`/placeholder.svg?height=600&width=600&text=Outfit ${post}`}
                  alt={`Outfit ${post}`}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-4">
                <div className="mb-3 flex gap-4">
                  <button className="flex items-center gap-1 text-sm">
                    <Heart className="h-5 w-5" />
                    <span>{42 + post * 11}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm">
                    <MessageCircle className="h-5 w-5" />
                    <span>{7 + post}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>

                <div>
                  <p className="mb-1 text-sm">
                    <span className="font-medium">{activeTab === "following" ? `Friend ${post}` : `User ${post}`}</span>{" "}
                    Spring outfit for casual days. Mixing my favorite jeans with that new top I got last week.
                  </p>
                  <Link href={`/closet/user${post}`} className="text-xs font-medium text-gray-500 hover:underline">
                    View full closet
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white md:hidden">
        <div className="flex items-center justify-around p-3">
          <Link href="/feed" className="flex flex-col items-center text-xs font-medium">
            <Home className="mb-1 h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center text-xs font-medium">
            <Search className="mb-1 h-5 w-5" />
            <span>Search</span>
          </Link>
          <Link href="/create" className="flex flex-col items-center text-xs font-medium">
            <Plus className="mb-1 h-5 w-5" />
            <span>Create</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center text-xs font-medium">
            <User className="mb-1 h-5 w-5" />
            <span>Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
