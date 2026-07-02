import type { CharacterPowerStats } from '@/types/types'
import { motion } from 'motion/react'



export default function CharacterPowerStatsCard({ powerStats }: { powerStats: CharacterPowerStats }) {
  return (
    <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='bg-card p-6 rounded-2xl border border-zinc-200 shadow mt-8'>
      <motion.p className='text-sm font-medium pb-4'>
        Power Stats: <span className='text-primary'>{powerStats.ki} / {powerStats.maxKi}</span>

      </motion.p>
      <motion.p className='text-sm font-medium pb-4'>
        Gender: <span className='text-primary'>{powerStats.gender}</span>
      </motion.p>
      <motion.p className='text-sm font-medium pb-4'>
        Race: <span className='text-primary'>{powerStats.race}</span>
      </motion.p>
    </motion.article>
  )
}
