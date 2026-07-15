import FighterCards from '@/components/Arena/FighterCards'
import FighterSelector from '@/components/Arena/FighterSelector'
import { useFetchData } from '@/hooks/useFetchData'
import { useDragonBallArena } from '@/hooks/useDragonBallArena'
import type { CharacterResponse } from '@/types/types'
import { BASE_URL } from '@/utils/constants'
import ArenaController from '@/components/Arena/ArenaController'


export default function DragonBallArena() {
  const { data } = useFetchData<CharacterResponse>(`${BASE_URL}/characters?limit=58`)
  const arena = useDragonBallArena()

  console.log(arena.phase)

  return (
    <section className='mx-auto max-w-5xl px-4 py-10 space-y-10'>
      <h1 className='text-primary text-4xl md:text-5xl font-black text-center tracking-tight'>
        Dragon Ball Arena
      </h1>
      <FighterCards
        leftSide={arena.leftSideCharacter}
        rightSide={arena.rightSideCharacter}
        onCharacterSelect={arena.setActiveSlot}
      />
      {/*Render arena controls here */}
      {arena.phase === 'characters_ready' && (
        <div className='flex justify-center gap-4'>
          <ArenaController
            phase={arena.phase}
            winner={arena.winner}
            onStartBattle={arena.startBattle}
            onPickWinner={arena.pickWinner}
            onSwap={arena.swapCharacters}
            onReset={arena.resetArena}
          />
        </div>
      )}

      <FighterSelector
        characters={data?.items ?? []}
        openModal={arena.isModalOpen}
        onOpenChange={() => arena.setActiveSlot(null)}
        onCharacterSelect={arena.selectCharacter}
      />
    </section>
  )
}
