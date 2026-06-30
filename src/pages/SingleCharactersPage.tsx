import { useParams, Link } from 'react-router'
import { useFetchData } from '@/hooks/useFetchData'
import type { Character } from '@/types/types'
import { BASE_URL } from '@/utils/constants'
import CharacterPowerStatsCard from '@/components/CharacterPowerStatsCard'


export default function SingleCharacterPage() {
  const { id } = useParams()
  const { data, loading, error } = useFetchData<Character>(`${BASE_URL}/characters/${id}`)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data) return null

  return (
    <div className='mx-auto max-w-5xl px-4 py-8'>
      <Link
        to='/characters'
        className='mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors'
      >
        ← Back to Characters
      </Link>

      <div className='grid gap-8 md:grid-cols-2'>
        <img src={data.image} alt={data.name} className='h-full max-h-[70vh] w-full object-contain rounded-xl bg-card' />

        <div className='flex flex-col justify-center'>
          <h1 className='mb-4 text-4xl font-bold text-primary'>{data.name}</h1>
          <p className='leading-relaxed text-muted-foreground'>
            {data.description || 'No description available'}
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-8 justify-center align-center'>
        <CharacterPowerStatsCard powerStats={data} />
      </div>
    </div>
  )
}
