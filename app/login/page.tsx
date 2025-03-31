"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SpaceBackground } from "@/components/space-background"
import { ArrowLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("student")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      console.log("Login attempt with:", { username, password, userType })
      setIsLoading(false)
      // Navigate to dashboard after successful login
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="relative min-h-screen w-full">
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#ffffff]/80 via-[#ffffff]/60 to-transparent backdrop-blur-sm" />
      <SpaceBackground />

      <div className="relative z-10 flex flex-col items-center p-4 sm:p-8 max-w-md w-full mx-auto">
        {/* Content container with background */}
        <div className="w-full mt-20 bg-[#ffffff] backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(15,40,61,0.5)] rounded-lg">
          {/* Content wrapper with padding */}
          <div className="flex flex-col items-center px-6 sm:px-8 py-8 w-full">
            {/* Back button */}
            <div className="self-start w-full">
              <Link
                href="/"
                className="w-10 h-10 rounded-full bg-[#fdc500] flex items-center justify-center text-white hover:bg-[#ffd500] transition-colors"
              >
                <ArrowLeft size={20} strokeWidth={3} />
              </Link>
            </div>

            <h1 className="text-3xl font-bold text-[#00509d] mb-6">Login</h1>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="space-y-3">
                {/* User Type Dropdown */}
                <div>
                  <label htmlFor="user-type" className="block text-[#00509d] text-sm font-medium mb-1">
                    I am a
                  </label>
                  <Select defaultValue="student" onValueChange={(value) => setUserType(value)}>
                    <SelectTrigger
                      id="user-type"
                      className="w-full px-4 py-3 h-[50px] bg-[#00509d] border border-[#fdc500]/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#fdc500]"
                    >
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#00509d] border border-[#fdc500]/30 text-white">
                      <SelectItem value="student" className="focus:bg-[#fdc500]/20 focus:text-white">
                        Student
                      </SelectItem>
                      <SelectItem value="teacher" className="focus:bg-[#fdc500]/20 focus:text-white">
                        School Teacher/Tutor
                      </SelectItem>
                      <SelectItem value="parent" className="focus:bg-[#fdc500]/20 focus:text-white">
                        Parent/Guardian
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="username" className="block text-[#00509d] text-sm font-medium mb-1">
                    User Name
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 h-[50px] bg-[#00509d] border border-[#fdc500]/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#fdc500]"
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-[#00509d] text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 h-[50px] bg-[#00509d] border border-[#fdc500]/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#fdc500]"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-md text-white font-semibold transition-colors mt-6 ${
                  isLoading ? "bg-[#fdc500]/70 cursor-not-allowed" : "bg-[#fdc500] hover:bg-[#ffd500]"
                }`}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              {/* Conditionally render forgot password link */}
              {userType !== "student" && (
                <div className="text-center">
                  <Link
                    href="/forgot-password"
                    className="text-[#fdc500] hover:text-[#e8594a] text-sm transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Add keyframe animation for fade in */}
      <style jsx>{`
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fadeIn {
        animation: fadeIn 1s ease-out forwards;
      }
    `}</style>
    </div>
  )
}

