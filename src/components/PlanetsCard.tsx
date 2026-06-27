
import type { Planets } from '@/types/types'

export default function PlanetsCard({ planet }: { planet: Planets }) {
  return (
    <article className='bg-card shadow rounded-lg p-6'>
      <h2 className='text-2xl font-bold text-secondary-foreground text-center mb-2'>{planet.name}</h2>
      <img src={planet.image} alt={planet.name} className='mb-4 h-64 w-full rounded-lg object-cover' />
    </article>
  )
}
