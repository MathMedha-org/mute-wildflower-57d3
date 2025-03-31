import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, BookOpen, CheckCircle, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data for homework assignments
const homeworkAssignments = [
  {
    id: 4,
    title: "Math Ultimate Challenge",
    description: "Complete all operations in this comprehensive challenge",
    duration: 3,
    type: "Challenge",
    dueDate: "2024-03-04",
    status: "pending",
  },
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
    <div className="w-full sm:max-w-6xl sm:mx-auto pt-3 sm:pt-4 lg:pt-6 pb-8">
      <div className="space-y-8 bg-white p-6 rounded-xl">
        {/* Header with back button and centered title */}
        <div className="relative flex items-start justify-center">
          <Link
            href="/dashboard"
            className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#00509d] flex items-center justify-center text-white hover:bg-[#003f88] transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <div className="text-center mb-4 sm:mb-8 pt-8 sm:pt-0">
            <h1 className="text-3xl font-bold text-[#00509d]">Homework</h1>
            <p className="text-gray-600">Complete your assigned math practice tasks</p>
          </div>
        </div>

        {/* Today's Homework */}
        <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100">
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
              <Calendar className="h-6 w-6 text-[#00509d]" />
              <h2 className="text-xl font-semibold text-[#00509d]">Today's Homework</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {homeworkAssignments
                .filter((assignment) => assignment.status === "pending")
                .map((assignment, index) => (
                  <Card
                    key={assignment.id}
                    className={`bg-white border-gray-100 text-gray-800 ${
                      index !== homeworkAssignments.filter((a) => a.status === "pending").length - 1
                        ? "border-b pb-6 mb-6"
                        : ""
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-xl">{assignment.title}</CardTitle>
                          <CardDescription className="text-gray-600">{assignment.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                          <Clock className="h-4 w-4 text-[#00509d]" />
                          <span className="text-sm font-medium text-gray-700">{assignment.duration} min</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-[#00509d]" />
                          <span>Type: {assignment.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#00509d]" />
                          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                        <button className="ml-auto bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
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
        <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100">
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
              <CheckCircle className="h-6 w-6 text-[#00509d]" />
              <h2 className="text-xl font-semibold text-[#00509d]">Completed</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {homeworkAssignments
                .filter((assignment) => assignment.status === "completed")
                .map((assignment) => (
                  <Card key={assignment.id} className="bg-white border-gray-100 text-gray-600">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg text-gray-600">{assignment.title}</CardTitle>
                          <CardDescription className="text-gray-500">{assignment.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                          <Clock className="h-4 w-4 text-[#00509d]" />
                          <span className="text-sm font-medium text-gray-600">{assignment.duration} min</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-[#00509d]" />
                          <span>Type: {assignment.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#00509d]" />
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

