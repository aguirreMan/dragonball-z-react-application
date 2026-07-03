import { useFetchData } from '@/hooks/useFetchData'
import type { PlanetsResponse } from '@/types/types'
import PlanetGrid from '@/components/Planets/PlanetGrid'
import { BASE_URL } from '@/utils/constants'
import Loading from '@/components/Loading'


export default function Planets() {
  const { data, loading, error } = useFetchData<PlanetsResponse>(`${BASE_URL}/planets?limit=20`)

  if(loading) return <Loading />
  if(error) return <div>Error: {error.message}</div>
  if(!data) return null

  return (
    <div>
      <h1 className='mb-8 text-center text-5xl text-primary font-bold'>Planets</h1>
      <PlanetGrid planets={data} />
    </div>
  )
}
