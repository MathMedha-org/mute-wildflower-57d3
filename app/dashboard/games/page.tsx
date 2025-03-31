"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  const [activeTab, setActiveTab] = useState("challenges")

  const handleNavigation = () => {
    scrollToTop()
    router.push("/dashboard")
  }

  const navigateToSpaceQuiz = () => {
    scrollToTop()
    router.push("/dashboard/play/space-quiz")
  }

  return (
    <>
      <SpaceBackground />
      <div className="relative z-10 w-full min-h-screen">
        <div className="w-full sm:max-w-6xl sm:mx-auto pt-3 sm:pt-4 lg:pt-6 pb-8">
          <div className="space-y-8 bg-white p-6 rounded-xl">
            <div className="relative flex items-start justify-center">
              <button
                onClick={handleNavigation}
                className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#00509d] flex items-center justify-center text-white hover:bg-[#003f88] transition-colors"
              >
                <ArrowLeft size={20} strokeWidth={3} />
              </button>
              <div className="text-center mb-4 sm:mb-8 pt-8 sm:pt-0">
                <h1 className="text-3xl font-bold text-[#00509d]">Math Medha Games</h1>
                <p className="text-gray-600">Explore our collection of educational math games.</p>
              </div>
            </div>

            <Tabs defaultValue="challenges" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="live-games">Live Games</TabsTrigger>
              </TabsList>

              <TabsContent value="challenges" className="space-y-6 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 max-w-2xl mx-auto">
                  {/* Ultimate Challenge Card */}
                  <div onClick={navigateToSpaceQuiz} className="block group cursor-pointer">
                    <Card className="bg-[#4f8a4c] hover:bg-white border-2 border-transparent hover:border-[#4f8a4c] transition-all duration-300 h-full relative overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-white group-hover:!text-[#3d6b3a]">Ultimate Challenge</CardTitle>
                        <CardDescription className="text-white/90 group-hover:!text-[#3d6b3a]/90">
                          Test your mastery of all math operations in this ultimate galactic challenge
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[#4f8a4c]/20 flex items-center justify-center relative p-4">
                          <div className="flex items-center justify-center w-full h-full">
                            <img
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abacus-JQEnmB8dgkaCKrscBw7ge7scW7e5Ep.png"
                              alt="Abacus"
                              className="object-contain max-h-full"
                              style={{ maxWidth: "70%" }}
                            />
                            <div className="absolute right-8 bottom-8">
                              <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/operators-Yaq6pjakATBJQ79zc8kSo8Dl2HDE6N.png"
                                alt="Math Operators"
                                className="object-contain"
                                style={{ width: "120px", height: "120px" }}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="live-games" className="space-y-6 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* First Card */}
                  <div onClick={() => setIsCountdownOpen(true)} className="block group cursor-pointer">
                    <Card className="bg-[#00509d] hover:bg-white border-2 border-transparent hover:border-[#00509d] transition-all duration-300 h-full relative">
                      <CardHeader>
                        <CardTitle className="text-white group-hover:!text-[#00509d]">Math Astronaut</CardTitle>
                        <CardDescription className="text-white/90 group-hover:!text-[#00509d]/90">
                          Compete with your classmates in real-time math challenges
                        </CardDescription>
                      </CardHeader>
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold animate-pulse">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        LIVE
                      </div>
                      <CardContent>
                        <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[#00509d]/20 flex items-center justify-center p-1">
                          <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/astronaut-new-2-Z9x9M5EccqWTqSNwH02535f45A2WRS.png"
                            alt="Play with Class"
                            className="object-contain max-h-full"
                            style={{ maxWidth: "85%" }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Second Card */}
                  <div onClick={() => setIsSchoolCountdownOpen(true)} className="block group cursor-pointer">
                    <Card className="bg-[#fdc500] hover:bg-white border-2 border-transparent hover:border-[#fdc500] transition-all duration-300 h-full relative">
                      <CardHeader>
                        <CardTitle className="text-white group-hover:!text-[#fdc500]">Math Rocket</CardTitle>
                        <CardDescription className="text-white/90 group-hover:!text-[#fdc500]/90">
                          Join school-wide competitions and earn points for your grade
                        </CardDescription>
                      </CardHeader>
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold animate-pulse">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        LIVE
                      </div>
                      <CardContent>
                        <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[#fdc500]/20 flex items-center justify-center p-0">
                          <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rocket-new-2BzixeuqxamB0Zh9WfmAIuRfERzdRb.png"
                            alt="Play with School"
                            className="object-contain max-h-full"
                            style={{ maxWidth: "85%" }}
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
                </div>
              </TabsContent>
            </Tabs>
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
        color="#fdc500"
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

