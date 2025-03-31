"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SpaceBackground } from "@/components/space-background"
import { ArrowLeft, ArrowRight, CreditCard, Lock, Check } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    agreeTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [planData, setPlanData] = useState<any>(null)
  const [studentCount, setStudentCount] = useState(0)
  const [userRole, setUserRole] = useState<string>("")
  const [parentStudents, setParentStudents] = useState<any[]>([])

  useEffect(() => {
    // Retrieve registration data to get user role
    const storedRegistrationData = localStorage.getItem("registrationData")

    if (storedRegistrationData) {
      try {
        const registrationData = JSON.parse(storedRegistrationData)
        setUserRole(registrationData.role || "teacher")
      } catch (e) {
        console.error("Error parsing registration data:", e)
      }
    }

    // Retrieve plan selection and student count from localStorage
    const storedPlanData = localStorage.getItem("planSelection")
    const storedStudentInfo = localStorage.getItem("studentInfo")

    if (storedPlanData) {
      try {
        const parsedPlanData = JSON.parse(storedPlanData)
        setPlanData(parsedPlanData)

        // If studentCount is available in planData, use it
        if (parsedPlanData && parsedPlanData.studentCount) {
          setStudentCount(parsedPlanData.studentCount)
        }
        // Otherwise try to get it from studentInfo
        else if (storedStudentInfo) {
          try {
            const parsedStudentInfo = JSON.parse(storedStudentInfo)
            if (parsedStudentInfo.students && Array.isArray(parsedStudentInfo.students)) {
              setParentStudents(parsedStudentInfo.students)
              setStudentCount(parsedStudentInfo.students.length)
            } else {
              setStudentCount(1) // Default to 1 if structure is unexpected
            }
          } catch (e) {
            console.error("Error parsing student info:", e)
            setStudentCount(1) // Default to 1 if parsing fails
          }
        }
      } catch (e) {
        console.error("Error parsing plan data:", e)
        // If no valid data, redirect back to plan selection
        router.push("/register/select-plan")
      }
    } else {
      // If no plan data, redirect back to plan selection
      router.push("/register/select-plan")
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value

    setFormData((prev) => ({ ...prev, [name]: newValue }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value)
    setFormData((prev) => ({ ...prev, cardNumber: formattedValue }))

    if (errors.cardNumber) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.cardNumber
        return newErrors
      })
    }
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value)
    setFormData((prev) => ({ ...prev, expiryDate: formattedValue }))

    if (errors.expiryDate) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.expiryDate
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.cardName.trim()) newErrors.cardName = "Cardholder name is required"

    // Card number validation
    const cardNumberRegex = /^(\d{4}\s){3}\d{4}$/
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required"
    } else if (!cardNumberRegex.test(formData.cardNumber)) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number"
    }

    // Expiry date validation
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required"
    } else if (!expiryDateRegex.test(formData.expiryDate)) {
      newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)"
    } else {
      // Check if card is expired
      const [month, year] = formData.expiryDate.split("/")
      const expiryDate = new Date(2000 + Number.parseInt(year), Number.parseInt(month) - 1)
      const currentDate = new Date()

      if (expiryDate < currentDate) {
        newErrors.expiryDate = "Card has expired"
      }
    }

    // CVV validation
    const cvvRegex = /^[0-9]{3,4}$/
    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required"
    } else if (!cvvRegex.test(formData.cvv)) {
      newErrors.cvv = "Please enter a valid CVV"
    }

    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State/Province is required"
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP/Postal code is required"

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Store payment info in localStorage (in a real app, you would never do this)
      // This is just for demo purposes
      localStorage.setItem(
        "paymentInfo",
        JSON.stringify({
          last4: formData.cardNumber.slice(-4),
          cardType: "Visa", // Just an example
        }),
      )
      setIsLoading(false)
      router.push("/register/confirmation")
    }, 1500)
  }

  // Get monthly price per student
  const getPricePerStudent = () => {
    if (!planData) return 120 // Default to 120 for parents
    return planData.pricePerStudent || 120
  }

  // Get total monthly price
  const getMonthlyTotal = () => {
    if (userRole === "parent" && parentStudents.length > 0) {
      return 120 * parentStudents.length
    }
    if (!planData) return 0
    return planData.totalMonthlyPrice || 0
  }

  // Get total annual price
  const getAnnualTotal = () => {
    if (userRole === "parent" && parentStudents.length > 0) {
      return 120 * parentStudents.length * 12
    }
    if (!planData) return 0
    return planData.totalAnnualPrice || 0
  }

  // Format price with commas for thousands
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-IN")
  }

  return (
    <div className="relative min-h-screen w-full">
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-white/80 via-white/60 to-transparent backdrop-blur-sm" />
      <SpaceBackground />

      <div className="relative z-10 flex flex-col items-center p-4 sm:p-8 max-w-3xl w-full mx-auto">
        {/* Content container with background */}
        <div className="w-full mt-8 bg-white backdrop-blur-md border border-gray-200 shadow-lg rounded-lg">
          {/* Content wrapper with padding */}
          <div className="flex flex-col items-center px-6 sm:px-8 py-8 w-full">
            {/* Header with back button and title */}
            <div className="flex items-center justify-between w-full mb-4">
              <Link
                href="/register/select-plan"
                className="w-10 h-10 rounded-full bg-[#00509d] flex items-center justify-center text-white hover:bg-[#0040a0] transition-colors"
              >
                <ArrowLeft size={20} strokeWidth={3} />
              </Link>
              <h1 className="text-3xl font-bold text-[#00509d] flex-1 text-center mr-10">Payment Information</h1>
            </div>
            <p className="text-gray-600 mb-6 text-center w-full">
              Enter your payment details to complete your registration
            </p>

            {/* Progress indicator */}
            <div className="w-full mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-xs">Step 5 of 5</span>
                <span className="text-gray-500 text-xs">Payment Details</span>
              </div>
              <div className="w-full bg-gray-200 h-1 rounded-full">
                <div className="bg-[#00509d] h-1 rounded-full" style={{ width: "100%" }}></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* Payment Form */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Card Information</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="cardName" className="block text-gray-700 text-sm font-medium mb-1">
                      Cardholder Name*
                    </label>
                    <input
                      id="cardName"
                      name="cardName"
                      type="text"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white border ${
                        errors.cardName ? "border-red-500" : "border-gray-300"
                      } rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d]`}
                      placeholder="Name on card"
                    />
                    {errors.cardName && <p className="mt-1 text-red-500 text-xs">{errors.cardName}</p>}
                  </div>

                  <div>
                    <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-medium mb-1">
                      Card Number*
                    </label>
                    <div className="relative">
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        className={`w-full px-4 py-3 bg-white border ${
                          errors.cardNumber ? "border-red-500" : "border-gray-300"
                        } rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d]`}
                        placeholder="1234 5678 9012 3456"
                      />
                      <CreditCard
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                    </div>
                    {errors.cardNumber && <p className="mt-1 text-red-500 text-xs">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-medium mb-1">
                        Expiry Date*
                      </label>
                      <input
                        id="expiryDate"
                        name="expiryDate"
                        type="text"
                        value={formData.expiryDate}
                        onChange={handleExpiryDateChange}
                        maxLength={5}
                        className={`w-full px-4 py-3 bg-white border ${
                          errors.expiryDate ? "border-red-500" : "border-gray-300"
                        } rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d]`}
                        placeholder="MM/YY"
                      />
                      {errors.expiryDate && <p className="mt-1 text-red-500 text-xs">{errors.expiryDate}</p>}
                    </div>

                    <div>
                      <label htmlFor="cvv" className="block text-gray-700 text-sm font-medium mb-1">
                        CVV*
                      </label>
                      <input
                        id="cvv"
                        name="cvv"
                        type="text"
                        value={formData.cvv}
                        onChange={handleChange}
                        maxLength={4}
                        className={`w-full px-4 py-3 bg-white border ${
                          errors.cvv ? "border-red-500" : "border-gray-300"
                        } rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d]`}
                        placeholder="123"
                      />
                      {errors.cvv && <p className="mt-1 text-red-500 text-xs">{errors.cvv}</p>}
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-6">Billing Address</h2>

                  <div>
                    <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-1">
                      Address*
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white border ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      } rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d]`}
                      placeholder="Street address"
                    />
                    {errors.address && <p className="mt-1 text-red-500 text-xs">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-gray-700 text-sm font-medium mb-1">
                        City*
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white border ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        } rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d]`}
                        placeholder="City"
                      />
                      {errors.city && <p className="mt-1 text-red-500 text-xs">{errors.city}</p>}
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-gray-700 text-sm font-medium mb-1">
                        State/Province*
                      </label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white border ${
                          errors.state ? "border-red-500" : "border-gray-300"
                        } rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d]`}
                        placeholder="State/Province"
                      />
                      {errors.state && <p className="mt-1 text-red-500 text-xs">{errors.state}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="zipCode" className="block text-gray-700 text-sm font-medium mb-1">
                        ZIP/Postal Code*
                      </label>
                      <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white border ${
                          errors.zipCode ? "border-red-500" : "border-gray-300"
                        } rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d]`}
                        placeholder="ZIP/Postal Code"
                      />
                      {errors.zipCode && <p className="mt-1 text-red-500 text-xs">{errors.zipCode}</p>}
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-gray-700 text-sm font-medium mb-1">
                        Country*
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00509d]"
                      >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-start gap-2">
                      <input
                        id="agreeTerms"
                        name="agreeTerms"
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="mt-1"
                      />
                      <label htmlFor="agreeTerms" className="text-gray-600 text-sm">
                        I agree to the{" "}
                        <Link href="#" className="text-[#00509d] hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-[#00509d] hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    {errors.agreeTerms && <p className="mt-1 text-red-500 text-xs">{errors.agreeTerms}</p>}
                  </div>
                </form>
              </div>

              {/* Order Summary */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <div>
                        <h3 className="text-gray-800 font-medium">Annual Subscription</h3>
                        <p className="text-gray-500 text-sm">
                          {userRole === "parent" ? parentStudents.length : studentCount}{" "}
                          {(userRole === "parent" ? parentStudents.length : studentCount) === 1
                            ? "student"
                            : "students"}
                        </p>
                      </div>
                      <p className="text-gray-800 font-medium">
                        ₹{getPricePerStudent()}
                        <span className="text-gray-500 text-sm">/student/month</span>
                      </p>
                    </div>

                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <div>
                        <h3 className="text-gray-800 font-medium">Monthly Total</h3>
                      </div>
                      <p className="text-gray-800 font-medium">₹{formatPrice(getMonthlyTotal())}</p>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <h3 className="text-gray-800 font-medium">Annual Total</h3>
                      <p className="text-xl font-bold text-gray-800">
                        ₹{formatPrice(getAnnualTotal())}
                        <span className="text-gray-500 text-sm">/year</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h4 className="text-gray-800 font-medium">30-Day Money-Back Guarantee</h4>
                        <p className="text-gray-500 text-sm">Not satisfied? Get a full refund within 30 days.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#00509d]/20 flex items-center justify-center">
                        <Lock className="h-5 w-5 text-[#00509d]" />
                      </div>
                      <div>
                        <h4 className="text-gray-800 font-medium">Secure Payment</h4>
                        <p className="text-gray-500 text-sm">Your payment information is encrypted and secure.</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`w-full py-3 mt-6 rounded-md text-white font-semibold transition-colors flex items-center justify-center gap-2 ${
                      isLoading ? "bg-[#00509d]/70 cursor-not-allowed" : "bg-[#00509d] hover:bg-[#0040a0]"
                    }`}
                  >
                    {isLoading ? "Processing..." : "Complete Purchase"}
                    {!isLoading && <ArrowRight size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

