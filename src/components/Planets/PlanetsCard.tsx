import type { Planets } from '@/types/types'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import Button from '@/components/shared/Button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/shared/Card'


export default function PlanetsCard({ planet }: { planet: Planets }) {
  return (
    <motion.article whileHover={{ scale: 1.05, y: -5}} transition={{ duration: 0.2 }}>
      <Card>
        <CardHeader>
          <CardTitle>{planet.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <img src={planet.image} alt={planet.name} className='mb-4 h-64 w-full rounded-lg object-cover' />
        </CardContent>
        <CardFooter>
          <Button asChild className='px-18 bg-secondary'>
            <Link to={`/planets/${planet.id}`}>
              Ver Planeta →
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.article>
  )
}
