import { useParams, Link } from 'react-router'
import { useFetchData } from '@/hooks/useFetchData'
import type { Character } from '@/types/types'
import { BASE_URL } from '@/utils/constants'
import CharacterProfileCard from '@/components/Characters/CharacterProfileCard'
import CharacterDescription from '@/components/Characters/CharacterDescription'
import Loading from '@/components/Loading'
import TransformationCard from '@/components/Transformations/TransformationCard'
import { getMaxKi, sortTransformationsByKI } from '@/utils/Transformations'

export default function SingleCharacterPage() {
  const { id } = useParams()
  const { data, loading, error } = useFetchData<Character>(`${BASE_URL}/characters/${id}`)
  const maxKi = getMaxKi(data?.transformations ?? [])
  const sortedTransformations = sortTransformationsByKI(data?.transformations ?? [])

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
        {sortedTransformations.length ? (
          <div className='grid grid-cols-2 gap-2 p-4 m-4'>
            {sortedTransformations.map((transformation) => (
              <TransformationCard key={transformation.id} transformation={transformation} maxKi={maxKi} />
            ))}
          </div>
        ) : (
            <p className='text-muted-foreground'>No Transformations Available</p>
        )}
      </div>
    </div>
  )
}
