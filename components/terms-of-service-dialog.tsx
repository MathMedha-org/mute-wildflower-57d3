import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TermsOfServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TermsOfServiceDialog({ open, onOpenChange }: TermsOfServiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80%] max-h-[80vh] overflow-y-auto bg-white text-gray-800 border-[#00509d] shadow-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#00509d]">Terms of Service</DialogTitle>
          <DialogDescription className="text-gray-600">Last updated: February 20, 2024</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-[#00509d]">1. Acceptance of Terms</h3>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by the terms and provisions of this
              agreement.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-[#00509d]">2. Use License</h3>
            <p className="text-gray-600 leading-relaxed">
              Permission is granted to temporarily access the materials (information or software) on this website for
              personal, non-commercial viewing only.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>The materials cannot be modified or copied</li>
              <li>The materials cannot be used for commercial purposes</li>
              <li>Any unauthorized use terminates the permission automatically</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-[#00509d]">3. Disclaimer</h3>
            <p className="text-gray-600 leading-relaxed">
              The materials on this website are provided on an 'as is' basis. We make no warranties, expressed or
              implied, and hereby disclaim and negate all other warranties including, without limitation, implied
              warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-[#00509d]">4. Limitations</h3>
            <p className="text-gray-600 leading-relaxed">
              In no event shall we or our suppliers be liable for any damages (including, without limitation, damages
              for loss of data or profit, or due to business interruption) arising out of the use or inability to use
              the materials on our website.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

