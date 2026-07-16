import type { DragonBallArenaPhase } from '@/utils/DragonBallArenaReducer'

export interface Character {
  id: number
  name: string
  ki: string
  maxKi: string
  race: string
  gender: string
  description: string
  image: string
  affiliation: string
  originPlanet?: Planets
  transformations?: Transformations[]
}

export interface CharacterResponse {
  items: Character[]
}

export interface Planets {
  id: number
  name: string
  isDestroyed: boolean
  description: string
  image: string
  characters?: Character[]
}

export interface PlanetsResponse {
  items: Planets[]
}

export interface Transformations {
  id: number
  name: string
  image: string
  ki: string
}

export interface FighterCardProps {
  leftSide: Character | null
  rightSide: Character | null
  onCharacterSelect: (selection: 'left' | 'right') => void
}

export interface FighterSlotProps {
  side: 'left' | 'right'
  character: Character | null
  onCharacterSelect: (selection: 'left' | 'right') => void
}

export interface FighterSelectorProps {
  characters: Character[]
  openModal: boolean
  onOpenChange: (open: boolean) => void
  onCharacterSelect: (character: Character) => void
}

export interface ArenaControllerProps {
  phase: DragonBallArenaPhase
  winner: 'left' | 'right' | null
  onStartBattle: () => void
  onPickWinner: () => void
  onSwap: () => void
  onReset: () => void
}
