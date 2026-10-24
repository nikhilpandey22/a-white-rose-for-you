import { useState } from 'react';
import { OpeningGardenScreen } from './components/OpeningGardenScreen';
import { WhiteRoseGarden } from './components/WhiteRoseGarden';
import { romanticAudio } from './utils/audioSynth';

export default function App() {
  const [isInGarden, setIsInGarden] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Girlfriend nickname and sender
  const nickname = "Pakode Jaise Naak";
  const senderName = "Nikhil";

  const handleStartMusic = () => {
    romanticAudio.startMusic();
    setIsMusicPlaying(true);
  };

  const handleToggleMusic = () => {
    const nextPlaying = romanticAudio.toggleMusic();
    setIsMusicPlaying(nextPlaying);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    romanticAudio.setMuted(nextMuted);
    setIsMuted(nextMuted);
  };

  const handleRestart = () => {
    setIsInGarden(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0F0813] text-[#FFFDF8] overflow-hidden select-none">
      {!isInGarden ? (
        <OpeningGardenScreen
          onEnterGarden={() => setIsInGarden(true)}
          isMusicPlaying={isMusicPlaying}
          onStartMusic={handleStartMusic}
        />
      ) : (
        <WhiteRoseGarden
          nickname={nickname}
          senderName={senderName}
          isMusicPlaying={isMusicPlaying}
          isMuted={isMuted}
          onToggleMusic={handleToggleMusic}
          onToggleMute={handleToggleMute}
          onRestartExperience={handleRestart}
        />
      )}
    </div>
  );
}
