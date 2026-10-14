import { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { CakeSlice, RotateCcw, Sparkles } from 'lucide-react';

export default function BirthdayCake() {
  const [wished, setWished] = useState(false);
  function makeWish() {
    if (wished) {
      setWished(false);
      return;
    }
    setWished(true);
    confetti({ particleCount: 115, spread: 75, origin: { y: 0.65 }, colors: ['#f472b6', '#c4b5fd', '#f9a8d4', '#fcd34d', '#ffffff'] });
    window.setTimeout(() => confetti({ particleCount: 55, spread: 110, origin: { y: 0.6 }, scalar: 0.8 }), 250);
  }
  return (
    <section className="cake-section section-wrap" id="cake">
      <div className="section-heading">
        <p className="eyebrow">CLOSE YOUR EYES AND DREAM</p>
        <h2>Make a wish, <span>birthday girl.</span></h2>
        <p className="muted">Whatever your heart is hoping for, I hope it finds its way to you.</p>
      </div>
      <div className={`cake-stage ${wished ? 'cake-wished' : ''}`}>
        <div className="cake-sparkle sparkle-a">✦</div><div className="cake-sparkle sparkle-b">✧</div><div className="cake-sparkle sparkle-c">✦</div>
        <div className="candles">
          {[0, 1, 2].map((item) => <div className="candle" key={item}><span className={`flame ${wished ? 'flame-out' : ''}`} /><span className="candle-stick" /></div>)}
        </div>
        <div className="cake-top" /><div className="cake-body"><span className="icing-drip drip-one" /><span className="icing-drip drip-two" /><span className="icing-drip drip-three" /><span className="cake-heart">♥</span></div>
        <div className="cake-plate" />
      </div>
      {wished && <motion.p className="wish-reveal" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><Sparkles size={19} /> May all your beautiful dreams come true.</motion.p>}
      <button className="btn btn-primary main-button" type="button" onClick={makeWish}>
        {wished ? <RotateCcw size={18} /> : <CakeSlice size={18} />}
        {wished ? 'Make another wish' : 'Make a wish & blow the candles'}
      </button>
    </section>
  );
}
