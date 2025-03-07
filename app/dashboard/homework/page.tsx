import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, BookOpen, CheckCircle, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data for homework assignments
const homeworkAssignments = [
  {
    id: 1,
    title: "Addition Practice",
    description: "Complete addition exercises within time limit",
    duration: 5,
    type: "Addition",
    dueDate: "2024-03-05",
    status: "pending",
  },
  {
    id: 2,
    title: "Multiplication Tables",
    description: "Practice multiplication tables 2-10",
    duration: 10,
    type: "Multiplication",
    dueDate: "2024-03-06",
    status: "pending",
  },
  {
    id: 3,
    title: "Division Practice",
    description: "Complete division exercises",
    duration: 15,
    type: "Division",
    dueDate: "2024-03-07",
    status: "completed",
  },
]

export default function HomeworkPage() {
  return (
    <div className="w-full sm:max-w-6xl sm:mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto space-y-8 bg-[#0F283D] p-8 rounded-xl border border-[#50adb6]/20">
        {/* Header with back button and centered title */}
        <div className="relative flex items-start justify-center">
          <Link
            href="/dashboard"
            className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#50adb6] flex items-center justify-center text-white hover:bg-[#3d8a91] transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <div className="text-center mb-4 sm:mb-8 pt-8 sm:pt-0">
            <h1 className="text-3xl font-bold text-[#50adb6]">Homework</h1>
            <p className="text-white/80">Complete your assigned math practice tasks</p>
          </div>
        </div>

        {/* Today's Homework */}
        <div className="p-6 rounded-xl border-2 border-[#50adb6] bg-[#0F283D]/50 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-[#50adb6]/30">
              <Calendar className="h-6 w-6 text-[#50adb6]" />
              <h2 className="text-xl font-semibold text-[#50adb6]">Today's Homework</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {homeworkAssignments
                .filter((assignment) => assignment.status === "pending")
                .map((assignment, index) => (
                  <Card
                    key={assignment.id}
                    className={`bg-[#0F283D] border-[#50adb6] text-white ${
                      index !== homeworkAssignments.filter((a) => a.status === "pending").length - 1
                        ? "border-b-2 pb-6 mb-6"
                        : ""
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-xl">{assignment.title}</CardTitle>
                          <CardDescription className="text-white/70">{assignment.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2 bg-[#163c5a] px-3 py-1.5 rounded-full">
                          <Clock className="h-4 w-4 text-[#50adb6]" />
                          <span className="text-sm font-medium text-white">{assignment.duration} min</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-[#50adb6]" />
                          <span>Type: {assignment.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#50adb6]" />
                          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                        <button className="ml-auto bg-[#50adb6] text-white px-4 py-2 rounded-md hover:bg-[#3d8a91] transition-colors">
                          Start Practice
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>

        {/* Completed Homework */}
        <div className="p-6 rounded-xl border-2 border-white/10 bg-[#0F283D]/30 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-white/10">
              <CheckCircle className="h-6 w-6 text-[#50adb6]" />
              <h2 className="text-xl font-semibold text-[#50adb6]">Completed</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {homeworkAssignments
                .filter((assignment) => assignment.status === "completed")
                .map((assignment) => (
                  <Card key={assignment.id} className="bg-[#0F283D] border-[#50adb6]/50 text-white/70">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg text-white/70">{assignment.title}</CardTitle>
                          <CardDescription className="text-white/50">{assignment.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2 bg-[#163c5a] px-3 py-1.5 rounded-full">
                          <Clock className="h-4 w-4 text-[#50adb6]" />
                          <span className="text-sm font-medium text-white/70">{assignment.duration} min</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-[#50adb6]" />
                          <span>Type: {assignment.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#50adb6]" />
                          <span>Completed: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="ml-auto flex items-center gap-2 text-[#4CAF50]">
                          <CheckCircle className="h-4 w-4" />
                          <span>Completed</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

