import * as Progress from '@radix-ui/react-progress'

export function CharacterPowerProgress({ value }: { value: number }) {
  return (
    <Progress.Root className='relative overflow-hidden bg-secondary rounded-full w-full h-6' value={value}>
      <Progress.Indicator className='bg-primary' />
    </Progress.Root>
  )
}
