import { useState, useEffect } from 'react'
import { useMotionValue, animate, AnimatePresence, motion } from 'motion/react'
import { useFetchData } from '@/hooks/useFetchData'
import type { CharacterResponse } from '@/types/types'
import { parseKi } from '@/utils/Kiformatter'

export default function Home() {
  const { data, loading, error } = useFetchData<CharacterResponse>('https://dragonball-api.com/api/characters?page=1&limit=4')

  const [characterIndex, setCharacterIndex] = useState(0)
  const [pausedSpotlight, setPausedSpotlight] = useState(false)
  const [powerDisplay, setPowerDisplay] = useState(0)
  const [scanningPowerLevel, setScanningPowerLevel] = useState(false)

  const power = useMotionValue(0)

  const fighters = data?.items ?? []
  const activeFighter = fighters[characterIndex]

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



  if (loading) return <div>Loading...</div>
  if(error) return <div>Error: {error.message}</div>
  if (!data) return <div>No data</div>

  if (!activeFighter) return <div>No active fighter</div>
  const isOver9000 = Number(parseKi(activeFighter.ki)) > 9000

  // TODO:
  // - Add Card styling around stats
  // - Add scouter UI
  // - Add scan progress bar
  // - Add transformation count
  // - Add CTA buttons

  return (
    <section
      onMouseEnter={() => setPausedSpotlight(true)}
      onMouseLeave={() => setPausedSpotlight(false)}
      className='relative flex min-h-[80vh] flex-col items-center justify-center gap-8 overflow-hidden'
    >
      {/* Character Spotlight */}
    <div className='relative flex flex-col h-80 items-center justify-center'>
      <motion.div
        className='absolute h-64 w-64 rounded-full blur-3xl'
        style={{ background: isOver9000 ? '#fde047' : '#f97316' }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.12, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Character Image Animation */}
        <AnimatePresence mode='wait'>
          {/* ONE direct child capsule that handles the layout AND the animation */}
          <motion.div
            key={activeFighter.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className='relative z-10 flex flex-col items-center justify-center gap-4' // flex-col forces text under image
          >
            {/* Character Image (Notice it's a regular img tag now!) */}
            <img
              src={activeFighter.image}
              alt={activeFighter.name}
              className='h-80 w-auto drop-shadow-2xl'
            />

            {/* Character Name and stats display */}
            <div className='text-center flex flex-col items-center'>
              <h2 className='text-3xl text-primary uppercase font-bold'>{activeFighter.name}</h2>
              <p className='text-xl text-secondary'>{activeFighter.race}</p>
              <p className='text-xl text-secondary'>{activeFighter.gender}</p>
              <p className='text-xl text-secondary'>Ki: {activeFighter.ki}</p>
              <p className='text-xl text-primary font-mono font-bold'>
                Power: {scanningPowerLevel ? `⚡ ${powerDisplay}` : powerDisplay}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
    </div>
    </section>
  )
}
