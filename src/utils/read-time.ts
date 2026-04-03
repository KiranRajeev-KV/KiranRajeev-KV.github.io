export function calculateReadTime(text: unknown): string {
  if (typeof text !== 'string') {
    return ''
  }
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return minutes <= 0 ? '' : `${minutes} min`
}
