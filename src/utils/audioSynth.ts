/**
 * Pure Web Audio API synthesized romantic music & sound effects.
 * Zero external asset dependencies - guaranteed to play in modern browsers
 * once the user interacts with the page.
 */

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private volume = 0.4;
  private melodyInterval: number | null = null;
  private masterGain: GainNode | null = null;

  // Gentle pentatonic / romantic chord arpeggios (C major / A minor / F major / G major)
  private chords = [
    // Cmaj7 (C4, E4, G4, B4, D5)
    [261.63, 329.63, 392.00, 493.88, 587.33],
    // Am9 (A3, C4, E4, G4, B4)
    [220.00, 261.63, 329.63, 392.00, 493.88],
    // Fmaj7 (F3, A3, C4, E4, G4)
    [174.61, 220.00, 261.63, 329.63, 392.00],
    // Gsus4 -> G (G3, C4, D4, G4, B4)
    [196.00, 261.63, 293.66, 392.00, 493.88]
  ];

  private currentChordIndex = 0;
  private noteIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getVolume(): number {
    return this.volume;
  }

  public startMusic() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    if (this.melodyInterval) {
      window.clearInterval(this.melodyInterval);
    }

    // Play next note every 380ms to create a gentle, lullaby-like arpeggiated music box flow
    this.melodyInterval = window.setInterval(() => {
      this.playNextArpeggioNote();
    }, 420);
  }

  public stopMusic() {
    this.isPlaying = false;
    if (this.melodyInterval) {
      window.clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }
  }

  public toggleMusic(): boolean {
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  private playNextArpeggioNote() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const chord = this.chords[this.currentChordIndex];
    // Pattern: 0, 1, 2, 3, 4, 3, 2, 1
    const pattern = [0, 2, 1, 3, 2, 4, 3, 1];
    const freq = chord[pattern[this.noteIndex % pattern.length]];

    this.playTone(freq, 0.9, 'sine', 0.22);

    // Occasionally add a soft sub-harmonic bell for warmth
    if (this.noteIndex % 4 === 0) {
      this.playTone(chord[0] * 0.5, 1.4, 'triangle', 0.15);
    }

    this.noteIndex++;
    if (this.noteIndex >= pattern.length * 2) {
      this.noteIndex = 0;
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
    }
  }

  private playTone(freq: number, duration: number, type: OscillatorType = 'sine', gainLevel = 0.2) {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    // Warm soft envelope: quick smooth attack, gradual exponential decay
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(gainLevel * (this.isMuted ? 0 : 1), now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  /** Sound Effect: Sparkling chime when a petal is collected */
  public playPetalCollectSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.45, 'sine', 0.18);
      }, idx * 70);
    });
  }

  /** Sound Effect: Heart sparkle burst on Rose Hug */
  public playHugChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const notes = [440, 554.37, 659.25, 880, 1108.73]; // A major sparkle
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.6, 'triangle', 0.16);
      }, idx * 80);
    });
  }

  /** Sound Effect: Romantic envelope open */
  public playEnvelopeOpenSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const notes = [329.63, 392.00, 523.25, 659.25]; // E4, G4, C5, E5
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.7, 'sine', 0.15);
      }, idx * 90);
    });
  }

  /** Sound Effect: Sparkling chime when a firefly is touched */
  public playFireflyChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const notes = [880, 1046.50, 1318.51]; // High starlight ping A5, C6, E6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.25, 'sine', 0.12);
      }, idx * 60);
    });
  }

  /** Sound Effect: When a rose blooms softly */
  public playBloomChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const notes = [392.00, 493.88, 587.33, 659.25, 783.99]; // G4, B4, D5, E5, G5
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.5, 'sine', 0.14);
      }, idx * 65);
    });
  }
}

export const romanticAudio = new RomanticAudioSynthesizer();
