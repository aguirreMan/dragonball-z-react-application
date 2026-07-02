export function convertToPercentage(value: bigint, max: bigint): number {
  if (max <= 0n) return 0

  const scaleValue = (value * 1000n) / max
  const percentageNumber = Number(scaleValue) / 100

  return Math.min(percentageNumber, 100)
}
