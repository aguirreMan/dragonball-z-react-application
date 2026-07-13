import FighterCards from '@/components/Arena/FighterCards'
import FighterSelector from '@/components/Arena/FighterSelector'
import { useFetchData } from '@/hooks/useFetchData'
import type { Character, CharacterResponse } from '@/types/types'
import { useState } from 'react'
import { BASE_URL } from '@/utils/constants'

export default function DragonBallArena() {
  const { data } = useFetchData<CharacterResponse>(`${BASE_URL}/characters?limit=58`)

  const [leftSideCharacter, setLeftSideCharacter] = useState<Character | null>(null)
  const [rightSideCharacter, setRightSideCharacter] = useState<Character | null>(null)
  const [activeSlot, setActiveSlot] = useState<'left' | 'right' | null>(null)

  function assignCharacterToSlot(character: Character) {
    if(activeSlot === 'left') {
      setLeftSideCharacter(character)
    }
    if (activeSlot === 'right') {
      setRightSideCharacter(character)
    }
    setActiveSlot(null)
  }

  return (
    <section className='mx-auto max-w-5xl px-4 py-10 space-y-10'>
      <h1 className='text-primary text-4xl md:text-5xl font-black text-center tracking-tight'>
        Dragon Ball Arena
      </h1>
      <FighterCards leftSide={leftSideCharacter} rightSide={rightSideCharacter} onCharacterSelect={setActiveSlot} />
      <FighterSelector characters={data?.items ?? []} openModal={activeSlot !== null} onOpenChange={() => setActiveSlot(null)} onCharacterSelect={assignCharacterToSlot} />
    </section>
  )
}
