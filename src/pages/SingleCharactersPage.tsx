import { useParams, Link } from 'react-router'
import { useFetchData } from '@/hooks/useFetchData'
import type { Character } from '@/types/types'
import { BASE_URL } from '@/utils/constants'
import CharacterProfileCard from '@/components/Characters/CharacterProfileCard'
import CharacterDescription from '@/components/Characters/CharacterDescription'
import Loading from '@/components/Loading'

export default function SingleCharacterPage() {
  const { id } = useParams()
  const { data, loading, error } = useFetchData<Character>(`${BASE_URL}/characters/${id}`)

  if (loading) return <Loading />
  if (error) return <div>Error: {error.message}</div>
  if (!data) return null

  return (
    <div className='mx-auto max-w-5xl px-4 py-8'>
      <Link
        to='/characters'
        className='mb-6 inline-flex justify-start gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors'
      >
        ← Back to Characters
      </Link>
      <div className='space-y-8'>
        <CharacterProfileCard character={data} />
        <CharacterDescription description={data.description} />
      </div>
    </div>
  )
}
