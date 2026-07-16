import { useFetchData } from '@/hooks/useFetchData'
import type { CharacterResponse } from '@/types/types'
import CharacterGrid from '@/components/Characters/CharacterGrid'
import { BASE_URL } from '@/utils/constants'
import Loading from '@/components/Loading'

export default function Characters() {
  const { data, loading, error } = useFetchData<CharacterResponse>(`${BASE_URL}/characters?limit=58`)

  if (loading) return <Loading />
  if (error) return <div>Error: {error.message}</div>
  if(!data) return <div>Characters not found</div>
  return (
    <div>
      <h1 className='mb-8 text-center text-5xl text-primary font-bold'>Characters</h1>
      <CharacterGrid characters={data} />
    </div>
  )
}
