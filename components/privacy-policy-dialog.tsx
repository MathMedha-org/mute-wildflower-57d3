import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PrivacyPolicyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PrivacyPolicyDialog({ open, onOpenChange }: PrivacyPolicyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80%] max-h-[80vh] overflow-y-auto bg-white text-gray-800 border-[#00509d] shadow-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#00509d]">Privacy Policy</DialogTitle>
          <DialogDescription className="text-gray-600">Last updated: February 20, 2024</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-[#00509d]">Information We Collect</h3>
            <p className="text-gray-600 leading-relaxed">
              We collect information that you provide directly to us, including when you create an account, use our
              services, or communicate with us. This may include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Usage data and preferences</li>
              <li>Device and browser information</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-[#00509d]">How We Use Your Information</h3>
            <p className="text-gray-600 leading-relaxed">
              We use the information we collect to provide, maintain, and improve our services, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Personalizing your learning experience</li>
              <li>Analyzing usage patterns to improve our platform</li>
              <li>Communicating with you about updates and new features</li>
              <li>Ensuring the security of your account</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-[#00509d]">Data Security</h3>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

