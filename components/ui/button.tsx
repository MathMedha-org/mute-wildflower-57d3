import type React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        ghost: "bg-transparent text-primary hover:bg-accent/10",
        outline: "border border-[#50adb6] text-[#50adb6] hover:bg-[#50adb6]/10",
      },
      size: {
        sm: "h-8 px-3",
        lg: "h-10 px-4",
        default: "h-9 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export const Button = ({
  children,
  className,
  asChild,
  ...props
}: {
  children: React.ReactNode
  className?: string
  asChild?: boolean
  props?: any
} & VariantProps<typeof buttonVariants>) => {
  const buttonClasses = buttonVariants({ ...props, className })

  if (asChild) {
    return (
      <button className={buttonClasses} {...props}>
        {children}
      </button>
    )
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}

export { buttonVariants }

