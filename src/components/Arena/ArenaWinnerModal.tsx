import type { Character } from '@/types/types'
import type { DragonBallArenaPhase } from '@/utils/DragonBallArenaReducer'
import * as Dialog from '@radix-ui/react-dialog'
import BattleCountdown from './BattleCountdown'

interface ArenaWinnerModalProps {
  winner: Character | null
  isOpen: boolean
  onClose: () => void
  countDown: number
  phase: DragonBallArenaPhase
}

export default function ArenaWinnerModal({ winner, isOpen, onClose, countDown, phase }: ArenaWinnerModalProps) {
  const isCountingDown = phase === 'comparing_characters'

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity flex items-center justify-center p-4 md:p-10'>
          <Dialog.Content className=' w-full max-w-7xl bg-zinc-900
            border border-yellow-500/40 p-6 rounded-2xl text-center shadow-2xl z-50 focus:outline-none'>

            <Dialog.Title className="text-3xl font-black text-yellow-400 uppercase tracking-tight italic">
              {isCountingDown ? 'Battle in Progress...' : winner ? `The Winner Is ${winner.name}!` : 'Battle Winner!'}
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              This modal displays the countdown and victor of the Arena battle.
            </Dialog.Description>

            {isCountingDown ? (
              <div className='my-6  min-h-150 items-center flex justify-center'>
                <BattleCountdown seconds={countDown} />
              </div>
            ) : (
              <div className='my-6 min-h-150 flex flex-col items-center justify-center space-y-6'>
                {winner?.image && (
                  <img
                    src={winner.image}
                    alt={winner.name}
                    className='w-40 object-contain mx-auto drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]'
                  />
                )}
                <h2 className='text-white text-4xl font-bold tracking-tight mt-4'>
                  {winner?.name}
                </h2>
              </div>
            )}

            <div className='flex justify-center gap-4'>
              <Dialog.Close asChild>
                <button
                  onClick={onClose}
                  className='px-6 py-3 font-bold text-zinc-900 bg-yellow-400 hover:bg-yellow-300 rounded-xl transition-all shadow-lg active:scale-95'
                >
                  Close Arena
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
