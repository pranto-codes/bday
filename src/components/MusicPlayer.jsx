import { useRef, useState } from 'react';
import { Music2, Pause, Play } from 'lucide-react';
import { birthdayConfig } from '../config/birthday.js';

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
      setUnavailable(false);
    } catch {
      setUnavailable(true);
      setPlaying(false);
    }
  }

  return (
    <div className="music-widget">
      <audio ref={audioRef} src={birthdayConfig.musicSrc} loop preload="none" onEnded={() => setPlaying(false)} onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} onError={() => setUnavailable(true)} />
      <button className="btn music-button" type="button" onClick={toggleMusic} aria-label={playing ? 'Pause background music' : 'Play background music'}>
        {playing ? <Pause size={17} /> : <Play size={17} />}
        <Music2 size={17} />
        <span>{playing ? 'Pause our song' : 'Play our song'}</span>
      </button>
      {unavailable && <span className="music-hint" role="status">Add your song at public/audio/our-song.mp3</span>}
    </div>
  );
}
