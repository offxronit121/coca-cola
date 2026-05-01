import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';

export default function MainContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-[500vh] bg-black">
      {/* Background Kinetic Layer */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -500]) }}
            className="kinetic-text text-center"
          >
              REAL MAGIC<br />HAPPINESS
          </motion.div>
      </div>

      {/* Hero Section */}
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden z-10">
        <motion.div 
          style={{ scale, opacity }}
          className="relative z-10 text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[15vw] md:text-[12vw] font-bold leading-[0.8] tracking-tighter uppercase"
          >
            Open <br /> 
            <span className="text-coke-red text-glow">Happiness</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-8 font-sans text-lg md:text-xl text-white/40 tracking-[0.4em] uppercase"
          >
            Experience Unlocked
          </motion.p>
        </motion.div>

        {/* Atmosphere Scroll Hint */}
        <div className="absolute left-1/2 bottom-10 -translate-x-1/2 flex flex-col items-center">
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent"></div>
            <div className="text-[9px] uppercase tracking-[0.4em] text-white/40 mt-4">Scroll to Discover</div>
        </div>
      </section>

      {/* Story Sections */}
      <ScrollSection 
        title="The Original Fizz"
        description="Crafting the iconic taste that defined a century, now infused with neural-refreshment technology."
        img="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=1200"
      />

      <ScrollSection 
        title="Liquid Energy"
        description="Bottled excitement that powers your digital and physical presence alike."
        img="https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&q=80&w=1200"
        reversed
      />

      {/* Product Showcase Interaction */}
      <section className="h-screen flex items-center justify-center border-y border-white/5 relative z-10">
        <div className="text-center px-6">
            <h2 className="font-display text-6xl md:text-8xl font-bold mb-8 uppercase tracking-tighter">The Perfect Flow</h2>
            <div className="max-w-4xl mx-auto glass-card p-12 relative overflow-hidden group">
                <p className="text-2xl md:text-3xl font-light text-white/80 leading-relaxed mb-6 font-display italic">
                    "A symphony of bubbles, coolness, and iconic red. 
                    Every drop is a leap into a world of pure energy."
                </p>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                        style={{ scaleX: scrollYProgress }}
                        className="h-full bg-coke-red origin-left"
                    />
                </div>
                <div className="mt-10 flex flex-wrap justify-center gap-6">
                    <button className="px-10 py-5 bg-coke-red rounded-xl font-display font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_30px_rgba(244,0,9,0.3)]">
                        Explore Varieties
                    </button>
                    <button className="px-10 py-5 border border-white/10 rounded-xl font-display font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all">
                        Find a Cooler
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="h-screen flex items-center justify-center relative overflow-hidden z-10">
         <div className="text-center z-10 w-full px-6">
            <h3 className="font-display text-[25vw] font-black opacity-5 uppercase select-none pointer-events-none tracking-tighter">COCA-COLA</h3>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass-card p-10 md:p-20 text-center max-w-xl mx-auto border-white/10">
                    <p className="text-white/30 mb-4 uppercase tracking-[0.3em] text-xs font-bold">Join the ecosystem</p>
                    <h4 className="text-4xl md:text-5xl font-display font-bold mb-10 italic">Ready for a refill?</h4>
                    <div className="relative group mb-6">
                        <input 
                          type="email" 
                          placeholder="NEURAL_ID" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-8 py-5 focus:outline-none focus:border-coke-red transition-all font-display text-sm tracking-[0.2em]"
                        />
                        <div className="absolute inset-0 rounded-xl bg-coke-red/10 blur opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                    <button className="w-full bg-white text-black py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-coke-red hover:text-white transition-all shadow-xl">
                        Subscribe to Happiness
                    </button>
                </div>
            </div>
         </div>
      </footer>
    </div>
  );
}

function ScrollSection({ title, description, img, reversed = false }: { title: string, description: string, img: string, reversed?: boolean }) {
    return (
        <section className={`min-h-screen flex items-center px-6 md:px-24 py-24 ${reversed ? 'flex-row-reverse' : ''}`}>
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: reversed ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="font-display text-5xl md:text-7xl font-bold mb-6 uppercase tracking-tighter">{title}</h2>
                    <p className="text-xl text-white/50 leading-relaxed font-light">{description}</p>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="aspect-square rounded-3xl overflow-hidden glass-morphism p-4 border border-white/5"
                >
                    <img src={img} alt={title} className="w-full h-full object-cover rounded-2xl opacity-80 grayscale hover:grayscale-0 transition-all duration-700" />
                </motion.div>
            </div>
        </section>
    )
}

function BackgroundParticles() {
    return (
        <div className="absolute inset-0 grid grid-cols-6 gap-4 p-4">
            {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.5, 0],
                        scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                    className="w-2 h-2 rounded-full bg-white self-end justify-self-center"
                />
            ))}
        </div>
    )
}
