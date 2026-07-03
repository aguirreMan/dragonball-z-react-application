import { motion } from 'motion/react'

export default function Loading() {
  return (
    <div className='flex items-center justify-center min-h-screen gap-2'>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className='w-8 h-8 bg-primary rounded-md'
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: index * 0.2, ease: 'easeInOut'}}
        />
      ))}
    </div>
  )
}
