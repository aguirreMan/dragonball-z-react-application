import type { Transformations } from '@/types/types'
import { parseKi } from '@/utils/Kiformatter'

export function getMaxKi(transformations: Transformations[]): bigint {
  return transformations.reduce((maxTransformation, transformation) => {
    const ki = parseKi(transformation.ki)
    return typeof ki === 'bigint' && ki > maxTransformation ? ki : maxTransformation
  }, 0n)
}

export function sortTransformationsByKI(transformations: Transformations[]): Transformations[] {
  return transformations.sort((a, b) => {
    const kiA = parseKi(a.ki)
    const kiB = parseKi(b.ki)

    if (typeof kiA !== 'bigint' || typeof kiB !== 'bigint') return 0
    if (kiB < kiA) return -1
    if (kiB > kiA) return 1
    return 0
  })
}
