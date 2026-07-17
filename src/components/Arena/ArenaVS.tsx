import { motion } from 'motion/react'

interface ArenaVSProps {
  leftSideFilled: boolean
  rightSideFilled: boolean
}

export default function ArenaVS({ leftSideFilled, rightSideFilled }: ArenaVSProps) {
  const allSlotsSelected = leftSideFilled && rightSideFilled
  return (
    <motion.div
      className='text-primary text-4xl font-black flex gap-1 tracking-widest uppercase transition-all duration-300'
      animate={{
        scale: allSlotsSelected ? [1, 1.05] : 1,
        filter: allSlotsSelected
          ? 'drop-shadow(0 0 12px rgba(240, 200, 20, 0.8)) drop-shadow(0 0 25px rgba(230, 180, 8, 0.4))'
          : 'drop-shadow(0 0 0px rgba(0,0,0,0))'
      }}
      transition={{
        scale: { repeat: allSlotsSelected ? Infinity : 0, duration: 2, ease: 'easeInOut' },
        filter: { duration: 0.4 }
      }}
    >
      <motion.span
        key={`v-${leftSideFilled}`}
        animate={leftSideFilled ? {
          scale: [1, 1.6, 1],
          color: ['#ffffff', '#fbbf24', '#eab308']
        } : {
          scale: 1,
          color: '#cbd5e1'
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        V
      </motion.span>
      <motion.span
        key={`s-${rightSideFilled}`}
        animate={rightSideFilled ? {
          scale: [1, 1.6, 1],
          color: ['#ffffff', '#fbbf24', '#eab308']
        } : {
          scale: 1,
          color: '#cbd5e1'
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        S
      </motion.span>
    </motion.div>
  )
}
