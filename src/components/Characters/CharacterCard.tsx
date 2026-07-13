import type { Character } from '@/types/types'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import Button from '@/components/shared/Button'

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <motion.article whileHover={{ scale: 1.05, y: -5}} transition={{ duration: 0.2 }} className='bg-card overflow-hidden shadow rounded-lg p-6'>
      <h2 className='text-2xl font-bold text-secondary-foreground text-center mb-2'>{character.name}</h2>
      <img src={character.image} alt={character.name} className='mb-4 h-64 w-full rounded-lg object-contain' />
      <Button asChild className='mt-auto inline-block text-secondary font-semibold hover:underline text-center w-full'>
        <Link to={`/characters/${character.id}`}>View Character →</Link>
      </Button>
    </motion.article>
  )
}
