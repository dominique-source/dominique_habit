import { motion } from 'framer-motion'
import { getLevel, getNextLevel, getProgressPct } from '../hooks/useXP.js'

// Animated city skyline SVG
function CitySkyline({ litZones = [] }) {
  const buildings = [
    { x: 0,   w: 40,  h: 120, windows: [[8,20],[8,40],[8,60],[25,20],[25,40]] },
    { x: 45,  w: 30,  h: 180, windows: [[5,15],[5,35],[5,55],[5,75],[18,15],[18,35],[18,55]] },
    { x: 80,  w: 55,  h: 200, windows: [[8,20],[8,40],[8,60],[8,80],[28,20],[28,40],[28,60],[45,30],[45,50]] },
    { x: 140, w: 25,  h: 140, windows: [[5,20],[5,40],[5,60],[15,20],[15,40]] },
    { x: 170, w: 60,  h: 240, windows: [[8,20],[8,40],[8,60],[8,80],[8,100],[28,20],[28,40],[28,60],[28,80],[48,30],[48,60]] },
    { x: 235, w: 35,  h: 160, windows: [[6,20],[6,40],[6,60],[6,80],[20,20],[20,40],[20,60]] },
    { x: 275, w: 50,  h: 210, windows: [[8,20],[8,40],[8,60],[8,80],[25,20],[25,40],[25,60],[40,30],[40,50],[40,70]] },
    { x: 330, w: 28,  h: 130, windows: [[5,15],[5,35],[5,55],[18,15],[18,35]] },
    { x: 363, w: 45,  h: 175, windows: [[6,20],[6,40],[6,60],[6,80],[22,20],[22,40],[22,60],[36,30],[36,55]] },
    { x: 413, w: 55,  h: 220, windows: [[8,20],[8,40],[8,60],[8,80],[8,100],[28,20],[28,40],[28,60],[28,80],[44,30],[44,50],[44,70]] },
    { x: 473, w: 30,  h: 150, windows: [[5,20],[5,40],[5,60],[5,80],[18,20],[18,40],[18,60]] },
    { x: 508, w: 42,  h: 190, windows: [[6,15],[6,35],[6,55],[6,75],[22,15],[22,35],[22,55],[35,25],[35,45],[35,65]] },
    { x: 555, w: 50,  h: 200, windows: [[8,20],[8,40],[8,60],[8,80],[25,20],[25,40],[25,60],[40,30],[40,50]] },
    { x: 610, w: 28,  h: 135, windows: [[5,15],[5,35],[5,55],[18,15],[18,35],[18,55]] },
    { x: 643, w: 60,  h: 250, windows: [[8,20],[8,40],[8,60],[8,80],[8,100],[8,120],[30,20],[30,40],[30,60],[30,80],[50,30],[50,55],[50,80]] },
    { x: 708, w: 35,  h: 160, windows: [[6,20],[6,40],[6,60],[22,20],[22,40],[22,60]] },
    { x: 748, w: 48,  h: 195, windows: [[8,20],[8,40],[8,60],[8,80],[24,20],[24,40],[24,60],[38,30],[38,55]] },
  ]

  const svgH = 260
  const zoneColors = {
    movement: '#CCFF00',
    nutrition: '#00E5FF',
    recovery: '#7F77DD',
    mindset: '#FFA502',
    boss: '#FF4757',
  }
  const allLit = litZones.length > 0
  const windowColor = allLit ? '#CCFF00' : '#7F77DD'

  return (
    <svg viewBox="0 0 800 260" width="100%" style={{ display: 'block' }} aria-hidden>
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A0A1A" />
          <stop offset="100%" stopColor="#1a0a2e" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="strongGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Sky */}
      <rect width="800" height="260" fill="url(#skyGrad)" />

      {/* Stars */}
      {[...Array(40)].map((_, i) => (
        <circle key={i} cx={(i * 97 + 23) % 800} cy={(i * 53 + 10) % 100} r="0.8"
          fill="white" opacity={0.3 + (i % 5) * 0.1} />
      ))}

      {/* Ground glow line */}
      <rect x="0" y="252" width="800" height="2" fill="#7F77DD" opacity="0.6" filter="url(#glow)" />
      <rect x="0" y="254" width="800" height="6" fill="#0A0A0A" />

      {/* Buildings */}
      {buildings.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={svgH - b.h} width={b.w} height={b.h}
            fill="#0d0d1a" stroke="#1a1a3a" strokeWidth="0.5" />
          {b.windows.map(([wx, wy], wi) => (
            <motion.rect key={wi}
              x={b.x + wx} y={svgH - b.h + wy} width="6" height="5"
              fill={windowColor}
              opacity={0.6 + (wi % 3) * 0.15}
              filter="url(#glow)"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2 + (wi % 4), repeat: Infinity, delay: (i + wi) * 0.3 }}
            />
          ))}
          {/* Antenna on tall buildings */}
          {b.h > 180 && (
            <motion.line x1={b.x + b.w / 2} y1={svgH - b.h} x2={b.x + b.w / 2} y2={svgH - b.h - 20}
              stroke="#CCFF00" strokeWidth="1" filter="url(#glow)"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} />
          )}
        </g>
      ))}

      {/* Neon city label */}
      <text x="400" y="30" textAnchor="middle" fill="#7F77DD" opacity="0.3"
        fontFamily="Orbitron" fontSize="10" letterSpacing="6">NEOSYNTH CITY</text>
    </svg>
  )
}

// Running character
function CyberRunner({ running = false }) {
  return (
    <motion.div style={{ position: 'relative', width: 48, height: 48 }}
      animate={running ? { x: [0, 200, 400, 600] } : {}}
      transition={running ? { duration: 1.5, ease: 'easeInOut' } : {}}>
      <svg viewBox="0 0 48 48" width="48" height="48">
        {/* Body */}
        <rect x="18" y="14" width="12" height="16" rx="2" fill="#7F77DD" />
        {/* Head */}
        <rect x="19" y="6" width="10" height="10" rx="3" fill="#CCFF00" />
        {/* Visor */}
        <rect x="20" y="9" width="8" height="3" rx="1" fill="#0A0A0A" opacity="0.8" />
        {/* Left leg */}
        <motion.rect x="18" y="30" width="5" height="12" rx="2" fill="#5a52bb"
          animate={{ rotate: running ? [-20, 20, -20] : 0 }}
          transition={{ duration: 0.4, repeat: Infinity }}
          style={{ transformOrigin: '20px 30px' }} />
        {/* Right leg */}
        <motion.rect x="25" y="30" width="5" height="12" rx="2" fill="#5a52bb"
          animate={{ rotate: running ? [20, -20, 20] : 0 }}
          transition={{ duration: 0.4, repeat: Infinity }}
          style={{ transformOrigin: '27px 30px' }} />
        {/* Left arm */}
        <motion.rect x="11" y="16" width="7" height="4" rx="2" fill="#CCFF00"
          animate={{ rotate: running ? [20, -20, 20] : 0 }}
          transition={{ duration: 0.4, repeat: Infinity }}
          style={{ transformOrigin: '18px 18px' }} />
        {/* Right arm */}
        <motion.rect x="30" y="16" width="7" height="4" rx="2" fill="#CCFF00"
          animate={{ rotate: running ? [-20, 20, -20] : 0 }}
          transition={{ duration: 0.4, repeat: Infinity }}
          style={{ transformOrigin: '30px 18px' }} />
      </svg>
    </motion.div>
  )
}

export default function CityView({ totalXP, streak, completedCount, totalCount, levelUpAnimation }) {
  const level = getLevel(totalXP)
  const next = getNextLevel(totalXP)
  const pct = getProgressPct(totalXP)
  const litZones = completedCount > 0 ? ['movement'] : []

  return (
    <div style={{ position: 'relative' }}>
      {/* Skyline */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <CitySkyline litZones={litZones} />
        {/* Runner at base of skyline */}
        <div style={{ position: 'absolute', bottom: 10, left: 16 }}>
          <CyberRunner running={levelUpAnimation} />
        </div>
      </div>

      {/* HUD Bar */}
      <div style={{
        background: 'linear-gradient(180deg, #0d0d1a 0%, #111118 100%)',
        borderBottom: '1px solid rgba(127,119,221,0.2)',
        padding: '12px 20px',
        display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
      }}>
        {/* Level badge */}
        <motion.div
          animate={levelUpAnimation ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.6 }}
          style={{
            background: `linear-gradient(135deg, ${level.color}22, ${level.color}44)`,
            border: `1px solid ${level.color}`,
            borderRadius: 4, padding: '4px 10px',
            fontFamily: 'var(--font-display)', fontSize: 10,
            color: level.color, letterSpacing: 2,
          }}>
          {level.name}
        </motion.div>

        {/* XP Bar */}
        <div style={{ flex: 1, minWidth: 120 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>XP</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--lime)' }}>
              {totalXP.toLocaleString()}{next ? ` / ${next.min.toLocaleString()}` : ' MAX'}
            </span>
          </div>
          <div style={{ height: 6, background: '#1a1a2e', borderRadius: 3, overflow: 'hidden' }}>
            <motion.div
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ height: '100%', background: `linear-gradient(90deg, ${level.color}, ${level.color}aa)`, borderRadius: 3 }} />
          </div>
        </div>

        {/* Streak */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#FFA502', lineHeight: 1 }}>
            {streak}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: 1 }}>
            DAY STREAK
          </div>
        </div>

        {/* Mission count */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--cyan)', lineHeight: 1 }}>
            {completedCount}<span style={{ fontSize: 11, color: 'var(--muted)' }}>/{totalCount}</span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: 1 }}>
            MISSIONS
          </div>
        </div>
      </div>
    </div>
  )
}
