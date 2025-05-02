import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Settings, Share2 } from "lucide-react"

export default function ClosetPage({ params }: { params: { username: string } }) {
  const { username } = params

  // This would be fetched from a database in a real app
  const user = {
    name: username.charAt(0).toUpperCase() + username.slice(1),
    username,
    bio: "Fashion enthusiast | Minimalist style | Sharing my daily outfits",
    followers: 1243,
    following: 567,
    isFollowing: false,
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
            <h1 className="text-lg font-semibold">{user.name}&apos;s Closet</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
            {username === "me" && (
              <Link href="/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={`/placeholder.svg?height=80&width=80&text=${username.charAt(0).toUpperCase()}`}
                  alt={user.name}
                />
                <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-gray-500">@{user.username}</p>
                <p className="mt-2 text-sm">{user.bio}</p>
                <div className="mt-2 flex gap-4 text-sm">
                  <p>
                    <span className="font-semibold">{user.followers}</span> followers
                  </p>
                  <p>
                    <span className="font-semibold">{user.following}</span> following
                  </p>
                </div>
              </div>
            </div>
            {username !== "me" && (
              <Button variant={user.isFollowing ? "outline" : "default"}>
                {user.isFollowing ? "Following" : "Follow"}
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="items">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="outfits">Outfits</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="mt-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-md border border-gray-200 bg-white">
                  <img
                    src={`/placeholder.svg?height=200&width=200&text=Item ${i + 1}`}
                    alt={`Clothing item ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="outfits" className="mt-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-md border border-gray-200 bg-white">
                  <div className="aspect-[3/4] bg-gray-100">
                    <img
                      src={`/placeholder.svg?height=400&width=300&text=Outfit ${i + 1}`}
                      alt={`Outfit ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium">Outfit {i + 1}</h3>
                    <p className="text-sm text-gray-500">
                      {i % 2 === 0 ? "Casual" : "Formal"} • {3 + i} items
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collections" className="mt-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-md border border-gray-200 bg-white">
                  <div className="aspect-[16/9] bg-gray-100">
                    <img
                      src={`/placeholder.svg?height=225&width=400&text=Collection ${i + 1}`}
                      alt={`Collection ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium">
                      {i === 0
                        ? "Summer Essentials"
                        : i === 1
                          ? "Work Attire"
                          : i === 2
                            ? "Weekend Casual"
                            : "Special Occasions"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {5 + i * 2} items • {2 + i} outfits
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
