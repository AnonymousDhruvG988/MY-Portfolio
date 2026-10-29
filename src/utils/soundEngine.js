/**
 * RETRO-FUTURISTIC WEB AUDIO SYNTHESIZER
 * 
 * Synthesizes analog mechanical clicks, temporal hums, diagnostic pings,
 * and chapter transition tones using the Web Audio API.
 * 
 * Sound is OFF BY DEFAULT to respect user privacy and accessibility.
 */

class TemporalSoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.masterGain = null;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.12, this.ctx.currentTime); // gentle volume
        this.masterGain.connect(this.ctx.destination);
      }
    } catch {
      // AudioContext not supported or blocked
    }
  }

  toggle(forceState) {
    if (forceState !== undefined) {
      this.enabled = forceState;
    } else {
      this.enabled = !this.enabled;
    }

    if (this.enabled && !this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended' && this.enabled) {
      this.ctx.resume();
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  // 1. Subtle analog mechanical tick (for dials, clock ticks, menu clicks)
  playMechanicalTick(pitch = 900) {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.03);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // Audio error suppressed
    }
  }

  // 2. High-frequency packet sonar ping (for Wireshark packet inspection & radar sweeps)
  playPacketPing(freq = 1400) {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.7, now + 0.08);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Ignored
    }
  }

  // 3. Temporal transition sweep (for scene transitions)
  playChapterTransition() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.25);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(1800, now + 0.15);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.28);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Ignored
    }
  }

  // 4. Boot initialization tone
  playBootChime() {
    if (!this.enabled || !this.ctx) return;
    try {
      const notes = [261.63, 329.63, 392.00, 523.25]; // C E G C
      notes.forEach((freq, idx) => {
        const now = this.ctx.currentTime + idx * 0.09;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.22);
      });
    } catch {
      // Ignored
    }
  }

  // 5. Easter egg system override chime
  playOverrideAlert() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(440, now);
      osc1.frequency.setValueAtTime(880, now + 0.1);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(554.37, now);
      osc2.frequency.setValueAtTime(1108.73, now + 0.1);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.36);
      osc2.stop(now + 0.36);
    } catch {
      // Ignored
    }
  }
}

export const sound = new TemporalSoundEngine();
