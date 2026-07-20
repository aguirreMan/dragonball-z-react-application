import * as Progress from '@radix-ui/react-progress'
import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'

export function CharacterPowerProgress({ percentage }: { percentage: number }) {
  const progress = useMotionValue(0)
  const fillProgressBar = useTransform(progress, value => `${value}%`)

  useEffect(() => {
    const animation = animate(progress, percentage, {
      duration: 2,
      ease: 'easeOut'
    })
    return () => animation.stop()
  }, [percentage, progress])

  return (
    <Progress.Root className='relative overflow-hidden bg-secondary rounded-full w-full ring-2 ring-border h-6' value={percentage}>
      <Progress.Indicator asChild>
        <motion.div className='bg-primary h-full' style={{ width: fillProgressBar }} />
      </Progress.Indicator>
    </Progress.Root>
  )
}
