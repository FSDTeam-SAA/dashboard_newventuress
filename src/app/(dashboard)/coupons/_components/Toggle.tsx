"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  defaultChecked?: boolean
}

export default function Toggle({ className, defaultChecked = true, ...props }: ToggleProps) {
  const [enabled, setEnabled] = React.useState(defaultChecked)

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => setEnabled(!enabled)}
      className={cn(
        "relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        enabled ? "bg-white" : "bg-white",
        "border ",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full transition-transform",
          enabled ? "translate-x-6 bg-[#1a237e]" : "translate-x-0.5 s bg-[#9e9e9e]",
        )}
      />
    </button>
  )
}

