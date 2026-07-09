import { useFetchData } from '@/hooks/useFetchData'
import { BASE_URL } from '@/utils/constants'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import type { Transformations } from '@/types/types'
import { parseKi } from '@/utils/Kiformatter'

export default function Transformations() {
  const { data, loading, error } = useFetchData<Transformations[]>(`${BASE_URL}/transformations`)

  if (loading) return <Loading />
  if (error) return <Error />

  const transformations = [...(data ?? [])].sort((a, b) => {
    const kiA = parseKi(a.ki)
    const kiB = parseKi(b.ki)
    if (typeof kiA !== 'bigint' || typeof kiB !== 'bigint') return 0

    if(kiB < kiA) return -1
    if(kiB > kiA) return 1
    return 0
  })

  const maxkiTransformations = transformations.reduce((maxTransformation, transformation) => {
    const kiPower = parseKi(transformation.ki)
    return typeof kiPower === 'bigint' && kiPower > maxTransformation ? kiPower : maxTransformation
  }, 0n)

  return (
    <div className='grid grid-cols-4'>
     {transformations.map((transformation) => (
       <div key={transformation.id}>
         {transformation.name}
       </div>
     ))}
    </div>
  )
}
