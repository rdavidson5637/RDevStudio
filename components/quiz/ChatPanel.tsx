"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import { PlayerAvatar } from "@/components/quiz/PlayerAvatar";
import type { ChatMessage, Player } from "@/lib/quiz/types";

interface ChatPanelProps {
  messages: ChatMessage[];
  gameId: string;
  playerId: string;
  currentPlayer: Player;
  isOpen: boolean;
  onClose: () => void;
}

function formatMessageTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function ChatPanel({
  messages,
  gameId,
  playerId,
  currentPlayer,
  isOpen,
  onClose,
}: ChatPanelProps) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  async function handleSend(event?: FormEvent) {
    event?.preventDefault();

    const trimmed = text.trim();

    if (!trimmed || sending) {
      return;
    }

    setSending(true);

    try {
      const response = await fetch("/api/quiz/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId, playerId, text: trimmed }),
      });

      if (response.ok) {
        setText("");
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:bg-black/20 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        className={`fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-sm flex-col border-l border-quiz-border bg-quiz-bg shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <header className="flex items-center justify-between border-b border-quiz-border px-4 py-4">
          <div>
            <h2 className="font-serif text-xl text-white">Quiz Chat</h2>
            <p className="text-xs text-quiz-muted">Banter between rounds</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-sm text-quiz-muted hover:bg-white/5 hover:text-white"
          >
            Close
          </button>
        </header>

        <div
          ref={listRef}
          className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
        >
          {messages.length === 0 ? (
            <p className="text-center text-sm text-quiz-muted">
              Say hi to your mates 👋
            </p>
          ) : (
            messages.map((message) => {
              const player: Player = {
                id: message.playerId,
                name: message.playerName,
                colour: message.playerColour,
                avatar: message.playerAvatar,
                score: 0,
                answers: [],
              };

              return (
                <div key={message.id} className="flex gap-3">
                  <PlayerAvatar player={player} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="truncate text-sm font-semibold"
                        style={{ color: message.playerColour }}
                      >
                        {message.playerName}
                      </span>
                      <span className="shrink-0 text-xs text-quiz-muted">
                        {formatMessageTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="mt-0.5 break-words text-sm text-white">
                      {message.text}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <form
          onSubmit={(event) => void handleSend(event)}
          className="border-t border-quiz-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              maxLength={120}
              placeholder={`Chat as ${currentPlayer.name}...`}
              disabled={sending}
              className="quiz-input flex-1 text-sm"
            />
            <button
              type="submit"
              disabled={sending || !text.trim()}
              className="quiz-btn-primary shrink-0 px-4 py-3 text-sm"
            >
              Send
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}
