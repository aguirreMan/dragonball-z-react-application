import { motion } from 'motion/react'
import { Link } from 'react-router'

interface ErrorProps {
  title?: string
  message?: string
  onRetry?: () => void

}

export default function Error({
  title = 'POWER LEVEL: ??',
  message = 'This character your looking for does not exist in the realm of dragon ball z',
  onRetry }: ErrorProps) {
  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center'>
      <div className='relative mb-10 flex items-center justify-center'>
        <motion.div
          className='absolute h-56 w-56 rounded-full bg-destructive/20 blur-3xl'
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut'}}
        />
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            className='absolute rounded-full border border-destructive/40'
            style={{ height: 96 + ring * 40, width: 96 + ring * 40 }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: ring * 0.5, ease: 'easeInOut' }}
          />
        ))}
        <motion.div
          className='relative flex h-24 w-24 items-center justify-center rounded-full bg-destructive text-4xl font-black
          text-primary-foreground shadow=[0_0_60px] shadow-destructive'
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          !
        </motion.div>
      </div>
      <motion.h1
        className='text-4xl font-black uppercase tracking-widest text-destructive sm:text-5xl'
        animate={{ x: [0, -2, 3, -1, 0], opacity: [1, 0.85, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2.5 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className='mt-4 max-w-md text-lg text-muted-foreground'
        initial={{ opacity: 0, y: 10}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {message}
      </motion.p>

      <motion.div
        className='mt-10 flex flex-wrap items-center justify-center gap-4'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
      {onRetry && (
        <button
          onClick={onRetry}
          className='rounded-md bg-primary px-6 py-3 font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-105'
        >
            Try Again
        </button>
        )}
        <Link
          to='/'
            className='rounded-md border border-border bg-secondary px-6 py-3 font-bold uppercase tracking-wide text-foreground transition-colors hover:text-primary'
          >
            Back to Dragon Ball Field
        </Link>
      </motion.div>
    </div>
  )
}
