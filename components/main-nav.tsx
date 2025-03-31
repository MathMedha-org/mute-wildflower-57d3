"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  Settings,
  VolumeX,
  Volume2,
  LogOut,
  Dumbbell,
  GamepadIcon,
  BookOpen,
  Trophy,
  Rocket,
  BarChart2,
  Download,
  X,
} from "lucide-react"
import { useQuiz } from "@/contexts/quiz-context"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export function MainNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { isMuted, setIsMuted, isKeypadVisible, setIsKeypadVisible } = useQuiz()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const userButtonRef = useRef<HTMLButtonElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })

  const toggleMute = () => {
    setIsMuted((prev) => !prev)
    // Focus the input after toggling mute
    const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement
    if (inputElement) {
      inputElement.focus()
    }
  }

  const toggleKeypad = () => {
    setIsKeypadVisible((prev) => !prev)
    // Focus the input after toggling keypad
    const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement
    if (inputElement) {
      setTimeout(() => {
        inputElement.focus()
      }, 0)
    }
  }

  const handleLogout = () => {
    setIsUserMenuOpen(false)
    setIsMobileMenuOpen(false)
    router.push("/")
  }

  const handleGoToSettings = () => {
    setIsSettingsDialogOpen(false)
    router.push("/dashboard/settings")
  }

  // Calculate dropdown position when opening
  useEffect(() => {
    if (isUserMenuOpen && userButtonRef.current) {
      const headerElement = document.querySelector("header")
      if (headerElement) {
        const headerRect = headerElement.getBoundingClientRect()
        const buttonRect = userButtonRef.current.getBoundingClientRect()

        // Position the dropdown 1px higher to overlap the header border
        setDropdownPosition({
          top: headerRect.bottom - 1,
          right: window.innerWidth - buttonRect.right,
        })
      }
    }
  }, [isUserMenuOpen])

  // Close dropdown when clicking outside (for laptop view)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isUserMenuOpen &&
        userMenuRef.current &&
        userButtonRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isUserMenuOpen])

  return (
    <div className="flex items-center justify-between w-full gap-8">
      <div className="flex items-center gap-2">
        {!pathname.startsWith("/dashboard/play/space-quiz") ? (
          <Link href="/dashboard" className="flex-shrink-0" scroll={true}>
            {/* Logo for laptop view (lg and above) */}
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MathMedha-logo-left-KVIPLvx0ZGlfPLc4MQX8Ha6QXoBV8V.png"
              alt="Math Logo"
              className="hidden lg:block h-10 w-auto"
            />
            {/* Logo for tablet and mobile view (below lg) */}
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-small-new-acT5VloXXGNE4Spehk0goYjZLVtEkT.png"
              alt="Math Logo"
              className="lg:hidden h-12 w-auto"
            />
          </Link>
        ) : (
          <>
            <Link
              href="/dashboard/games"
              scroll={true}
              className="w-10 h-10 rounded-full bg-[#003f88] flex items-center justify-center text-white hover:bg-[#002d63] transition-colors"
            >
              <ArrowLeft size={20} strokeWidth={3} />
            </Link>
            <button
              onClick={() => setIsSettingsDialogOpen(true)}
              className="w-10 h-10 rounded-full bg-[#f6aa54] flex items-center justify-center text-white hover:bg-[#e59843] transition-colors"
              aria-label="Settings"
            >
              <Settings size={20} strokeWidth={3} />
            </button>
            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-[#e8594a] flex items-center justify-center text-white hover:bg-[#d64a3d] transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={20} strokeWidth={3} /> : <Volume2 size={20} strokeWidth={3} />}
            </button>
            <button
              onClick={toggleKeypad}
              className="hidden lg:flex w-10 h-10 rounded-full bg-[#4f8a4c] items-center justify-center text-white hover:bg-[#3d6b3a] transition-colors"
              aria-label={isKeypadVisible ? "Hide keypad" : "Show keypad"}
            >
              {isKeypadVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-keyboard"
                >
                  <path d="M10 8h.01" />
                  <path d="M12 12h.01" />
                  <path d="M14 8h.01" />
                  <path d="M16 12h.01" />
                  <path d="M18 8h.01" />
                  <path d="M6 8h.01" />
                  <path d="M7 16h10" />
                  <path d="M8 12h.01" />
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-keyboard-off"
                >
                  <path d="M 20 4 A2 2 0 0 1 22 6" />
                  <path d="M 22 6 L 22 16.41" />
                  <path d="M 7 16 L 16 16" />
                  <path d="M 9.69 4 L 20 4" />
                  <path d="M14 8h.01" />
                  <path d="M18 8h.01" />
                  <path d="m2 2 20 20" />
                  <path d="M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" />
                  <path d="M6 8h.01" />
                  <path d="M8 12h.01" />
                </svg>
              )}
            </button>
          </>
        )}
      </div>
      <nav className="flex items-center max-[375px]:space-x-2 space-x-4 lg:space-x-8 ml-auto">
        {/* Only show navigation items if not on space-quiz page */}
        {!pathname.startsWith("/dashboard/play/space-quiz") && (
          <>
            <Link
              href="/dashboard/practice"
              scroll={true}
              className={cn(
                "flex items-center gap-2 text-white hover:text-[#50adb6] transition-colors uppercase",
                pathname.startsWith("/dashboard/practice") && "text-[#90e0ef] font-semibold",
              )}
            >
              <div className="w-10 h-10 lg:w-7 lg:h-7 rounded-full bg-[#003f88] flex items-center justify-center text-white">
                <Dumbbell size={16} strokeWidth={2} />
              </div>
              <span className="hidden lg:inline">Practice</span>
            </Link>
            <Link
              href="/dashboard/games"
              scroll={true}
              className={cn(
                "flex items-center gap-2 text-white hover:text-[#f6aa54] transition-colors uppercase",
                pathname.startsWith("/dashboard/games") && "text-[#f6aa54]",
              )}
            >
              <div className="w-10 h-10 lg:w-7 lg:h-7 rounded-full bg-[#f6aa54] flex items-center justify-center text-white">
                <GamepadIcon size={16} strokeWidth={2} />
              </div>
              <span className="hidden lg:inline">Games</span>
            </Link>
            <Link
              href="/dashboard/homework"
              scroll={true}
              className={cn(
                "flex items-center gap-2 text-white hover:text-[#e8594a] transition-colors uppercase",
                pathname.startsWith("/dashboard/homework") && "text-[#e8594a]",
              )}
            >
              <div className="w-10 h-10 lg:w-7 lg:h-7 rounded-full bg-[#e8594a] flex items-center justify-center text-white">
                <BookOpen size={16} strokeWidth={2} />
              </div>
              <span className="hidden lg:inline">Homework</span>
            </Link>
            <Link
              href="/dashboard/explore-ranks"
              scroll={true}
              className={cn(
                "flex items-center gap-2 text-white hover:text-[#4f8a4c] transition-colors uppercase",
                pathname.startsWith("/dashboard/explore-ranks") && "text-[#4f8a4c]",
              )}
            >
              <div className="w-10 h-10 lg:w-7 lg:h-7 rounded-full bg-[#4f8a4c] flex items-center justify-center text-white">
                <Trophy size={16} strokeWidth={2} />
              </div>
              <span className="hidden lg:inline">Ranks</span>
            </Link>

            {/* Desktop User Menu */}
            <div className="hidden lg:block relative">
              <button
                ref={userButtonRef}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 hover:opacity-80"
              >
                <Avatar className="h-10 w-10 bg-[#50adb6]">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-[#50adb6] text-white">JD</AvatarFallback>
                </Avatar>
                <span className="text-white">John Doe</span>
              </button>

              {isUserMenuOpen && (
                <div
                  ref={userMenuRef}
                  className="fixed min-w-[12rem] shadow-lg bg-[#00509d] border-l border-r border-b border-[#fdc500] m-0 overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-200"
                  style={{
                    top: `${dropdownPosition.top}px`,
                    right: `${dropdownPosition.right}px`,
                    width: userButtonRef.current ? `${userButtonRef.current.offsetWidth}px` : "auto",
                    borderTop: "none",
                    transformOrigin: "top right",
                  }}
                >
                  <div className="py-1">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-base text-white hover:bg-[#003f88]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <circle cx="12" cy="8" r="5" />
                        <path d="M20 21a8 8 0 1 0-16 0" />
                      </svg>
                      Profile
                    </Link>
                    <Link
                      href="/dashboard/progress"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-base text-white hover:bg-[#003f88]"
                    >
                      <BarChart2 className="h-5 w-5" />
                      Progress
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-base text-white hover:bg-[#003f88]"
                    >
                      <Settings className="h-5 w-5" />
                      Settings
                    </Link>
                    <Link
                      href="/dashboard/adventure"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-base text-white hover:bg-[#003f88]"
                    >
                      <Rocket className="h-5 w-5" />
                      Adventure
                    </Link>
                    <Link
                      href="/dashboard/downloads"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-base text-white hover:bg-[#003f88]"
                    >
                      <Download className="h-5 w-5" />
                      Downloads
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-base text-white hover:bg-[#e8594a]/20 w-full text-left"
                    >
                      <LogOut className="h-5 w-5 text-[#e8594a]" strokeWidth={3} />
                      <span className="text-[#e8594a] font-bold">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile User Menu Button */}
            <button
              onClick={() => setIsUserMenuOpen(true)}
              className="lg:hidden flex items-center gap-2 hover:opacity-80"
            >
              <Avatar className="h-10 w-10 bg-[#50adb6]">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="bg-[#50adb6] text-white">JD</AvatarFallback>
              </Avatar>
              <span className="text-white hidden md:inline lg:inline">John Doe</span>
              <span className="text-white md:hidden">J D</span>
            </button>

            {/* Mobile User Menu Overlay and Panel - Only show when not on space-quiz page */}
            {!pathname.startsWith("/dashboard/play/space-quiz") && (
              <>
                {/* Mobile User Menu Overlay */}
                {isUserMenuOpen && (
                  <div
                    className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
                    onClick={(e) => {
                      // Only close if clicking the overlay itself, not its children
                      if (e.target === e.currentTarget) {
                        setIsUserMenuOpen(false)
                      }
                    }}
                  />
                )}

                {/* Mobile User Menu Panel */}
                <div
                  className={cn(
                    "lg:hidden fixed inset-y-0 right-0 w-[300px] bg-[#00509d] border-l border-[#fdc500]",
                    "transform transition-transform duration-300 ease-in-out z-[100]",
                    "flex flex-col",
                    isUserMenuOpen ? "translate-x-0" : "translate-x-full",
                  )}
                  style={{ height: "100dvh" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header with close button */}
                  <div className="sticky top-0 flex items-center justify-between p-4 bg-[#00509d] border-b border-[#fdc500]">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10 bg-[#50adb6]">
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback className="bg-[#50adb6] text-white">JD</AvatarFallback>
                      </Avatar>
                      <span className="text-white font-semibold hidden md:inline">John Doe</span>
                      <span className="text-white font-semibold md:hidden">J D</span>
                    </div>
                    <button
                      onClick={() => setIsUserMenuOpen(false)}
                      className="w-10 h-10 rounded-full bg-[#003f88] hover:bg-[#003070] flex items-center justify-center text-white transition-colors"
                    >
                      <X size={20} strokeWidth={3} />
                    </button>
                  </div>

                  {/* Menu Items */}
                  <div className="flex-1 overflow-y-auto bg-[#00509d] p-6">
                    <div className="flex flex-col space-y-2">
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 py-2 px-2 text-white hover:bg-[#003f88] transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <circle cx="12" cy="8" r="5" />
                          <path d="M20 21a8 8 0 1 0-16 0" />
                        </svg>
                        <span className="text-lg">Profile</span>
                      </Link>
                      <Link
                        href="/dashboard/progress"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 py-2 px-2 text-white hover:bg-[#003f88] transition-colors"
                      >
                        <BarChart2 size={20} strokeWidth={2} className="text-white" />
                        <span className="text-lg">Progress</span>
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 py-2 px-2 text-white hover:bg-[#003f88] transition-colors"
                      >
                        <Settings size={20} strokeWidth={2} className="text-white" />
                        <span className="text-lg">Settings</span>
                      </Link>
                      <Link
                        href="/dashboard/adventure"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 py-2 px-2 text-white hover:bg-[#003f88] transition-colors"
                      >
                        <Rocket size={20} strokeWidth={2} className="text-white" />
                        <span className="text-lg">Adventure</span>
                      </Link>
                      <Link
                        href="/dashboard/downloads"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 py-2 px-2 text-white hover:bg-[#003f88] transition-colors"
                      >
                        <Download size={20} strokeWidth={2} className="text-white" />
                        <span className="text-lg">Downloads</span>
                      </Link>

                      <div className="border-t border-[#50adb6]/20 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 py-2 px-2 text-white hover:bg-[#e8594a]/20 transition-colors w-full text-left"
                      >
                        <LogOut size={20} strokeWidth={3} className="text-[#e8594a]" />
                        <span className="text-lg text-[#e8594a] font-bold">Logout</span>
                      </button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 bg-[#00509d] border-t border-[#fdc500]">
                    <p className="text-white/60 text-sm text-center">Space Math Quiz v1.0</p>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </nav>
      {/* Settings Confirmation Dialog */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent className="bg-[#00509d] border-[#003f88] text-white">
          <DialogHeader>
            <DialogTitle className="text-[#f6aa54] text-xl">Leave Quiz?</DialogTitle>
            <DialogDescription className="text-white/80">
              Going to settings will take you away from your current quiz. Your progress may not be saved.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setIsSettingsDialogOpen(false)}
              className="px-4 py-2 rounded-md bg-[#4f8a4c] text-white hover:bg-[#3d6b3a] transition-colors"
            >
              Stay in Quiz
            </button>
            <button
              onClick={handleGoToSettings}
              className="px-4 py-2 rounded-md bg-[#f6aa54] text-white hover:bg-[#e59843] transition-colors"
            >
              Go to Settings
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

