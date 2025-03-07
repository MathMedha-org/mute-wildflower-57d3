"use client"

import { Calculator, Brain, Sparkles, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PracticePage() {
  const router = useRouter()

  return (
    <div className="w-full sm:max-w-6xl sm:mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col space-y-8 bg-[#0F283D] p-8 rounded-xl border border-[#50adb6]/20">
        <div className="relative flex items-start justify-center">
          <Link
            href="/dashboard"
            scroll={true}
            className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#50adb6] flex items-center justify-center text-white hover:bg-[#3d8a91] transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-[#50adb6]">Practice</h1>
            <p className="text-white/80">Choose a topic to practice and improve your math skills.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Addition & Subtraction",
              description: "Master the basics of adding and subtracting numbers",
              topics: ["Adding single digits", "Subtracting numbers", "Mental math"],
              difficulty: "Easy",
              problems: 20,
              icon: Calculator,
              bgColor: "bg-[#50adb6]",
              hoverColor: "hover:bg-[#3d8a91]",
              path: "/dashboard/practice/addition-subtraction",
            },
            {
              title: "Multiplication & Division",
              description: "Learn to multiply and divide with confidence",
              topics: ["Times tables", "Division basics", "Word problems"],
              difficulty: "Medium",
              problems: 25,
              icon: Brain,
              bgColor: "bg-[#f6aa54]",
              hoverColor: "hover:bg-[#e59843]",
              path: "/dashboard/practice/multiplication-division",
            },
            {
              title: "All Together",
              description: "Practice all operations in mixed exercises",
              topics: ["Mixed operations", "Problem solving", "Math challenges"],
              difficulty: "Advanced",
              problems: 30,
              icon: Sparkles,
              bgColor: "bg-[#e8594a]",
              hoverColor: "hover:bg-[#d64a3d]",
              path: "/dashboard/practice/all-together",
            },
          ].map((topic) => (
            <Link
              key={topic.title}
              href={topic.path}
              scroll={true}
              className={`group ${topic.bgColor} ${topic.hoverColor} rounded-lg p-6 transition-colors duration-300 text-left w-full`}
            >
              <div className="flex flex-col items-center gap-6">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <topic.icon className="h-12 w-12 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="space-y-4 text-center">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-white">{topic.title}</h3>
                    <p className="text-white/70">{topic.description}</p>
                  </div>
                  <ul className="space-y-1">
                    {topic.topics.map((item) => (
                      <li key={item} className="text-white/80 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-center gap-6 text-sm">
                    <span className="text-white/90">Difficulty: {topic.difficulty}</span>
                    <span className="text-white/90">{topic.problems} problems</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

