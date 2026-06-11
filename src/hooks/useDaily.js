import { useState, useEffect, useCallback } from 'react'
import { getDailyChallenges, todayStr, yesterdayStr } from '../utils/randomizer.js'

const STORAGE_KEY = 'iq_state'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function saveState(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch {}
}

function initState() {
  const today = todayStr()
  const saved = loadState()

  if (saved && saved.date === today) return saved

  // Carry over totalXP and streak from previous save
  const totalXP = saved?.totalXP ?? 0
  const streak = calcStreak(saved, today)
  const xpHistory = saved?.xpHistory ?? []
  const zoneHistory = saved?.zoneHistory ?? {}

  return {
    date: today,
    challenges: getDailyChallenges(today),
    completed: [],
    totalXP,
    streak,
    xpHistory,
    zoneHistory,
  }
}

function calcStreak(saved, today) {
  if (!saved) return 0
  const yesterday = yesterdayStr()
  // If last active day was yesterday and had 3+ completions, continue streak
  if (saved.date === yesterday && saved.completed.length >= 3) {
    return (saved.streak ?? 0) + 1
  }
  if (saved.date === today) return saved.streak ?? 0
  return 0
}

export function useDaily() {
  const [state, setState] = useState(() => initState())

  // Persist on change
  useEffect(() => { saveState(state) }, [state])

  // Midnight reset
  useEffect(() => {
    const check = () => {
      const today = todayStr()
      if (state.date !== today) setState(initState())
    }
    const id = setInterval(check, 60_000)
    return () => clearInterval(id)
  }, [state.date])

  const completeChallenge = useCallback((challengeId, xpReward) => {
    setState(prev => {
      if (prev.completed.includes(challengeId)) return prev
      const completed = [...prev.completed, challengeId]
      const totalXP = prev.totalXP + xpReward

      // Update zone history
      const ch = prev.challenges.find(c => c.id === challengeId)
      const zoneHistory = { ...prev.zoneHistory }
      if (ch) {
        const key = `${prev.date}_${ch.zone}`
        zoneHistory[key] = (zoneHistory[key] ?? 0) + 1
      }

      // Update xpHistory
      const xpHistory = [...(prev.xpHistory ?? [])]
      const todayEntry = xpHistory.find(e => e.date === prev.date)
      if (todayEntry) todayEntry.xp += xpReward
      else xpHistory.push({ date: prev.date, xp: xpReward })

      return { ...prev, completed, totalXP, zoneHistory, xpHistory }
    })
  }, [])

  return {
    date: state.date,
    challenges: state.challenges,
    completed: state.completed,
    totalXP: state.totalXP,
    streak: state.streak,
    xpHistory: state.xpHistory ?? [],
    zoneHistory: state.zoneHistory ?? {},
    completeChallenge,
    allDone: state.completed.length >= state.challenges.length,
  }
}
