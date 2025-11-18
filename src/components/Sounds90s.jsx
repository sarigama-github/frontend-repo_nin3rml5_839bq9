import { useEffect } from 'react'

export default function Sounds90s() {
  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.value = 440
    gain.gain.value = 0.0001
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    return () => {
      osc.stop()
      ctx.close()
    }
  }, [])

  const play = (freq=440, type='square', duration=0.3) => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">90's Sound Generator</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button onClick={()=>play(220,'square')} className="px-4 py-3 rounded bg-white text-black">Beep 1</button>
        <button onClick={()=>play(330,'sawtooth')} className="px-4 py-3 rounded bg-white text-black">Beep 2</button>
        <button onClick={()=>play(550,'triangle')} className="px-4 py-3 rounded bg-white text-black">Beep 3</button>
        <button onClick={()=>play(880,'square')} className="px-4 py-3 rounded bg-white text-black">Beep 4</button>
      </div>
      <a href="https://www.spacejam.com/1996/" target="_blank" rel="noreferrer" className="mt-6 underline text-sm">Space Jam</a>
    </div>
  )
}
