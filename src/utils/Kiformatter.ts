export function parseKi(ki: string | undefined): bigint | null{
  if (!ki || ki === '0') return 0n

  const cleanString = ki
      .trim()
      .toLowerCase()
      .split(',')
      .join('')
      .replace('septllion', 'septillion')

  const multipliers: { [key: string]: bigint } = {
    million: 10n ** 6n,
    billion: 10n ** 9n,
    trillion: 10n ** 12n,
    quadrillion: 10n ** 15n,
    quintillion: 10n ** 18n,
    sextillion: 10n ** 21n,
    septillion: 10n ** 24n,
    octillion: 10n ** 27n
  }

  if (cleanString === 'unknown' || cleanString.includes('googolplex')) {
    return null
  }

  let result: bigint | undefined
  for(const [numberValue, multiplier] of Object.entries(multipliers)) {
    if (cleanString.includes(numberValue)) {
      const numberPart = cleanString.replace(numberValue, '').trim()
      // Handle potential decimals in the string (like 19.84)
      const safeBigInt = parseDecimalsBigInt(numberPart, multiplier)
      if (safeBigInt !== 0n) result = safeBigInt
      break
    }
  }

  if (result !== undefined) return result
  const stripDecimals = cleanString.split('.').join('')
  return BigInt(stripDecimals)
}

export function formatKiForDisplay(rawValue: string | undefined): string {
  const ki = parseKi(rawValue)
  if (typeof ki === 'bigint') {
    return formatCharacterKi(ki)
  }
  return 'Unknown Power'
}

function parseDecimalsBigInt(numberString: string, multiplier: bigint): bigint {
  try {
    if (!numberString.includes('.')) {
      return BigInt(numberString) * multiplier
    }

    const [integerPart, fractionPart] = numberString.split('.')
    const exponent = multiplier.toString().length - 1 // count of zeros in the multiplier

    const paddedFraction = (fractionPart + '0'.repeat(exponent)).slice(0, exponent)

    return BigInt((integerPart || '0') + paddedFraction)
  } catch {
    return 0n
  }
}

export function formatCharacterKi(ki: bigint): string {
  const units = [
    { name: 'octillion', value: 10n ** 27n },
    { name: 'septillion', value: 10n ** 24n },
    { name: 'sextillion', value: 10n ** 21n },
    { name: 'quintillion', value: 10n ** 18n },
    { name: 'quadrillion', value: 10n ** 15n },
    { name: 'trillion', value: 10n ** 12n },
    { name: 'billion', value: 10n ** 9n },
    { name: 'million', value: 10n ** 6n },
  ]
  for (const unit of units) {
    if(ki >= unit.value) {
      const scaledNumber = (ki * 100n) / unit.value
      const wholeNumber = scaledNumber / 100n
      const decimal = scaledNumber % 100n

      if(decimal === 0n ) return `${wholeNumber} ${unit.name}`

      const decimalString = decimal.toString().padStart(2, '0')
      return `${wholeNumber}.${decimalString} ${unit.name}`
    }
  }
  return new Intl.NumberFormat('en-US').format(Number(ki))
}

export function getBigIntLog10(value: bigint): number {
  if (value <= 0n) return 0

  const valueString = value.toString()
  const leadingDigits = Number(valueString.slice(0, 15))
  const exponentNumber = valueString.length - Math.min(valueString.length, 15)

  return Math.log10(leadingDigits) + exponentNumber
}

export function calculatePowerScalePercentage(current: bigint, max: bigint): number {
  if (current <= 0n || max <= 0n) return 0
  return (getBigIntLog10(current) / getBigIntLog10(max)) * 100
}

// arena fight function that illustrates the power scale percentage of two fighters
export function calculateArenaProgressBar(current: bigint, max: bigint): number {
  if (current <= 0n || max <= 0n) return 0
  const ratio = Number(current) / Number(max)
  return Math.min(Math.max(ratio * 100, 0.5), 100)
}

//display percentages
export function formatPowerLevelsDisplay(current: bigint, max: bigint): string {
  return `${Math.floor(calculatePowerScalePercentage(current, max))}%`
}
