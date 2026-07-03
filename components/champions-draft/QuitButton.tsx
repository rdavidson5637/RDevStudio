"use client";

interface Props {
  onQuit: () => void;
  className?: string;
  label?: string;
}

export default function QuitButton({
  onQuit,
  className = "",
  label = "← Quit",
}: Props) {
  return (
    <button
      onClick={onQuit}
      className={`text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors ${className}`}
    >
      {label}
    </button>
  );
}
