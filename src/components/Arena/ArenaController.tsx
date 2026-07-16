import Button from '@/components/shared/Button'
import type { DragonBallArenaPhase } from '@/utils/DragonBallArenaReducer'

interface ArenaControllerProps {
  phase: DragonBallArenaPhase
  winner: 'left' | 'right' | null
  onStartBattle: () => void
  onSwap: () => void
  onReset: () => void
}

export default function ArenaController({ phase, winner, onStartBattle, onSwap, onReset }: ArenaControllerProps) {

  return (
    <div className='flex justify-center gap-4'>
      {phase === 'characters_ready' && (
        <>
          <Button className='px-4 py-4 font-bold text-foreground bg-destructive hover:bg-destructive/80' onClick={onStartBattle}>
            Start Battle
          </Button>
          <Button className='px-4 py-4 font-bold ' onClick={onSwap}>
            Swap Characters
          </Button>
        </>
      )}

      {phase === 'comparing_characters' && (
        <Button disabled={true} className='px-4 py-4 font-bold text-foreground bg-destructive hover:bg-destructive/80'>
          Pick Winner
        </Button>
      )}

      {phase === 'picking_winner' && (
        <div className='flex flex-col items-center gap-4'>
          <p className='text-primary text-2xl font-black'>
             {winner === 'left' ? 'Left' : 'Right'} fighter wins!
          </p>
          <Button className='px-4 py-4 font-bold text-foreground' onClick={onReset}>
            Reset Arena
          </Button>
        </div>
      )}
    </div>
  )
}
