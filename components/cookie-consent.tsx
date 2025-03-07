"use client"

import { useState } from "react"
import { X, Cookie } from "lucide-react"
import { PrivacyPolicyDialog } from "./privacy-policy-dialog"
import { TermsOfServiceDialog } from "./terms-of-service-dialog"

export function CookieConsent() {
  const [showNotification, setShowNotification] = useState(false)
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
  const [showTermsOfService, setShowTermsOfService] = useState(false)

  return (
    <>
      {showNotification && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0F283D] text-white p-4 flex justify-between items-center z-[55]">
          <p className="text-sm md:text-base pr-4">
            By using this site, you agree to our{" "}
            <button
              onClick={() => setShowPrivacyPolicy(true)}
              className="text-[#50adb6] hover:text-[#3d8a91] underline underline-offset-2 font-medium"
            >
              Privacy Policy
            </button>{" "}
            and{" "}
            <button
              onClick={() => setShowTermsOfService(true)}
              className="text-[#50adb6] hover:text-[#3d8a91] underline underline-offset-2 font-medium"
            >
              Terms of Service
            </button>
            . We use cookies to improve your experience.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNotification(false)}
              className="w-10 h-10 rounded-full bg-[#50adb6] flex items-center justify-center text-white hover:bg-[#3d8a91] relative z-50"
            >
              <X size={20} strokeWidth={3} />
            </button>
            <button
              onClick={() => setShowNotification(true)}
              className="w-12 h-12 rounded-full bg-[#50adb6] flex items-center justify-center text-white"
              aria-label="Cookie settings"
            >
              <Cookie size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
      <PrivacyPolicyDialog open={showPrivacyPolicy} onOpenChange={setShowPrivacyPolicy} />
      <TermsOfServiceDialog open={showTermsOfService} onOpenChange={setShowTermsOfService} />
      {!showNotification && (
        <button
          onClick={() => setShowNotification(true)}
          className="fixed bottom-1 right-4 w-12 h-12 rounded-full bg-[#50adb6] flex items-center justify-center text-white z-[60]"
          aria-label="Cookie settings"
        >
          <Cookie size={24} strokeWidth={2} />
        </button>
      )}
    </>
  )
}

