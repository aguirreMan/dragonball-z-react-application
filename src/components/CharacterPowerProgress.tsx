import * as Progress from '@radix-ui/react-progress'
import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'

export function CharacterPowerProgress({ characterTarget }: { characterTarget: number }) {
  const progress = useMotionValue(0)
  const fillProgressBar = useTransform(progress, [0, characterTarget], [0, 100])

  useEffect(() => {
    const animation = animate(progress, characterTarget, {
      duration: 2,
      ease: 'easeOut'
    })
    return () => animation.stop()
  }, [characterTarget, progress])

  return (
    <Progress.Root className='relative overflow-hidden bg-secondary rounded-full w-full h-6' value={characterTarget}>
      <Progress.Indicator asChild>
        <motion.div className='bg-primary h-full w-full' style={{ transform: fillProgressBar }} />
      </Progress.Indicator>
    </Progress.Root>
  )
}
