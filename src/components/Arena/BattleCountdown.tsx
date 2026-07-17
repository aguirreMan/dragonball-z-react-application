interface BattleCountdownProps {
  seconds: number
}

export default function BattleCountdown({ seconds }: BattleCountdownProps) {
  return (
    <div>
      <p>{seconds}</p>
    </div>
  )
}
