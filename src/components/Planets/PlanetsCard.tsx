import type { Planets } from '@/types/types'
import { Link } from 'react-router'
import { motion } from 'motion/react'


export default function PlanetsCard({ planet }: { planet: Planets }) {
  return (
    <Link to={`/planets/${planet.id}`} className="block no-underline">
      <motion.article whileHover={{ scale: 1.05, y: -5}} transition={{ duration: 0.2 }} className='bg-card cursor-pointer overflow-hidden shadow rounded-lg p-6'>
        <h2 className='text-2xl font-bold text-secondary-foreground text-center mb-2'>{planet.name}</h2>
        <img src={planet.image} alt={planet.name} className='mb-4 h-64 w-full rounded-lg object-cover' />
        <span className='mt-auto inline-block text-primary font-semibold hover:underline text-center w-full'>
          View Planet →
        </span>
      </motion.article>
    </Link>
  )
}
