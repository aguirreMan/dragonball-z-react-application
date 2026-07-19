import { useState, useEffect, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'

export default function CharacterDescription({ description }: { description: string}) {
  const [expandedCharacterDescription, setExpandedCharacterDescription] = useState(false)
  const [isOverFlowing, setIsOverFlowing] = useState(false)

  const descriptionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (descriptionRef.current) {
      const hasOverflow = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight
      setIsOverFlowing(hasOverflow)
    }
  }, [description, expandedCharacterDescription])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Biografía</CardTitle>
      </CardHeader>
      <CardContent>
        <p
          ref={descriptionRef}
          className={`text-base leading-relaxed text-muted-foreground ${expandedCharacterDescription ? '' : 'line-clamp-3'}`}
        >
          {description}
        </p>
        {(isOverFlowing || expandedCharacterDescription) && (
          <Button className='bg-transparent mt-4 cursor-pointer text-primary border-0 shadow-none p-0 h-auto hover:bg-transparent'
            onClick={() => setExpandedCharacterDescription(prev => !prev)}
          >
            {expandedCharacterDescription ? 'Ver Menos' : 'Leer Más!'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
