import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarHeart, Heart, LockKeyhole, Sparkles } from "lucide-react";
import { birthdayConfig } from "../config/birthday.js";
import BirthdayPage from "../pages/BirthdayPage.jsx";

import { DEV_PREVIEW } from "../config/birthday.js";

function getTimeLeft() {
  const [year, month, day] = birthdayConfig.birthdayDate.split("-").map(Number);
  const now = new Date();
  const target = new Date(year, month - 1, day, 0, 0, 0, 0);
  const difference = target.getTime() - now.getTime();
  if (!Number.isFinite(difference) || !birthdayConfig.birthdayDate)
    return { invalid: true };
  if (difference <= 0) return { unlocked: true };
  return {
    unlocked: false,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
}

export default function BirthdayGate() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (time.unlocked || DEV_PREVIEW) {
    return <BirthdayPage />;
  }

  return (
    <main className="waiting-page dreamy-background">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <motion.section
        className="waiting-card glass-card"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="lock-orbit">
          <span className="orbit-dot">✦</span>
          <LockKeyhole size={27} />
          <span className="orbit-heart">♥</span>
        </div>
        <p className="eyebrow">
          <Sparkles size={15} /> A LITTLE SURPRISE IS WAITING
        </p>
        <h1>
          Wait a little,
          <br />
          <span>my love...</span>
        </h1>
        <p className="waiting-copy">{birthdayConfig.waitingMessage}</p>
        <div
          className="countdown-grid"
          aria-label="Time remaining until the birthday surprise unlocks"
        >
          {time.invalid ? (
            <p>
              Please set a valid birthday date in{" "}
              <code>src/config/birthday.js</code>.
            </p>
          ) : (
            [
              ["Days", time.days],
              ["Hours", time.hours],
              ["Minutes", time.minutes],
              ["Seconds", time.seconds],
            ].map(([label, value]) => (
              <div className="time-tile" key={label}>
                <strong>{String(value).padStart(2, "0")}</strong>
                <span>{label}</span>
              </div>
            ))
          )}
        </div>
        <div className="wait-note">
          <Heart size={17} fill="currentColor" />
          <span>Come back when the countdown reaches zero.</span>
          <Heart size={17} fill="currentColor" />
        </div>
        <div className="date-chip">
          <CalendarHeart size={16} /> Your surprise opens on October 20
        </div>
        <p className="made-with-love">
          Made with love, only for you <span>♥</span>
        </p>
      </motion.section>
    </main>
  );
}
