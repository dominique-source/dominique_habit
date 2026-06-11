import { useState, useCallback } from 'react'

export const LEVELS = [
  { name: 'ROOKIE',   min: 0,    color: '#6b6b8a' },
  { name: 'RUNNER',   min: 500,  color: '#CCFF00' },
  { name: 'WARRIOR',  min: 1500, color: '#00E5FF' },
  { name: 'ELITE',    min: 3500, color: '#7F77DD' },
  { name: 'LEGEND',   min: 7000, color: '#FF4757' },
]

export function getLevel(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].min) return { ...LEVELS[i], index: i }
  }
  return { ...LEVELS[0], index: 0 }
}

export function getNextLevel(xp) {
  const cur = getLevel(xp)
  return LEVELS[cur.index + 1] || null
}

export function getProgressPct(xp) {
  const cur = getLevel(xp)
  const next = getNextLevel(xp)
  if (!next) return 100
  const range = next.min - cur.min
  const progress = xp - cur.min
  return Math.min(100, Math.round((progress / range) * 100))
}

export function useXP(initialXP = 0) {
  const [xp, setXP] = useState(initialXP)

  const addXP = useCallback((amount) => {
    setXP(prev => prev + amount)
  }, [])

  return { xp, addXP, level: getLevel(xp), nextLevel: getNextLevel(xp), progressPct: getProgressPct(xp) }
}
