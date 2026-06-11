import { useState } from 'react'
import { motion } from 'framer-motion'
import { IconBrandGoogle, IconMail, IconLock, IconUser, IconSword } from '@tabler/icons-react'

export default function LoginScreen({ onLoginGoogle, onLoginEmail, onRegister, error, loading }) {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (mode === 'login') onLoginEmail(email, password)
    else onRegister(email, password, name)
  }

  const inputStyle = {
    width: '100%',
    background: '#13131f',
    border: '1px solid rgba(127,119,221,0.3)',
    borderRadius: 8,
    padding: '12px 14px 12px 42px',
    color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    outline: 'none',
  }

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: '24px 20px',
    }}>
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ marginBottom: 12 }}>
          <img src="/doum%20challenge.png" alt="DC" style={{ width: 90, height: 90, borderRadius: 20, objectFit: 'cover' }} />
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 900, color: '#00BFFF', letterSpacing: 2 }}>
          DOMINIQUE CHALLENGE
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginTop: 4, letterSpacing: 2 }}>
          {mode === 'login' ? 'CONNEXION AGENT' : 'CRÉER UN COMPTE'}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ width: '100%', maxWidth: 380 }}>

        {/* Google */}
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={onLoginGoogle}
          disabled={loading}
          style={{
            width: '100%', padding: '14px',
            background: 'linear-gradient(135deg, #ffffff10, #ffffff18)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 10, display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 10,
            fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--text)',
            letterSpacing: 1, marginBottom: 20, cursor: 'pointer',
          }}>
          <IconBrandGoogle size={20} color="#EA4335" />
          CONTINUER AVEC GOOGLE
        </motion.button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>OU</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mode === 'register' && (
            <div style={{ position: 'relative' }}>
              <IconUser size={16} color="var(--muted)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text" placeholder="Ton prénom" value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyle} required />
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <IconMail size={16} color="var(--muted)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="email" placeholder="Courriel" value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle} required />
          </div>

          <div style={{ position: 'relative' }}>
            <IconLock size={16} color="var(--muted)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="password" placeholder="Mot de passe" value={password}
              onChange={e => setPassword(e.target.value)}
              style={inputStyle} required />
          </div>

          {error && (
            <div style={{
              background: '#FF475722', border: '1px solid #FF4757',
              borderRadius: 8, padding: '10px 14px',
              fontFamily: 'var(--font-mono)', fontSize: 11, color: '#FF4757',
            }}>
              {error.replace('Firebase: ', '').replace(/\(auth.*\)/, '')}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            type="submit" disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: 'linear-gradient(135deg, #00BFFF33, #00BFFF55)',
              border: '1px solid #00BFFF',
              borderRadius: 10, fontFamily: 'var(--font-display)',
              fontSize: 13, color: '#00BFFF', letterSpacing: 2,
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1,
            }}>
            {loading ? 'CHARGEMENT...' : mode === 'login' ? 'SE CONNECTER' : 'CRÉER LE COMPTE'}
          </motion.button>
        </form>

        {/* Toggle mode */}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)',
            }}>
            {mode === 'login'
              ? "Pas de compte ? → CRÉER UN COMPTE"
              : "Déjà un compte ? → SE CONNECTER"}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
