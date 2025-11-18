import { motion } from 'framer-motion'

export default function Moon({ onGoSounds, leftImage, rightImage }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white flex flex-col items-center justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
      <h1 className="text-4xl font-bold mb-8">Moon Surface</h1>
      <p className="text-base text-gray-300 mb-10">Welcome, astronaut. Your rocket has landed with a thud.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full max-w-5xl">
        <HoverCard src={leftImage} title="Left Artifact" />
        <HoverCard src={rightImage} title="Right Artifact" />
      </div>

      <button onClick={onGoSounds} className="mt-12 px-6 py-3 rounded bg-white text-black hover:bg-gray-200 transition">
        Go to 90's Sound Generator
      </button>
      <a href="https://www.spacejam.com/1996/" target="_blank" rel="noreferrer" className="mt-4 text-sm text-gray-300 underline">Visit Space Jam</a>
    </div>
  )
}

function HoverCard({ src, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md"
    >
      <div className="aspect-[4/3] overflow-hidden rounded-lg">
        <motion.img
          src={src}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="text-sm text-gray-300 mt-3"
      >
        {title} — mysterious details appear when you hover.
      </motion.div>
    </motion.div>
  )
}
