import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, MailOpen } from 'lucide-react';
import { birthdayConfig } from '../config/birthday.js';

export default function BirthdayLetter() {
  const [opened, setOpened] = useState(false);
  return (
    <section className="letter-section section-wrap" id="letter">
      <div className="section-heading">
        <p className="eyebrow">WORDS I HOPE YOU KEEP</p>
        <h2>A little letter, <span>from my heart.</span></h2>
        <p className="muted">Some feelings deserve more than a quick message.</p>
      </div>
      <div className={`letter-envelope ${opened ? 'is-open' : ''}`}>
        <div className="envelope-flap" aria-hidden="true" />
        <div className="envelope-front"><Heart size={32} fill="currentColor" /></div>
        <AnimatePresence>
          {opened && (
            <motion.article className="letter-paper" initial={{ opacity: 0, y: 35, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.55 }}>
              <p className="letter-small">TO MY FAVORITE PERSON</p>
              <h3>{birthdayConfig.letterTitle}</h3>
              <p>{birthdayConfig.letterMessage}</p>
              <p className="letter-signoff">Always cheering for you, <Heart size={15} fill="currentColor" /></p>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
      <button className="btn btn-primary main-button letter-button" type="button" onClick={() => setOpened((value) => !value)}>
        <MailOpen size={18} /> {opened ? 'Fold my letter away' : 'Read my letter'}
      </button>
    </section>
  );
}
