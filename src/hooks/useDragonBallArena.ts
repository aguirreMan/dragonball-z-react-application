import { dragonBallArenaReducer, initialDragonBallArenaState } from '@/utils/DragonBallArenaReducer'
import type { Character } from '@/types/types'

import { useReducer } from 'react'

export function useDragonBallArena() {
  const [state, dispatch] = useReducer(dragonBallArenaReducer, initialDragonBallArenaState)

  function setActiveSlot(slot: 'left' | 'right' | null) {
    dispatch({ type: 'SET_ACTIVE_SLOT', slot })
  }

  function selectCharacter(character: Character | null) {
    dispatch({ type: 'SELECT_CHARACTER', character })
  }

  function swapCharacters() {
    dispatch({ type: 'SWAP_CHARACTERS' })
  }

  function startBattle() {
    dispatch({ type: 'START_BATTLE' })

  }

  function pickWinner() {
    dispatch({ type: 'PICK_WINNER' })
  }

  function resetArena() {
    dispatch({ type: 'RESET_ARENA' })
  }

  return {
    leftSideCharacter: state.leftSideCharacter,
    rightSideCharacter: state.rightSideCharacter,
    activeSlot: state.activeSlot,
    phase: state.phase,
    winner: state.winner,
    pickWinner,
    isModalOpen: state.activeSlot !== null,
    setActiveSlot,
    selectCharacter,
    swapCharacters,
    startBattle,
    resetArena,
  }
}
