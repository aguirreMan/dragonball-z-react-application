export interface Character {
  id: number
  name: string
  ki: string
  maxKi: string
  race: string
  gender: string
  description: string
  image: string
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
  deletedAt: null
}

export interface PlanetsResponse {
  items: Planets[]
}
