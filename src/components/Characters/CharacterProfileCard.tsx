import type { Character } from '@/types/types'
import { motion } from 'motion/react'
import { Link } from 'react-router'

export default function CharacterProfileCard({ character }: { character: Character }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col relative gap-6 rounded-2xl border border-zinc-200 bg-card p-6 shadow'
    >
      <div className='flex items-start gap-4'>
        <img src={character.image} alt={character.name} className='mx-auto max-h-72 w-auto object-contain' />
        <span className='absolute right-6 top-6 rounded-2xl bg-secondary px-3 py-1'>{character.affiliation}</span>
      </div>

      <div>
        <h1 className='text-4xl font-bold text-primary text-center'>{character.name}</h1>
        <div className='mt-3 flex flex-wrap gap-4 justify-between text-xs'>
          <span className='rounded-full bg-secondary px-4 py-2'>{character.race}</span>
          <span className='rounded-full bg-secondary px-4 py-2'>{character.gender}</span>
        </div>
      </div>
      <dl className='grid grid-cols-2 gap-4 text-sm'>
        <div>
          <dt className='text-muted-foreground mb-4'>KI</dt>
          <dd className='font-semibold text-primary'>{character.ki}</dd>
        </div>
        <div>
          <dt className='text-muted-foreground mb-4'>Max Ki</dt>
          <dd className='font-semibold text-primary'>{character.maxKi}</dd>
        </div>
      </dl>
      {/* Origin planet */}
      {character.originPlanet && (
        <div className='text-sm'>
          <div className='flex items-center justify-between mb-4'>
            <p className='text-2xl text-muted-foreground'>Origin Planet</p>
            <p className='font-semibold text-primary text-xl'>{character.originPlanet.name}</p>
          </div>
          <Link
            to={`/planets/${character.originPlanet.id}`}
            className='flex w-40 gap-4 rounded-xl border border-zinc-200 p-4 transition-colors hover:bg-secondary mx-auto'
          >
            <img src={character.originPlanet.image} alt={character.originPlanet.name} className='h-12 w-12 rounded-full object-cover' />
            {character.originPlanet.isDestroyed && (
              <span className='text-xs  text-destructive'>Destroyed</span>
            )}
          </Link>
        </div>
      )}
    </motion.article>
  )
}
