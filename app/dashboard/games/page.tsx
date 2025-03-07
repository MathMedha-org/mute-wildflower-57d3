"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SpaceBackground } from "@/components/space-background"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CountdownOverlay } from "@/components/countdown-overlay"
import { scrollToTop } from "@/lib/scroll-manager"

export default function GamesPage() {
  const router = useRouter()
  const [isCountdownOpen, setIsCountdownOpen] = useState(false)
  const [isSchoolCountdownOpen, setIsSchoolCountdownOpen] = useState(false)
  const [isGalacticCountdownOpen, setIsGalacticCountdownOpen] = useState(false)

  const handleNavigation = () => {
    scrollToTop()
    router.push("/dashboard")
  }

  return (
    <>
      <SpaceBackground />
      <div className="relative z-10 w-full min-h-screen">
        <div className="w-full sm:max-w-6xl sm:mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto space-y-8 bg-[#0F283D] p-8 rounded-xl border border-[#50adb6]/20">
            <div className="relative flex items-start justify-center">
              <button
                onClick={handleNavigation}
                className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#50adb6] flex items-center justify-center text-white hover:bg-[#3d8a91] transition-colors"
              >
                <ArrowLeft size={20} strokeWidth={3} />
              </button>
              <div className="text-center mb-4 sm:mb-8 pt-8 sm:pt-0">
                <h1 className="text-3xl font-bold text-[#50adb6]">Math Medha Games</h1>
                <p className="text-white/80">Explore our collection of educational math games.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* First Card */}
              <div onClick={() => setIsCountdownOpen(true)} className="block group cursor-pointer">
                <Card className="bg-[#50adb6] hover:bg-white border-2 border-transparent hover:border-[#50adb6] transition-all duration-300 h-full relative">
                  <CardHeader>
                    <CardTitle className="text-white group-hover:!text-[#3d8a91]">Math Astronaut</CardTitle>
                    <CardDescription className="text-white/90 group-hover:!text-[#3d8a91]/90">
                      Compete with your classmates in real-time math challenges
                    </CardDescription>
                  </CardHeader>
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    LIVE
                  </div>
                  <CardContent>
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/astronaut-new-4T6Gx5zRELzWZ975ftU4bGoHrD4RHf.png"
                        alt="Play with Class"
                        className="object-cover w-full h-full bg-[#50adb6]/20"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Second Card */}
              <div onClick={() => setIsSchoolCountdownOpen(true)} className="block group cursor-pointer">
                <Card className="bg-[#f6aa54] hover:bg-white border-2 border-transparent hover:border-[#f6aa54] transition-all duration-300 h-full relative">
                  <CardHeader>
                    <CardTitle className="text-white group-hover:!text-[#e59843]">Math Rocket</CardTitle>
                    <CardDescription className="text-white/90 group-hover:!text-[#e59843]/90">
                      Join school-wide competitions and earn points for your grade
                    </CardDescription>
                  </CardHeader>
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    LIVE
                  </div>
                  <CardContent>
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rocket-new-2BzixeuqxamB0Zh9WfmAIuRfERzdRb.png"
                        alt="Play with School"
                        className="object-cover w-full h-full bg-[#f6aa54]/20"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Third Card */}
              <div onClick={() => setIsGalacticCountdownOpen(true)} className="block group cursor-pointer">
                <Card className="bg-[#e8594a] hover:bg-white border-2 border-transparent hover:border-[#e8594a] transition-all duration-300 h-full relative">
                  <CardHeader>
                    <CardTitle className="text-white group-hover:!text-[#d64a3d]">Math Constellation</CardTitle>
                    <CardDescription className="text-white/90 group-hover:!text-[#d64a3d]/90">
                      Challenge students from around the world in global games
                    </CardDescription>
                  </CardHeader>
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    LIVE
                  </div>
                  <CardContent>
                    <div className="aspect-[16/10] rounded-lg overflow-hidden">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/constellation-new-3-lHodsCd4VPqdm3rkUOToMFTcxYXtpb.png"
                        alt="Play with Globe"
                        className="object-contain w-full h-full bg-[#e8594a]/20"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Fourth Card - Math Explorer with Ribbon */}
              <div onClick={() => router.push("/dashboard/play/space-quiz")} className="block group cursor-pointer">
                <Card className="bg-[#4f8a4c] hover:bg-white border-1 border-transparent hover:border-[#4f8a4c] transition-all duration-300 h-full relative overflow-hidden">
                  {/* Ribbon */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="relative">
                      {/* Ribbon background */}
                      <div className="absolute -right-[40px] top-[22px] w-[170px] h-[30px] bg-[#f6aa54] shadow-md transform rotate-45"></div>
                      {/* Ribbon text */}
                      <div className="absolute -right-[30px] top-[25px] w-[150px] text-center transform rotate-45">
                        <span className="text-white text-base font-bold pl-4">Play for Rank</span>
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-white group-hover:!text-[#3d6b3a]">Math Rank Explorer</CardTitle>
                    <CardDescription className="text-white/90 group-hover:!text-[#3d6b3a]/90">
                      Play and explore where you are in the space of Math Medha world
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[16/10] rounded-lg overflow-hidden">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/explore-S9QRdbXMv3X04eoZbDXZw3En87PKk7.png"
                        alt="Math Explorer"
                        className="object-contain w-full h-full bg-[#4f8a4c]/20"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CountdownOverlay
        isOpen={isCountdownOpen}
        onOpenChange={setIsCountdownOpen}
        redirectPath="/dashboard/play/space-quiz"
      />
      <CountdownOverlay
        isOpen={isSchoolCountdownOpen}
        onOpenChange={setIsSchoolCountdownOpen}
        title="Launching a school-wide mission..."
        subtitle="Your schoolmates are getting ready. The journey begins!"
        studentsCount={50}
        redirectPath="/dashboard/play/space-quiz"
        color="#f6aa54"
      />
      <CountdownOverlay
        isOpen={isGalacticCountdownOpen}
        onOpenChange={setIsGalacticCountdownOpen}
        title="Entering the galactic challenge..."
        subtitle="Students across the universe await. Let's go!"
        studentsCount={100}
        redirectPath="/dashboard/play/space-quiz"
        color="#e8594a"
      />
    </>
  )
}

