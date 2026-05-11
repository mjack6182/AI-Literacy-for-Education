import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Props = { current: 'home' | 'student' | 'teacher' }

export function TopNav({ current }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`topnav-root ${scrolled ? 'topnav-scrolled' : ''}`}
      style={{
        position: 'sticky', top: 0, zIndex: 40,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px',
        background: 'var(--bg)',
        color: 'var(--text)',
        borderBottom: '1px solid transparent',
        height: 64,
        transition: 'border-color .25s, box-shadow .25s, background .25s',
      }}>

      {/* Brand mark */}
      <Link to="/" className="topnav-brand" style={{
        display: 'flex', alignItems: 'baseline', gap: 10,
        textDecoration: 'none', color: 'inherit',
        transition: 'opacity .15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 17,
          fontWeight: 900,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--text)',
          lineHeight: 1,
        }}>AI Literacy</span>
        <span style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.04em',
          color: 'var(--text-dim)',
          lineHeight: 1,
        }}>for Education</span>
      </Link>

      {/* Segmented nav */}
      <nav className="seg topnav-seg" aria-label="Personas">
        <Link to="/"><button className={current === 'home' ? 'on' : ''}>Home</button></Link>
        <Link to="/student"><button className={current === 'student' ? 'on' : ''}>Student</button></Link>
        <Link to="/teacher"><button className={current === 'teacher' ? 'on' : ''}>Teacher</button></Link>
      </nav>
    </header>
  )
}
