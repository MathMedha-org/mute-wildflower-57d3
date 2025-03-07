"use client"

import { useState, useEffect } from "react"
import { Menu, Dumbbell, GamepadIcon, BookOpen, X, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleLogout = () => {
    setIsOpen(false)
    router.push("/")
  }

  return (
    <div className="relative lg:hidden">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-3 right-4 w-10 h-10 rounded-full bg-[#50adb6] flex items-center justify-center text-white z-[100]"
      >
        <Menu size={20} strokeWidth={3} />
      </button>
      {/* Full screen overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
          onClick={() => setIsOpen(false)}
          style={{ height: "100dvh" }}
        />
      )}
      {/* Menu Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 w-[300px] bg-[#0F283D] border-l border-[#50adb6]",
          "transform transition-transform duration-300 ease-in-out z-[100]",
          "flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        style={{ height: "100dvh" }}
      >
        {/* Header with close button */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-[#0F283D] border-b border-[#50adb6]">
          <span className="text-white font-semibold">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full bg-[#50adb6] flex items-center justify-center text-white"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto bg-[#0F283D] p-6">
          <div className="flex flex-col space-y-4">
            <Link
              href="/dashboard/practice"
              onClick={() => setIsOpen(false)}
              className={cn(
                "w-full h-12 rounded-lg bg-[#50adb6] flex items-center justify-center text-white gap-2 hover:bg-[#3d8a91] transition-colors",
                pathname.startsWith("/dashboard/practice") && "bg-[#3d8a91]",
              )}
            >
              <Dumbbell size={20} strokeWidth={3} />
              <span>Practice</span>
            </Link>
            <Link
              href="/dashboard/games"
              onClick={() => setIsOpen(false)}
              className={cn(
                "w-full h-12 rounded-lg bg-[#50adb6] flex items-center justify-center text-white gap-2 hover:bg-[#3d8a91] transition-colors",
                pathname.startsWith("/dashboard/games") && "bg-[#3d8a91]",
              )}
            >
              <GamepadIcon size={20} strokeWidth={3} />
              <span>Games</span>
            </Link>
            <Link
              href="/dashboard/homework"
              onClick={() => setIsOpen(false)}
              className={cn(
                "w-full h-12 rounded-lg bg-[#50adb6] flex items-center justify-center text-white gap-2 hover:bg-[#3d8a91] transition-colors",
                pathname.startsWith("/dashboard/homework") && "bg-[#3d8a91]",
              )}
            >
              <BookOpen size={20} strokeWidth={3} />
              <span>Homework</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full h-12 rounded-lg bg-[#50adb6] flex items-center justify-center text-white gap-2 hover:bg-[#3d8a91] transition-colors"
            >
              <LogOut size={20} strokeWidth={3} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-[#0F283D] border-t border-[#50adb6]">
          <p className="text-white/60 text-sm text-center">Space Math Quiz v1.0</p>
        </div>
      </div>
    </div>
  )
}

