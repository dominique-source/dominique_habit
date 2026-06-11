import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  IconBuildingSkyscraper, IconMap, IconChartBar, IconSword,
} from '@tabler/icons-react'
import CityView from './components/CityView.jsx'
import MissionList from './components/MissionList.jsx'
import CityMap from './components/CityMap.jsx'
import StatsView from './components/StatsView.jsx'
import { useDaily } from './hooks/useDaily.js'
import { getLevel } from './hooks/useXP.js'

const TABS = [
  { id: 'home',  label: 'ACCUEIL', Icon: IconBuildingSkyscraper },
  { id: 'map',   label: 'CARTE',   Icon: IconMap },
  { id: 'stats', label: 'STATS',   Icon: IconChartBar },
]

function TabBar({ active, onChange }) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(10,10,18,0.95)',
      borderTop: '1px solid rgba(127,119,221,0.2)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button key={id} onClick={() => onChange(id)}
            style={{
              flex: 1, padding: '12px 0 10px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}>
            <motion.div animate={{ scale: isActive ? 1.15 : 1 }} transition={{ duration: 0.2 }}>
              <Icon size={20} color={isActive ? '#CCFF00' : '#6b6b8a'} />
            </motion.div>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: 1.5,
              color: isActive ? '#CCFF00' : '#6b6b8a',
            }}>
              {label}
            </span>
            {isActive && (
              <motion.div layoutId="tab-indicator"
                style={{ width: 20, height: 2, borderRadius: 1, background: '#CCFF00', marginTop: 2 }} />
            )}
          </button>
        )
      })}
    </div>
  )
}

function XPCounter({ xp }) {
  return (
    <motion.div
      key={xp}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 0.3 }}
      style={{
        fontFamily: 'var(--font-display)', fontSize: 11,
        color: '#CCFF00', letterSpacing: 2,
      }}>
      {xp.toLocaleString()} XP
    </motion.div>
  )
}

export default function App() {
  const [tab, setTab] = useState('home')
  const [levelUpAnim, setLevelUpAnim] = useState(false)
  const {
    challenges, completed, totalXP, streak,
    xpHistory, zoneHistory, completeChallenge,
  } = useDaily()

  const level = getLevel(totalXP)

  function handleComplete(id, xp) {
    const prevLevel = getLevel(totalXP)
    completeChallenge(id, xp)
    const newXP = totalXP + xp
    const newLevel = getLevel(newXP)
    if (newLevel.index > prevLevel.index) {
      setLevelUpAnim(true)
      setTimeout(() => setLevelUpAnim(false), 2000)
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100dvh', position: 'relative', background: 'var(--bg)' }}>
      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(127,119,221,0.15)',
        padding: '10px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <IconSword size={18} color="#00BFFF" />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 900, letterSpacing: 2, color: '#00BFFF' }}>
            DOMINIQUE CHALLENGE
          </span>
        </div>
        <XPCounter xp={totalXP} />
      </div>

      {/* Level-up banner */}
      <AnimatePresence>
        {levelUpAnim && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            style={{
              position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)',
              zIndex: 200, whiteSpace: 'nowrap',
              background: `linear-gradient(135deg, ${level.color}33, ${level.color}66)`,
              border: `2px solid ${level.color}`,
              borderRadius: 8, padding: '10px 24px',
              fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: 3,
              color: level.color, textShadow: `0 0 20px ${level.color}`,
            }}>
            ⚡ NIVEAU SUPÉRIEUR — {level.name} ⚡
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <div style={{ paddingBottom: 80 }}>
        <AnimatePresence mode="wait">
          {tab === 'home' && (
            <motion.div key="home"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}>
              <CityView
                totalXP={totalXP}
                streak={streak}
                completedCount={completed.length}
                totalCount={challenges.length}
                levelUpAnimation={levelUpAnim}
              />
              <MissionList
                challenges={challenges}
                completed={completed}
                onComplete={handleComplete}
              />
            </motion.div>
          )}

          {tab === 'map' && (
            <motion.div key="map"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}>
              <CityMap zoneHistory={zoneHistory} />
            </motion.div>
          )}

          {tab === 'stats' && (
            <motion.div key="stats"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}>
              <StatsView totalXP={totalXP} streak={streak} xpHistory={xpHistory} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <TabBar active={tab} onChange={setTab} />
    </div>
  )
}
