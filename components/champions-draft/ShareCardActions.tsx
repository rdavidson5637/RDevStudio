'use client'
import { useState, useCallback } from 'react'
import { getShareUrl } from './shareHelpers'

interface Props {
  shareText: string
  shareTitle: string
  primaryClassName?: string
}

export default function ShareCardActions({
  shareText,
  shareTitle,
  primaryClassName = 'bg-emerald-400 text-black hover:bg-emerald-300',
}: Props) {
  const [copied, setCopied] = useState(false)
  const shareUrl = getShareUrl()

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }, [shareText])

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        })
        return
      } catch {
        // user cancelled or share failed
      }
    }
    handleCopy()
  }, [shareText, shareUrl, shareTitle, handleCopy])

  return (
    <div className="flex gap-2 mt-3">
      <button
        onClick={handleShare}
        className={`flex-1 py-3 font-black text-sm uppercase tracking-widest rounded-xl active:scale-95 transition-all ${primaryClassName}`}
      >
        Share
      </button>
      <button
        onClick={handleCopy}
        className="flex-1 py-3 bg-white/10 text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-white/20 border border-white/10 transition-all"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}
