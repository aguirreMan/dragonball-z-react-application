import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useMotionValue, animate, AnimatePresence, motion } from 'motion/react'
import { useFetchData } from '@/hooks/useFetchData'
import type { CharacterResponse } from '@/types/types'
import { BASE_URL } from '@/utils/constants'
import { parseKi } from '@/utils/Kiformatter'
import Loading from '@/components/Loading'
import CharacterPowerProgress from '@/components/Characters/CharacterPowerProgress'

export default function Home() {
  const { data, loading, error } = useFetchData<CharacterResponse>(`${BASE_URL}/characters?page=1&limit=4`)

  const [characterIndex, setCharacterIndex] = useState(0)
  const [pausedSpotlight, setPausedSpotlight] = useState(false)
  const [powerDisplay, setPowerDisplay] = useState(0)
  const [scanningPowerLevel, setScanningPowerLevel] = useState(false)

  const power = useMotionValue(0)

  const fighters = data?.items ?? []
  const activeFighter = fighters[characterIndex]

  const powerLevels = fighters.map((fighter) => Number(parseKi(fighter.ki)))
  const scaleMaxPower = Math.max(...powerLevels, 1)

  useEffect(() => {
    if (pausedSpotlight || fighters.length === 0) return

    const characterSpotlightInterval = setInterval(() => {
      setCharacterIndex(
        (characterIndex) => (characterIndex + 1) % fighters.length
      )
    }, 3500)

    return () => clearInterval(characterSpotlightInterval)
  }, [pausedSpotlight, fighters.length])

  useEffect(() => {
    if (!activeFighter) return
    power.set(0)
    const targetNumber = Number(parseKi(activeFighter.ki))
    const controls = animate(power, targetNumber, {
      duration: 1.8,
      ease: 'circOut',
      onPlay: () => setScanningPowerLevel(true),
      onComplete: () => setScanningPowerLevel(false),
    })
    const unsub = power.on('change', (v) => setPowerDisplay(Math.round(v)))
    return () => {
      controls.stop()
      unsub()
    }
  }, [activeFighter, power])

  if (loading) return <Loading />
  if(error) return <div>Error: {error.message}</div>
  if (!data) return <div>No data</div>

  if (!activeFighter) return <div>No active fighter</div>

  const scanPercentage = Math.min(100, (powerDisplay / scaleMaxPower) * 100)

  return (
    <section
      onMouseEnter={() => setPausedSpotlight(true)}
      onMouseLeave={() => setPausedSpotlight(false)}
      className='relative flex min-h-[80vh] flex-col items-center justify-center gap-8 overflow-hidden'
    >


      {/* Character Spotlight */}
      <div className='relative flex h-80 items-center justify-center'>
        <motion.div
          className='absolute h-64 w-64 rounded-full blur-3xl'
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.12, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Character Image Animation */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeFighter.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className='relative z-10 flex items-center justify-center'
          >
            <img
              src={activeFighter.image}
              alt={activeFighter.name}
              className='h-80 w-auto drop-shadow-2xl'
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scouter HUD readout */}
      <div
        className='relative w-80 border border-primary/40 bg-card/80 px-6 py-4 backdrop-blur
        [clip-path:polygon(0_0,100%_0,100%_72%,90%_100%,0_100%)]'
      >
        <p className='text-center text-2xl font-bold uppercase tracking-wide text-primary'>
          {activeFighter.name}
        </p>

        <div className='mt-2 flex items-baseline justify-between'>
          <span className='text-xs uppercase tracking-widest text-muted-foreground'>
            Power Level
          </span>
          <span className='font-mono text-3xl font-bold tabular-nums'>
            <span className={scanningPowerLevel ? 'opacity-100' : 'opacity-0'}>⚡</span>
            {powerDisplay.toLocaleString()}
          </span>
        </div>

        <CharacterPowerProgress percentage={scanPercentage} />

        <p className='mt-2 text-xs text-muted-foreground'>Ki: {activeFighter.ki}</p>
      </div>

      {/* Progress dots + pause affordance */}
      <div className='flex flex-col items-center gap-2'>
        <div className={`flex gap-3 transition-opacity ${pausedSpotlight ? 'opacity-40' : 'opacity-100'}`}>
          {fighters.map((fighter, index) => (
            <button
              key={fighter.id}
              onClick={() => setCharacterIndex(index)}
              aria-label={`Show ${fighter.name}`}
              className={`h-3 rounded-full transition-all ${
                index === characterIndex ? 'w-8 bg-primary' : 'w-3 bg-muted hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>
        <span
          className={`text-xs uppercase tracking-widest text-muted-foreground transition-opacity ${
            pausedSpotlight ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Paused
        </span>
      </div>

      {/* CTA buttons */}
      <div className='flex flex-wrap items-center justify-center gap-4'>
        <Link
          to='/characters'
          className='rounded-md bg-primary px-6 py-3 font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-105'
        >
          Browse Fighters
        </Link>
        <Link
          to='/arena'
          className='rounded-md border border-border bg-secondary px-6 py-3 font-bold uppercase tracking-wide text-foreground transition-colors hover:text-primary'
        >
          Enter the Arena
        </Link>
      </div>
    </section>
  )
}
