import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

export const Icon = {
  ArrowRight: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Check: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" width="16" height="16" {...p}>
      <path d="M5 12l5 5 9-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Chevron: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" width="16" height="16" {...p}>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Search: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" width="16" height="16" {...p}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Book: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" width="16" height="16" {...p}>
      <path d="M4 4h7a3 3 0 0 1 3 3v14H7a3 3 0 0 1-3-3V4z" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M20 4h-7a3 3 0 0 0-3 3v14h7a3 3 0 0 0 3-3V4z" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  External: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" width="14" height="14" {...p}>
      <path d="M14 4h6v6M20 4l-9 9M10 6H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Warn: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18" {...p}>
      <path d="M12 4l9 16H3L12 4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M12 10v5M12 18v.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Sparkle: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" width="16" height="16" {...p}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
}
