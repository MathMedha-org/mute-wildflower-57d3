"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SpaceBackground } from "@/components/space-background"
import { ArrowLeft } from "lucide-react"


export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      console.log("Login attempt with:", { username, password })
      setIsLoading(false)
      // Navigate to dashboard after successful login
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="relative min-h-screen w-full">
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0F283D]/80 via-[#0F283D]/60 to-transparent backdrop-blur-sm" />
      <SpaceBackground />

      <div className="relative z-10 flex flex-col items-center p-4 sm:p-8 max-w-md w-full mx-auto">
        {/* Content container with background */}
        <div className="w-full mt-20 bg-[#0F283D] backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(15,40,61,0.5)] rounded-lg">
          {/* Content wrapper with padding */}
          <div className="flex flex-col items-center px-6 sm:px-8 py-8 w-full">
            {/* Back button */}
            <div className="self-start w-full">
              <Link
                href="/"
                className="w-10 h-10 rounded-full bg-[#50adb6] flex items-center justify-center text-white hover:bg-[#3d8a91] transition-colors"
              >
                <ArrowLeft size={20} strokeWidth={3} />
              </Link>
            </div>

            <h1 className="text-3xl font-bold text-[#50adb6] mb-6">Login</h1>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-white text-sm font-medium mb-1">
                    User Name
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-[#163c5a] border border-[#50adb6]/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#50adb6]"
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-white text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[#163c5a] border border-[#50adb6]/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#50adb6]"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-md text-white font-semibold transition-colors ${
                  isLoading ? "bg-[#50adb6]/70 cursor-not-allowed" : "bg-[#50adb6] hover:bg-[#3d8a91]"
                }`}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <div className="text-center">
                <Link href="/forgot-password" className="text-[#50adb6] hover:text-[#e8594a] text-sm transition-colors">
                  Forgot password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

