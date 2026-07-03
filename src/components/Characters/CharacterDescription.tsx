import { useState } from 'react'

export default function CharacterDescription({ description }: { description: string }) {
  const [expandedCharacterDescription, setExpandedCharacterDescription] = useState(false)

  return (
    <div className='rounded-2xl border border-zinc-200 bg-card p-6 shadow'>
      <h2 className='text-xl text-center font-semibold text-primary mb-6'>Biografía</h2>
      <p className={`text-sm leading-relaxed m-2 text-muted-foreground ${expandedCharacterDescription ? '' : 'line-clamp-3'}`}>
        {description}
      </p>
      <button onClick={() => setExpandedCharacterDescription(!expandedCharacterDescription)}
        className='mt-4 px-4 py-2 text-primary text-sm rounded-xl hover:underline transition-colors cursor-pointer'
      >
        {expandedCharacterDescription ? 'Show less' : 'Read more!'}
      </button>
    </div>
  )
}
