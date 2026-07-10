import type { Transformations } from '@/types/types'
import { CharacterPowerProgress } from '@/components/Characters/CharacterPowerProgress'

export default function TransformationCard({ transformation, maxKi }: { transformation: Transformations; maxKi: bigint }) {
  return (
    <article className='group relative flex flex-col cursor-pointer overflow-hidden rounded-lg border-2 border-orange-500 bg-gradient-to-b from-orange-950 to-black p-4 shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(249,115,22,0.6)]'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(234,179,8,0.1),transparent_50%)]' />
        <h2 className='relative z-10 mb-3 text-center text-xl font-bold uppercase tracking-wider text-primary drop-shadow-[0_2px_8px_rgba(234,179,8,0.8)] transition-all group-hover:text-yellow-300'>
          {transformation.name}
        </h2>

        <div className='relative z-10 overflow-hidden rounded'>
          <img
            className='h-70 w-full object-contain transition-transform group-hover:scale-110'
              src={transformation.image}
              alt={transformation.name}
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
        </div>
      <div className='relative z-10 mt-4 text-center'>
        <CharacterPowerProgress power={transformation.ki} maxPower={maxKi} />
      </div>
    </article>
  )
}
