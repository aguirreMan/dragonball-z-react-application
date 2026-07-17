import { useFetchData } from '@/hooks/useFetchData'
import { useDragonBallArena } from '@/hooks/useDragonBallArena'
import { useBattleCoordinator } from '@/hooks/useBattleCoordinator'
import type { CharacterResponse } from '@/types/types'
import { BASE_URL } from '@/utils/constants'
import { parseKi } from '@/utils/Kiformatter'
import FighterCards from '@/components/Arena/FighterCards'
import FighterSelector from '@/components/Arena/FighterSelector'
import ArenaController from '@/components/Arena/ArenaController'
import ArenaWinnerModal from '@/components/Arena/ArenaWinnerModal'

export default function DragonBallArena() {
  const { data } = useFetchData<CharacterResponse>(`${BASE_URL}/characters?limit=58`)
  const arena = useDragonBallArena()

  const battleRoster = data?.items.filter((character) => {
    const maxKi = parseKi(character.maxKi)
    return maxKi !== null && maxKi > 0n
  }) ?? []

  const battleCoordinator = useBattleCoordinator({
    onStartBattle: arena.startBattle,
    onPickWinner: arena.pickWinner,
  })

  function resetArena() {
    arena.resetArena()
    battleCoordinator.resetFight()
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
            onStartBattle={battleCoordinator.startFight}
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
        isOpen={arena.phase === 'comparing_characters' || arena.phase === 'picking_winner'}
        onClose={resetArena}
        countDown={battleCoordinator.countDown}
      />
    </section>
  )
}
