import type { Character } from '@/types/types'
import { parseKi, getBigIntLog10 } from '@/utils/Kiformatter'

export type DragonBallArenaPhase = 'selecting_characters' | 'characters_ready' | 'comparing_characters' | 'picking_winner'

export interface DragonBallArenaState {
  leftSideCharacter: Character | null
  rightSideCharacter: Character | null
  activeSlot: 'left' | 'right' | null
  phase: DragonBallArenaPhase
  winner: 'left' | 'right' | null
  isUpset: boolean | null
}

export const initialDragonBallArenaState: DragonBallArenaState = {
  leftSideCharacter: null,
  rightSideCharacter: null,
  activeSlot: null,
  phase: 'selecting_characters',
  winner: null,
  isUpset: null,
}

type DragonBallArenaAction =
  | { type: 'SET_ACTIVE_SLOT'; slot: 'left' | 'right' | null }
  | { type: 'SELECT_CHARACTER';  character: Character | null }
  | { type: 'SWAP_CHARACTERS' }
  | { type: 'START_BATTLE'}
  | { type: 'PICK_WINNER'; luck: number }
  | { type: 'RESET_ARENA' }


export function decideWinner(left: bigint, right: bigint, luck: number): { winner: 'left' | 'right'; isUpset: boolean } {
  const strongerIsLeft = left > right
  const [strong, weak] = strongerIsLeft ? [left, right] : [right, left]
  const logStrongCharacter = getBigIntLog10(strong)
  const logWeakCharacter = getBigIntLog10(weak)

  const closeness = logStrongCharacter > 0 ? Math.max(logWeakCharacter / logStrongCharacter, 0.05) : 0
  const isUpset = luck < closeness * 0.4


   const winner = isUpset
     ? (strongerIsLeft ? 'right' : 'left')
     : (strongerIsLeft ? 'left' : 'right')
   return { winner, isUpset }
}

export function dragonBallArenaReducer(state: DragonBallArenaState, action: DragonBallArenaAction): DragonBallArenaState {
  switch (action.type) {
    case 'SET_ACTIVE_SLOT':
      return { ...state, activeSlot: action.slot }
    case 'SELECT_CHARACTER': {
      const currentSelectedCharacter = action.character
      if(state.activeSlot === 'left' && state.rightSideCharacter?.id === currentSelectedCharacter?.id) {
        return state
      }
      if(state.activeSlot === 'right' && state.leftSideCharacter?.id === currentSelectedCharacter?.id) {
        return state
      }
      const leftSideCharacter = state.activeSlot === 'left' ? action.character : state.leftSideCharacter
      const rightSideCharacter = state.activeSlot === 'right' ? action.character : state.rightSideCharacter
      const charactersReady = leftSideCharacter !== null && rightSideCharacter !== null
      if(charactersReady) {
        return { ...state, leftSideCharacter, rightSideCharacter, activeSlot: null, phase: 'characters_ready' }
      }
      return { ...state, leftSideCharacter, rightSideCharacter, activeSlot: null }
    }
    case 'SWAP_CHARACTERS': {
      const leftSideCharacter = state.rightSideCharacter
      const rightSideCharacter = state.leftSideCharacter
      return { ...state, leftSideCharacter, rightSideCharacter, activeSlot: null }
    }

    case 'START_BATTLE': {
      const bothCharactersChosen = state.leftSideCharacter && state.rightSideCharacter
      if(!bothCharactersChosen) {
        return state
      }
      return { ...state, phase: 'comparing_characters' }
    }

    case 'PICK_WINNER': {
      if (!state.leftSideCharacter || !state.rightSideCharacter) return state
      const leftSideCharacterPower = parseKi(state.leftSideCharacter.maxKi) || 0
      const rightSideCharacterPower = parseKi(state.rightSideCharacter.maxKi) || 0

      if (typeof leftSideCharacterPower !== 'bigint' || typeof rightSideCharacterPower !== 'bigint') {
        return state
      }

      const { winner, isUpset } = decideWinner(leftSideCharacterPower, rightSideCharacterPower, action.luck)
      return { ...state, phase: 'picking_winner', winner, isUpset, activeSlot: null }
    }

    case 'RESET_ARENA': {
      return { ...initialDragonBallArenaState }
    }
    default:
      return state
  }
}
