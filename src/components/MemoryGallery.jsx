import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { birthdayConfig } from '../config/birthday.js';

export default function MemoryGallery() {
  const [selected, setSelected] = useState(null);
  return (
    <section className="section-wrap memories-section" id="memories">
      <div className="section-heading">
        <p className="eyebrow">LITTLE PIECES OF FOREVER</p>
        <h2>Memories I'd keep <span>again and again.</span></h2>
        <p className="muted">A few little reminders of the joy you bring into the world.</p>
      </div>
      <div className="memory-grid">
        {birthdayConfig.photos.map((photo, index) => (
          <motion.button
            type="button"
            className={`memory-card memory-card-${index + 1}`}
            key={photo.src}
            onClick={() => setSelected(photo)}
            whileHover={{ y: -7, rotate: index === 1 ? 1 : -1 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <span className="photo-frame"><img src={photo.src} alt={photo.caption} loading="lazy" /><span className="zoom-indicator"><ZoomIn size={16} /></span></span>
            <span className="memory-caption">{photo.caption}</span>
            <span className="memory-date">{photo.date}</span>
          </motion.button>
        ))}
      </div>
      <p className="gallery-tip">Replace the sample pictures with your favorite photos in <code>public/images/</code>.</p>
      <AnimatePresence>
        {selected && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo memory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <button className="lightbox-close" type="button" aria-label="Close photo" onClick={() => setSelected(null)}><X /></button>
            <motion.div className="lightbox-content" initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} onClick={(event) => event.stopPropagation()}>
              <img src={selected.src} alt={selected.caption} />
              <h3>{selected.caption}</h3>
              <p>{selected.date}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
