import type { Character } from '@/types/types'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Button } from '@/components/shared/Button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/shared/Card'
import { AffiliationBadge } from '@/components/Characters/AffiliationBadge'

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <motion.article whileHover={{ scale: 1.05, y: -5}} transition={{ duration: 0.2 }}>
      <Card>
        <CardHeader>
          <CardTitle>
            {character.name}
          </CardTitle>
          <AffiliationBadge
            affiliation={character.affiliation}
            size='sm'
            className='top-2 right-2 absolute'
          />
        </CardHeader>
        <CardContent>
          <img src={character.image} alt={character.name} className='mb-4 h-64 w-full rounded-lg object-contain' />
        </CardContent>
        <CardFooter>
          <Button asChild className='mt-auto inline-block bg-secondary text-primary font-semibold
            hover:bg-secondary/80 text-center w-full border border-primary/20 hover:border-primary/60'
          >
            <Link to={`/characters/${character.id}`}>View Character →</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.article>
  )
}
