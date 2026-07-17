import FighterSlot from './FighterSlot'
import ArenaVS from './ArenaVS'
import type { FighterCardProps } from '@/types/types'

export default function FighterCards({ leftSide, rightSide, onCharacterSelect }: FighterCardProps) {
  return (
    <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-4'>
      <FighterSlot side='left' character={leftSide} onCharacterSelect={onCharacterSelect} />
      <ArenaVS leftSideFilled={leftSide !== null} rightSideFilled={rightSide !== null} />
      <FighterSlot side='right' character={rightSide} onCharacterSelect={onCharacterSelect} />
    </div>
  )
}
