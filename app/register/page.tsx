"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SpaceBackground } from "@/components/space-background"
import { ArrowRight } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "teacher", // Default role - School Teacher/Tutor
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation (now required)
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[0-9\s\-()]{7,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
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
      // Store registration data in localStorage
      localStorage.setItem("registrationData", JSON.stringify(formData))
      setIsLoading(false)
      router.push("/register/account-details")
    }, 1000)
  }

  return (
    <div className="relative min-h-screen w-full bg-gray-50">
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-white via-blue-50 to-blue-100 opacity-70" />
      <SpaceBackground />

      <div className="relative z-10 flex flex-col items-center p-4 sm:p-8 max-w-2xl w-full mx-auto">
        {/* Content container with background */}
        <div className="w-full mt-8 bg-white backdrop-blur-md border border-blue-100 shadow-lg rounded-lg">
          {/* Content wrapper with padding */}
          <div className="flex flex-col items-center px-6 sm:px-8 py-8 w-full">
            <div className="flex items-center justify-center w-full mb-4">
              <h1 className="text-3xl font-bold text-[#00509d]">Register</h1>
            </div>
            <p className="text-gray-600 mb-6 text-center w-full">
              Create an account to start your space math adventure
            </p>

            {/* Progress indicator */}
            <div className="w-full mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-xs">Step 1 of 5</span>
                <span className="text-gray-500 text-xs">Basic Information</span>
              </div>
              <div className="w-full bg-gray-200 h-1 rounded-full">
                <div className="bg-[#00509d] h-1 rounded-full" style={{ width: "20%" }}></div>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="role" className="block text-gray-700 text-sm font-medium mb-1">
                    I am a:*
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#00509d] border border-[#00509d] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]"
                  >
                    <option value="teacher">School Teacher/Tutor</option>
                    <option value="parent">Parent/Guardian</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-1">
                      First Name*
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white border ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      } rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]`}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="mt-1 text-red-500 text-xs">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium mb-1">
                      Last Name*
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white border ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      } rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]`}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="mt-1 text-red-500 text-xs">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                    Email*
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]`}
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-1">
                    Phone Number*
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && <p className="mt-1 text-red-500 text-xs">{errors.phone}</p>}
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 rounded-md text-white font-semibold transition-colors flex items-center justify-center gap-2 ${
                    isLoading ? "bg-[#00509d]/70 cursor-not-allowed" : "bg-[#00509d] hover:bg-[#003f88]"
                  }`}
                >
                  {isLoading ? "Processing..." : "Continue"}
                  {!isLoading && <ArrowRight size={18} />}
                </button>

                <div className="text-center">
                  <p className="text-gray-600 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#00509d] hover:text-[#003f88] transition-colors">
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

