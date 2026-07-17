import type { Character } from '@/types/types'
import * as Dialog from '@radix-ui/react-dialog'

interface ArenaWinnerModalProps {
  winner: Character | null
  isOpen: boolean
  onClose: () => void
  countDown: number
}

export default function ArenaWinnerModal({ winner, isOpen, onClose, countDown }: ArenaWinnerModalProps) {
  if (!winner) return null

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity'>
          <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-zinc-900
            border border-yellow-500/40 p-6 rounded-2xl text-center shadow-2xl z-50 focus:outline-none'>
              <Dialog.Title className="text-3xl font-black text-yellow-400 uppercase tracking-tight italic">
                Battle Winner!
              </Dialog.Title>
              <Dialog.Description className="sr-only">
                This modal displays the victor of the Arena battle.
            </Dialog.Description>
            <div className='my-6 space-y-4'>
              {winner.image && (
                <img
                  src={winner.image}
                  alt={winner.name}
                  className='w-40 h-40 object-contain mx-auto drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]'
                />
              )}
              <h2 className='text-white text-2xl font-bold tracking-tight'>
                {winner.name}
              </h2>
            </div>
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
