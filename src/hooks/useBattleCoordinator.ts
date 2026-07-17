import { useState, useEffect, useRef } from 'react'

interface UseBattleCoordinatorProps {
  onStartBattle: () => void
  onPickWinner: () => void
}

export function useBattleCoordinator({ onStartBattle, onPickWinner }: UseBattleCoordinatorProps) {
  const [countDown, setCountDown] = useState(5)

  const countdownInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const tickerRef = useRef(5)

  function finishBattle() {
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current)
      countdownInterval.current = null
    }
    onPickWinner()
  }

  function handleTimer() {
    tickerRef.current -= 1
    setCountDown(tickerRef.current)

    if (tickerRef.current <= 0) {
      finishBattle()
    }
  }

    function startFight() {
      tickerRef.current = 5
      setCountDown(5)
      onStartBattle()

      if (countdownInterval.current) clearInterval(countdownInterval.current)

      countdownInterval.current = setInterval(handleTimer, 1000)
    }

    function resetFight() {
      tickerRef.current = 5
      setCountDown(5)
      if (countdownInterval.current) clearInterval(countdownInterval.current)
    }

    useEffect(() => {
      return () => {
        if (countdownInterval.current) clearInterval(countdownInterval.current)
      }
    }, [])

    return { startFight, resetFight, countDown }
}
