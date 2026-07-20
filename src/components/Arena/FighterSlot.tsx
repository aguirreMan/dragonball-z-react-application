import type { FighterSlotProps } from '@/types/types'

export default function FighterSlot({ side, character, onCharacterSelect }: FighterSlotProps) {
  return (
    <button
      onClick={() => onCharacterSelect(side)}
      className={`min-h-90 w-full rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors
        ${character
          ? 'bg-card border-2 border-arena-primary'
          : 'bg-card/50 border-2 border-dashed border-muted hover:border-arena-primary'}`}
    >
      {character ? (
        <>
          <img
            src={character.image}
            alt={character.name}
            className='h-56 w-full object-contain'
          />
          <h3 className='text-arena-primary text-xl font-bold'>{character.name}</h3>
        </>
      ) : (
        <>
          <span className='text-arena-primary text-5xl text-shadow-arena-glow'>+</span>
          <p className='text-foreground text-xl font-semibold'>
            Select Fighter
          </p>
        </>
      )}
    </button>
  )
}
