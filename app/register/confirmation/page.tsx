"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SpaceBackground } from "@/components/space-background"
import { CheckCircle, Rocket, Star, Calendar, Mail, LogIn, Info } from "lucide-react"

export default function ConfirmationPage() {
  const router = useRouter()
  const [registrationData, setRegistrationData] = useState<any>(null)
  const [accountData, setAccountData] = useState<any>(null)
  const [studentInfo, setStudentInfo] = useState<any>(null)
  const [planData, setPlanData] = useState<any>(null)
  const [paymentInfo, setPaymentInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    try {
      // Retrieve all registration data from localStorage
      const storedRegistrationData = localStorage.getItem("registrationData")
      const storedAccountData = localStorage.getItem("accountDetails")
      const storedStudentInfo = localStorage.getItem("studentInfo")
      const storedPlanData = localStorage.getItem("planSelection")
      const storedPaymentInfo = localStorage.getItem("paymentInfo")

      if (storedRegistrationData) setRegistrationData(JSON.parse(storedRegistrationData))
      if (storedAccountData) setAccountData(JSON.parse(storedAccountData))
      if (storedStudentInfo) setStudentInfo(JSON.parse(storedStudentInfo))
      if (storedPlanData) setPlanData(JSON.parse(storedPlanData))
      if (storedPaymentInfo) setPaymentInfo(JSON.parse(storedPaymentInfo))

      setIsDataLoaded(true)
    } catch (error) {
      console.error("Error loading confirmation data:", error)
      // If there's an error, we'll still set isDataLoaded to true so the page renders
      // with fallback content instead of being stuck in a loading state
      setIsDataLoaded(true)
    }
  }, [])

  useEffect(() => {
    // Load plan data
    const storedPlanData = localStorage.getItem("planSelection")
    if (storedPlanData) {
      try {
        setPlanData(JSON.parse(storedPlanData))
      } catch (e) {
        console.error("Error parsing plan data:", e)
      }
    }
  }, [])

  const handleLogin = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      try {
        // Clear localStorage data for security
        localStorage.removeItem("registrationData")
        localStorage.removeItem("accountDetails")
        localStorage.removeItem("studentInfo")
        localStorage.removeItem("planSelection")
        localStorage.removeItem("paymentInfo")
      } catch (error) {
        console.error("Error clearing localStorage:", error)
      }

      setIsLoading(false)
      router.push("/login")
    }, 1000)
  }

  // Safe getter functions with fallbacks
  const getEmail = () => {
    return registrationData?.email || "your email address"
  }

  const getStudentCount = () => {
    if (planData?.studentCount) return planData.studentCount
    return 0
  }

  const getPricePerStudent = () => {
    if (planData?.pricePerStudent) return planData.pricePerStudent
    return 0
  }

  const getTotalPrice = () => {
    if (planData?.totalAnnualPrice) return planData.totalAnnualPrice
    return 0
  }

  const getCardLast4 = () => {
    return paymentInfo?.last4 || "****"
  }

  // Format price with Indian number system
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN").format(price)
  }

  // Generate a random order ID
  const getOrderId = () => {
    return Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")
  }

  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-white via-blue-50 to-white" />
      <SpaceBackground />

      <div className="relative z-10 flex flex-col items-center p-4 sm:p-8 max-w-2xl w-full mx-auto">
        {/* Content container with background */}
        <div className="w-full mt-8 bg-white border border-gray-200 shadow-lg rounded-lg">
          {/* Content wrapper with padding */}
          <div className="flex flex-col items-center px-6 sm:px-8 py-8 w-full">
            <div className="flex items-center justify-between w-full mb-4">
              <div className="w-10 h-10"></div> {/* Empty div for spacing */}
              <h1 className="text-3xl font-bold text-[#00509d] flex-1 text-center">Registration Complete!</h1>
              <div className="w-10 h-10"></div> {/* Empty div for spacing */}
            </div>

            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            {planData?.isTrial ? (
              <div className="w-full mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-[#00509d] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-gray-800 font-medium">Trial Request Submitted</h3>
                    <p className="text-gray-700 text-sm mt-1">
                      The Math Medha team will review your trial request and contact you shortly at your registered
                      phone number and email with your account details.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 mb-8 text-center w-full">
                Thank you for registering with Math Medha. Your account has been successfully created.
              </p>
            )}

            {/* Order Summary */}
            <div className="w-full bg-blue-50 rounded-lg p-6 mb-8 border border-blue-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-gray-800 font-medium">Annual Subscription</h3>
                    <p className="text-gray-600 text-sm">
                      {getStudentCount()} {getStudentCount() === 1 ? "student" : "students"} × ₹
                      {formatPrice(getPricePerStudent())} per student per month
                    </p>
                  </div>
                  <p className="text-gray-800 font-medium">
                    ₹{formatPrice(getTotalPrice())}
                    <span className="text-gray-600 text-sm">/year</span>
                  </p>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-gray-800 font-medium">Payment Method</h3>
                    <p className="text-gray-600 text-sm">Credit Card ending in {getCardLast4()}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-gray-800 font-medium">Students</h3>
                    <p className="text-gray-600 text-sm">
                      {getStudentCount()} {getStudentCount() === 1 ? "student" : "students"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <h3 className="text-gray-800 font-medium">Order ID</h3>
                  <p className="text-gray-800 font-medium">#{getOrderId()}</p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="w-full space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Next Steps</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-[#00509d]" />
                    </div>
                    <h3 className="text-gray-800 font-medium">Check Your Email</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    We've sent a confirmation email to {getEmail()}. Please verify your email to activate your account.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Rocket className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="text-gray-800 font-medium">Explore the Dashboard</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Login and start your math adventure by exploring the dashboard and available learning resources.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <Star className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="text-gray-800 font-medium">Complete Your Profile</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Personalize your experience by completing your profile and setting preferences.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-gray-800 font-medium">Schedule Practice</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Set up regular practice sessions to maximize learning and track progress.
                  </p>
                </div>
              </div>
            </div>

            {/* Trial confirmation message was moved to replace the thank you message */}

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-3 mt-8 rounded-md text-white font-semibold transition-colors flex items-center justify-center gap-2 ${
                isLoading ? "bg-[#00509d]/70 cursor-not-allowed" : "bg-[#00509d] hover:bg-[#003b74]"
              }`}
            >
              {isLoading ? "Redirecting to Login..." : "Login"}
              {!isLoading && <LogIn size={18} />}
            </button>

            {/* Support Information */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Need help? Contact our support team at{" "}
                <a href="mailto:support@mathmedha.com" className="text-[#00509d] hover:underline">
                  support@mathmedha.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

