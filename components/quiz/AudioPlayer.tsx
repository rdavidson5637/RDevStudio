"use client";

import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  audioUrl: string;
  autoPlay?: boolean;
  onPlay?: () => void;
  onError?: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function AudioPlayer({
  audioUrl,
  autoPlay = false,
  onPlay,
  onError,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    audio.preload = "metadata";
    audio.loop = false;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration);
      }
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
    };
    const onAudioError = () => {
      setErrored(true);
      setPlaying(false);
      onError?.();
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onAudioError);

    if (autoPlay) {
      void audio.play().then(() => {
        setPlaying(true);
        onPlay?.();
      }).catch(() => {
        setErrored(true);
        setPlaying(false);
        onError?.();
      });
    }

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onAudioError);
      audioRef.current = null;
    };
  }, [audioUrl, autoPlay, onPlay, onError]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio || errored) {
      return;
    }

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    void audio.play().then(() => {
      setPlaying(true);
      onPlay?.();
    }).catch(() => {
      setErrored(true);
      setPlaying(false);
      onError?.();
    });
  }

  if (errored) {
    return (
      <div className="mb-8 rounded-2xl border border-quiz-border bg-quiz-surface px-6 py-8 text-center">
        <p className="text-sm text-quiz-muted">Audio unavailable</p>
        <p className="mt-1 text-xs text-quiz-muted">
          Answer from the question text instead
        </p>
      </div>
    );
  }

  return (
    <div className="audio-player-frame mb-8 rounded-2xl border border-quiz-music/30 bg-quiz-music/5 px-6 py-8">
      <p className="mb-5 text-center text-sm font-medium text-quiz-music">
        Play to hear the clip
      </p>

      <div className="flex flex-col items-center gap-5">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-quiz-amber text-2xl font-bold text-quiz-bg shadow-lg transition-transform hover:scale-105 active:scale-95"
          aria-label={playing ? "Pause clip" : "Play clip"}
        >
          {playing ? "❚❚" : "▶"}
        </button>

        <div className="w-full max-w-sm space-y-2">
          <div className="h-2 overflow-hidden rounded-full bg-quiz-bg">
            <div
              className="h-full rounded-full bg-quiz-amber transition-[width] duration-150"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-quiz-muted">
            <span>{formatTime(progress * duration)}</span>
            <span>{duration ? formatTime(duration) : "—"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
