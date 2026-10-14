import { useState } from 'react';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import { Gift, Heart, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthday.js';

export default function FinalSurprise() {
  const [revealed, setRevealed] = useState(false);
  function reveal() {
    setRevealed((current) => {
      if (!current) confetti({ particleCount: 140, spread: 95, origin: { y: 0.7 }, colors: ['#f472b6', '#c4b5fd', '#fcd34d', '#ffffff'] });
      return !current;
    });
  }
  return (
    <section className="final-section section-wrap" id="surprise">
      <div className="final-glow" aria-hidden="true" />
      <div className="section-heading final-heading">
        <p className="eyebrow"><Sparkles size={15} /> ONE LAST LITTLE THING</p>
        <h2>There's one more <span>thing I want you to know.</span></h2>
        <p className="muted">This last little surprise is tucked away just for you.</p>
      </div>
      <motion.button className={`gift-button ${revealed ? 'gift-open' : ''}`} type="button" onClick={reveal} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} aria-expanded={revealed}>
        <Gift size={38} />
        <span>{revealed ? 'Close your little surprise' : 'Open one last surprise'}</span>
      </motion.button>
      <AnimatePresence>
        {revealed && <motion.div className="final-note" initial={{ opacity: 0, y: 15, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }}>
          <Heart size={24} fill="currentColor" />
          <p>{birthdayConfig.finalMessage}</p>
          <strong>Happy birthday, {birthdayConfig.recipientName}.</strong>
        </motion.div>}
      </AnimatePresence>
      <footer className="birthday-footer">Made with a whole lot of love <Heart size={14} fill="currentColor" /> just for you.</footer>
    </section>
  );
}
