export function parseKi(ki: string | undefined): bigint | string {
  if (!ki || ki === '0') return 0n

  const cleanString = ki.trim().toLowerCase().split(',').join('')

  const multipliers: { [key: string]: bigint } = {
    million: 10n ** 6n,
    billion: 10n ** 9n,
    trillion: 10n ** 12n,
    quadrillion: 10n ** 15n,
    quintillion: 10n ** 18n,
    sextillion: 10n ** 21n,
    septillion: 10n ** 24n
  }

  if (cleanString === 'unknown' || cleanString.includes('googolplex')) {
    return ki
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
  if (typeof ki === 'bigint') return formatCharacterKi(ki)
  return ki.includes('UNKNOWN') ? 'Unknown Power' : ki
}

function parseDecimalsBigInt(numberString: string, multiplier: bigint): bigint {
  try {
    if (!numberString.includes('.')) {
      return BigInt(numberString) * multiplier
    }
    return BigInt(Math.round(parseFloat(numberString) * Number(multiplier)))
  } catch {
    return 0n
  }
}

export function formatCharacterKi(ki: bigint): string {
  return new Intl.NumberFormat('en-US').format(ki)
}
