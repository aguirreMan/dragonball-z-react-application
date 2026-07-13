import { useFetchData } from '@/hooks/useFetchData'
import { BASE_URL } from '@/utils/constants'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import type { Transformations } from '@/types/types'
import TransformationCard from '@/components/Transformations/TransformationCard'
import { getMaxKi, sortTransformationsByKI } from '@/utils/Transformations'


export default function TransformationsPage() {
  const { data, loading, error } = useFetchData<Transformations[]>(`${BASE_URL}/transformations`)
  const maxKi = getMaxKi(data ?? [])
  const sortedTransformations = sortTransformationsByKI(data ?? [])

  if (loading) return <Loading />
  if (error) return <Error />

  return (
    <div className='grid grid-cols-4 gap-2 p-4 m-4'>
     {sortedTransformations.map((transformation) => (
       <TransformationCard key={transformation.id} transformation={transformation} maxKi={maxKi} />
     ))}
    </div>
  )
}
