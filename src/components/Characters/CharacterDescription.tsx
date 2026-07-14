import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/Card'
import Button from '@/components/shared/Button'

export default function CharacterDescription({ description, descriptionLimit = 250 }: { description: string, descriptionLimit?: number }) {
  const [expandedCharacterDescription, setExpandedCharacterDescription] = useState(false)
  const needsTruncation = description.length > descriptionLimit

  return (
    <Card>
      <CardHeader>
        <CardTitle>Biografía</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-sm leading-relaxed m-2 text-muted-foreground ${expandedCharacterDescription ? '' : 'line-clamp-3'}`}>
          {description}
        </p>
        {needsTruncation && (
          <Button className='bg-transparent text-primary border-0 shadow-none p-0 h-auto hover:bg-transparent'
            onClick={() => setExpandedCharacterDescription(prev => !prev)}
          >
            {expandedCharacterDescription ? 'Show less' : 'Read more!'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
