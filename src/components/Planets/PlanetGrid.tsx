import { motion } from 'motion/react'
import type { PlanetsResponse } from '@/types/types'
import PlanetsCard from './PlanetsCard'

export default function PlanetGrid({ planets }: { planets: PlanetsResponse }) {

  return (
    <motion.div hidden={planets.items.length === 0} initial={{ opacity: 0}} animate={{ opacity: 1 }}>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {planets.items.map((planet) => (
          <PlanetsCard key={planet.id} planet={planet} />
        ))}
      </div>
    </motion.div>
  )
}
