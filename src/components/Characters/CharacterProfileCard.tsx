import type { Character } from '@/types/types'
import { motion } from 'motion/react'
import { Link } from 'react-router'
import { formatKiForDisplay } from '@/utils/Kiformatter'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import { AffiliationBadge } from '@/components/Characters/AffiliationBadge'

export default function CharacterProfileCard({ character }: { character: Character }) {
  const kiDisplay = formatKiForDisplay(character.ki)
  const maxKiDisplay = formatKiForDisplay(character.maxKi)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <article>
          <div className='relative'>
            <CardHeader>
              <CardTitle>{character.name}</CardTitle>
            </CardHeader>
            <AffiliationBadge affiliation={character.affiliation} size='md' className='absolute right-6 top-6' />
          </div>

          <CardContent>
            <img src={character.image} alt={character.name} className='mx-auto max-h-72 w-auto object-contain' />
          </CardContent>

          <CardContent>
            <dl className='grid grid-cols-2 gap-6 text-center'>
              <div className='space-y-1'>
                <dt className='text-sm text-muted-foreground'>Race</dt>
                <dd className='text-lg font-semibold text-primary'>{character.race}</dd>
              </div>
              <div className='space-y-1'>
                <dt className='text-sm text-muted-foreground'>Gender</dt>
                <dd className='text-lg font-semibold text-primary'>{character.gender}</dd>
              </div>
              <div className='space-y-1'>
                <dt className='text-sm text-muted-foreground'>KI</dt>
                <dd className='text-lg font-semibold text-primary'>{kiDisplay}</dd>
              </div>
              <div className='space-y-1'>
                <dt className='text-sm text-muted-foreground'>Max KI</dt>
                <dd className='text-lg font-semibold text-primary'>{maxKiDisplay}</dd>
              </div>
            </dl>
          </CardContent>

          {character.originPlanet && (
            <CardFooter>
              <div className='w-full space-y-4'>
                <div className='text-center space-y-2'>
                  <h3 className='text-sm font-medium text-muted-foreground'>Origin Planet</h3>
                  <p className='text-2xl font-bold text-primary'>{character.originPlanet.name}</p>
                </div>
                <Button asChild className='auto bg-secondary'>
                  <Link to={`/planets/${character.originPlanet.id}`} className='flex items-center gap-6'>
                    <img
                      src={character.originPlanet.image}
                      alt={character.originPlanet.name}
                      className='h-12 w-12 rounded-full object-cover'
                    />
                    <span className='flex-1 text-left text-foreground'>View Planet Details</span>
                    {character.originPlanet.isDestroyed && (
                      <span className='text-xs font-semibold text-destructive'>Destroyed</span>
                    )}
                  </Link>
                </Button>
              </div>
            </CardFooter>
          )}
        </article>
      </Card>
    </motion.div>
  )
}
