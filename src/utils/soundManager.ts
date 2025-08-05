class SoundManager {
  private sounds: Record<string, HTMLAudioElement> = {};
  private enabled: boolean = true;

  constructor() {
    this.initializeSounds();
  }

  private initializeSounds() {
    // Create simple synthetic sounds using Web Audio API
    this.createTone('move', 200, 0.1, 'square');
    this.createTone('rotate', 300, 0.1, 'square');
    this.createTone('drop', 150, 0.2, 'sawtooth');
    this.createTone('line', 400, 0.3, 'sine');
    this.createTone('gameover', 100, 1, 'triangle');
  }

  private createTone(name: string, frequency: number, duration: number, waveType: OscillatorType) {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const createSound = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = waveType;
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    };

    this.sounds[name] = { play: createSound } as any;
  }

  play(soundName: string) {
    if (this.enabled && this.sounds[soundName]) {
      try {
        this.sounds[soundName].play();
      } catch (error) {
        // Silently handle audio errors
      }
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }
}

export const soundManager = new SoundManager();