import type { Character } from '@/types/types'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils/utils'
import { AffiliationBadge } from '@/components/Characters/AffiliationBadge'
import { CharacterPowerProgress } from '@/components/Characters/CharacterPowerProgress'
import { formatKiForDisplay } from '@/utils/Kiformatter'

interface PostFightFighterProps {
  side: 'left' | 'right'
  character: Character
  isWinner: boolean
  percentage: number
}

export default function PostFightFighter({ side, character, isWinner, percentage }: PostFightFighterProps) {
  return (
    <motion.div
      className={cn(
        'relative flex flex-1 flex-col items-center gap-4',
        !isWinner && 'opacity-50'
      )}
      initial={{ opacity: 0 ,x: side === 'left' ? -40 : 40  }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/*Animate the winner */}
      <motion.img
        src={character.image}
        alt={character.name}
        className={cn(
          'w-40 object-contain transition-all duration-300',
          isWinner
            ? 'scale-110 drop-shadow-[0_0_35px_rgba(250,204,21,0.7)]'
            : 'scale-90 opacity-60 grayscale'
        )}
        animate={isWinner ? { scale: [1, 1.15, 1.2] } : { scale: 0.95 }}
        transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut'}}
      />
      <h2 className='text-2xl font-bold text-arena-primary mt-6 tracking-tight'>
        {character.name}
      </h2>
      <AffiliationBadge affiliation={character.affiliation} size='sm' />

      <div className='w-full px-4 space-y-2'>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-muted-foreground text-xl'>Max Ki</span>
          <span className='font-semibold text-primary text-xl'>
            {formatKiForDisplay(character.maxKi)}
          </span>
        </div>
        <CharacterPowerProgress percentage={percentage} />
      </div>
    </motion.div >
  )
}
