import * as Progress from '@radix-ui/react-progress'
import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { parseKi } from '@/utils/Kiformatter'

export function CharacterPowerProgress({ power, maxPower }: { power: string, maxPower: bigint }) {
  const currentKi = parseKi(power)
  const percentage = typeof currentKi === 'bigint' ? Number((currentKi * 100n) / maxPower) : 0

  const progress = useMotionValue(0)
  const fillProgressBar = useTransform(progress, value => `${value}%`)

  console.log({
    name: power,
    currentKi,
    percentage,
  })

  useEffect(() => {
    const animation = animate(progress, percentage, {
      duration: 2,
      ease: 'easeOut'
    })
    return () => animation.stop()
  }, [percentage, progress])

  return (
    <Progress.Root className='relative overflow-hidden bg-secondary rounded-full w-full h-6' value={percentage}>
      <Progress.Indicator asChild>
        <motion.div className='bg-primary h-full' style={{ width: fillProgressBar }} />
      </Progress.Indicator>
    </Progress.Root>
  )
}
