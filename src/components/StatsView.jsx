import { motion } from 'framer-motion'
import { getLevel, LEVELS } from '../hooks/useXP.js'

function getLast30Days() {
  const days = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}

function CalendarHeatmap({ xpHistory }) {
  const days = getLast30Days()
  const xpMap = Object.fromEntries((xpHistory ?? []).map(e => [e.date, e.xp]))
  const maxXP = Math.max(...Object.values(xpMap), 1)

  const weeks = []
  let week = []
  days.forEach((d, i) => {
    week.push(d)
    if (week.length === 7 || i === days.length - 1) {
      weeks.push(week)
      week = []
    }
  })

  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', marginBottom: 8, letterSpacing: 1 }}>
        ACTIVITÉ XP — 30 DERNIERS JOURS
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {weeks.map((w, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
            {w.map(day => {
              const xp = xpMap[day] ?? 0
              const intensity = xp / maxXP
              const color = xp > 0
                ? `rgba(204, 255, 0, ${0.2 + intensity * 0.8})`
                : '#1a1a2e'
              return (
                <motion.div key={day}
                  title={`${day}: ${xp} XP`}
                  whileHover={{ scale: 1.3 }}
                  style={{
                    width: '100%', paddingBottom: '100%', borderRadius: 2,
                    background: color,
                    boxShadow: xp > 0 ? `0 0 4px rgba(204,255,0,${intensity * 0.6})` : 'none',
                    cursor: 'default',
                  }} />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function StatsView({ totalXP, streak, xpHistory }) {
  const level = getLevel(totalXP)
  const totalDays = (xpHistory ?? []).length
  const totalXPEarned = (xpHistory ?? []).reduce((s, e) => s + e.xp, 0)
  const bestDay = (xpHistory ?? []).reduce((best, e) => e.xp > (best?.xp ?? 0) ? e : best, null)
  const avgXP = totalDays > 0 ? Math.round(totalXPEarned / totalDays) : 0

  return (
    <div style={{ padding: '20px 16px' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: 3, color: 'var(--muted)', marginBottom: 2 }}>
          DOSSIER AGENT
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, color: 'var(--text)', letterSpacing: 1 }}>
          STATISTIQUES
        </div>
      </div>

      {/* Level card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: `linear-gradient(135deg, ${level.color}15, ${level.color}08)`,
          border: `1px solid ${level.color}66`,
          borderRadius: 10, padding: '20px',
          marginBottom: 16, textAlign: 'center',
        }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, color: level.color, letterSpacing: 3 }}>
          {level.name}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
          {totalXP.toLocaleString()} TOTAL XP
        </div>

        {/* Level progress bar */}
        <div style={{ margin: '16px 0 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            {LEVELS.map((l, i) => (
              <div key={l.name} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', margin: '0 auto 4px',
                  background: totalXP >= l.min ? l.color : '#1a1a2e',
                  boxShadow: totalXP >= l.min ? `0 0 6px ${l.color}` : 'none',
                }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: totalXP >= l.min ? l.color : 'var(--muted)' }}>
                  {l.name.slice(0, 3)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stat grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'SÉRIE ACTUELLE', value: streak, unit: 'jours', color: '#FFA502' },
          { label: 'JOURS ACTIFS', value: totalDays, unit: 'total', color: '#00E5FF' },
          { label: 'XP MOYEN/JOUR', value: avgXP, unit: 'xp/jour', color: '#CCFF00' },
          { label: 'MEILLEUR JOUR', value: bestDay?.xp ?? 0, unit: 'xp', color: '#7F77DD' },
        ].map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '14px 12px',
            }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: 1, marginBottom: 6 }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 900, color: s.color, lineHeight: 1 }}>
              {s.value.toLocaleString()}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', marginTop: 4 }}>
              {s.unit}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Calendar heatmap */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px' }}>
        <CalendarHeatmap xpHistory={xpHistory} />
      </div>

      {/* Motivational footer */}
      <div style={{
        marginTop: 20, padding: '14px 16px',
        background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8,
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', lineHeight: 1.7,
      }}>
        <div style={{ color: 'var(--lime)', marginBottom: 4 }}>// INTEL MISSION</div>
        <div>Accomplir 3+ missions par jour maintient ta série.</div>
        <div>500 XP débloque le rang COUREUR. 7000 XP atteint le statut LÉGENDE.</div>
        <div>Les missions boss rapportent 300 XP — la récompense maximale.</div>
      </div>
    </div>
  )
}
