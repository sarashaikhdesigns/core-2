"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, MessageCircle, Share2, Plus, Search, Home, User, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Feed() {
  const [activeTab, setActiveTab] = useState("following")

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-[var(--y2k-border)] bg-[rgba(0,0,51,0.7)]">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link
            href="/"
            className="font-[var(--font-press-start-2p)] text-xl text-[var(--y2k-pink)] drop-shadow-[2px_2px_0_var(--y2k-purple)]"
          >
            STYLESHARE
          </Link>
          <div className="relative mx-auto hidden w-full max-w-md md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--y2k-purple)]" />
            <input
              type="text"
              placeholder="Search closets and users..."
              className="w-full rounded-full border border-[var(--y2k-border)] bg-[rgba(0,0,51,0.5)] py-2 pl-10 pr-4 text-sm text-[var(--y2k-text)] focus:outline-none focus:ring-2 focus:ring-[var(--y2k-pink)]"
            />
          </div>
          <div className="flex items-center gap-4">
            <Link href="/create">
              <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--y2k-border)] bg-[var(--y2k-purple)] text-white hover:bg-[var(--y2k-pink)]">
                <Plus className="h-5 w-5" />
                <span className="sr-only">Create</span>
              </button>
            </Link>
            <Link href="/notifications">
              <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--y2k-border)] bg-[var(--y2k-blue)] text-white hover:bg-[var(--y2k-pink)]">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </button>
            </Link>
            <Link href="/profile">
              <Avatar className="h-10 w-10 border-2 border-[var(--y2k-border)]">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=Me" alt="Profile" />
                <AvatarFallback className="bg-[var(--y2k-pink)] text-white">ME</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex justify-center">
          <div className="grid w-full max-w-md grid-cols-2 gap-2">
            <button
              className={`y2k-tab ${activeTab === "following" ? "y2k-tab-active" : ""}`}
              onClick={() => setActiveTab("following")}
            >
              FOLLOWING
            </button>
            <button
              className={`y2k-tab ${activeTab === "discover" ? "y2k-tab-active" : ""}`}
              onClick={() => setActiveTab("discover")}
            >
              DISCOVER
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-2xl space-y-6">
          {[1, 2, 3, 4].map((post) => (
            <div key={post} className="y2k-card">
              <div className="y2k-card-header">
                <div className="flex items-center gap-3">
                  <Avatar className="border-2 border-[var(--y2k-border)]">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=U${post}`} alt={`User ${post}`} />
                    <AvatarFallback className="bg-[var(--y2k-purple)] text-white">U{post}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link
                      href={`/profile/user${post}`}
                      className="font-medium text-[var(--y2k-yellow)] hover:underline"
                    >
                      {activeTab === "following" ? `Friend ${post}` : `User ${post}`}
                    </Link>
                    <p className="text-xs text-[var(--y2k-green)]">Posted a new outfit</p>
                  </div>
                </div>
              </div>

              <div className="y2k-item-image">
                <img
                  src={`/placeholder.svg?height=600&width=600&text=Outfit ${post}`}
                  alt={`Outfit ${post}`}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-4 bg-[rgba(0,0,51,0.5)]">
                <div className="mb-3 flex gap-4">
                  <button className="flex items-center gap-1 text-sm text-[var(--y2k-pink)]">
                    <Heart className="h-5 w-5" />
                    <span>{42 + post * 11}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-[var(--y2k-blue)]">
                    <MessageCircle className="h-5 w-5" />
                    <span>{7 + post}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-[var(--y2k-purple)]">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>

                <div>
                  <p className="mb-1 text-sm">
                    <span className="font-medium text-[var(--y2k-yellow)]">
                      {activeTab === "following" ? `Friend ${post}` : `User ${post}`}
                    </span>{" "}
                    Spring outfit for casual days. Mixing my favorite jeans with that new top I got last week.
                  </p>
                  <Link
                    href={`/closet/user${post}`}
                    className="text-xs font-medium text-[var(--y2k-green)] hover:underline"
                  >
                    View full closet
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 y2k-nav md:hidden">
        <div className="flex items-center justify-around p-3">
          <Link href="/feed" className="flex flex-col items-center text-xs font-medium text-[var(--y2k-pink)]">
            <Home className="mb-1 h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center text-xs font-medium text-[var(--y2k-blue)]">
            <Search className="mb-1 h-5 w-5" />
            <span>Search</span>
          </Link>
          <Link href="/create" className="flex flex-col items-center text-xs font-medium text-[var(--y2k-purple)]">
            <Plus className="mb-1 h-5 w-5" />
            <span>Create</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center text-xs font-medium text-[var(--y2k-yellow)]">
            <User className="mb-1 h-5 w-5" />
            <span>Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
