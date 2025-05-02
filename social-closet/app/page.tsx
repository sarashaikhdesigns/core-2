import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9f5f2]">
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="text-xl font-bold">
            StyleShare
          </Link>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search closets..."
                className="rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Share Your Style With The World</h1>
          <p className="mb-6 text-lg text-gray-600">
            Create your digital closet, discover new styles, and connect with fashion enthusiasts.
          </p>
          <Link href="/signup">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">Trending Closets</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Link href={`/closet/user${i}`} key={i} className="group">
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-md">
                  <div className="aspect-[4/3] bg-gray-100">
                    <img
                      src={`/placeholder.svg?height=300&width=400&text=Closet ${i}`}
                      alt={`User ${i}'s closet`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gray-200">
                        <img
                          src={`/placeholder.svg?height=32&width=32&text=${i}`}
                          alt={`User ${i}`}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                      <p className="font-medium">User {i}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {30 + i} items • {10 + i} outfits
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-semibold">How It Works</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
                1
              </div>
              <h3 className="mb-2 text-xl font-medium">Create Your Closet</h3>
              <p className="text-gray-600">Upload photos of your clothing items and organize them by category.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
                2
              </div>
              <h3 className="mb-2 text-xl font-medium">Build Outfits</h3>
              <p className="text-gray-600">Mix and match items to create and save your favorite outfit combinations.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
                3
              </div>
              <h3 className="mb-2 text-xl font-medium">Connect & Discover</h3>
              <p className="text-gray-600">
                Follow other users, get inspired, and share your style with the community.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-white py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 StyleShare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
