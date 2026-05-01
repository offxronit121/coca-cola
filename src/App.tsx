/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense } from 'react';
import OpeningScene from './components/OpeningScene';
import MainContent from './components/MainContent';
import SmoothScroll from './components/SmoothScroll';
import { AnimatePresence, motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Small delay to ensure WebGL context is ready
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative bg-black min-h-screen text-white font-sans selection:bg-coke-red selection:text-white overflow-hidden">
      <div className="atmosphere fixed inset-0 pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            key="loader"
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-display"
          >
            <div className="text-center">
              <Loader2 className="animate-spin text-coke-red mb-4 mx-auto" size={48} />
              <p className="font-medium tracking-[0.5em] text-white/50 uppercase text-xs">
                Charging Refreshment
              </p>
            </div>
          </motion.div>
        )}

        {!isStarted ? (
          <motion.div 
            key="opening"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Suspense fallback={null}>
              <OpeningScene onOpen={() => setIsStarted(true)} />
            </Suspense>
          </motion.div>
        ) : (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <SmoothScroll>
              <MainContent />
            </SmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Overlay */}
      <nav className="fixed top-0 w-full p-10 flex justify-between items-center z-[70] pointer-events-none">
        <div className="text-white font-display font-bold text-xl tracking-tighter pointer-events-auto">
          Coca-Cola<span className="text-coke-red">.</span>
        </div>
        <div className="hidden md:flex space-x-12 pointer-events-auto">
          <span className="nav-link">Heritage</span>
          <span className="nav-link">Products</span>
          <span className="nav-link">Innovation</span>
          <span className="nav-link">World</span>
        </div>
        <div className="glass-card px-5 py-2.5 text-[10px] uppercase font-bold text-white tracking-widest pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors">
          Menu
        </div>
      </nav>

      {/* HUD Assets */}
      <div className="fixed bottom-10 right-10 z-[60] flex items-center space-x-6 text-white pointer-events-none">
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase opacity-30 tracking-widest">Current Mood</span>
          <span className="text-2xl font-display font-light italic">Refreshing</span>
        </div>
        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-coke-red flex items-center justify-center shadow-[0_0_20px_rgba(244,0,9,0.5)]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="fixed bottom-10 left-10 z-[60] pointer-events-none hidden lg:block">
        <div className="glass-card p-6 w-64">
          <div className="text-coke-red text-[10px] uppercase font-black mb-2">Origin: 1886</div>
          <div className="text-white text-lg leading-tight font-display font-semibold">The Taste of a Generation, Reimagined.</div>
          <div className="w-12 h-1 bg-coke-red mt-4" />
        </div>
      </div>
    </main>
  );
}
