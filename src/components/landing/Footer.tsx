import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer style={{
      background: 'var(--ink)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Main grid */}
      <div style={{
        padding: '60px 56px 52px',
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr 1fr',
        gap: 48,
      }}>

        {/* Brand */}
        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 26, fontWeight: 900,
              letterSpacing: '0.04em', textTransform: 'uppercase',
              color: '#fff', lineHeight: 1.15,
              marginBottom: 16,
            }}>
              AI Literacy<br/>for Education
            </div>
          </Link>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14, lineHeight: 1.7,
            color: 'rgba(255,255,255,0.42)',
            margin: 0, maxWidth: 300,
          }}>
            A guided learning experience for students and teachers navigating AI — honestly, practically, and together.
          </p>
        </div>

        {/* Navigate */}
        <div>
          <div style={{
            fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)', marginBottom: 18,
          }}>Navigate</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {([['/', 'Home'], ['/student', 'Student perspective'], ['/teacher', 'Teacher perspective']] as [string, string][]).map(([path, label]) => (
              <Link key={path} to={path} style={{
                fontFamily: 'var(--font-ui)', fontSize: 13.5,
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                transition: 'color .15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* About */}
        <div>
          <div style={{
            fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)', marginBottom: 18,
          }}>About</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Art 477', 'University of Wisconsin–Parkside', 'Spring 2026'].map(item => (
              <span key={item} style={{
                fontFamily: 'var(--font-ui)', fontSize: 13.5,
                color: 'rgba(255,255,255,0.55)',
              }}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '18px 56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: 'var(--font-ui)', fontSize: 11,
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.02em',
        }}>
          © 2026 AI Literacy for Education
        </span>
        <span style={{
          fontFamily: 'var(--font-ui)', fontSize: 11,
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.02em',
        }}>
          Content generated with Claude Sonnet 4.6 · Research mode
        </span>
      </div>
    </footer>
  )
}
