import { useEffect, useRef, useState } from 'react'

const stats = [
  { target: 86, label: 'of students globally use AI in their studies', source: 'Ellucian · Thesify Survey, 2025' },
  { target: 96, label: 'of instructors believe students have cheated with AI', source: 'Wiley Academic Integrity Survey, 2024' },
  { target: 39, label: 'of institutions have a formal AI policy in place', source: 'EDUCAUSE Action Plan, 2024' },
  { target: 42, label: 'of students feel faculty are equipped to guide AI use', source: 'Ellucian Survey, 2025' },
]

function StatCard({ target, label, source, index, triggered }: {
  target: number; label: string; source: string; index: number; triggered: boolean
}) {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (!triggered) return
    const duration = 1200
    const delay = index * 100
    let rafId: number

    const tick = (now: number) => {
      const elapsed = now - (startAt)
      if (elapsed < 0) { rafId = requestAnimationFrame(tick); return }
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(Math.round(eased * target))
      if (progress < 1) rafId = requestAnimationFrame(tick)
    }

    let startAt: number
    rafId = requestAnimationFrame((now) => {
      startAt = now + delay
      rafId = requestAnimationFrame(tick)
    })

    return () => cancelAnimationFrame(rafId)
  }, [triggered, target, index])

  return (
    <div style={{
      padding: '44px 32px 40px',
      borderRight: index < stats.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(40px, 4vw, 56px)',
        fontWeight: 900,
        lineHeight: 1,
        color: 'var(--primary)',
        marginBottom: 14,
        letterSpacing: '-0.02em',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {displayed}%
      </div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        lineHeight: 1.55,
        color: 'rgba(255,255,255,0.62)',
        marginBottom: 12,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'var(--font-ui)',
        fontSize: 11,
        color: 'rgba(255,255,255,0.5)',
      }}>
        {source}
      </div>
    </div>
  )
}

export function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div style={{ background: 'var(--ink)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div
        ref={ref}
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '0 56px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        {stats.map((s, i) => (
          <StatCard key={i} index={i} triggered={triggered} {...s} />
        ))}
      </div>
    </div>
  )
}
