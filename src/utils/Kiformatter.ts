export function parseKi(ki: string | undefined): bigint {
  if (!ki || ki === '0') return 0n

  const cleanString = ki.trim().toLowerCase()

  const multipliers: { [key: string]: bigint } = {
    million: 10n ** 6n,
    billion: 10n ** 9n,
    trillion: 10n ** 12n,
    quadrillion: 10n ** 15n,
    quintillion: 10n ** 18n,
    sextillion: 10n ** 21n,
    septillion: 10n ** 24n
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
