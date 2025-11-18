import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { login, signup } from '../lib/api'

export default function AuthPage({ onSuccess }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      let res
      if (mode === 'login') {
        res = await login(email, password)
      } else {
        res = await signup(name, email, password)
      }
      localStorage.setItem('token', res.token)
      onSuccess?.(res)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.15),transparent_60%)]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <h1 className="text-2xl font-bold mb-2">{mode === 'login' ? 'Login' : 'Sign Up'}</h1>
          <p className="text-sm text-gray-300 mb-6">Rocket is flying in the background while you authenticate.</p>

          <form onSubmit={submit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm text-gray-300 mb-1">Name</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full px-3 py-2 rounded bg-black/40 border border-white/10 focus:outline-none" placeholder="Ada Lovelace" />
              </div>
            )}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full px-3 py-2 rounded bg-black/40 border border-white/10 focus:outline-none" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Password</label>
              <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full px-3 py-2 rounded bg-black/40 border border-white/10 focus:outline-none" placeholder="••••••••" />
            </div>

            {error && <div className="text-sm text-red-400">{error}</div>}
            <button disabled={loading} className="w-full bg-white text-black rounded py-2 hover:bg-gray-200 transition disabled:opacity-60">{loading ? 'Please wait...' : (mode==='login'?'Login':'Create account')}</button>
          </form>

          <div className="mt-4 text-sm text-gray-300 text-center">
            {mode === 'login' ? (
              <button onClick={()=>setMode('signup')} className="underline">Need an account? Sign up</button>
            ) : (
              <button onClick={()=>setMode('login')} className="underline">Have an account? Log in</button>
            )}
          </div>
        </div>
      </div>

      {/* simple flying rocket */}
      <motion.div
        className="absolute -bottom-10 left-10 w-6 h-6 bg-white rounded-full"
        animate={{ x: [0, 500, 1000], y: [0, -100, -200] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
