import type { Character } from '@/types/types'
import { Link } from 'react-router'
import { motion } from 'framer-motion'

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <Link to={`/characters/${character.id}`} className="block no-underline">
      <motion.article whileHover={{ scale: 1.05, y: -5}} transition={{ duration: 0.2 }} className='bg-card cursor-pointer overflow-hidden shadow rounded-lg p-6'>
        <h2 className='text-2xl font-bold text-secondary-foreground text-center mb-2'>{character.name}</h2>
        <img src={character.image} alt={character.name} className='mb-4 h-64 w-full rounded-lg object-contain' />
        <span className='mt-auto inline-block text-primary font-semibold hover:underline text-center w-full'>
          View Character →
        </span>
      </motion.article>
    </Link>
  )
}
