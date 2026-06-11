import { useState, useEffect } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase.js'

export function useAuth() {
  const [user, setUser] = useState(undefined) // undefined = chargement
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u ?? null))
    return unsub
  }, [])

  async function loginGoogle() {
    setLoading(true); setError(null)
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function loginEmail(email, password) {
    setLoading(true); setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function registerEmail(email, password, displayName) {
    setLoading(true); setError(null)
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName) await updateProfile(cred.user, { displayName })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    await signOut(auth)
  }

  return { user, error, loading, loginGoogle, loginEmail, registerEmail, logout }
}
