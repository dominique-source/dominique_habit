import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  IconBuildingSkyscraper, IconMap, IconChartBar, IconSword,
  IconLogout, IconLoader2,
} from '@tabler/icons-react'
import CityView from './components/CityView.jsx'
import MissionList from './components/MissionList.jsx'
import CityMap from './components/CityMap.jsx'
import StatsView from './components/StatsView.jsx'
import LoginScreen from './components/LoginScreen.jsx'
import { useDaily } from './hooks/useDaily.js'
import { useAuth } from './hooks/useAuth.js'
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
            }}>
            <motion.div animate={{ scale: isActive ? 1.15 : 1 }} transition={{ duration: 0.2 }}>
              <Icon size={20} color={isActive ? '#00BFFF' : '#6b6b8a'} />
            </motion.div>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: 1.5,
              color: isActive ? '#00BFFF' : '#6b6b8a',
            }}>
              {label}
            </span>
            {isActive && (
              <motion.div layoutId="tab-indicator"
                style={{ width: 20, height: 2, borderRadius: 1, background: '#00BFFF', marginTop: 2 }} />
            )}
          </button>
        )
      })}
    </div>
  )
}

// Sync indicator
function SyncDot({ syncing }) {
  if (!syncing) return null
  return (
    <motion.div
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1, repeat: Infinity }}
      style={{
        width: 6, height: 6, borderRadius: '50%',
        background: '#00BFFF', marginLeft: 6, display: 'inline-block',
      }} />
  )
}

export default function App() {
  const [tab, setTab] = useState('home')
  const [levelUpAnim, setLevelUpAnim] = useState(false)
  const { user, error, loading: authLoading, loginGoogle, loginEmail, registerEmail, logout } = useAuth()

  const {
    challenges, completed, totalXP, streak,
    xpHistory, zoneHistory, completeChallenge, syncing,
  } = useDaily(user?.uid)

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

  // Chargement auth
  if (user === undefined) {
    return (
      <div style={{
        minHeight: '100dvh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--bg)',
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
          <IconLoader2 size={32} color="#00BFFF" />
        </motion.div>
      </div>
    )
  }

  // Non connecté → écran login
  if (!user) {
    return (
      <LoginScreen
        onLoginGoogle={loginGoogle}
        onLoginEmail={loginEmail}
        onRegister={registerEmail}
        error={error}
        loading={authLoading}
      />
    )
  }

  // App principale
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
          <SyncDot syncing={syncing} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <motion.span key={totalXP} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.3 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 11, color: '#00BFFF', letterSpacing: 2 }}>
            {totalXP.toLocaleString()} XP
          </motion.span>
          <button onClick={logout} title="Déconnexion"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <IconLogout size={16} color="var(--muted)" />
          </button>
        </div>
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

      {/* Salutation agent */}
      {user.displayName && (
        <div style={{
          padding: '8px 16px 0',
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--muted)', letterSpacing: 1,
        }}>
          AGENT : {user.displayName.toUpperCase()}
        </div>
      )}

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
