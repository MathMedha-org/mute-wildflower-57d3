"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { SpaceBackground } from "@/components/space-background"
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Email validation
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    // Simulate password reset process
    setTimeout(() => {
      console.log("Password reset requested for:", email)
      setIsLoading(false)
      setIsSubmitted(true)
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
                href="/login"
                className="w-10 h-10 rounded-full bg-[#50adb6] flex items-center justify-center text-white hover:bg-[#3d8a91] transition-colors"
              >
                <ArrowLeft size={20} strokeWidth={3} />
              </Link>
            </div>

            <h1 className="text-3xl font-bold text-[#50adb6] mb-6">Forgot Password</h1>

            {!isSubmitted ? (
              /* Password Reset Form */
              <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-white text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#163c5a] border border-[#50adb6]/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#50adb6]"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-[#e8594a] text-sm">
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 rounded-md text-white font-semibold transition-colors ${
                    isLoading ? "bg-[#50adb6]/70 cursor-not-allowed" : "bg-[#50adb6] hover:bg-[#3d8a91]"
                  }`}
                >
                  {isLoading ? "Processing..." : "Reset Password"}
                </button>

                <div className="text-center">
                  <Link href="/login" className="text-[#50adb6] hover:text-[#e8594a] text-sm transition-colors">
                    Back to login
                  </Link>
                </div>
              </form>
            ) : (
              /* Success Message */
              <div className="w-full space-y-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#50adb6]/20 flex items-center justify-center">
                    <CheckCircle size={40} className="text-[#50adb6]" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Check Your Email</h2>
                  <p className="text-white/80">We've sent password reset instructions to:</p>
                  <p className="text-[#50adb6] font-medium">{email}</p>
                  <p className="text-white/80 text-sm mt-4">
                    If you don't see the email, please check your spam folder or try again.
                  </p>
                </div>

                <div className="pt-4 text-center">
                  <Link href="/login" className="text-[#50adb6] hover:text-[#e8594a] text-sm transition-colors">
                    Back to login
                  </Link>
                </div>
              </div>
            )}
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

