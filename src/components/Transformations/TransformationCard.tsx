import type { Transformations } from '@/types/types'
import { CharacterPowerProgress } from '@/components/Characters/CharacterPowerProgress'
import { parseKi, calculatePowerScalePercentage, formatKiForDisplay, formatPowerLevelsDisplay } from '@/utils/Kiformatter'

export default function TransformationCard({ transformation, maxKi }: { transformation: Transformations; maxKi: bigint }) {
  const currentKi = parseKi(transformation.ki)
  const percentage =
    typeof currentKi === 'bigint'
      ? calculatePowerScalePercentage(currentKi, maxKi)
      : 0

  return (
    <article className='group relative flex flex-col cursor-pointer overflow-hidden rounded-lg border-2 border-card bg-linear-to-b from-orange-900 to-black p-4 transform-glow transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(250,118,22,0.7)]'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(234,179,8,0.1),transparent_50%)]' />
      <h2 className='relative z-10 mb-3 text-center text-xl font-bold uppercase tracking-wider transition-all text-transformation-gold'>
        {transformation.name}
      </h2>
      <div className='relative z-10 overflow-hidden rounded'>
        <img
          className='h-70 w-full object-contain transition-transform group-hover:scale-110'
          src={transformation.image}
          alt={transformation.name}
        />
        <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent' />
      </div>
      <div className='relative z-10 mt-4 text-center'>
        <span className='mb-4 mt-4 text-sm text-primary'>
          {typeof currentKi === 'bigint' ? formatPowerLevelsDisplay(currentKi, maxKi) : 'N/A'}
        </span>
        <CharacterPowerProgress percentage={percentage} />
        <span className='mb-8 text-sm text-primary'>{formatKiForDisplay(transformation.ki)}</span>
      </div>
    </article>
  )
}
