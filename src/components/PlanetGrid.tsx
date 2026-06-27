import type { PlanetsResponse } from '@/types/types'
import PlanetsCard from './PlanetsCard'

export default function PlanetGrid({ planets }: { planets: PlanetsResponse }) {
  return (
    <div className='grid grid-cols-3 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {planets.items.map((planet) => (
        <PlanetsCard key={planet.id} planet={planet} />
      ))}
    </div>
  )
}
