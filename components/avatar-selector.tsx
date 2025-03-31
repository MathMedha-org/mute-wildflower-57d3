"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

export const avatars = [
  {
    id: 1,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar1-wMHzrNtYtrgzNTcTsxTNtHGW3U4KgG.png",
    alt: "Professional avatar with navy suit",
  },
  {
    id: 2,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar2-Ly2i82iqKBltFT1EzQbMdx6dCa6PeI.png",
    alt: "Gradient silhouette avatar",
  },
  {
    id: 3,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar3-vMHJx4isI8kJrq39epp3qp7Kc1OXC2.png",
    alt: "Business avatar with blue shirt",
  },
  {
    id: 4,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar4-eScBjS588jVfVBQOKZl8N8QbInA9Mo.png",
    alt: "Cartoon avatar with glasses",
  },
  {
    id: 5,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar5-qPQLcqZGx6zbQFhWLblke88zeLjrpW.png",
    alt: "Minimal female avatar",
  },
  {
    id: 6,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar6-UzZUhyK7sbkDTIN3y5uuVgIigVI8Qy.png",
    alt: "Female avatar with coffee",
  },
  {
    id: 7,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar7.png-cDnzYaEvl0HEXM2lhisf5b3FPtQ7m7.jpeg",
    alt: "Anime-style female avatar",
  },
  {
    id: 8,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar8-Cy0sA5PeTw9ZBzYSJARGnQYVoOiTIY.png",
    alt: "Cartoon avatar with pigtails",
  },
  {
    id: 9,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar1-wMHzrNtYtrgzNTcTsxTNtHGW3U4KgG.png",
    alt: "Additional avatar 1",
  },
  {
    id: 10,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar2-Ly2i82iqKBltFT1EzQbMdx6dCa6PeI.png",
    alt: "Additional avatar 2",
  },
  {
    id: 11,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar3-vMHJx4isI8kJrq39epp3qp7Kc1OXC2.png",
    alt: "Additional avatar 3",
  },
  {
    id: 12,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar4-eScBjS588jVfVBQOKZl8N8QbInA9Mo.png",
    alt: "Additional avatar 4",
  },
]

interface AvatarSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (avatar: string) => void
  onSave: (avatar: string) => void
  currentAvatar?: string
}

export function AvatarSelector({ open, onOpenChange, onSelect, onSave, currentAvatar }: AvatarSelectorProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(currentAvatar)
  const [isSaving, setIsSaving] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleSelect = (avatar: string) => {
    setSelectedAvatar(avatar)
    onSelect(avatar)
  }

  const handleSave = () => {
    if (selectedAvatar) {
      setIsSaving(true)
      // Simulate saving delay
      setTimeout(() => {
        onSave(selectedAvatar)
        setIsSaving(false)
        onOpenChange(false)
      }, 800)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 sm:max-w-[600px] max-h-[85vh] md:max-h-[600px] flex flex-col">
        {/* Custom header with visible X button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-[#00509d]">Choose Your Avatar</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#00509d] text-white hover:bg-[#003d77] transition-colors"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Scrollable avatar grid */}
        <div className="flex-1 overflow-y-auto py-2 px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {avatars.map((avatar) => (
              <button
                key={avatar.id}
                className={cn(
                  "relative aspect-square rounded-full overflow-hidden border-2 transition-all hover:scale-105 max-w-[100px] mx-auto",
                  selectedAvatar === avatar.url
                    ? "border-[#00509d] ring-2 ring-[#00509d] ring-offset-2 ring-offset-white"
                    : "border-transparent hover:border-[#00509d]/50",
                )}
                onClick={() => handleSelect(avatar.url)}
              >
                <img src={avatar.url || "/placeholder.svg"} alt={avatar.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Fixed footer with Save button */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving || !selectedAvatar}
              className="px-6 py-2 bg-[#00509d] text-white rounded-lg hover:bg-[#003d77] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Avatar"
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

