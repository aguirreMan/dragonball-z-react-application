import { motion } from 'motion/react'

interface BattleCountdownProps {
  seconds: number
}

export default function BattleCountdown({ seconds }: BattleCountdownProps) {
  return (
    <div className='relative flex items-center justify-center h-80 w-80'>
      <motion.div
        className='absolute inset-0 rounded-full border-4 border-arena-primary'
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className='absolute inset-8 rounded-full bg-arena-primary/25 blur-2xl'
        animate={{
           scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        key={seconds}
        initial={{ scale: 1.5, opacity: 0, filter: 'blur(8px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        className='relative z-10'
      >
        <div
          className='bg-linear-to-b from-yellow-300 via-orange-400
          bg-clip-text py-2 text-8xl font-black leading-normal text-transparent
          drop-shadow-[0_0_20px_rgba(251,146,60,0.8)]'
        >
          {seconds}
        </div>
      </motion.div>
    </div>
  )
}
