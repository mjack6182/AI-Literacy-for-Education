import { useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ContentBlock } from '../shared/ContentBlock'
import { Icon } from '../shared/Icon'
import type { Block, PersonaContent, SectionMeta } from '../../data/content'
import './PersonaShell.css'


type Props = {
  persona: 'student' | 'teacher'
  content: PersonaContent
  sections: SectionMeta[]
}

export function PersonaShell({ persona, content, sections }: Props) {
  const storageKey = `persona-${persona}-section`
  const [activeSection, setActiveSection] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return (saved && content[saved]) ? saved : null
    } catch { return null }
  })

  const pick = (id: string) => {
    setActiveSection(id)
    try { localStorage.setItem(storageKey, id) } catch { /* noop */ }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`persona-${persona}`}>
      <div className="persona-layout" style={{ background: 'var(--bg)' }}>
        <Sidebar persona={persona} sections={sections} activeId={activeSection} onPick={pick}/>
        <main className="persona-main" style={{ flex: 1, minWidth: 0, minHeight: '100vh' }}>
          {activeSection
            ? <SectionView sectionId={activeSection} content={content} sections={sections} onPick={pick}/>
            : <Welcome persona={persona} content={content} sections={sections} onPick={pick}/>
          }
        </main>
      </div>
    </div>
  )
}

/* ---- Sidebar ---- */
function Sidebar({ persona, sections, activeId, onPick }: {
  persona: string; sections: SectionMeta[]; activeId: string | null; onPick: (id: string) => void
}) {
  const [search, setSearch] = useState('')
  const q = search.trim().toLowerCase()
  const filtered = sections.filter(s => !q || s.label.toLowerCase().includes(q))

  return (
    <aside className="persona-sidebar" style={{
      width: 260, flexShrink: 0,
      background: 'var(--ink)', color: '#fff',
      minHeight: '100vh',
      position: 'sticky', top: 0, maxHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      boxShadow: '2px 0 4px rgba(0,0,0,0.12)',
    }}>

      {/* Top nav strip */}
      <div style={{
        padding: '20px 20px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        flexShrink: 0,
      }}>
        <Link to="/" style={{
          display: 'block',
          fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 900,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.75)',
          textDecoration: 'none',
          lineHeight: 1.25,
          marginBottom: 12,
          transition: 'color .15s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)' }}>
          AI Literacy<br/>for Education
        </Link>

        <div style={{
          display: 'inline-flex', gap: 1,
          padding: 3,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 6,
        }}>
          {([['/', 'Home'], ['/student', 'Student'], ['/teacher', 'Teacher']] as [string, string][]).map(([path, label]) => {
            const on = path === `/${persona}`
            return (
              <Link key={path} to={path} style={{
                display: 'block',
                padding: '4px 9px',
                fontFamily: 'var(--font-ui)', fontSize: 11.5, fontWeight: on ? 600 : 400,
                color: on ? '#fff' : 'rgba(255,255,255,0.45)',
                borderRadius: 4,
                background: on ? 'rgba(255,255,255,0.1)' : 'transparent',
                boxShadow: on ? '0 1px 4px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)' : 'none',
                transition: 'color .12s, background .12s',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (!on) (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)' }}
              onMouseLeave={e => { if (!on) (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)' }}>
                {label}
              </Link>
            )
          })}
        </div>
      </div>

      <div style={{ padding: '24px 24px 16px' }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>
          You are a
        </div>
        <div className="display" style={{ fontSize: 34, color: '#fff', lineHeight: 1.1 }}>
          {persona === 'student' ? 'Student' : 'Teacher'}
        </div>
      </div>

      <div style={{ padding: '0 16px 14px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '9px 12px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 8, color: 'rgba(255,255,255,0.6)',
        }}>
          <Icon.Search/>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search topics…"
            style={{
              background: 'transparent', border: 'none', outline: 'none',
              color: '#fff', fontFamily: 'var(--font-ui)', fontSize: 13, flex: 1, minWidth: 0,
            }}
          />
        </div>
      </div>

      <div style={{ padding: '8px 24px 10px', fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        Topics
      </div>

      <nav className="persona-sidebar-nav" style={{ flex: 1, overflow: 'auto', padding: '0 12px 20px' }}>
        {filtered.map((s, i) => {
          const active = s.id === activeId
          return (
            <button
              key={s.id}
              onClick={() => onPick(s.id)}
              aria-current={active ? 'page' : undefined}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px 10px 16px', marginBottom: 2, borderRadius: 6,
                textAlign: 'left', fontFamily: 'var(--font-ui)', fontSize: 13.5,
                fontWeight: active ? 600 : 400,
                color: active ? '#fff' : 'rgba(255,255,255,0.75)',
                background: active ? 'var(--primary-subtle)' : 'transparent',
                border: active ? '1px solid var(--primary-dim)' : '1px solid transparent',
                transition: 'background .15s, color .15s, border-color .15s',
                position: 'relative',
              }}
              onMouseEnter={e => { if (!active) { const el = e.currentTarget; el.style.background = 'rgba(255,255,255,0.06)'; el.style.color = '#fff'; } }}
              onMouseLeave={e => { if (!active) { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = 'rgba(255,255,255,0.75)'; } }}
            >
              {/* Animated left accent bar */}
              {active && (
                <span style={{
                  position: 'absolute', left: 0, top: '20%', bottom: '20%',
                  width: 3, borderRadius: 2, background: 'var(--primary)',
                  animation: 'barSlideIn 0.2s cubic-bezier(.22,1,.36,1) both',
                }}/>
              )}
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: active ? 'var(--primary)' : 'rgba(255,255,255,0.4)', width: 16, flexShrink: 0 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ flex: 1 }}>{s.label}</span>
              {active && <Icon.Chevron style={{ opacity: 0.7 }}/>}
            </button>
          )
        })}
      </nav>

    </aside>
  )
}

/* ---- Scroll-reveal chat message wrapper ---- */
function ChatMessage({ role, children, topMargin }: {
  role: 'user' | 'ai'
  children: ReactNode
  topMargin: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (visible) return
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.05, rootMargin: '0px 0px -32px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [visible])

  return (
    <div
      ref={ref}
      style={{
        marginTop: topMargin,
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'none'
          : role === 'user'
            ? 'translateX(22px) translateY(8px)'
            : 'translateX(-16px) translateY(8px)',
        transition: 'opacity 0.48s cubic-bezier(.22,1,.36,1), transform 0.48s cubic-bezier(.22,1,.36,1)',
      }}
    >
      {children}
    </div>
  )
}

/* ---- AI avatar with tooltip ---- */
function AiAvatar() {
  const [tip, setTip] = useState(false)
  return (
    <div
      style={{ position: 'relative', flexShrink: 0 }}
      onMouseEnter={() => setTip(true)}
      onMouseLeave={() => setTip(false)}
    >
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: 'var(--surface)', border: '1px solid var(--border)',
        display: 'grid', placeItems: 'center',
        color: 'var(--primary)', marginTop: 6, cursor: 'default',
      }}>
        <Icon.Sparkle width={12} height={12}/>
      </div>
      {tip && (
        <div style={{
          position: 'absolute',
          right: 'calc(100% + 8px)', top: 8,
          background: 'var(--ink)',
          color: '#F3F1EE',
          fontFamily: 'var(--font-ui)',
          fontSize: 11,
          lineHeight: 1.4,
          padding: '5px 10px',
          borderRadius: 6,
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          zIndex: 10,
          pointerEvents: 'none',
          letterSpacing: '0.01em',
        }}>
          Claude Sonnet 4.6 · Research mode
        </div>
      )}
    </div>
  )
}

/* ---- Section view (conversation layout) ---- */
type AiContent =
  | { kind: 'text';  text: string }
  | { kind: 'block'; block: Block }

type ConvItem =
  | { role: 'user'; text: string;         itemKey: string }
  | { role: 'ai';   contents: AiContent[]; itemKey: string }

function SectionView({ sectionId, content, sections, onPick }: {
  sectionId: string; content: PersonaContent; sections: SectionMeta[]; onPick: (id: string) => void
}) {
  const sec = content[sectionId]
  const label = sections.find(s => s.id === sectionId)?.label
  if (!sec) return null
  const idx = sections.findIndex(s => s.id === sectionId)
  const prev = sections[idx - 1]
  const next = sections[idx + 1]

  // Group blocks into conversation turns.
  // An 'h' block starts a new user message; everything else accumulates into one AI bubble.
  const items: ConvItem[] = []
  items.push({ role: 'user', text: sec.question, itemKey: 'question' })

  let aiBuffer: AiContent[] = []
  if (sec.intro) aiBuffer.push({ kind: 'text', text: sec.intro })

  sec.blocks.forEach((block, j) => {
    if (block.type === 'h') {
      if (aiBuffer.length > 0) {
        items.push({ role: 'ai', contents: aiBuffer, itemKey: `ai-${j}` })
        aiBuffer = []
      }
      items.push({ role: 'user', text: block.text, itemKey: `user-h-${j}` })
    } else {
      aiBuffer.push({ kind: 'block', block })
    }
  })
  if (aiBuffer.length > 0) {
    items.push({ role: 'ai', contents: aiBuffer, itemKey: 'ai-end' })
  }

  return (
    <article className="slide-in-right persona-article" key={sectionId} style={{ maxWidth: 800, margin: '0 auto', padding: '56px 48px 80px' }}>

      {/* Section marker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
        <div style={{ flex: 1, height: 1, background: 'var(--border-soft)' }}/>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.16em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          {String(idx + 1).padStart(2, '0')} · {label}
        </span>
        <div style={{ flex: 1, height: 1, background: 'var(--border-soft)' }}/>
      </div>

      {/* Conversation thread */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((item, msgIdx) => {
          const topMargin = msgIdx === 0 ? 0 : 36

          if (item.role === 'user') {
            return (
              <ChatMessage key={item.itemKey} role="user" topMargin={topMargin}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingLeft: 80 }}>
                  <div style={{
                    padding: '11px 17px',
                    background: 'var(--primary)',
                    borderRadius: '18px 18px 4px 18px',
                    color: '#0C0A08', fontSize: 15, lineHeight: 1.55,
                    fontFamily: 'var(--font-body)',
                    boxShadow: '0 4px 24px var(--primary-soft)',
                  }}>{item.text}</div>
                </div>
              </ChatMessage>
            )
          }

          return (
            <ChatMessage key={item.itemKey} role="ai" topMargin={topMargin}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', paddingRight: 60 }}>
                <AiAvatar/>
                <div className="chat-bubble-content" style={{
                  flex: 1,
                  padding: '13px 17px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px 18px 18px 18px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                }}>
                  {item.contents.map((c, ci) =>
                    c.kind === 'text'
                      ? <p key={ci} style={{ margin: '0 0 16px', fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', fontWeight: 300 }}>{c.text}</p>
                      : <ContentBlock key={ci} block={c.block}/>
                  )}
                </div>
              </div>
            </ChatMessage>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="persona-section-nav" style={{ marginTop: 52, paddingTop: 28, borderTop: '1px solid var(--border-soft)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {prev && <NavLink dir="prev" label={prev.label} question={content[prev.id]?.question} onClick={() => onPick(prev.id)}/>}
        {next && <NavLink dir="next" label={next.label} question={content[next.id]?.question} onClick={() => onPick(next.id)}/>}
      </div>
    </article>
  )
}


function NavLink({ dir, label, question, onClick }: {
  dir: 'prev' | 'next'; label: string; question?: string; onClick: () => void
}) {
  if (dir === 'prev') {
    return (
      <button
        onClick={onClick}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-ui)', fontSize: 12,
          color: 'var(--text-dim)', padding: '4px 0',
          transition: 'color .15s', alignSelf: 'flex-start',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-dim)' }}
      >
        <span style={{ fontSize: 14 }}>←</span>
        <span style={{ maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {label}
        </span>
      </button>
    )
  }

  /* Next: chat prompt bar */
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        width: '100%', padding: '11px 11px 11px 20px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 100,
        transition: 'border-color .18s, box-shadow .18s',
        cursor: 'pointer', textAlign: 'left', color: 'var(--text)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.borderColor = 'var(--primary-hover)'
        el.style.boxShadow = '0 0 0 4px var(--primary-glow)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.borderColor = 'var(--border)'
        el.style.boxShadow = 'none'
      }}
    >
      <span style={{
        flex: 1, minWidth: 0,
        fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.4,
        color: 'var(--text-dim)',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {question || label}
      </span>
      <div style={{
        width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
        background: 'var(--primary)',
        display: 'grid', placeItems: 'center',
        color: '#0C0A08', fontSize: 17,
        boxShadow: '0 2px 12px var(--primary-dim)',
        transition: 'transform .15s, box-shadow .15s',
      }}>↑</div>
    </button>
  )
}

/* ---- Welcome / landing state ---- */
function Welcome({ persona, content, sections, onPick }: {
  persona: string; content: PersonaContent; sections: SectionMeta[]; onPick: (id: string) => void
}) {
  const isStudent = persona === 'student'
  const heading = isStudent ? "Let's figure out AI — together." : "Let's make AI useful in your classroom."
  const sub = isStudent
    ? "Pick a topic to start. Every section is short, opinionated, and designed to help you use AI to actually learn — not cheat, coast, or get caught."
    : "Pick a topic to start. Every section is short, opinionated, and built to save you prep time without eroding what made your teaching good."

  return (
    <div className="fade-in persona-welcome" style={{ maxWidth: 920, margin: '0 auto', padding: '80px 56px' }}>
      <div className="persona-welcome-hero" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'center', marginBottom: 56 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: 'var(--primary)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
            {isStudent ? 'Student perspective' : 'Teacher perspective'}
          </div>
          <h1 className="display" style={{ margin: '0 0 20px', fontSize: 'clamp(34px, 3.6vw, 48px)', lineHeight: 1.2 }}>{heading}</h1>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: 'var(--text-muted)', fontWeight: 300 }}>{sub}</p>
        </div>
        <img src={isStudent ? '/assets/learning.svg' : '/assets/professor.svg'} alt="" className="float" style={{ width: '100%', maxWidth: 320, height: 'auto', margin: '0 auto', display: 'block' }}/>
      </div>

      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
        Start somewhere
      </div>
      <div style={{
        marginBottom: 14,
        padding: '10px 12px',
        borderRadius: 8,
        border: '1px solid var(--primary-soft)',
        background: 'var(--primary-tint)',
        fontSize: 13,
        color: 'var(--text-muted)',
      }}>
        Content transparency: each topic shows whether it is AI-generated, AI-assisted, or human-written.
      </div>

      <div className="persona-welcome-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {sections.map((s, i) => {
          const q = content[s.id]?.question
          if (!q) return null
          const isFeatured = i === 0
          return isFeatured ? (
            <button key={s.id} onClick={() => onPick(s.id)} style={{
              gridColumn: '1 / -1',
              display: 'flex', alignItems: 'center', gap: 20,
              padding: '20px 24px', textAlign: 'left', cursor: 'pointer',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--primary)',
              borderRadius: '0 10px 10px 0',
              color: 'var(--text)', transition: 'background .15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-2)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface)'; }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 900, color: 'var(--primary)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>
                  Start here
                </div>
                <div style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--text)', fontWeight: 500 }}>{q}</div>
              </div>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 20, color: 'var(--primary)', flexShrink: 0, opacity: 0.6 }}>→</span>
            </button>
          ) : (
            <button key={s.id} onClick={() => onPick(s.id)} className="card" style={{
              padding: '16px 20px', textAlign: 'left', color: 'var(--text)', transition: 'all .15s', cursor: 'pointer',
            }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'var(--primary-hover)'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 4px 16px rgba(85,73,64,0.1), 0 12px 32px var(--primary-soft)'; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 1px 4px rgba(85,73,64,0.08), 0 4px 16px rgba(85,73,64,0.06)'; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.1em' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {s.label}
                </span>
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--text)' }}>{q}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
