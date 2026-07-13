import * as Dialog from '@radix-ui/react-dialog'
import type { FighterSelectorProps } from '@/types/types'

export default function FighterSelector({ characters, openModal, onOpenChange, onCharacterSelect }: FighterSelectorProps) {
  return (
    <Dialog.Root open={openModal} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black' />
        <Dialog.Content className='fixed top-1/2 left-1/2 max-h-[80vh] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-card p-6'>
          <Dialog.Title className="text-2xl font-black text-primary">
            Select a character
          </Dialog.Title>
          <div className='mt-6 grid grid-cols-2 gap-4 md:grid-cols-4'>
            {characters.map((character) => (
              <button
                key={character.id}
                onClick={() => onCharacterSelect(character)}
                className='w-full p-4 text-center'
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className='h-40 w-full object-contain'
                />
                <p className="font-bold">{character.name}</p>
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
