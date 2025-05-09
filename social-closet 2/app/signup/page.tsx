"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function Signup() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup
    setTimeout(() => {
      setIsLoading(false)
      router.push("/onboarding")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto flex max-w-md flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full y2k-container">
          <div className="mb-6 text-center">
            <h1 className="mb-2 font-[var(--font-press-start-2p)] text-2xl text-[var(--y2k-pink)] drop-shadow-[2px_2px_0_var(--y2k-purple)]">
              CREATE ACCOUNT
            </h1>
            <p className="text-[var(--y2k-blue)]">Join StyleShare and start sharing your closet</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-[var(--font-press-start-2p)] text-xs text-[var(--y2k-yellow)]">
                FULL NAME
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className="y2k-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="font-[var(--font-press-start-2p)] text-xs text-[var(--y2k-yellow)]">
                USERNAME
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                required
                className="y2k-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-[var(--font-press-start-2p)] text-xs text-[var(--y2k-yellow)]">
                EMAIL
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="y2k-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-[var(--font-press-start-2p)] text-xs text-[var(--y2k-yellow)]">
                PASSWORD
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="y2k-input"
              />
            </div>

            <button type="submit" className="w-full y2k-button y2k-button-primary" disabled={isLoading}>
              {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-[var(--y2k-pink)] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
