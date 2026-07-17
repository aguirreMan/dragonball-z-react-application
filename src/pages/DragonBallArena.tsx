import FighterCards from '@/components/Arena/FighterCards'
import FighterSelector from '@/components/Arena/FighterSelector'
import { useFetchData } from '@/hooks/useFetchData'
import { useDragonBallArena } from '@/hooks/useDragonBallArena'
import { useWinnerReveal } from '@/hooks/useWinnerReveal'
import type { CharacterResponse } from '@/types/types'
import { BASE_URL } from '@/utils/constants'
import ArenaController from '@/components/Arena/ArenaController'
import ArenaWinnerModal from '@/components/Arena/ArenaWinnerModal'
import { parseKi } from '@/utils/Kiformatter'


export default function DragonBallArena() {
  const { data } = useFetchData<CharacterResponse>(`${BASE_URL}/characters?limit=58`)
  const arena = useDragonBallArena()

  const battleRoster = data?.items.filter((character) => {
    const maxKi = parseKi(character.maxKi)
    return maxKi !== null && maxKi > 0n
  }) ?? []

  const winnerReveal = useWinnerReveal({
      onStartBattle: arena.startBattle,
      onPickWinner: arena.pickWinner
    })

  function resetArena() {
    arena.resetArena()
    winnerReveal.resetReveal()
  }

  const winnerCharacter = arena.winner === 'left'
    ? arena.leftSideCharacter
    : arena.winner === 'right'
    ? arena.rightSideCharacter
    : null

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
            onStartBattle={winnerReveal.revealWinner}
            onSwap={arena.swapCharacters}
            onReset={resetArena}
          />
        </div>
      )}

      <FighterSelector
        characters={battleRoster}
        openModal={arena.isModalOpen}
        onOpenChange={() => arena.setActiveSlot(null)}
        onCharacterSelect={arena.selectCharacter}
      />
      <ArenaWinnerModal
        winner={winnerCharacter}
        isOpen={arena.phase === 'picking_winner'}
        onClose={resetArena}
      />
    </section>
  )
}
