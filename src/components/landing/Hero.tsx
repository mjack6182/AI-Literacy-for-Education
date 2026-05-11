import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'

// The full headline text. PRIMARY_START/END mark where "how you" lives.
const FULL_TEXT    = "Understand\nhow it works\nhow you use it."
const PRIMARY_START = 24   // index of 'h' in "how you"
const PRIMARY_END   = 31   // index after 'w' in "how you"

function useTypewriter(text: string, speed = 32, delay = 1000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCount(c => {
          if (c >= text.length) { clearInterval(interval); return c }
          return c + 1
        })
      }, speed)
    }, delay)
    return () => { clearTimeout(timeout); clearInterval(interval) }
  }, [text.length, speed, delay])

  return count
}

function withBreaks(str: string): ReactNode[] {
  return str.split('\n').flatMap((line, i, arr) =>
    i < arr.length - 1 ? [line, <br key={i}/>] : [line]
  )
}

function TypedHeroText() {
  const count = useTypewriter(FULL_TEXT, 32, 1000)
  const typed = FULL_TEXT.slice(0, count)
  const done  = count >= FULL_TEXT.length

  const before = typed.slice(0, Math.min(count, PRIMARY_START))
  const mid    = count > PRIMARY_START ? typed.slice(PRIMARY_START, Math.min(count, PRIMARY_END)) : ''
  const after  = count > PRIMARY_END   ? typed.slice(PRIMARY_END) : ''

  return (
    <>
      {withBreaks(before)}
      {mid && <span style={{ color: 'var(--primary)' }}>{withBreaks(mid)}</span>}
      {after && withBreaks(after)}
      {!done && (
        <span className="type-cursor" style={{
          display: 'inline-block',
          width: 3,
          height: '0.72em',
          background: count >= PRIMARY_START && count < PRIMARY_END
            ? 'var(--primary)'
            : 'var(--text)',
          marginLeft: 4,
          verticalAlign: 'middle',
          borderRadius: 1,
        }}/>
      )}
    </>
  )
}

function ScrollCue() {
  return (
    <div style={{
      position: 'absolute',
      bottom: 36,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      animation: 'heroReveal 0.6s cubic-bezier(.22,1,.36,1) 1.1s both',
      zIndex: 2,
    }}>
      <span style={{
        fontFamily: 'var(--font-ui)',
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'var(--text-dim)',
      }}>Scroll</span>

      <div style={{
        width: 1,
        height: 48,
        background: 'var(--border)',
        borderRadius: 1,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          background: 'var(--primary)',
          borderRadius: 1,
          animation: 'scrollPill 1.6s cubic-bezier(.4,0,.2,1) 1.4s infinite',
        }}/>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section style={{
      position: 'relative',
      padding: '80px 80px 120px',
      minHeight: '92vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'var(--bg)',
    }}>

      {/* Bottom rule */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 80, right: 80,
        height: 1,
        background: 'linear-gradient(to right, transparent, var(--border), transparent)',
      }}/>

      <div style={{
        maxWidth: 860, margin: '0 auto', width: '100%',
        position: 'relative', zIndex: 1,
      }}>
        <div className="hero-enter" style={{ animationDelay: '0.15s' }}>
          <div style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--primary)',
            marginBottom: 28,
          }}>AI Literacy for Education</div>
        </div>

        {/* h1 has no hero-enter — the typewriter IS the entrance */}
        <h1 className="display" style={{
          margin: '0 0 28px',
          fontSize: 'clamp(52px, 7vw, 100px)',
          lineHeight: 0.93,
          color: 'var(--text)',
          letterSpacing: '-0.01em',
          fontWeight: 900,
          minHeight: '3em',  /* prevent collapse while empty */
        }}>
          <TypedHeroText />
        </h1>

        <p className="hero-enter" style={{
          margin: 0, fontSize: 17, lineHeight: 1.68,
          color: 'var(--text-muted)', maxWidth: 520,
          animationDelay: '0.37s',
        }}>
          A guided learning experience that meets you where you are. Explore AI concepts, tools, and real-world impact — tailored to your perspective.
        </p>
      </div>

      <ScrollCue />
    </section>
  )
}
