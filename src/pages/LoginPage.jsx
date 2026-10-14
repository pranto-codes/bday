import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Heart,
  LockKeyhole,
  Sparkles,
  CalendarHeart,
} from "lucide-react";
import { birthdayConfig } from "../config/birthday.js";

function getTimeLeft() {
  // October 20, 2026, at midnight in the visitor's local timezone
  const target = new Date(2026, 9, 20, 0, 0, 0, 0);
  const difference = target.getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    completed: false,
  };
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (
      username.trim() === birthdayConfig.loginUsername &&
      password === birthdayConfig.loginPassword
    ) {
      sessionStorage.setItem("birthday-authenticated", "yes");
      navigate("/birthday");
    } else {
      setError("Hmm, that does not look quite right. Try again, sweetheart.");
    }
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <main className="login-page dreamy-background">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <motion.section
        className="login-card glass-card"
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <div className="login-heart">
          <Heart size={30} fill="currentColor" />
        </div>

        <p className="eyebrow">
          <Sparkles size={15} /> JUST BETWEEN US
        </p>

        <h1>{birthdayConfig.loginTitle}</h1>
        <p className="muted intro-copy">{birthdayConfig.loginMessage}</p>

        {/* Birthday countdown */}
        <div className="birthday-countdown">
          <p className="countdown-heading">
            <CalendarHeart size={17} />
            {timeLeft.completed
              ? "It's your special day!"
              : "Counting down to your special day"}
          </p>

          <div className="countdown-grid">
            {timeUnits.map(({ label, value }) => (
              <div className="time-tile" key={label}>
                <strong>{String(value).padStart(2, "0")}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <p className="countdown-date">
            <Heart size={13} fill="currentColor" />
            October 20 · A little surprise is waiting
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label className="form-control w-full gap-2">
            <span className="label-text">Your special username</span>
            <input
              className="input input-bordered custom-input"
              type="text"
              autoComplete="username"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setError("");
              }}
              required
            />
          </label>

          <label className="form-control w-full gap-2">
            <span className="label-text">The secret password</span>
            <span className="password-wrap">
              <input
                className="input input-bordered custom-input"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                required
              />

              <button
                className="password-toggle"
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button className="btn btn-primary main-button" type="submit">
            <LockKeyhole size={17} />
            Open my little secret
          </button>
        </form>

        <p className="login-footer">
          <Heart size={14} fill="currentColor" />
          Made with love, only for you
        </p>
      </motion.section>

      <p className="page-note">
        A tiny surprise is waiting on the other side ✦
      </p>
    </main>
  );
}
