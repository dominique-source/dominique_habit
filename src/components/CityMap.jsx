import { motion } from 'framer-motion'
import { ZONES } from '../data/challenges.js'

const ZONE_LIST = [
  { key: 'movement', label: 'MOVEMENT ZONE',  subtitle: 'Sky Bridge District',   color: '#CCFF00', emoji: '🏃' },
  { key: 'nutrition', label: 'NUTRITION ZONE', subtitle: 'Quantum Fuel District', color: '#00E5FF', emoji: '🥗' },
  { key: 'recovery',  label: 'RECOVERY ZONE',  subtitle: 'Deep Recharge Sector',  color: '#7F77DD', emoji: '🌙' },
  { key: 'mindset',   label: 'MINDSET ZONE',   subtitle: 'Zen District',           color: '#FFA502', emoji: '🧠' },
  { key: 'boss',      label: 'BOSS ZONE',      subtitle: 'City Circuit Core',      color: '#FF4757', emoji: '💀' },
]

function getLast7Days() {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}

function getZoneCompletions(zoneHistory, zone, days) {
  return days.reduce((sum, day) => sum + (zoneHistory[`${day}_${zone}`] ?? 0), 0)
}

export default function CityMap({ zoneHistory }) {
  const days = getLast7Days()

  const zoneStats = ZONE_LIST.map(z => {
    const total = getZoneCompletions(zoneHistory, z.key, days)
    const maxPossible = z.key === 'boss' ? days.length : days.length
    const pct = Math.min(100, Math.round((total / Math.max(maxPossible, 1)) * 100 * (z.key === 'boss' ? 5 : 1)))
    return { ...z, total, pct: Math.min(100, pct) }
  })

  const dayLabels = days.map(d => {
    const dt = new Date(d + 'T00:00:00')
    return ['SUN','MON','TUE','WED','THU','FRI','SAT'][dt.getDay()]
  })

  return (
    <div style={{ padding: '20px 16px' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: 3, color: 'var(--muted)', marginBottom: 2 }}>
          TACTICAL OVERVIEW
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, color: 'var(--text)', letterSpacing: 1 }}>
          CITY MAP
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
          Zone activity over the last 7 days
        </div>
      </div>

      {/* Zone cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
        {zoneStats.map((z, i) => (
          <motion.div key={z.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            style={{
              background: z.pct > 0 ? `linear-gradient(135deg, ${z.color}08, ${z.color}15)` : 'var(--card)',
              border: `1px solid ${z.pct > 0 ? z.color + '44' : 'var(--border)'}`,
              borderRadius: 8, padding: '14px 16px',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: 22 }}>{z.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, color: z.color, letterSpacing: 2 }}>
                  {z.label}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>
                  {z.subtitle}
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: z.pct > 0 ? z.color : 'var(--muted)' }}>
                {z.total}×
              </div>
            </div>

            {/* Activity bar */}
            <div style={{ height: 4, background: '#1a1a2e', borderRadius: 2, overflow: 'hidden' }}>
              <motion.div
                animate={{ width: `${z.pct}%` }}
                initial={{ width: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                style={{ height: '100%', background: `linear-gradient(90deg, ${z.color}, ${z.color}88)`, borderRadius: 2 }} />
            </div>

            {/* Weekly dots */}
            <div style={{ display: 'flex', gap: 6, marginTop: 8, justifyContent: 'space-between' }}>
              {days.map((day, di) => {
                const count = zoneHistory[`${day}_${z.key}`] ?? 0
                return (
                  <div key={day} style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{
                      width: '100%', height: 16, borderRadius: 3,
                      background: count > 0 ? z.color : '#1a1a2e',
                      opacity: count > 0 ? 1 : 0.4,
                      boxShadow: count > 0 ? `0 0 6px ${z.color}66` : 'none',
                      transition: 'all 0.3s',
                    }} />
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--muted)', marginTop: 2 }}>
                      {dayLabels[di]}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div style={{
        background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px',
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', lineHeight: 1.8,
      }}>
        <div style={{ color: 'var(--text)', marginBottom: 4, letterSpacing: 1 }}>// SIGNAL GUIDE</div>
        <div>Colored block = mission completed in that zone on that day</div>
        <div>Complete 3+ zones daily to maintain your streak</div>
        <div>Boss missions only appear ~20% of days</div>
      </div>
    </div>
  )
}
