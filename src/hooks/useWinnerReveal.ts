import { useState, useEffect, useRef } from 'react'

export function useWinnerReveal() {
  const [winnerReveal, setWinnerReveal] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const reavealTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function revealWinner() {
    setIsAnimating(true)

    if (reavealTimer.current) {
      clearTimeout(reavealTimer.current)
    }
    reavealTimer.current = setTimeout(() => {
      setIsAnimating(false)
      setWinnerReveal(true)
    }, 5000)
  }

  function resetReveal() {
    setWinnerReveal(false)
    setIsAnimating(false)
    if (reavealTimer.current) {
      clearTimeout(reavealTimer.current)
    }
  }
  useEffect(() => {
    return () => {
      if (reavealTimer.current) {
        clearTimeout(reavealTimer.current)
      }
    }
  }, [])

  return { winnerReveal, isAnimating, revealWinner, resetReveal }
}
