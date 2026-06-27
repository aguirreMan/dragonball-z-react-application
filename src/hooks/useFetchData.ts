import { useState, useEffect } from 'react'

interface FetchDataProps<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useFetchData<T>(url: string): FetchDataProps<T> {
  const [state, setState] = useState<{
    data: T | null
    error: Error | null
    loading: boolean
  }>({
    data: null,
    error: null,
    loading: true
  })

  useEffect(() => {
    const abortController = new AbortController()

    async function fetchData() {
      setState(prev => ({ ...prev, loading: true, error: null }))

      try {
        const response = await fetch(url, { signal: abortController.signal })
        if(!response.ok) {
          throw new Error('Network response was not ok')
        }
        const results: T = await response.json()

        if (!abortController.signal.aborted) {
          setState({ data: results, error: null, loading: false })
        }
      } catch (error: unknown) {
        if(error instanceof Error && error.name !== 'AbortError') {
          if (!abortController.signal.aborted) {
            setState({ data: null, error, loading: false })
          }
        }
      }
    }

    fetchData()
    return () => abortController.abort()
  }, [url])

  return state
}
