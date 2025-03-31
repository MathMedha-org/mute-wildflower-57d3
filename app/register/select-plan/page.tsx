"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SpaceBackground } from "@/components/space-background"
import { ArrowLeft, ArrowRight, Check, Plus, Minus, Info, Clock, AlertCircle, School, Phone } from "lucide-react"

export default function SelectPlanPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [studentCount, setStudentCount] = useState(5)
  const [userRole, setUserRole] = useState<string>("teacher") // Default to teacher
  const [minStudents, setMinStudents] = useState(5) // Default min for teachers
  const [inputValue, setInputValue] = useState("5")
  const [isTrialSelected, setIsTrialSelected] = useState(false)
  const [parentStudents, setParentStudents] = useState<any[]>([])

  useEffect(() => {
    // Retrieve registration data to get user role
    const storedRegistrationData = localStorage.getItem("registrationData")
    const storedStudentInfo = localStorage.getItem("studentInfo")

    if (storedRegistrationData) {
      try {
        const registrationData = JSON.parse(storedRegistrationData)
        setUserRole(registrationData.role || "teacher")

        // Set minimum students based on role
        if (registrationData.role === "parent") {
          setMinStudents(1)

          // For parents, get the number of students from studentInfo
          if (storedStudentInfo) {
            const studentInfo = JSON.parse(storedStudentInfo)
            if (studentInfo.students && Array.isArray(studentInfo.students)) {
              setParentStudents(studentInfo.students)
              const parentStudentCount = studentInfo.students.length
              setStudentCount(parentStudentCount > 0 ? parentStudentCount : 1)
              setInputValue(parentStudentCount > 0 ? parentStudentCount.toString() : "1")
            } else {
              setStudentCount(1)
              setInputValue("1")
            }
          } else {
            setStudentCount(1)
            setInputValue("1")
          }

          setIsTrialSelected(false) // Parents don't get trial option
        } else {
          setMinStudents(5)
          setStudentCount(5) // Reset to minimum for teachers
          setInputValue("5")
        }
      } catch (error) {
        console.error("Error parsing registration data:", error)
        router.push("/register")
      }
    } else {
      // If no data, redirect back to first step
      router.push("/register")
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers
    const value = e.target.value.replace(/\D/g, "")
    setInputValue(value)

    // Convert to number and update student count if valid
    const numValue = value === "" ? minStudents : Number.parseInt(value, 10)

    // Ensure minimum value
    if (numValue >= minStudents) {
      setStudentCount(numValue)
    } else {
      setStudentCount(minStudents)
    }
  }

  const handleInputBlur = () => {
    // If empty or less than minimum, set to minimum
    if (inputValue === "" || Number.parseInt(inputValue, 10) < minStudents) {
      setInputValue(minStudents.toString())
      setStudentCount(minStudents)
    }
  }

  const increaseStudentCount = () => {
    const newCount = studentCount + 1
    setStudentCount(newCount)
    setInputValue(newCount.toString())
  }

  const decreaseStudentCount = () => {
    if (studentCount > minStudents) {
      const newCount = studentCount - 1
      setStudentCount(newCount)
      setInputValue(newCount.toString())
    }
  }

  const toggleTrialOption = () => {
    setIsTrialSelected(!isTrialSelected)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Store plan selection in localStorage
      localStorage.setItem(
        "planSelection",
        JSON.stringify({
          studentCount: studentCount,
          pricePerStudent: isTrialSelected ? 0 : getPricePerStudentPerMonth(studentCount),
          totalMonthlyPrice: isTrialSelected ? 0 : calculateMonthlyPrice(studentCount),
          totalAnnualPrice: isTrialSelected ? 0 : calculateAnnualPrice(studentCount),
          isTrial: isTrialSelected,
          trialEndDate: isTrialSelected ? getTrialEndDate() : null,
          isParent: userRole === "parent",
        }),
      )
      setIsLoading(false)

      // If trial, skip payment page. For both parents and teachers, go to payment page
      if (isTrialSelected) {
        router.push("/register/confirmation")
      } else {
        router.push("/register/payment")
      }
    }, 1000)
  }

  // Get trial end date (7 days from now)
  const getTrialEndDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date.toISOString()
  }

  // Format trial end date for display
  const formatTrialEndDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Get price per student per month based on student count
  const getPricePerStudentPerMonth = (count: number) => {
    if (count >= 500) return 99
    if (count >= 100) return 110
    return 120
  }

  // Calculate monthly price
  const calculateMonthlyPrice = (count: number) => {
    const pricePerStudent = getPricePerStudentPerMonth(count)
    return pricePerStudent * count
  }

  // Calculate annual price (monthly price * 12)
  const calculateAnnualPrice = (count: number) => {
    return calculateMonthlyPrice(count) * 12
  }

  // Format price with commas for thousands
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-IN")
  }

  return (
    <div className="relative min-h-screen w-full">
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-white/80 via-white/60 to-transparent backdrop-blur-sm" />
      <SpaceBackground />

      <div className="relative z-10 flex flex-col items-center p-4 sm:p-8 max-w-2xl w-full mx-auto">
        {/* Content container with background */}
        <div className="w-full mt-8 bg-white backdrop-blur-md border border-gray-200 shadow-lg rounded-lg">
          {/* Content wrapper with padding */}
          <div className="flex flex-col items-center px-6 sm:px-8 py-8 w-full">
            {/* Header with back button and title */}
            <div className="flex items-center justify-between w-full mb-4">
              <Link
                href="/register/student-info"
                className="w-10 h-10 rounded-full bg-[#00509d] flex items-center justify-center text-white hover:bg-[#0040a0] transition-colors"
              >
                <ArrowLeft size={20} strokeWidth={3} />
              </Link>
              <h1 className="text-3xl font-bold text-[#00509d] flex-1 text-center mr-10">Choose Your Plan</h1>
            </div>
            <p className="text-gray-600 mb-6 text-center w-full">
              {userRole === "parent"
                ? "Select the plan that best fits your child's needs"
                : "Select the plan that best fits your needs"}
            </p>

            {/* Progress indicator */}
            <div className="w-full mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-xs">Step 4 of 5</span>
                <span className="text-gray-500 text-xs">Plan Selection</span>
              </div>
              <div className="w-full bg-gray-200 h-1 rounded-full">
                <div className="bg-[#00509d] h-1 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>

            {/* Parent-specific content */}
            {userRole === "parent" && (
              <div className="w-full mb-6">
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <div className="flex items-start gap-3">
                    <School className="h-5 w-5 text-[#00509d] shrink-0 mt-1" />
                    <div>
                      <h3 className="text-gray-800 font-medium">Check with Your School First</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        Many schools already have a Math Medha contract. Please check with your school administrator to
                        see if your child already has access through the school.
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        If your school has a Math Medha subscription, you won't need to purchase separately.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Display student count for parents */}
                {userRole === "parent" && parentStudents.length > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h3 className="text-gray-800 font-medium mb-2">Your Students</h3>
                    <div className="p-3 bg-white rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Number of students:</span>
                        <span className="text-gray-800 font-medium text-xl">{parentStudents.length}</span>
                      </div>

                      {/* Pricing information for parents */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600">Current rate:</span>
                          <span className="text-gray-800 font-medium">₹120/student/month</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600">Monthly total:</span>
                          <span className="text-gray-800 font-medium">
                            ₹{formatPrice(120 * parentStudents.length)}/month
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                          <span className="text-gray-600">Annual total:</span>
                          <span className="text-xl font-bold text-gray-800">
                            ₹{formatPrice(120 * parentStudents.length * 12)}/year
                          </span>
                        </div>
                      </div>

                      {/* Student list */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-gray-600 mb-2 text-sm">Registered students:</p>
                        <ul className="space-y-2">
                          {parentStudents.map((student, index) => (
                            <li key={index} className="text-gray-600 text-sm flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                              <span>
                                {student.firstName} {student.lastName} - {student.grade}, {student.school}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Continue to Payment Button for parents - MOVED HERE */}
                <div className="w-full mb-6">
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`w-full px-6 py-3 rounded-md text-white font-semibold transition-colors flex items-center justify-center gap-2 ${
                      isLoading ? "bg-[#00509d]/70 cursor-not-allowed" : "bg-[#00509d] hover:bg-[#0040a0]"
                    }`}
                  >
                    {isLoading ? "Processing..." : "Continue to Payment"}
                    {!isLoading && <ArrowRight size={18} />}
                  </button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[#00509d] shrink-0 mt-1" />
                    <div>
                      <h3 className="text-gray-800 font-medium">Need Help?</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        Our team is available to help you choose the best plan for your child's needs.
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        You can reach us directly at{" "}
                        <span className="text-gray-800 font-medium">support@mathmedha.com</span>
                        or call <span className="text-gray-800 font-medium">+91 9876543210</span> for immediate
                        assistance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Trial Option (Only for Teachers) */}
            {userRole === "teacher" && (
              <div className="w-full mb-6 bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#00509d]/20 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-[#00509d]" />
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-medium">Try Before You Buy</h3>
                      <p className="text-gray-500 text-sm">Start with a 1-week free trial</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isTrialSelected}
                      onChange={toggleTrialOption}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00509d]"></div>
                  </label>
                </div>

                {isTrialSelected && (
                  <div className="mt-4 p-3 bg-white rounded-md flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-700 text-sm">
                        Your trial will expire on{" "}
                        <span className="font-medium text-gray-800">{formatTrialEndDate()}</span>. You'll need to
                        upgrade to a paid plan before then to continue using Math Medha.
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        No payment information is required to start your trial.
                      </p>
                      <p className="text-gray-700 text-sm mt-2 border-t border-gray-200 pt-2">
                        <span className="font-medium text-gray-800">Note:</span> The Math Medha team will review your
                        trial request and get back to you shortly with your account details.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Student Count Selector - Only for Teachers */}
            {userRole === "teacher" && (
              <div className="w-full mb-6 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-gray-800 font-medium mb-3">Number of Students</h3>
                <div className="flex items-center justify-between">
                  <button
                    onClick={decreaseStudentCount}
                    disabled={studentCount <= minStudents}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      studentCount <= minStudents
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#00509d] text-white hover:bg-[#0040a0]"
                    }`}
                  >
                    <Minus size={18} />
                  </button>

                  <div className="bg-white px-4 py-2 rounded-md min-w-[120px] flex-1 mx-3 border border-gray-200">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="w-full bg-transparent text-xl font-bold text-gray-800 text-center focus:outline-none"
                      aria-label="Number of students"
                    />
                  </div>

                  <button
                    onClick={increaseStudentCount}
                    className="w-10 h-10 rounded-full bg-[#00509d] flex items-center justify-center text-white hover:bg-[#0040a0] transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  {userRole === "teacher" ? "Minimum 5 students for school accounts" : "Add more students if needed"}
                </p>

                <div className="mt-4 p-4 bg-white rounded-md border border-gray-200">
                  {isTrialSelected ? (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Trial period:</span>
                      <span className="text-gray-800 font-medium">1 Week Free</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Current rate:</span>
                        <span className="text-gray-800 font-medium">
                          ₹{getPricePerStudentPerMonth(studentCount)}/student/month
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Monthly total:</span>
                        <span className="text-gray-800 font-medium">
                          ₹{formatPrice(calculateMonthlyPrice(studentCount))}/month
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                        <span className="text-gray-600">Annual total:</span>
                        <span className="text-xl font-bold text-gray-800">
                          ₹{formatPrice(calculateAnnualPrice(studentCount))}/year
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Continue to Payment Button - For teachers only */}
            {userRole === "teacher" && (
              <div className="w-full mb-6">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full px-6 py-3 rounded-md text-white font-semibold transition-colors flex items-center justify-center gap-2 ${
                    isLoading ? "bg-[#00509d]/70 cursor-not-allowed" : "bg-[#00509d] hover:bg-[#0040a0]"
                  }`}
                >
                  {isLoading ? "Processing..." : isTrialSelected ? "Start Free Trial" : "Continue to Payment"}
                  {!isLoading && <ArrowRight size={18} />}
                </button>
              </div>
            )}

            {/* Pricing Information - Only for Teachers */}
            {userRole === "teacher" && !isTrialSelected && (
              <div className="w-full mb-6 bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="h-5 w-5 text-[#00509d]" />
                  <h3 className="text-gray-800 font-medium">Pricing Structure</h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500 shrink-0" />
                    <span>₹120 per student per month for up to 99 students</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500 shrink-0" />
                    <span>₹110 per student per month for 100-499 students</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500 shrink-0" />
                    <span>₹99 per student per month for 500+ students</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Features */}
            <div className="w-full mb-6 bg-blue-50 p-4 rounded-lg">
              <h3 className="text-gray-800 font-medium mb-3">Plan Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600">Access to all math exercises and games</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600">Comprehensive progress tracking and reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600">Customizable learning paths for each student</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600">Explore student rank in the class, school and math medha world</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600">Priority email and phone support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600">Regular content updates and new features</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600">Advanced analytics and insights</span>
                </li>
              </ul>
            </div>

            {/* Money-back guarantee - For both Teachers and Parents with paid plan */}
            {!isTrialSelected && (
              <div className="mt-4 text-center">
                <p className="text-gray-500 text-sm">30-day money-back guarantee. Cancel anytime.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

