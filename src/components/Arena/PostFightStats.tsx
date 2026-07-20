import type { Character } from '@/types/types'
import { parseKi, calculateArenaProgressBar } from '@/utils/Kiformatter'
import PostFightFighter from './PostFightFighter'
import { motion } from 'motion/react'

interface PostFightStatsProps {
  left: Character | null
  right: Character | null
  winnerSide: 'left' | 'right' | null
  isUpset: boolean | null
}

export default function PostFightStats({ left, right, winnerSide, isUpset }: PostFightStatsProps) {
  if (!left || !right) return null
  // Normalize both fighters against the strongest power level
  // so each progress bar reflects the matchup visually.
  const leftMaxPower = parseKi(left.maxKi) ?? 0n
  const rightMaxPower = parseKi(right.maxKi) ?? 0n
  const maxPower = leftMaxPower > rightMaxPower ? leftMaxPower : rightMaxPower

  const leftPowerPercentage = calculateArenaProgressBar(leftMaxPower, maxPower)
  const rightPowerPercentage = calculateArenaProgressBar(rightMaxPower, maxPower)


  return (
    <div className='relative flex w-full items-center justify-center gap-6 md:gap-10'>
      {isUpset && (
        <motion.div
          className='absolute left-1/2 top-0 -translate-x-1/2 -translate-y-4 z-10'
          initial={{ scale: 0, rotate: -12, opacity: 0 }}
          animate={{ scale: 1, rotate: -6, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.6 }}
        >
          <span className='rounded-full bg-destructive px-4 py-1 text-sm font-black uppercase tracking-widest text-foreground
            shadow-[0_0_20px_rgba(220,38,38,0.7)]'>
            Upset!
          </span>
        </motion.div>
      )}
      <PostFightFighter
        side='left'
        character={left}
        isWinner={winnerSide === 'left'}
        percentage={leftPowerPercentage}
      />
      <PostFightFighter
        side='right'
        character={right}
        isWinner={winnerSide === 'right'}
        percentage={rightPowerPercentage}
      />
    </div>
  )
}
