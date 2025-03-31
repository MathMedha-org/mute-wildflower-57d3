"use client"

import { useMemo, useEffect, useState } from "react"

const generateStars = (count: number) => {
  const starImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/star1-M7kuVghLNJr8wlInkmxyUhGsRNkN0T.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stardark-pYL3p8dvIlVE3bbwkM7OIAxyhySTpX.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/starplus-VFtKzFvZHpUCvwrQaoqCap2NgXeSpA.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/starred-XylzQvPiRbr16TLum5Tgjv7I64Uroy.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/startthick-YTIvKJRtEkfGNJaQobGl1zxZpJ9zYo.png",
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
  const stars = useMemo(() => generateStars(100), [])

  const planets = useMemo(
    () => [
      /*{
        name: "Mercury",
        size: viewBoxSize * 0.15,
        x: 70,
        y: 80,
        imageUrl:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PlanetMercury-new-5gfvNnpxPKapf4pRLEmCvJOV98IRgS.png",
      },
      {
        name: "Venus",
        size: viewBoxSize * 0.12,
        x: 95,
        y: 65,
        imageUrl:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PlanetVenus-new-n782DfV26Qc4GVxQzkfVH202MsKr6Q.png",
      },
      {
        name: "Mars",
        size: viewBoxSize * 0.08,
        x: 15,
        y: 67,
        imageUrl:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/planetMars-new-15bGgKhmvPMI0nkv67okVy8CPZ7zLS.png",
      },
      {
        name: "Jupiter",
        size: viewBoxSize * 0.15,
        x: 115,
        y: 45,
        imageUrl:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PlanetJupiter-new-k59GAemqTd30XTyQWnnh9ctpSn9X22.png",
      },*/
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
    <div
      className="fixed inset-x-0 top-[0.5rem] bottom-0 overflow-hidden pointer-events-none"
      style={{ backgroundColor: "#fff" }}
    >
      {/* Fixed position moon */}
      <div
        className="fixed top-20 left-6 hidden"
        style={{ width: `${viewBoxSize * 0.05}px`, height: `${viewBoxSize * 0.05}px` }}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/moon-9vzPcZ7zT1ivWy3kYHTMzQJ3zjiByO.png"
          alt="Moon"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Fixed position earth */}
      <div
        className="fixed top-64 left-12 hidden"
        style={{ width: `${viewBoxSize * 0.08}px`, height: `${viewBoxSize * 0.08}px` }}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PlanetEarth-new-aG11YKqAnLBL4DT4JVm6tsW3wIgsn6.png"
          alt="Earth"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Fixed position uranus */}
      <div
        className="fixed top-20 right-6 hidden"
        style={{ width: `${viewBoxSize * 0.08}px`, height: `${viewBoxSize * 0.08}px` }}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/planetUranus-new-QpCLsWQCA0iMiP3nZJw2vDRQ3FsErb.png"
          alt="Uranus"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Fixed position jupiter */}
      <div
        className="fixed top-64 right-4 hidden"
        style={{ width: `${viewBoxSize * 0.08}px`, height: `${viewBoxSize * 0.08}px` }}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PlanetJupiter-new-k59GAemqTd30XTyQWnnh9ctpSn9X22.png"
          alt="Jupiter"
          className="w-full h-full object-contain"
        />
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
          <defs>
            {/*<radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#f6aa1c" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f6aa1c" stopOpacity="0" />
            </radialGradient>*/}
          </defs>

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

          {/* Smiling Sun - Hidden */}
          {/* Removed the smiling sun element */}
        </svg>
      </div>

      {/* Fixed position astronaut */}
      <div
        className="fixed bottom-1 right-1 w-[100px] h-[100px] animate-float hidden"
        style={{
          animation: "float 3s ease-in-out infinite",
        }}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/astronaut-new-2-Z9x9M5EccqWTqSNwH02535f45A2WRS.png"
          alt="Astronaut"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Fixed position rocket */}
      <div
        className="fixed bottom-1 left-1 w-[100px] h-[100px] animate-float-diagonal hidden"
        style={{
          animation: "floatDiagonal 3s ease-in-out infinite",
        }}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rocket-new-1-oWuUbYpXqOhLlEdxvVEK81OeCfQGqw.png"
          alt="Rocket"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Add keyframe animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatDiagonal {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(5px, -10px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}

