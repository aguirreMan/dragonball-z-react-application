import type { CharacterResponse } from '@/types/types'
import { motion } from 'motion/react'
import CharacterCard from './CharacterCard'


export default function CharacterGrid({ characters }: { characters: CharacterResponse }) {
  return (
    <motion.div hidden={characters.items.length === 0} initial={{ opacity: 0}} animate={{ opacity: 1 }}>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {characters.items.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </motion.div>
  )
}
