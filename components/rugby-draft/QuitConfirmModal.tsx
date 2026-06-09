'use client'

interface Props {
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function QuitConfirmModal({
  title,
  message,
  confirmLabel = 'Quit',
  cancelLabel = 'Keep Playing',
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-[#12121c] border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center">
        <h3 className="text-white font-black text-xl uppercase tracking-tight">
          {title}
        </h3>
        <p className="text-white/40 text-sm mt-2">{message}</p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-white/10 text-white font-bold text-sm uppercase tracking-wide hover:bg-white/20 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 font-bold text-sm uppercase tracking-wide hover:bg-red-500/30 transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
