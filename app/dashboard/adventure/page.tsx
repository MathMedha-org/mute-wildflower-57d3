"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Star, Award, Zap, Play } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

import { AnimatedCharacter } from "@/components/animated-character"
import { ParticleBackground } from "@/components/particle-background"

// Update the adventure stations data to organize into worlds with themes
const adventureStations = [
  {
    id: 1,
    name: "Math Village",
    type: "start",
    world: "village",
    description: "Begin your mathematical adventure in this friendly village!",
    position: { x: 10, y: 50 },
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/village-start-KJHGFDSAqwertyuiop.png",
    unlocked: true,
    completed: true,
    starCost: 0,
    badgeCost: 0,
  },
  {
    id: 2,
    name: "Number Farm",
    type: "station",
    world: "village",
    description: "Practice basic addition and subtraction with farm animals!",
    position: { x: 20, y: 40 },
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/farm-math-POIUYTREWQasdfghjkl.png",
    unlocked: true,
    completed: true,
    starCost: 5,
    badgeCost: 0,
  },
  {
    id: 3,
    name: "Counting Castle",
    type: "station",
    world: "village",
    description: "Count your way through the royal castle challenges!",
    position: { x: 30, y: 55 },
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/castle-math-ZXCVBNMasdfghjkl.png",
    unlocked: true,
    completed: false,
    starCost: 10,
    badgeCost: 0,
  },
  {
    id: 4,
    name: "Village Guardian",
    type: "challenge",
    world: "village",
    description: "Prove your math skills to the Village Guardian!",
    position: { x: 40, y: 45 },
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/guardian-math-QWERTYUIOPasdfgh.png",
    unlocked: false,
    completed: false,
    starCost: 15,
    badgeCost: 0,
  },
  {
    id: 5,
    name: "Space Gateway",
    type: "portal",
    world: "space",
    description: "Enter the Space World with your first badge!",
    position: { x: 50, y: 50 },
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/space-portal-ASDFGHJKLzxcvbnm.png",
    unlocked: false,
    completed: false,
    starCost: 20,
    badgeCost: 1,
  },
  {
    id: 6,
    name: "Rocket Launch Pad",
    type: "station",
    world: "space",
    description: "Blast off with multiplication challenges!",
    position: { x: 60, y: 40 },
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rocket-new-1-oWuUbYpXqOhLlEdxvVEK81OeCfQGqw.png",
    unlocked: false,
    completed: false,
    starCost: 25,
    badgeCost: 1,
  },
  {
    id: 7,
    name: "Asteroid Belt",
    type: "station",
    world: "space",
    description: "Navigate through division puzzles in the asteroid field.",
    position: { x: 70, y: 55 },
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/asteroid-math-QWERTYUIOPzxcvbn.png",
    unlocked: false,
    completed: false,
    starCost: 30,
    badgeCost: 1,
  },
  {
    id: 8,
    name: "Alien Academy",
    type: "challenge",
    world: "space",
    description: "Learn advanced math from friendly aliens!",
    position: { x: 80, y: 45 },
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alien-math-ZXCVBNMqwertyuio.png",
    unlocked: false,
    completed: false,
    starCost: 40,
    badgeCost: 1,
  },
  {
    id: 9,
    name: "Ocean Portal",
    type: "portal",
    world: "ocean",
    description: "Dive into the Ocean World with your second badge!",
    position: { x: 90, y: 50 },
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ocean-portal-POIUYTREWQlkjhgf.png",
    unlocked: false,
    completed: false,
    starCost: 50,
    badgeCost: 2,
  },
  {
    id: 10,
    name: "Coral Reef",
    type: "station",
    world: "ocean",
    description: "Solve fraction problems among the colorful coral!",
    position: { x: 20, y: 75 },
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coral-math-ASDFGHJKLpoiuytr.png",
    unlocked: false,
    completed: false,
    starCost: 60,
    badgeCost: 2,
  },
  {
    id: 11,
    name: "Sunken Ship",
    type: "station",
    world: "ocean",
    description: "Discover decimal treasures in the ancient shipwreck!",
    position: { x: 30, y: 85 },
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ship-math-QWERTYUIOPasdfgh.png",
    unlocked: false,
    completed: false,
    starCost: 70,
    badgeCost: 2,
  },
  {
    id: 12,
    name: "Kraken's Lair",
    type: "challenge",
    world: "ocean",
    description: "Face the mighty Kraken with your math skills!",
    position: { x: 40, y: 75 },
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kraken-math-ZXCVBNMasdfghjkl.png",
    unlocked: false,
    completed: false,
    starCost: 80,
    badgeCost: 2,
  },
]

// Player data (would come from backend in a real app)
const playerData = {
  stars: 135,
  badges: 3,
  currentStation: 3,
  completedStations: [1, 2],
}

export default function AdventurePage() {
  const router = useRouter()
  const [selectedStation, setSelectedStation] = useState<number | null>(null)
  const [mapScale, setMapScale] = useState(1)
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false)
  const [playerStats, setPlayerStats] = useState(playerData)
  const [showNotEnoughResources, setShowNotEnoughResources] = useState(false)

  // Character movement state
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 })
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)

  // Initialize character position
  useEffect(() => {
    const currentStation = adventureStations.find((s) => s.id === playerData.currentStation)
    if (currentStation) {
      const pos = getStationScreenPosition(currentStation.position)
      setCharacterPosition(pos)
      setTargetPosition(pos)
    }
  }, [])

  // Convert map position to screen position
  const getStationScreenPosition = (position: { x: number; y: number }) => {
    const screenX = (position.x / 100) * window.innerWidth
    const screenY = (position.y / 100) * window.innerHeight
    return { x: screenX, y: screenY }
  }

  // Handle station click with character movement
  const handleStationClick = (stationId: number) => {
    const station = stations.find((s) => s.id === stationId)
    if (!station) return

    if (!station.unlocked) {
      console.log(`Station ${stationId} (${station.name}) is locked`)
      return
    }

    console.log(`Clicked on station ${stationId} (${station.name})`)
    setSelectedStation(stationId)
    setShowNotEnoughResources(false)

    // Move character to the clicked station
    const newPosition = getStationScreenPosition(station.position)
    setTargetPosition(newPosition)
    setIsMoving(true)
  }

  // Handle character arrival
  const handleCharacterArrival = () => {
    setIsMoving(false)
    setCharacterPosition(targetPosition)
  }

  // Update station status based on player data and resources
  const stations = adventureStations.map((station) => {
    // Check if player has enough resources
    const hasEnoughResources = playerStats.stars >= station.starCost && playerStats.badges >= station.badgeCost

    // Station is unlocked if player has enough resources OR it's already completed
    // OR it's the next station after the current one
    const isUnlocked =
      hasEnoughResources ||
      playerStats.completedStations.includes(station.id) ||
      station.id === 1 || // First station is always unlocked
      (station.id === playerStats.currentStation + 1 && hasEnoughResources)

    return {
      ...station,
      unlocked: isUnlocked,
      completed: playerStats.completedStations.includes(station.id),
    }
  })

  // Handle proceed to next station
  const handleProceedToStation = (stationId: number) => {
    const station = stations.find((s) => s.id === stationId)
    if (!station) return

    // Check if player has enough resources
    if (playerStats.stars >= station.starCost && playerStats.badges >= station.badgeCost) {
      // Deduct resources
      const newPlayerStats = {
        ...playerStats,
        stars: playerStats.stars - station.starCost,
        badges: playerStats.badges - station.badgeCost,
        currentStation: Math.max(playerStats.currentStation, stationId),
        completedStations: [...playerStats.completedStations, stationId],
      }

      // Update player stats
      setPlayerStats(newPlayerStats)

      // Show unlock animation
      setShowUnlockAnimation(true)

      // After animation, close the panel
      setTimeout(() => {
        setShowUnlockAnimation(false)
        setSelectedStation(null)
      }, 2000)
    } else {
      // Show not enough resources message
      setShowNotEnoughResources(true)
    }
  }

  // Navigate to quiz page to earn more stars/badges
  const handlePlayQuiz = () => {
    router.push("/dashboard/play/space-quiz")
  }

  // Handle map drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - mapPosition.x, y: e.clientY - mapPosition.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setMapPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle zoom
  const handleZoomIn = () => {
    setMapScale((prev) => Math.min(prev + 0.1, 1.5))
  }

  const handleZoomOut = () => {
    setMapScale((prev) => Math.max(prev - 0.1, 0.5))
  }

  // Reset map position
  const resetMapPosition = () => {
    setMapPosition({ x: 0, y: 0 })
    setMapScale(1)
  }

  return (
    <div className="w-full min-h-screen bg-[#0F283D] relative overflow-hidden pt-3 sm:pt-4 lg:pt-6">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Animated Character */}
      <AnimatedCharacter
        currentPosition={characterPosition}
        targetPosition={targetPosition}
        isMoving={isMoving}
        onArrival={handleCharacterArrival}
      />

      {/* Header - Fixed below main header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-16 left-0 right-0 z-20 bg-[#0F283D]/90 backdrop-blur-sm border-b border-[#50adb6]/30 p-4 flex justify-between items-center"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="w-10 h-10 rounded-full bg-[#50adb6] flex items-center justify-center text-white hover:bg-[#3d8a91] transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Math Adventure Quest</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#0F283D] border border-[#f6aa54]/30 rounded-lg px-3 py-1">
            <Star className="h-5 w-5 text-[#f6aa54]" fill="#f6aa54" />
            <span className="text-white font-bold">{playerStats.stars}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#0F283D] border border-[#e8594a]/30 rounded-lg px-3 py-1">
            <Award className="h-5 w-5 text-[#e8594a]" fill="#e8594a" />
            <span className="text-white font-bold">{playerStats.badges}</span>
          </div>
        </div>
      </motion.div>

      {/* World Legend with animation */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="fixed top-36 left-4 z-10 bg-[#0F283D]/80 backdrop-blur-sm border border-[#50adb6]/30 rounded-lg p-3"
      >
        <h3 className="text-[#50adb6] font-bold mb-2 text-sm">Worlds</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#4CAF50]"></div>
            <span className="text-white text-xs">Math Village</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#50adb6]"></div>
            <span className="text-white text-xs">Space World</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#f6aa54]"></div>
            <span className="text-white text-xs">Ocean World</span>
          </div>
        </div>
      </motion.div>

      {/* Map Controls with animation */}
      <motion.div initial={{ x: 100 }} animate={{ x: 0 }} className="fixed top-36 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 rounded-full bg-[#50adb6] flex items-center justify-center text-white hover:bg-[#3d8a91] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
            <path d="M11 8v6" />
            <path d="M8 11h6" />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 rounded-full bg-[#50adb6] flex items-center justify-center text-white hover:bg-[#3d8a91] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
            <path d="M8 11h6" />
          </svg>
        </button>
        <button
          onClick={resetMapPosition}
          className="w-10 h-10 rounded-full bg-[#50adb6] flex items-center justify-center text-white hover:bg-[#3d8a91] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </motion.div>

      {/* Adventure Map */}
      <div
        className="w-full h-screen pt-32 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <motion.div
          className="relative w-full h-full bg-cover bg-center"
          style={{
            transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapScale})`,
            backgroundImage:
              "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/space-background-new-MNBVCXZlkjhgfdsa.jpg')",
          }}
        >
          {/* World Regions with glow effect */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <div className="absolute top-[30%] left-[5%] w-[40%] h-[30%] rounded-[50%] bg-[#4CAF50]/10 border-2 border-[#4CAF50]/30 animate-pulse"></div>
            <div className="absolute top-[30%] left-[45%] w-[40%] h-[30%] rounded-[50%] bg-[#50adb6]/10 border-2 border-[#50adb6]/30 animate-pulse"></div>
            <div className="absolute top-[65%] left-[5%] w-[40%] h-[30%] rounded-[50%] bg-[#f6aa54]/10 border-2 border-[#f6aa54]/30 animate-pulse"></div>
          </div>

          {/* Path between stations */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#50adb6" />
              </marker>
            </defs>
            {stations.map((station, index) => {
              if (index === 0) return null
              const prevStation = stations[index - 1]

              // Different colors for different worlds
              let pathColor = "#4CAF50" // Village default
              if (station.world === "space") pathColor = "#50adb6"
              if (station.world === "ocean") pathColor = "#f6aa54"

              return (
                <g key={`path-${station.id}`}>
                  <path
                    d={`M${prevStation.position.x} ${prevStation.position.y} L${station.position.x} ${station.position.y}`}
                    stroke={station.unlocked ? pathColor : `${pathColor}30`}
                    strokeWidth="2"
                    strokeDasharray={station.unlocked ? "none" : "5,5"}
                    markerEnd="url(#arrowhead)"
                    className={station.unlocked ? "opacity-100" : "opacity-30"}
                  />
                </g>
              )
            })}
          </svg>

          {/* Stations with hover effects */}
          {stations.map((station) => {
            // Set color based on world
            let worldColor = "#4CAF50" // Village default
            if (station.world === "space") worldColor = "#50adb6"
            if (station.world === "ocean") worldColor = "#f6aa54"

            return (
              <motion.div
                key={station.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                  station.unlocked ? "opacity-100" : "opacity-50 grayscale",
                  selectedStation === station.id ? "z-20" : "z-10",
                  !station.unlocked && "grayscale",
                )}
                style={{
                  left: `${station.position.x}%`,
                  top: `${station.position.y}%`,
                }}
                onClick={() => handleStationClick(station.id)}
              >
                {/* Station Icon */}
                <div
                  className={cn(
                    "relative w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110",
                    station.completed
                      ? `bg-${worldColor}/20 border-4 border-${worldColor}`
                      : station.unlocked
                        ? `bg-${worldColor}/20 border-4 border-${worldColor}`
                        : "bg-gray-500/20 border-4 border-gray-500",
                  )}
                  style={{
                    backgroundColor: station.completed
                      ? `${worldColor}20`
                      : station.unlocked
                        ? `${worldColor}20`
                        : "rgba(107, 114, 128, 0.2)",
                    borderColor: station.completed ? worldColor : station.unlocked ? worldColor : "rgb(107, 114, 128)",
                  }}
                >
                  <img
                    src={station.imageUrl || "/placeholder.svg"}
                    alt={station.name}
                    className="w-16 h-16 object-contain"
                  />
                  {station.completed && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#4CAF50] rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                  )}
                  {station.type === "challenge" && (
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#e8594a] rounded-full flex items-center justify-center">
                      <Zap size={16} className="text-white" />
                    </div>
                  )}
                  {station.type === "portal" && (
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#9c27b0] rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="m16 12-4-4-4 4 4 4 4-4Z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Station Name */}
                <div className="mt-2 text-center">
                  <div
                    className="px-2 py-1 rounded text-white font-medium text-sm"
                    style={{
                      backgroundColor: station.completed
                        ? worldColor
                        : station.unlocked
                          ? worldColor
                          : "rgb(107, 114, 128)",
                    }}
                  >
                    {station.name}
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    {station.starCost > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-[#f6aa54]" fill="#f6aa54" />
                        <span className="text-white text-xs">{station.starCost}</span>
                      </div>
                    )}
                    {station.badgeCost > 0 && (
                      <div className="flex items-center gap-1">
                        <Award className="h-3 w-3 text-[#e8594a]" fill="#e8594a" />
                        <span className="text-white text-xs">{station.badgeCost}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Station Details Panel with slide-up animation */}
      <AnimatePresence>
        {selectedStation && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute bottom-0 left-0 right-0 bg-[#0F283D]/90 backdrop-blur-sm border-t border-[#50adb6] p-6 z-30"
          >
            {stations.map((station) => {
              if (station.id !== selectedStation) return null

              // Set color based on world
              let worldColor = "#4CAF50" // Village default
              if (station.world === "space") worldColor = "#50adb6"
              if (station.world === "ocean") worldColor = "#f6aa54"

              // Check if player has enough resources
              const hasEnoughResources =
                playerStats.stars >= station.starCost && playerStats.badges >= station.badgeCost

              return (
                <div key={`detail-${station.id}`} className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div
                      className="w-32 h-32 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: station.completed ? `${worldColor}20` : `${worldColor}20`,
                        borderWidth: "4px",
                        borderStyle: "solid",
                        borderColor: station.completed ? worldColor : worldColor,
                      }}
                    >
                      <img
                        src={station.imageUrl || "/placeholder.svg"}
                        alt={station.name}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-bold text-white">{station.name}</h2>
                          <div
                            className="px-2 py-0.5 rounded text-xs font-medium text-white"
                            style={{ backgroundColor: worldColor }}
                          >
                            {station.world.charAt(0).toUpperCase() + station.world.slice(1)} World
                          </div>
                        </div>
                        <p className="text-white/70 mt-1">{station.description}</p>
                      </div>
                      <button
                        onClick={() => setSelectedStation(null)}
                        className="w-8 h-8 rounded-full bg-[#50adb6]/20 flex items-center justify-center text-[#50adb6] hover:bg-[#50adb6]/30"
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
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-4 p-4 bg-[#0F283D] border border-[#50adb6]/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
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
                          className="text-[#50adb6]"
                        >
                          <path d="M12 2H2v10h10V2Z" />
                          <path d="M22 12h-10v10h10V12Z" />
                          <path d="M12 12H2v10h10V12Z" />
                          <path d="M22 2h-10v10h10V2Z" />
                        </svg>
                        <h3 className="text-lg font-medium text-[#50adb6]">Requirements</h3>
                      </div>
                      <div className="space-y-2">
                        {station.starCost > 0 && (
                          <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-[#f6aa54]" fill="#f6aa54" />
                            <span className="text-white">
                              {playerStats.stars >= station.starCost ? (
                                <span className="flex items-center gap-2">
                                  {station.starCost} stars <span className="text-[#4CAF50]">(✓)</span>
                                </span>
                              ) : (
                                <span className="flex items-center gap-2">
                                  {station.starCost} stars{" "}
                                  <span className="text-red-500">(you have {playerStats.stars})</span>
                                </span>
                              )}
                            </span>
                          </div>
                        )}
                        {station.badgeCost > 0 && (
                          <div className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-[#e8594a]" fill="#e8594a" />
                            <span className="text-white">
                              {playerStats.badges >= station.badgeCost ? (
                                <span className="flex items-center gap-2">
                                  {station.badgeCost} badges <span className="text-[#4CAF50]">(✓)</span>
                                </span>
                              ) : (
                                <span className="flex items-center gap-2">
                                  {station.badgeCost} badges{" "}
                                  <span className="text-red-500">(you have {playerStats.badges})</span>
                                </span>
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    {showUnlockAnimation && (
                      <div className="mt-4 p-4 bg-[#4CAF50]/20 border border-[#4CAF50] rounded-lg">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#4CAF50] mb-2">Station Unlocked!</div>
                          <div className="text-white">You can now proceed to the next part of your adventure!</div>
                        </div>
                      </div>
                    )}
                    {showNotEnoughResources && (
                      <div className="mt-4 p-4 bg-[#e8594a]/20 border border-[#e8594a] rounded-lg">
                        <div className="text-center">
                          <div className="text-xl font-bold text-[#e8594a] mb-2">Not Enough Resources!</div>
                          <div className="text-white mb-4">You need more stars or badges to unlock this station.</div>
                          <button
                            onClick={handlePlayQuiz}
                            className="px-6 py-3 bg-[#f6aa54] text-white rounded-lg hover:bg-[#e59843] transition-colors flex items-center gap-2 mx-auto"
                          >
                            <Play size={20} />
                            <span>Play Quiz to Earn More</span>
                          </button>
                        </div>
                      </div>
                    )}
                    {station.completed ? (
                      <div className="mt-4 p-4 bg-[#4CAF50]/10 border border-[#4CAF50]/30 rounded-lg">
                        <div className="flex items-center gap-2">
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
                            className="text-[#4CAF50]"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span className="text-[#4CAF50] font-medium">Station Completed</span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 flex justify-end">
                        {hasEnoughResources ? (
                          <button
                            onClick={() => handleProceedToStation(station.id)}
                            className="px-6 py-3 bg-[#50adb6] text-white rounded-lg hover:bg-[#3d8a91] transition-colors flex items-center gap-2"
                          >
                            <span>Proceed</span>
                            <ChevronRight size={20} />
                          </button>
                        ) : (
                          <button
                            onClick={() => setShowNotEnoughResources(true)}
                            className="px-6 py-3 bg-[#50adb6]/30 text-white/50 rounded-lg cursor-pointer flex items-center gap-2"
                          >
                            <span>Need More Resources</span>
                            <ChevronRight size={20} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

