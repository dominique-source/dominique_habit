import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MissionCard from './MissionCard.jsx'

function NeonConfetti() {
  const colors = ['#CCFF00', '#7F77DD', '#00E5FF', '#FF4757', '#FFA502']
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1.2 + Math.random() * 0.8,
  }))

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
      {particles.map(p => (
        <motion.div key={p.id}
          initial={{ x: `${p.x}vw`, y: '-5vh', opacity: 1, rotate: 0, scale: 1 }}
          animate={{ y: '110vh', opacity: 0, rotate: 720, scale: 0.3 }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
          style={{
            position: 'absolute', width: 8, height: 8, borderRadius: 2,
            background: p.color, boxShadow: `0 0 8px ${p.color}`,
          }} />
      ))}
    </div>
  )
}

export default function MissionList({ challenges, completed, onComplete }) {
  const [showConfetti, setShowConfetti] = useState(false)
  const allDone = challenges.length > 0 && completed.length >= challenges.length

  useEffect(() => {
    if (allDone) {
      setShowConfetti(true)
      const t = setTimeout(() => setShowConfetti(false), 2500)
      return () => clearTimeout(t)
    }
  }, [allDone])

  return (
    <div style={{ padding: '20px 16px' }}>
      {/* Section header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: 3,
            color: 'var(--muted)', marginBottom: 2,
          }}>BRIEFING DU JOUR</div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900,
            color: 'var(--text)', letterSpacing: 1,
          }}>MISSIONS ACTIVES</div>
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 12,
          color: completed.length >= 3 ? '#CCFF00' : 'var(--muted)',
        }}>
          {completed.length}/{challenges.length} FAIT
        </div>
      </div>

      {/* All-done banner */}
      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'linear-gradient(135deg, #CCFF0022, #CCFF0044)',
              border: '1px solid #CCFF00',
              borderRadius: 8, padding: '14px 18px',
              marginBottom: 16, textAlign: 'center',
            }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: '#CCFF00', letterSpacing: 2 }}>
              ⚡ CIRCUIT DE LA VILLE COMPLÉTÉ ⚡
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
              Toutes les missions accomplies. Tu as défendu NéoSynth City aujourd'hui.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {challenges.map((ch, i) => (
          <MissionCard
            key={ch.id}
            challenge={ch}
            isCompleted={completed.includes(ch.id)}
            onComplete={onComplete}
            index={i}
          />
        ))}
      </div>

      <AnimatePresence>
        {showConfetti && <NeonConfetti />}
      </AnimatePresence>
    </div>
  )
}
