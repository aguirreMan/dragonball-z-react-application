import type { Planets } from '@/types/types'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { Button} from '@/components/shared/Button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/shared/Card'
import { Badge } from '@/components/shared/Badge'

export default function PlanetsCard({ planet }: { planet: Planets }) {
  return (
    <motion.article whileHover={{ scale: 1.05, y: -5}} transition={{ duration: 0.2 }}>
      <Card>
        <CardHeader>
          <CardTitle className='text-universe-space'>
            {planet.name}
          </CardTitle>
          <Badge
            variant={planet.isDestroyed ? 'destructive' : 'success'}
            size='sm'
          >
            <span className='h-2 w-2 inline-block rounded-full bg-foreground' />
            {planet.isDestroyed ? "Destroyed" : "Thriving"}
          </Badge>
        </CardHeader>
        <CardContent>
          <img src={planet.image} alt={planet.name} className='mb-4 h-64 w-full rounded-lg object-cover' />
        </CardContent>
        <CardFooter>
          <Button asChild className='px-18 bg-secondary hover:bg-universe-space'>
            <Link to={`/planets/${planet.id}`}>
              Ver Planeta →
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.article>
  )
}
