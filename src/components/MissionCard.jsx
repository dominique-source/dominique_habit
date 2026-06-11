import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  IconRun, IconSalad, IconMoon, IconBrain, IconSkull,
  IconCheck, IconBolt, IconLock,
} from '@tabler/icons-react'
import { ZONES } from '../data/challenges.js'

const ZONE_ICONS = {
  movement: IconRun,
  nutrition: IconSalad,
  recovery: IconMoon,
  mindset: IconBrain,
  boss: IconSkull,
}

function XPBurst({ xp }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, scale: 0.5 }}
      animate={{ opacity: [0, 1, 1, 0], y: -60, scale: 1.2 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-display)',
        fontSize: 28, fontWeight: 900,
        color: '#CCFF00',
        textShadow: '0 0 20px #CCFF00, 0 0 40px #CCFF00',
        pointerEvents: 'none', zIndex: 10,
        whiteSpace: 'nowrap',
      }}>
      +{xp} XP
    </motion.div>
  )
}

export default function MissionCard({ challenge, isCompleted, onComplete, index }) {
  const [showBurst, setShowBurst] = useState(false)
  const zone = ZONES[challenge.zone.toUpperCase()] ?? ZONES.MOVEMENT
  const ZoneIcon = ZONE_ICONS[challenge.zone] ?? IconBolt
  const color = zone.color
  const isBoss = challenge.isBoss

  function handleComplete() {
    if (isCompleted) return
    onComplete(challenge.id, challenge.xp)
    setShowBurst(true)
    setTimeout(() => setShowBurst(false), 1300)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
      style={{ position: 'relative' }}>

      <motion.div
        animate={!isCompleted ? { boxShadow: [`0 0 0px ${color}00`, `0 0 12px ${color}33`, `0 0 0px ${color}00`] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.5 }}
        style={{
          background: isCompleted
            ? `linear-gradient(135deg, ${color}08, ${color}15)`
            : 'var(--card)',
          border: `1px solid ${isCompleted ? color : 'var(--border)'}`,
          borderRadius: 8,
          padding: isBoss ? '20px 18px' : '16px 18px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'border-color 0.3s',
        }}>

        {/* Boss glow stripe */}
        {isBoss && (
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            }} />
        )}

        {/* Completed overlay shimmer */}
        {isCompleted && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 8,
            background: `linear-gradient(135deg, ${color}05, transparent)`,
            pointerEvents: 'none',
          }} />
        )}

        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          {/* Zone icon */}
          <div style={{
            width: 40, height: 40, borderRadius: 8, flexShrink: 0,
            background: `${color}18`, border: `1px solid ${color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {isCompleted
              ? <IconCheck size={20} color={color} />
              : <ZoneIcon size={20} color={color} />}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Zone label */}
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2,
              color: color, opacity: 0.8, marginBottom: 4,
            }}>
              {zone.label}
              {isBoss && <span style={{ marginLeft: 8, color: '#FF4757', animation: 'none' }}>⚠ BOSS</span>}
            </div>

            {/* Title */}
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: isBoss ? 14 : 13,
              fontWeight: 700, letterSpacing: 1, marginBottom: 4,
              color: isCompleted ? color : 'var(--text)',
              textDecoration: isCompleted ? 'line-through' : 'none',
              opacity: isCompleted ? 0.7 : 1,
            }}>
              {challenge.title}
            </div>

            {/* Mission (real habit) */}
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
              color: 'var(--text)', marginBottom: 6, lineHeight: 1.3,
            }}>
              {challenge.mission}
            </div>

            {/* Flavor text */}
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)',
              lineHeight: 1.5, marginBottom: 12,
            }}>
              {challenge.flavor}
            </div>

            {/* Bottom row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 12,
                color: color, letterSpacing: 1,
              }}>
                {isCompleted ? '✓ MISSION COMPLETE' : `+${challenge.xp} XP`}
              </div>

              {!isCompleted && (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleComplete}
                  style={{
                    background: `linear-gradient(135deg, ${color}22, ${color}44)`,
                    border: `1px solid ${color}`,
                    borderRadius: 6, padding: '6px 16px',
                    fontFamily: 'var(--font-display)', fontSize: 10,
                    color, letterSpacing: 2, cursor: 'pointer',
                  }}>
                  COMPLETE MISSION
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* XP burst animation */}
      <AnimatePresence>
        {showBurst && <XPBurst xp={challenge.xp} />}
      </AnimatePresence>
    </motion.div>
  )
}
