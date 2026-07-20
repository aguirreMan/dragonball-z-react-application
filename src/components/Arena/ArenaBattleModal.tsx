import type { Character } from '@/types/types'
import type { DragonBallArenaPhase } from '@/utils/DragonBallArenaReducer'
import * as Dialog from '@radix-ui/react-dialog'
import BattleCountdown from './BattleCountdown'
import PostFightStats from './PostFightStats'
import { Button } from '@/components/shared/Button'

interface ArenaBattleModalProps {
  left: Character | null
  right: Character | null
  winnerSide: 'left' | 'right' | null
  isOpen: boolean
  onClose: () => void
  countDown: number
  phase: DragonBallArenaPhase
  isUpset: boolean | null
}

export default function ArenaBattleModal({ left, right, winnerSide, isOpen, onClose, countDown, phase, isUpset }: ArenaBattleModalProps) {
  const isCountingDown = phase === 'comparing_characters'
  const winnerName = winnerSide === 'left' ? left?.name : winnerSide === 'right' ? right?.name : null

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity flex items-center
          justify-center p-4 md:p-10'
        >
          <Dialog.Content className=' w-full max-w-7xl bg-arena-surface
            border border-arena-primary/40 shadow-arena-primary/10 p-6 rounded-2xl text-center shadow-2xl
            z-50 focus:outline-none'>

              <Dialog.Title
                className={`text-3xl font-black uppercase tracking-tight italic ${
                  isUpset && !isCountingDown ? 'text-destructive' : 'text-primary'
                }`}
              >
                {isCountingDown
                  ? 'Battle in Progress...'
                  : winnerName
                  ? isUpset
                    ? `Upset! ${winnerName} Defies the Odds!`
                    : `The Winner Is ${winnerName}!`
                  : 'Battle Winner!'}
              </Dialog.Title>
            <Dialog.Description className='sr-only'>
              This modal displays the countdown and victor of the Arena battle.
            </Dialog.Description>

            {isCountingDown ? (
              <div className='my-6 min-h-150 items-center flex justify-center'>
                <BattleCountdown seconds={countDown} />
              </div>
            ) : (
              <div className='my-6 min-h-150 flex items-center justify-center'>
                <PostFightStats left={left} right={right} winnerSide={winnerSide} isUpset={isUpset} />
              </div>
            )}

            <div className='flex justify-center gap-4'>
              {!isCountingDown && (
                <Dialog.Close asChild>
                  <Button
                    onClick={onClose}
                    className='px-6 py-3 font-bold bg-arena-primary shadow-lg'
                  >
                    Close Arena
                  </Button>
                </Dialog.Close>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
