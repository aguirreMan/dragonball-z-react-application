import type { Character } from '@/types/types'
import { parseKi } from '@/utils/Kiformatter'

type DragonBallArenaPhase = 'selecting_characters' | 'characters_ready' | 'comparing_characters' | 'picking_winner'

export interface DragonBallArenaState {
  leftSideCharacter: Character | null
  rightSideCharacter: Character | null
  activeSlot: 'left' | 'right' | null
  phase: DragonBallArenaPhase
  winner: 'left' | 'right' | null
}

export const initialDragonBallArenaState: DragonBallArenaState = {
  leftSideCharacter: null,
  rightSideCharacter: null,
  activeSlot: null,
  phase: 'selecting_characters',
  winner: null,
}

type DragonBallArenaAction =
  | { type: 'SET_ACTIVE_SLOT'; slot: 'left' | 'right' | null }
  | { type: 'SELECT_CHARACTER';  character: Character | null }
  | { type: 'SWAP_CHARACTERS' }
  | { type: 'START_BATTLE'}
  | { type: 'PICK_WINNER' }
  | { type: 'RESET_ARENA'}

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
      return { ...state, leftSideCharacter, rightSideCharacter }
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

      const winner = leftSideCharacterPower > rightSideCharacterPower ? 'left' : 'right'
      return { ...state, phase: 'picking_winner', winner, activeSlot: null }
    }

    case 'RESET_ARENA': {
      return { ...initialDragonBallArenaState }
    }
    default:
      return state
  }
}
