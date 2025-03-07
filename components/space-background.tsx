"use client"

import { useMemo, useEffect, useState } from "react"

const generateStars = (count: number) => {
  const starImages = [
    "/images/star1.png",
    "/images/stardark.png",
    "/images/starplus.png",
    "/images/starred.png",
    "/images/startthick.png",
  ]
  const circleColors = ["#55adb8", "#e45a47", "#0f273e"]
  const circleSizes = [8, 12, 16]

  return Array.from({ length: count }, () => {
    const random = Math.random()

    // Avoid center area for stars
    let x = Math.random() * 100
    let y = Math.random() * 100
    const centerX = 50
    const centerY = 50
    const clearRadius = 30

    // If star is too close to center, move it to the edges
    const distanceToCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
    if (distanceToCenter < clearRadius) {
      const angle = Math.atan2(y - centerY, x - centerX)
      x = centerX + Math.cos(angle) * clearRadius
      y = centerY + Math.sin(angle) * clearRadius
    }

    if (random < 0.4) {
      return {
        x,
        y,
        size: Math.random() * 3 + 2,
        color: "#FFFFFF",
        imageUrl: "",
        type: "dot",
        content: Math.random() > 0.5 ? "★" : "☆",
      }
    } else if (random < 0.8) {
      return {
        x,
        y,
        size: Math.random() * 3 + 2,
        color: "#87CEEB",
        imageUrl: "",
        type: "dot",
        content: Math.random() > 0.5 ? "★" : "☆",
      }
    } else if (random < 0.9) {
      const imageUrl = starImages[Math.floor(Math.random() * starImages.length)]
      return {
        x,
        y,
        size: Math.random() * 3 + 2,
        color: "#FFFFFF",
        imageUrl: imageUrl,
        type: "image",
      }
    } else {
      const colorIndex = Math.floor(Math.random() * circleColors.length)
      return {
        x,
        y,
        size: circleSizes[colorIndex],
        color: circleColors[colorIndex],
        imageUrl: "",
        type: "circle",
      }
    }
  })
}

export function SpaceBackground() {
  const [viewBoxSize, setViewBoxSize] = useState(1000)
  const stars = useMemo(() => generateStars(50), [])

  const planets = useMemo(
    () => [
      {
        name: "Venus",
        size: viewBoxSize * 0.12,
        x: 95,
        y: 65,
        imageUrl: "/images/PlanetVenus-new.png",
      },
      {
        name: "Mars",
        size: viewBoxSize * 0.08,
        x: 15,
        y: 67,
        imageUrl: "/images/planetMars-new.png",
      },
    ],
    [viewBoxSize],
  )

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const size = Math.max(width, height)
      setViewBoxSize(size)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="fixed inset-x-0 top-[0.5rem] bottom-0 overflow-hidden pointer-events-none">
      {/* Fixed position moon */}
      <div
        className="fixed top-20 left-6"
        style={{ width: `${viewBoxSize * 0.05}px`, height: `${viewBoxSize * 0.05}px` }}
      >
        <img src="/images/moon.png" alt="Moon" className="w-full h-full object-contain" />
      </div>

      {/* Fixed position earth */}
      <div
        className="fixed top-64 left-12"
        style={{ width: `${viewBoxSize * 0.08}px`, height: `${viewBoxSize * 0.08}px` }}
      >
        <img src="/images/PlanetEarth-new.png" alt="Earth" className="w-full h-full object-contain" />
      </div>

      {/* Fixed position uranus */}
      <div
        className="fixed top-20 right-6"
        style={{ width: `${viewBoxSize * 0.08}px`, height: `${viewBoxSize * 0.08}px` }}
      >
        <img src="/images/planetUranus-new.png" alt="Uranus" className="w-full h-full object-contain" />
      </div>

      {/* Fixed position jupiter */}
      <div
        className="fixed top-64 right-10"
        style={{ width: `${viewBoxSize * 0.08}px`, height: `${viewBoxSize * 0.08}px` }}
      >
        <img src="/images/PlanetJupiter-new.png" alt="Jupiter" className="w-full h-full object-contain" />
      </div>

      {/* Stars with subtle animation */}
      <div className="absolute inset-0">
        {stars.map((star, index) => (
          <div
            key={index}
            className={`absolute transition-opacity duration-[${Math.random() * 2000 + 1000}ms]`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.imageUrl ? star.size * 15 : star.size * 3}px`,
              height: `${star.imageUrl ? star.size * 15 : star.size * 3}px`,
              backgroundColor: star.type === "circle" ? star.color : "transparent",
              borderRadius: star.type === "circle" ? "50%" : "0",
              color: star.type === "dot" ? star.color : "transparent",
              animation: star.type === "dot" ? `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite` : undefined,
            }}
          >
            {star.imageUrl ? (
              <img src={star.imageUrl || "/placeholder.svg"} alt="star" className="w-full h-full object-contain" />
            ) : star.type === "dot" ? (
              star.content
            ) : null}
          </div>
        ))}
      </div>

      {/* Planets and Sun */}
      <div className="absolute inset-0">
        <svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          className="absolute bottom-0 left-0 w-full h-full"
          preserveAspectRatio="xMidYMax meet"
        >
          {/* Planets */}
          {planets.map((planet) => {
            const x = (planet.x / 100) * viewBoxSize
            const y = (planet.y / 100) * viewBoxSize
            return (
              <image
                key={planet.name}
                href={planet.imageUrl}
                x={x - planet.size / 2}
                y={y - planet.size / 2}
                width={planet.size}
                height={planet.size}
                opacity="0.9"
              />
            )
          })}

          {/* Smiling Sun */}
          <g transform={`translate(${viewBoxSize / 2} ${viewBoxSize})`}>
            <image
              href="/images/sun.png"
              x={-viewBoxSize * 0.07}
              y={-viewBoxSize * 0.07}
              width={viewBoxSize * 0.14}
              height={viewBoxSize * 0.14}
            />
          </g>
        </svg>
      </div>

      {/* Fixed position astronaut */}
      <div className="fixed bottom-1 right-1 w-[130px] h-[130px] animate-float">
        <img src="/images/astronaut-new-2.png" alt="Astronaut" className="w-full h-full object-contain" />
      </div>

      {/* Fixed position rocket */}
      <div className="fixed bottom-1 left-1 w-[130px] h-[130px] animate-float-diagonal">
        <img src="/images/rocket-new-1.png" alt="Rocket" className="w-full h-full object-contain" />
      </div>
    </div>
  )
}

