"use client"

import Link from "next/link"
import { SpaceBackground } from "@/components/space-background"

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0F283D]/80 via-[#0F283D]/60 to-transparent backdrop-blur-sm" />
      <SpaceBackground />
      <div className="relative z-10 flex flex-col items-center p-8 max-w-md w-full mx-auto">
        {/* Content container with background - starts after header */}
        <div className="mt-20 w-full bg-[#0F283D] backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(15,40,61,0.5)] rounded-[4px]">
          {/* Content wrapper with padding */}
          <div className="flex flex-col items-center gap-12 px-12 py-12 w-full">
            {/* Logo with animation */}
            <div className="opacity-0 animate-fadeIn">
              <img
                src="/images/MathMedha-logo-top.png"
                alt="MathMedha Logo"
                className="w-auto max-w-full h-auto max-h-32 object-contain"
              />
            </div>

            {/* Buttons stacked vertically */}
            <div className="flex flex-col gap-8 w-full items-center">
              <Link
                href="/login"
                className="text-[1.8em] h-[1.8em] leading-[1.6em] min-w-[6em] rounded-[8px] p-4 
                         bg-[#50adb6] hover:bg-[#3d8a91] text-white font-bold
                         transition-colors duration-200 
                         flex items-center justify-center"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="text-[1.8em] h-[1.8em] leading-[1.6em] min-w-[6em] rounded-[8px] p-4 
                         bg-[#e8594a] hover:bg-[#d64a3d] text-white font-bold
                         transition-colors duration-200 
                         flex items-center justify-center"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

