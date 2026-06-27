import { useParams } from "react-router"
import { useFetchData } from '@/hooks/useFetchData'
import type { Planets } from '@/types/types'

export default function SinglePlanetsPage() {
  const { id } = useParams()
  const { data, loading, error } = useFetchData<Planets>(`https://dragonball-api.com/api/planets/${id}`)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data) return null
  if (!id) return <div>Planet not found</div>

  return (
    <div>
      <h1>{data.name}</h1>
    </div>
  )
}
