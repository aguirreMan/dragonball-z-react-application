import { useFetchData } from '@/hooks/useFetchData'
import type { PlanetsResponse } from '@/types/types'
import PlanetGrid from '@/components/PlanetGrid'

export default function Planets() {
  const { data, loading, error } = useFetchData<PlanetsResponse>('https://dragonball-api.com/api/planets')

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error: {error.message}</div>
  if(!data) return null

  return (
    <div>
      <h1 className='mb-8 text-center text-5xl text-primary font-bold'>Planets</h1>
      <PlanetGrid planets={data} />
    </div>
  )
}
