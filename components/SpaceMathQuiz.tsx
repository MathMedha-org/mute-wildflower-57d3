"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState, useEffect, useMemo, useRef } from "react"
import { useQuiz } from "@/contexts/quiz-context"

const allPlanets = [
  {
    name: "Mercury",
    size: 100,
    imageUrl: "/images/PlanetMercury-new.png",
  },
  {
    name: "Venus",
    size: 100,
    imageUrl: "/images/PlanetVenus-new.png",
  },
  {
    name: "Earth",
    size: 100,
    imageUrl: "/images/PlanetEarth-new.png",
  },
  {
    name: "Moon",
    size: 100,
    imageUrl: "/images/moon.png",
  },
  {
    name: "Mars",
    size: 100,
    imageUrl: "/images/planetMars-new.png",
  },
  {
    name: "Jupiter",
    size: 100,
    imageUrl: "/images/PlanetJupiter-new.png",
  },
  {
    name: "Saturn",
    size: 100,
    imageUrl: "/images/planetSaturn-new.png",
  },
  {
    name: "Uranus",
    size: 100,
    imageUrl: "/images/planetUranus-new.png",
  },
  {
    name: "Neptune",
    size: 100,
    imageUrl: "/images/PlanetNeptune-new.png",
  },
  {
    name: "Pluto",
    size: 100,
    imageUrl: "/images/PlanetPluto-new.png",
  },
]

const badges = [
  "/images/badge2.png",
  "/images/badge3.png",
  "/images/badge4.png",
  "/images/badge5.png",
  "/images/badge6.png",
]

const generateStars = (count: number) => {
  return Array.from({ length: count }, () => {
    const starChar = Math.random() > 0.5 ? "★" : "☆"
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? "#FFFFFF" : "#87CEEB",
      type: "dot",
      content: starChar,
    }
  })
}

const generateQuestion = () => {
  // Generate random numbers between 1 and 12 for both factors
  const num1 = 1
  const num2 = 1
  return {
    display: `${num1} × ${num2}`,
    speech: `${num1} times ${num2}`,
  }
}

const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

const isPositionSafe = (x: number, y: number, existingElements: Array<{ x: number; y: number }>) => {
  const minDistance = 150 // Minimum safe distance between elements
  return existingElements.every((element) => calculateDistance(x, y, element.x, element.y) >= minDistance)
}

export default function SpaceMathQuiz() {
  const { isKeypadVisible, isMuted, setIsMuted } = useQuiz()
  const router = useRouter()
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [nextQuestion, setNextQuestion] = useState("")
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [viewBoxSize, setViewBoxSize] = useState(() => {
    if (typeof window !== "undefined") {
      return Math.max(window.innerWidth, window.innerHeight)
    }
    return 600 // Default fallback
  })
  const [orbitScale, setOrbitScale] = useState(1)
  const [showFireworks, setShowFireworks] = useState(false)
  const [fireworksVisible, setFireworksVisible] = useState(false)
  const [availablePlanets, setAvailablePlanets] = useState([]) // Start with no planets
  const [goldenStars, setGoldenStars] = useState<Array<{ x: number; y: number; blinking: boolean }>>([])
  const [orderedPlanets] = useState(() => allPlanets) //Fixed: declared orderedPlanets
  const stars = useMemo(() => generateStars(40), [])
  const inputRef = useRef<HTMLInputElement>(null)
  const galaxyRef = useRef<HTMLDivElement>(null)
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null)
  const [showWelcome, setShowWelcome] = useState(true)
  const welcomeAnimationsRef = useRef<SVGAnimateElement[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Add new helper function to calculate planet positions
  const calculatePlanetPosition = (index: number, totalPlanets: number) => {
    // Calculate position on orbit
    const orbitRadius = 0.35 // Radius of orbit as percentage of viewBox
    const angleStep = (2 * Math.PI) / totalPlanets // Divide circle evenly
    const angle = angleStep * index

    // Calculate position on orbit with offset from center
    const x = 0.5 + orbitRadius * Math.cos(angle)
    const y = 0.5 + orbitRadius * Math.sin(angle)

    return { x, y, revealed: false }
  }

  // Initialize planet positions with calculated positions
  const [planetPositions, setPlanetPositions] = useState(() =>
    allPlanets.map((_, index) => ({ ...calculatePlanetPosition(index, allPlanets.length), revealed: false })),
  )

  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0)
  const [showBadge, setShowBadge] = useState(false)
  const [currentBadge, setCurrentBadge] = useState("")
  const [earnedBadges, setEarnedBadges] = useState<Array<{ x: number; y: number; badge: string }>>([])

  // Add new helper function to calculate grid positions
  const calculateBadgePosition = (index: number) => {
    const gridSize = Math.ceil(Math.sqrt(badges.length))
    const cellSize = viewBoxSize / gridSize
    const padding = 100

    // Get all existing element positions (planets and badges)
    const existingElements = [
      ...planetPositions
        .filter((pos) => pos.revealed)
        .map((pos) => ({
          x: pos.x * viewBoxSize,
          y: pos.y * viewBoxSize,
        })),
      ...earnedBadges.map((badge) => ({
        x: badge.x,
        y: badge.y,
      })),
    ]

    // Try positions in a spiral pattern until we find a safe spot
    const spiralSearch = (startX: number, startY: number) => {
      let angle = 0
      let radius = 50
      while (radius < viewBoxSize / 2) {
        const testX = startX + radius * Math.cos(angle)
        const testY = startY + radius * Math.sin(angle)

        // Check if position is within bounds and safe
        if (
          testX >= padding &&
          testX <= viewBoxSize - padding &&
          testY >= padding &&
          testY <= viewBoxSize - padding &&
          isPositionSafe(testX, testY, existingElements)
        ) {
          return { x: testX, y: testY }
        }

        angle += Math.PI / 8
        if (angle >= Math.PI * 2) {
          angle = 0
          radius += 50
        }
      }
      return { x: startX, y: startY } // Fallback to original position
    }

    // Calculate initial grid position
    const row = Math.floor(index / gridSize)
    const col = index % gridSize
    const x = padding + (col * (viewBoxSize - 2 * padding)) / (gridSize - 1)
    const y = padding + (row * (viewBoxSize - 2 * padding)) / (gridSize - 1)

    // Find safe position using spiral search
    const safePosition = spiralSearch(x, y)
    return safePosition
  }

  useEffect(() => {
    const initialQuestion = generateQuestion()
    const initialNextQuestion = generateQuestion()
    setQuestion(initialQuestion.display)
    setNextQuestion(initialNextQuestion.display)
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Navigate to results page when timer hits 0
          router.push("/dashboard/results")
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      speechSynthesisRef.current = window.speechSynthesis

      const initSpeech = () => {
        if (speechSynthesisRef.current) {
          const voices = speechSynthesisRef.current.getVoices()
          if (voices.length > 0) {
            readQuestion(initialQuestion.speech)
          } else {
            window.speechSynthesis.onvoiceschanged = () => {
              readQuestion(initialQuestion.speech)
              window.speechSynthesis.onvoiceschanged = null
            }
          }
        }
      }

      initSpeech()
      setTimeout(initSpeech, 1000)
    }

    return () => {
      clearInterval(timer)
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel()
      }
    }
  }, [router])

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      speechSynthesisRef.current = window.speechSynthesis
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (galaxyRef.current) {
        const { width, height } = galaxyRef.current.getBoundingClientRect()
        const size = Math.max(width, height)
        setViewBoxSize(size)

        const minDimension = Math.min(width, height)
        const baseSize = 800
        const newScale = Math.max(0.5, Math.min(1, minDimension / baseSize))
        setOrbitScale(newScale)
      }
    }

    // Call immediately for initial sizing
    handleResize()

    // Add small delay to ensure proper calculation after DOM is ready
    const timeoutId = setTimeout(() => {
      handleResize()
      setIsLoading(false)
    }, 100)

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (question && !isMuted) {
      readQuestion(question)
    }
  }, [question, isMuted])

  const readQuestion = (text: string) => {
    if (speechSynthesisRef.current && !isMuted) {
      speechSynthesisRef.current.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      const voices = speechSynthesisRef.current.getVoices()
      utterance.voice = voices.find((voice) => voice.lang === "en-US") || null
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 1
      speechSynthesisRef.current.speak(utterance)
    }
  }

  const handleSubmit = () => {
    if (answer.trim() === "") {
      return
    }

    // Trigger welcome message fade out on first answer submission
    if (showWelcome && answer.trim() !== "") {
      welcomeAnimationsRef.current.forEach((anim) => {
        if (anim) {
          anim.beginElement()
        }
      })
      // Set timeout to match animation duration before removing from DOM
      setTimeout(() => {
        setShowWelcome(false)
      }, 1000)
    }

    const [num1, num2] = question.split("×").map((num) => Number.parseFloat(num.trim()))
    setTotalQuestions((prev) => prev + 1)

    if (num1 * num2 === Number.parseFloat(answer)) {
      setScore((prevScore) => prevScore + 1)
      const newConsecutiveCount = consecutiveCorrect + 1
      // Only add a badge when exactly hitting 5 consecutive correct answers
      if (newConsecutiveCount === 5) {
        const randomBadge = badges[Math.floor(Math.random() * badges.length)]
        const newPosition = calculateBadgePosition(earnedBadges.length)
        // Only add the badge if we found a safe position
        if (newPosition) {
          setEarnedBadges([
            ...earnedBadges,
            {
              x: newPosition.x,
              y: newPosition.y,
              badge: randomBadge,
            },
          ])
        }
        setConsecutiveCorrect(0) // Reset consecutive count
      } else {
        setConsecutiveCorrect(newConsecutiveCount)
      }
      setCorrectAnswers((prev) => {
        const newCorrectAnswers = prev + 1

        // Add golden star every 5 correct answers
        if (newCorrectAnswers % 5 === 0) {
          setGoldenStars((prevStars) => [
            ...prevStars,
            {
              x: Math.random() * 100,
              y: Math.random() * 100,
              blinking: true,
            },
          ])
        }

        // Add new planet every 10 correct answers, but only if we don't already have this planet
        if (newCorrectAnswers % 10 === 0 && availablePlanets.length < allPlanets.length) {
          const nextPlanetIndex = availablePlanets.length
          if (nextPlanetIndex < orderedPlanets.length) {
            // First update the planet positions
            setPlanetPositions((prev) =>
              prev.map((pos, idx) => ({
                ...pos,
                revealed: idx <= nextPlanetIndex,
              })),
            )

            // Then update the available planets array, but only add the new planet
            setAvailablePlanets((prev) => {
              // Only add if this planet isn't already in the array
              if (prev.length === nextPlanetIndex) {
                return [...prev, orderedPlanets[nextPlanetIndex]]
              }
              return prev
            })
          }
        }

        // Set initial fireworks state when all planets are unlocked (at 100 correct answers)
        if (newCorrectAnswers === 100) {
          setShowFireworks(true)
          setFireworksVisible(true)
        }

        // If fireworks are enabled, make them visible on correct answer
        if (showFireworks) {
          setFireworksVisible(true)
        }

        return newCorrectAnswers
      })
    } else {
      // Reset consecutive correct answers on wrong answer
      setConsecutiveCorrect(0)
      // Hide fireworks on wrong answer if they're enabled
      if (showFireworks) {
        setFireworksVisible(false)
      }
    }

    setQuestion(nextQuestion)
    const newNextQ = generateQuestion()
    setNextQuestion(newNextQ.display)
    if (!isMuted) {
      readQuestion(newNextQ.speech)
    }
    setAnswer("")
  }

  const handleKeypadClick = (value: string) => {
    if (value === "submit") {
      handleSubmit()
    } else if (value === "delete") {
      setAnswer((prev) => prev.slice(0, -1))
    } else {
      setAnswer((prev) => {
        if (value === "." && prev.includes(".")) {
          return prev
        }
        if (value === "-" && prev === "") {
          return "-"
        }
        if (value === "-" && prev !== "") {
          return prev
        }
        return prev + value
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()
    if (e.key === "Enter") {
      handleSubmit()
    } else if (e.key === "Backspace") {
      setAnswer((prev) => prev.slice(0, -1))
    } else if (/^[0-9.-]$/.test(e.key)) {
      setAnswer((prev) => {
        if (e.key === "." && prev.includes(".")) {
          return prev
        }
        if (e.key === "-" && prev === "") {
          return "-"
        }
        if (e.key === "-" && prev !== "") {
          return prev
        }
        return prev + e.key
      })
    }
  }

  const Fireworks = () => {
    return (
      <g>
        {[...Array(20)].map((_, i) => {
          const x = Math.random() * viewBoxSize
          const y = Math.random() * viewBoxSize
          const radius = Math.random() * 5 + 2
          return (
            <circle key={i} cx={x} cy={y} r={radius} fill={`hsl(${Math.random() * 360}, 100%, 50%)`} opacity={0.7}>
              <animate
                attributeName="opacity"
                values="0.7;0"
                dur="1s"
                repeatCount="indefinite"
                begin={`${Math.random()}s`}
              />
              <animate
                attributeName="r"
                values={`${radius};${radius * 2}`}
                dur="1s"
                repeatCount="indefinite"
                begin={`${Math.random()}s`}
              />
            </circle>
          )
        })}
      </g>
    )
  }

  const GoldenStar = ({ x, y, blinking }: { x: number; y: number; blinking: boolean }) => (
    <div
      className={`absolute text-2xl ${blinking ? "animate-pulse" : ""}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        color: "#FFD700",
      }}
    >
      ★
    </div>
  )

  useEffect(() => {
    // Ensure availablePlanets stays in sync with the number of correct answers
    if (correctAnswers > 0 && correctAnswers % 10 === 0) {
      const expectedPlanets = Math.min(Math.floor(correctAnswers / 10), allPlanets.length)
      if (availablePlanets.length !== expectedPlanets) {
        setAvailablePlanets(orderedPlanets.slice(0, expectedPlanets))
      }
    }
  }, [correctAnswers, availablePlanets.length, orderedPlanets, allPlanets.length])

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-black text-white relative overflow-hidden overscroll-none touch-none">
      <div className="flex flex-col md:flex-row flex-1 w-full relative z-10 px-1 md:px-4">
        <div className="absolute inset-0 overflow-hidden z-0">
          {stars.map((star, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size * 3}px`,
                height: `${star.size * 3}px`,
                color: star.color,
              }}
            >
              {star.content}
            </div>
          ))}
        </div>

        {/* Quiz area - unchanged */}
        <div className="w-full md:max-lg:w-[60%] lg:w-[50%] flex flex-col justify-start mb-12 py-2 px-4 md:py-4 md:pr-2 md:pl-0 h-[calc(100dvh-6rem)] md:h-[calc(100dvh-2rem)] overflow-hidden">
          <div
            className={`w-full h-full bg-black bg-opacity-80 rounded-lg z-10 relative md:pr-2 md:pl-0 pt-1 pb-4 flex flex-col ${!isKeypadVisible ? "items-center justify-center" : ""}`}
          >
            <h2 className="text-xl sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 text-[#fec35e] text-center">
              Next: {nextQuestion}
            </h2>
            <div className="relative w-full mx-auto mt-1">
              <div className="w-full h-full text-4xl sm:text-3xl md:text-4xl lg:text-5xl py-4 sm:py-4 md:py-6 lg:py-6 px-4 bg-[#0F283D] text-white flex items-center justify-center font-bold">
                <span className="mr-4">{question}</span>
                <span>=</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={answer}
                  onKeyDown={handleKeyDown}
                  className="w-24 sm:w-24 md:w-28 lg:w-32 h-16 sm:h-14 md:h-16 lg:h-18 bg-transparent border-b-2 border-white text-center focus:outline-none text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold pl-0"
                  readOnly
                />
              </div>
              <div className="absolute -top-[2.5rem] -right-4 w-16 h-16 rounded-full bg-black border-2 border-[#f6aa54] flex items-center justify-center">
                <span className="text-2xl sm:text-xl md:text-2xl font-bold text-[#f6aa54]">{timeLeft}</span>
              </div>
              <div className="absolute -bottom-[2rem] -right-4 w-16 h-16 rounded-full bg-black border-2 border-[#50adb6] flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-xl md:text-2xl font-bold text-[#50adb6] -mb-1">{correctAnswers}</span>
                <div className="w-8 border-b border-[#50adb6]"></div>
                <span className="text-2xl sm:text-xl md:text-2xl font-bold text-[#50adb6] -mt-1">{totalQuestions}</span>
              </div>
            </div>
            <div
              className={`grid ${isKeypadVisible ? "grid-cols-3" : "hidden"} gap-2 mt-8 bg-black bg-opacity-20 pt-2 md:pb-4 rounded-lg w-full ml-0 mr-auto flex-grow`}
              style={{
                height: "calc(100dvh - 18rem)",
                maxHeight: window.innerWidth >= 768 ? "calc(100dvh - 16rem)" : undefined,
              }}
            >
              {isKeypadVisible && (
                <>
                  {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleKeypadClick(num.toString())}
                      className="w-full h-full bg-[#50adb6] text-white text-2xl sm:text-2xl md:text-3xl lg:text-4xl hover:bg-[#3d8a91] transition-colors flex items-center justify-center"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={() => handleKeypadClick("submit")}
                    className="w-full h-full row-span-2 bg-[#f6aa54] text-white text-2xl sm:text-2xl md:text-3xl lg:text-4xl hover:bg-[e59843] transition-colors flex items-center justify-center"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => handleKeypadClick("delete")}
                    className="w-full h-full bg-[#e8594a] text-white text-2xl sm:text-2xl md:text-3xl lg:text-4xl hover:bg-[#d64a3d] transition-colors flex items-center justify-center"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleKeypadClick("-")}
                    className="w-full h-full bg-[#50adb6] text-white text-2xl sm:text-2xl md:text-3xl lg:text-4xl hover:bg-[#3d8a91] transition-colors flex items-center justify-center"
                  >
                    -
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Galaxy area */}
        <div
          className={`hidden md:flex w-full md:max-lg:w-[40%] lg:w-[50%] items-center justify-center relative overflow-visible mb-16 pr-0 md:pb-4 ${isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}`}
          style={{ height: "calc(100dvh - 4rem)" }}
          ref={galaxyRef}
        >
          <div className="w-full h-full relative">
            <svg
              viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feGaussianBlur stdDeviation="2" result="coloredBlur2" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur2" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g>
                {/* Static Sun in center */}
                <image
                  href="/images/sun.png"
                  x={viewBoxSize / 2 - 70}
                  y={viewBoxSize / 2 - 70}
                  width={140}
                  height={140}
                >
                  <animate attributeName="opacity" values="0;1" dur="1s" begin="0s" fill="freeze" />
                </image>
                {showWelcome && (
                  <>
                    <text
                      x={viewBoxSize / 2}
                      y={viewBoxSize / 2 - 150}
                      textAnchor="middle"
                      className="text-2xl font-bold"
                      fill="#50adb6"
                      opacity={1}
                      fontSize="32"
                    >
                      Welcome to Space Math Quiz!
                      <animate
                        ref={(el) => (welcomeAnimationsRef.current[0] = el as SVGAnimateElement)}
                        attributeName="opacity"
                        from="1"
                        to="0"
                        dur="1s"
                        begin="indefinite"
                        fill="freeze"
                      />
                    </text>
                    <text
                      x={viewBoxSize / 2}
                      y={viewBoxSize / 2 + 150}
                      textAnchor="middle"
                      className="text-xl"
                      fill="#e8594a"
                      opacity={1}
                      fontSize="28"
                    >
                      All the best!
                      <animate
                        ref={(el) => (welcomeAnimationsRef.current[1] = el as SVGAnimateElement)}
                        attributeName="opacity"
                        from="1"
                        to="0"
                        dur="1s"
                        begin="indefinite"
                        fill="freeze"
                      />
                    </text>
                  </>
                )}
                {/* Planets on orbit */}
                {availablePlanets.map((planet, index) => {
                  const position = planetPositions[index]
                  const x = position.x * viewBoxSize
                  const y = position.y * viewBoxSize

                  return (
                    <image
                      key={planet.name}
                      href={planet.imageUrl}
                      x={x - 50}
                      y={y - 50}
                      width={100}
                      height={100}
                      filter={index === availablePlanets.length - 1 ? "url(#glow)" : ""}
                    >
                      <animate attributeName="opacity" values="0;1" dur="1s" begin="0s" fill="freeze" />
                    </image>
                  )
                })}
                {/* Golden stars */}
                {goldenStars.map((star, index) => (
                  <text
                    key={`golden-${index}`}
                    x={(star.x * viewBoxSize) / 100}
                    y={(star.y * viewBoxSize) / 100}
                    fontSize="24"
                    fill="#FFD700"
                    className={star.blinking ? "animate-pulse" : ""}
                  >
                    ★
                  </text>
                ))}
                {/* Badges */}
                {earnedBadges.map((badge, index) => (
                  <image key={`badge-${index}`} href={badge.badge} x={badge.x} y={badge.y} width={100} height={100}>
                    <animate attributeName="opacity" values="0;1" dur="1s" begin="0s" fill="freeze" />
                  </image>
                ))}
                {showFireworks && fireworksVisible && <Fireworks />}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

