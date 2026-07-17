import { useState, useEffect, useRef } from 'react'

interface UseBattleCoordinatorProps {
  onStartBattle: () => void
  onPickWinner: (luck: number) => void
}

export function useBattleCoordinator({ onStartBattle, onPickWinner }: UseBattleCoordinatorProps) {
  const [winnerReveal, setWinnerReveal] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [countDown, setCountDown] = useState(5)

  const countdownInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const tickerRef = useRef(5)

  function finishBattle() {
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current)
      countdownInterval.current = null
    }

    setIsAnimating(false)
    setWinnerReveal(true)

    const luck = Math.random()
    onPickWinner(luck)
  }

  function handleTimer() {
    tickerRef.current -= 1
    setCountDown(tickerRef.current)

    if (tickerRef.current <= 0) {
      finishBattle()
    }
  }

    function revealWinner() {
      tickerRef.current = 5
      setCountDown(5)
      setIsAnimating(true)
      onStartBattle()

      if (countdownInterval.current) clearInterval(countdownInterval.current)

      countdownInterval.current = setInterval(handleTimer, 1000)
    }

    function resetReveal() {
      setWinnerReveal(false)
      setIsAnimating(false)
      tickerRef.current = 5
      setCountDown(5)
      if (countdownInterval.current) clearInterval(countdownInterval.current)
    }

    useEffect(() => {
      return () => {
        if (countdownInterval.current) clearInterval(countdownInterval.current)
      }
    }, [])

    return { winnerReveal, isAnimating, revealWinner, resetReveal, countDown }
}
