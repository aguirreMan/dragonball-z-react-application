import React from 'react'
import { cn } from '@/lib/utils/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn('bg-card border overflow-hidden shadow rounded-lg', className)} {...props}>
      {children}
    </div>
  )
}

function CardHeader({ children, className, ...props }: CardProps) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
}

function CardTitle({ children, className, ...props }: CardTitleProps) {
  return (
    <h2 className={cn('text-2xl text-center leading-none font-bold text-foreground p-6 pb-4', className)} {...props}>
      {children}
    </h2>
  )
}

function CardContent({ children, className, ...props }: CardProps) {
  return (
    <div className={cn('px-6 pb-4', className)} {...props}>
      {children}
    </div>
  )
}

function CardFooter({ children, className, ...props }: CardProps) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  )
}

export { Card, CardHeader, CardTitle, CardContent, CardFooter }
