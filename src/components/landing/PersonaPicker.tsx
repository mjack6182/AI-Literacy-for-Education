import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './PersonaPicker.css'

type PersonaCardProps = { to: string; role: string; tagline: string; illo: string; delay: string }

function PersonaCard({ to, role, tagline, illo, delay }: PersonaCardProps) {
  return (
    <Link
      to={to}
      className="reveal"
      style={{
        display: 'flex', flexDirection: 'column',
        background: 'var(--surface)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        padding: '40px 36px 32px',
        transition: 'transform .22s cubic-bezier(.34,1.2,.64,1), box-shadow .22s, border-color .2s, opacity 0.55s, transform 0.55s',
        color: 'var(--text)',
        textDecoration: 'none',
        transitionDelay: delay,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = '0 24px 56px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,173,147,0.3), 0 0 40px rgba(201,173,147,0.1)'
        el.style.borderColor = 'rgba(201,173,147,0.4)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.transform = ''
        el.style.boxShadow = ''
        el.style.borderColor = 'rgba(255,255,255,0.07)'
      }}
    >
      <div style={{ height: 260, display: 'grid', placeItems: 'center', marginBottom: 24 }}>
        <img src={illo} alt="" className="float" style={{ maxHeight: 260, width: 'auto', maxWidth: '100%' }}/>
      </div>
      <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-ui)', fontSize: 26, fontWeight: 700, color: 'var(--text)' }}>{role}</h3>
      <p style={{ margin: '0 0 28px', fontSize: 16, color: 'var(--text-muted)' }}>{tagline}</p>
      <div><span className="btn solid">Learn More</span></div>
    </Link>
  )
}

export function PersonaPicker() {
  const headRef = useScrollReveal<HTMLDivElement>()
  const gridRef = useScrollReveal<HTMLDivElement>({ threshold: 0.05 })

  return (
    <section className="persona-picker" style={{ padding: '120px 80px 140px', background: 'var(--bg-2)', textAlign: 'center' }}>
      <div ref={headRef} className="reveal">
        <h2 className="display" style={{
          fontSize: 'clamp(32px, 3.4vw, 48px)', margin: '0 auto 64px',
          maxWidth: 900, lineHeight: 1.2, color: 'var(--text)',
        }}>
          Want more information?<br/>Pick your educational perspective.
        </h2>
      </div>

      <div ref={gridRef} className="persona-picker-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, maxWidth: 1100, margin: '0 auto' }}>
        <PersonaCard to="/student" role="Student" tagline="Learn more as a Student" illo="/assets/learning.svg" delay="0s"/>
        <PersonaCard to="/teacher" role="Teacher" tagline="Learn more as a Teacher" illo="/assets/professor.svg" delay="0.1s"/>
      </div>
    </section>
  )
}
