import { Button } from '@/components/shared/Button'
import type { DragonBallArenaPhase } from '@/utils/DragonBallArenaReducer'

interface ArenaControllerProps {
  phase: DragonBallArenaPhase
  onStartBattle: () => void
  onSwap: () => void
}

export default function ArenaController({ phase, onStartBattle, onSwap }: ArenaControllerProps) {

  return (
    <div className='flex justify-center gap-4'>
      {phase === 'characters_ready' && (
        <>
          <Button className='font-bold bg-arena-primary shadow-lg
             hover:shadow-xl hover:bg-arena-primary/80 text-foreground'
            onClick={onStartBattle}
          >
            Start Battle
          </Button>
          <Button className='font-bold bg-secondary hover:bg-secondary/80 text-foreground' onClick={onSwap}>
            Swap Characters
          </Button>
        </>
      )}
    </div>
  )
}
