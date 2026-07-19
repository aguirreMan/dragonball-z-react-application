import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
  asChild?: boolean
}

export function Button({ className, children, asChild = false, type = 'button', ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp type={type} className={cn('px-2 py-2 bg-primary text-3xl rounded', className)} {...props} >
      {children}
    </Comp>
  )
}
