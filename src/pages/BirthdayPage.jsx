import { motion } from "framer-motion";
import { ArrowDown, Heart, Sparkles } from "lucide-react";
import { birthdayConfig } from "../config/birthday.js";
import MemoryGallery from "../components/MemoryGallery.jsx";
import BirthdayLetter from "../components/BirthdayLetter.jsx";
import BirthdayCake from "../components/BirthdayCake.jsx";
import FinalSurprise from "../components/FinalSurprise.jsx";
import MusicPlayer from "../components/MusicPlayer.jsx";

export default function BirthdayPage() {
  function scrollToMemories() {
    document.getElementById("memories")?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <main className="birthday-page">
      <nav className="birthday-nav">
        <a href="#top" className="brand-mark">
          <span className="brand-heart">
            <Heart size={17} fill="currentColor" />
          </span>{" "}
          little things, big love
        </a>
        <div className="nav-links">
          <a href="#memories">Memories</a>
          <a href="#letter">A letter</a>
          <a href="#cake">Make a wish</a>
        </div>
        <MusicPlayer />
      </nav>
      <section className="birthday-hero" id="top">
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-pill">
            <Sparkles size={15} /> {birthdayConfig.heroEyebrow}
          </div>
          <p className="hero-overline">
            To my favorite person in the whole world
          </p>
          <h1>
            {birthdayConfig.heroTitle.split("beautiful")[0]}
            <span>beautiful.</span>
          </h1>
          <p className="hero-message">{birthdayConfig.heroMessage}</p>
          <button
            className="btn btn-primary main-button hero-button"
            onClick={scrollToMemories}
            type="button"
          >
            Open your surprise <Heart size={17} fill="currentColor" />
          </button>
          <button
            className="scroll-cue"
            onClick={scrollToMemories}
            type="button"
            aria-label="Scroll to memories"
          >
            <ArrowDown size={18} />
          </button>
        </motion.div>
        <div className="floating-heart heart-one" aria-hidden="true">
          ♡
        </div>
        <div className="floating-heart heart-two" aria-hidden="true">
          ♥
        </div>
        <div className="floating-star star-one" aria-hidden="true">
          ✦
        </div>
        <div className="floating-star star-two" aria-hidden="true">
          ✧
        </div>
        <div className="hero-bottom-note">
          A little page for a very special person <span>✦</span>
        </div>
      </section>
      <MemoryGallery />
      <BirthdayLetter />
      <BirthdayCake />
      <FinalSurprise />
    </main>
  );
}
