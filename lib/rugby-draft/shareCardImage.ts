import { toBlob } from 'html-to-image'

export async function captureElementAsPng(element: HTMLElement): Promise<Blob> {
  const blob = await toBlob(element, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: '#0a0a12',
  })

  if (!blob) {
    throw new Error('Failed to capture share card image')
  }

  return blob
}

export function downloadImageBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export async function shareImageBlob(
  blob: Blob,
  filename: string,
  title: string
): Promise<boolean> {
  const file = new File([blob], filename, { type: 'image/png' })

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file], title })
    return true
  }

  return false
}
