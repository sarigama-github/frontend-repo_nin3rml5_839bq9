import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Hero from './components/Hero'
import Moon from './components/Moon'
import AuthPage from './components/AuthPage'
import Sounds90s from './components/Sounds90s'
import { getMe } from './lib/api'

function App() {
  const navigate = useNavigate()
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    getMe(token).then(user => {
      setAuthed(!!user)
    }).catch(()=>{})
  }, [])

  const handleLaunch = async () => {
    // After launch: if authed go to moon, else go to auth
    if (authed) {
      navigate('/moon')
    } else {
      navigate('/login')
    }
  }

  return (
    <Routes>
      <Route index element={<Hero onLaunch={handleLaunch} />} />
      <Route path="/moon" element={<Moon onGoSounds={()=>navigate('/sounds')} leftImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop" rightImage="https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=1200&auto=format&fit=crop" />} />
      <Route path="/login" element={<AuthPage onSuccess={()=>navigate('/moon')} />} />
      <Route path="/sounds" element={<Sounds90s />} />
    </Routes>
  )
}

export default App
