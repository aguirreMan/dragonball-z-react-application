import { useParams, Link } from "react-router"
import { useFetchData } from '@/hooks/useFetchData'
import type { Planets } from '@/types/types'
import { BASE_URL } from '@/utils/constants'
import Loading from '@/components/Loading'
import { Badge } from '@/components/shared/Badge'

export default function SinglePlanetsPage() {
  const { id } = useParams()
  const { data, loading, error } = useFetchData<Planets>(`${BASE_URL}/planets/${id}`)

  if (loading) return <Loading />
  if (error) return <div>Error: {error.message}</div>
  if (!data) return null
  if (!id) return <div>Planet not found</div>

  return (
    <div className='mx-auto max-w-5xl px-4 py-8'>
      <Link
        to='/planets'
        className='mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors'
      >
        ← Back to Planets
      </Link>

      <div className='grid gap-8 md:grid-cols-2'>
        <img src={data.image} alt={data.name} className='h-full max-h-[70vh] w-full object-cover rounded-xl bg-card' />

        {/*Info */}
        <div className='flex flex-col justify-center'>
          <Badge variant={data.isDestroyed ? 'neutral' : 'primary'} size='lg' className='mb-6'>
            <span
              className={`h-3 w-3 shrink-0 rounded-full ${data.isDestroyed ? 'bg-destructive' : 'bg-primary-foreground'}`}
            />
              {data.isDestroyed ? 'Destroyed' : 'Thriving'}
          </Badge>

          <h1 className='mb-4 text-4xl font-bold text-primary'>{data.name}</h1>
          <p className='leading-relaxed text-muted-foreground'>
            {data.description || 'No description available'}
          </p>
        </div>
      </div>

      {/*Characters born  */}
      <section className='mt-16'>
          <h2 className='mb-6 text-2xl font-bold text-primary text-center'>
            Characters Born Here {data.characters && (
              <span className='ml-2 text-base font-normal text-muted-foreground'>
                ({data.characters.length})
              </span>
            )}
          </h2>

          {data.characters && data.characters.length > 0 ? (
            <div className='flex flex-wrap justify-center gap-6'>
            {data.characters.map((character) => (
              <Link to={`/characters/${character.id}`} key={character.id}>
                <article
                  key={character.id}
                  className='group flex w-56 flex-col items-center gap-3 rounded-xl bg-card p-6 transition-all hover:border hover:border-primary'
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    className='h-40 w-40 rounded-full object-cover object-top transition-transform group-hover:scale-105'
                  />


                  <div className='text-center'>
                    <h3 className='font-bold text-foreground transition-colors group-hover:text-primary'>
                      {character.name}
                    </h3>

                    <p className='text-sm text-muted-foreground'>
                      {character.race}
                    </p>
                  </div>
                </article>
              </Link>
              ))}
            </div>
          ) : (
            <p className='text-muted-foreground'>
              No known characters from this planet.
            </p>
          )}
        </section>
    </div>
  )
}
