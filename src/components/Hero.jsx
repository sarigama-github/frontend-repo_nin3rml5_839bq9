import { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { motion, useAnimation } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Hero({ onLaunch }) {
  const controls = useAnimation()
  const navigate = useNavigate()

  async function launch() {
    // rocket launch animation then route
    await controls.start({ y: -800, scale: 0.9, transition: { duration: 1.6, ease: [0.2, 0.8, 0.2, 1] } })
    onLaunch?.()
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/er66D6jbuo0hIjmn/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* gradient glow overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.15),transparent_60%)]" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white text-center px-6">
        <motion.div
          animate={controls}
          initial={{ y: 0 }}
          className="w-28 h-28 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.25)] cursor-pointer hover:scale-105 transition"
          onClick={launch}
        >
          <span className="text-sm tracking-widest uppercase">Rocket</span>
        </motion.div>
        <p className="mt-6 text-sm text-gray-300">Tap the rocket to launch</p>
      </div>
    </div>
  )
}
