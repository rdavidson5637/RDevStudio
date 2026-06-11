let audioContext: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioContext();
  }

  return audioContext;
}

function playTone(frequency: number, durationMs: number, volume = 0.08): void {
  const context = getContext();
  if (!context) {
    return;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gain.gain.value = volume;

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start();
  oscillator.stop(context.currentTime + durationMs / 1000);
}

export function playCorrectSound(): void {
  playTone(523, 120);
  window.setTimeout(() => playTone(659, 150), 100);
}

export function playWrongSound(): void {
  playTone(220, 200, 0.06);
}

export function playRevealSound(): void {
  playTone(440, 100);
  window.setTimeout(() => playTone(554, 100), 80);
  window.setTimeout(() => playTone(659, 140), 160);
}
