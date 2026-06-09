'use client'

import { useEffect, useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { FORMSPREE_FORM_ID } from '@/lib/constants'

export type GameBugReportGame = 'Champions Draft' | 'Rugby Draft'

type GameBugReportProps = {
  game: GameBugReportGame
  context?: string
}

type ModalProps = GameBugReportProps & {
  onClose: () => void
}

function BugReportForm({ game, context, onClose }: ModalProps) {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID)
  const [pageUrl, setPageUrl] = useState('')
  const [userAgent, setUserAgent] = useState('')

  useEffect(() => {
    setPageUrl(window.location.href)
    setUserAgent(navigator.userAgent)
  }, [])

  if (state.succeeded) {
    return (
      <div className="px-5 py-8 text-center">
        <p className="text-3xl" aria-hidden="true">
          ✓
        </p>
        <p className="mt-3 font-bold text-white">Thanks — report sent.</p>
        <p className="mt-2 text-sm text-white/50">
          I&apos;ll look into it as soon as I can.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-white py-3 text-sm font-black uppercase tracking-widest text-black transition-colors hover:bg-white/90"
        >
          Close
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-5 py-5">
      <input type="hidden" name="_subject" value={`[Bug] ${game}`} />
      <input type="hidden" name="type" value="bug_report" />
      <input type="hidden" name="game" value={game} />
      <input type="hidden" name="page_url" value={pageUrl} />
      <input type="hidden" name="game_context" value={context ?? ''} />
      <input type="hidden" name="user_agent" value={userAgent} />

      <div>
        <label htmlFor={`bug-message-${game}`} className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
          What went wrong?
        </label>
        <textarea
          id={`bug-message-${game}`}
          name="message"
          required
          rows={4}
          autoFocus
          placeholder="e.g. Match froze after half time, wrong score shown..."
          className="w-full resize-y rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="mt-1.5 text-sm text-red-400"
        />
      </div>

      <div>
        <label htmlFor={`bug-email-${game}`} className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
          Email <span className="text-white/25">(optional)</span>
        </label>
        <input
          id={`bug-email-${game}`}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Only if you want a reply"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
        />
      </div>

      <ValidationError
        errors={state.errors}
        className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
      />

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full rounded-xl bg-white py-3.5 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-white/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.submitting ? 'Sending...' : 'Send report'}
      </button>
    </form>
  )
}

function BugReportModal({ game, context, onClose }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/75 px-0 backdrop-blur-sm sm:items-center sm:px-4"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-[#0e0e18] shadow-2xl sm:max-w-md sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-labelledby={`bug-report-title-${game}`}
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
              {game}
            </p>
            <h2
              id={`bug-report-title-${game}`}
              className="text-lg font-black uppercase tracking-tight text-white"
            >
              Report a bug
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg text-white/60 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <BugReportForm game={game} context={context} onClose={onClose} />
      </div>
    </div>
  )
}

export function GameBugReport({ game, context }: GameBugReportProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white/50 backdrop-blur transition-colors hover:border-white/30 hover:text-white sm:bottom-6 sm:right-6"
      >
        Report bug
      </button>

      {open && (
        <BugReportModal
          game={game}
          context={context}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

type InlineBugReportProps = GameBugReportProps & {
  className?: string
}

export function InlineGameBugReport({
  game,
  context,
  className = '',
}: InlineBugReportProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white/60 transition-all hover:border-white/25 hover:bg-white/[0.08] hover:text-white ${className}`}
      >
        <span>🐛</span>
        Report bug
      </button>

      {open && (
        <BugReportModal
          game={game}
          context={context}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
