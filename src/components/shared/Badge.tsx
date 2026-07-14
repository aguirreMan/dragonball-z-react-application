import React from 'react'
import { cn } from '@/lib/utils/utils'

type BadgeSizes = 'sm' | 'md' | 'lg'
type BadgeVariants = 'primary' | 'destructive' | 'neutral'

const VariantClasses: Record<BadgeVariants, string> = {
  primary: 'bg-primary text-white',
  destructive: 'bg-destructive text-white',
  neutral: 'bg-secondary text-muted-foreground',
}

const SizeClasses: Record<BadgeSizes, string> = {
  sm: 'text-sm px-2 py-0.5 w-fit',
  md: 'text-base px-2 py-0.5 w-fit',
  lg: 'text-lg px-2 py-0.5 w-fit',
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariants
  size?: BadgeSizes
  children: React.ReactNode
}

export function Badge({ variant, size, className, children, ...props }: BadgeProps) {
  const variantClass = VariantClasses[variant ?? 'primary']
  const sizeClass = SizeClasses[size ?? 'md']
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium gap-2 justify-center',
        variantClass,
        sizeClass,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
