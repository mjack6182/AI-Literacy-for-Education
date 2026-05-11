import { useEffect, useRef, useState } from 'react'

const tabs = [
  {
    id: 'llm', kicker: '01', label: 'Large Language Models', illo: '/assets/llm.svg',
    body: [
      "When people say \"AI\" today they almost always mean large language models — systems like ChatGPT, Claude, and Gemini, trained on enormous amounts of text to predict what word comes next in a sentence.",
      "With enough training, \"predict the next word\" starts to look like reasoning, summarizing, translating, and answering questions. It doesn't understand what it's saying — but the output is useful enough to change how we work and learn.",
      "The trick is knowing what it's good at (drafting, rephrasing, explaining, brainstorming) and what it's not (truth, judgment, memory) — from the perspective you care about.",
    ],
  },
  {
    id: 'generative', kicker: '02', label: 'Generative AI', illo: '/assets/ai.svg',
    body: [
      "Generative AI is the broader family: models that produce new content — text, images, audio, code, video. LLMs are one kind of generative AI, focused on language.",
      "Image models (DALL·E, Midjourney, Stable Diffusion), music models, and video models work on the same core idea — learn patterns from huge datasets, then sample something new that fits.",
      "The output is always probabilistic. Same prompt, different result. That's the feature and the bug.",
    ],
  },
  {
    id: 'agents', kicker: '03', label: 'AI Agents', illo: '/assets/ai-agent.svg',
    body: [
      "An agent is an LLM that's been given tools and a goal. Instead of just replying, it can browse the web, run code, read files, send messages, and chain multiple steps on its own.",
      "This is where AI stops being a chatbot and starts being an assistant that can actually do things. It also opens real risks — bad judgment at speed, cascading errors, and actions you didn't authorize.",
      "Useful rule: an agent is only as trustworthy as the narrowest tool you gave it. Start small, watch closely.",
    ],
  },
  {
    id: 'limits', kicker: '04', label: 'Limits & Hallucinations', illo: '/assets/ai-slop.svg',
    body: [
      "Models confidently produce wrong answers — called hallucinations. They invent citations, misremember dates, and get arithmetic wrong, all in the same confident voice.",
      "They also don't actually know what happened yesterday unless you tell them or plug them into the internet. Their \"memory\" ends at training cutoff.",
      "Treat every output as a first draft from a very fast, very overconfident intern. Verify anything that matters.",
    ],
  },
]

const NAV_H = 72

export function WhatIsAI() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const totalScrollable = el.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(1, scrolled / totalScrollable)
      const newIdx = Math.min(tabs.length - 1, Math.floor(progress * tabs.length))
      setActiveIdx(prev => {
        if (prev !== newIdx) setAnimKey(k => k + 1)
        return newIdx
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const jumpTo = (idx: number) => {
    const el = containerRef.current
    if (!el) return
    const totalScrollable = el.offsetHeight - window.innerHeight
    const target = el.offsetTop + (idx / tabs.length) * totalScrollable
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  const tab = tabs[activeIdx]

  return (
    // 60vh of scroll per section (feels quick but intentional)
    <div ref={containerRef} style={{ height: `${tabs.length * 60 + 100}vh`, background: 'var(--bg-2)' }}>
      <div style={{
        position: 'sticky',
        top: NAV_H,
        height: `calc(100vh - ${NAV_H}px)`,
        background: 'var(--bg-2)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* Header strip */}
        <div style={{
          height: 60,
          padding: '0 56px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-soft)',
          flexShrink: 0,
        }}>
          <div style={{
            fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--primary)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 20, height: 1, background: 'var(--primary)', display: 'inline-block', flexShrink: 0 }}/>
            What is AI?
          </div>

          {/* Step pills — clickable to jump */}
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {tabs.map((t, i) => {
              const on = i === activeIdx
              return (
                <button
                  key={t.id}
                  onClick={() => jumpTo(i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '4px 10px', borderRadius: 100,
                    background: on ? 'var(--primary-subtle)' : 'transparent',
                    border: `1px solid ${on ? 'var(--primary-dim)' : 'rgba(85,73,64,0.1)'}`,
                    cursor: 'pointer',
                    transition: 'background 0.3s, border-color 0.3s',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 13,
                    color: i <= activeIdx ? 'var(--primary)' : 'var(--text-dim)',
                    transition: 'color 0.35s',
                    pointerEvents: 'none',
                  }}>{t.kicker}</span>
                  <span style={{
                    fontFamily: 'var(--font-ui)', fontSize: 11,
                    color: on ? 'var(--text)' : 'var(--text-dim)',
                    maxWidth: on ? '180px' : '0px',
                    overflow: 'hidden', whiteSpace: 'nowrap',
                    transition: 'max-width 0.35s cubic-bezier(.22,1,.36,1), color 0.35s',
                    pointerEvents: 'none',
                  }}>{t.label}</span>
                </button>
              )
            })}
          </div>

          <div style={{
            fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--text-dim)',
            letterSpacing: '0.12em', minWidth: 36, textAlign: 'right',
          }}>
            {String(activeIdx + 1).padStart(2, '0')} / {String(tabs.length).padStart(2, '0')}
          </div>
        </div>

        {/* Main content — key changes trigger re-animation */}
        <div key={animKey} className="whatisai-panel" style={{
          flex: 1,
          display: 'grid', gridTemplateColumns: '1.2fr 1fr',
          gap: 80, alignItems: 'center',
          padding: '40px 80px 60px',
          maxWidth: 1300, margin: '0 auto', width: '100%',
        }}>
          {/* Text */}
          <div>
            <div style={{
              fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--primary)', marginBottom: 14,
            }}>{tab.kicker} · {tab.label}</div>
            <h3 className="display" style={{
              fontSize: 'clamp(32px, 3.2vw, 44px)', fontWeight: 400,
              lineHeight: 1.1, letterSpacing: '-0.02em',
              margin: '0 0 28px', color: 'var(--text)',
            }}>{tab.label}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {tab.body.map((txt, i) => (
                <p key={i} style={{ margin: 0, fontSize: 16.5, lineHeight: 1.7, color: 'var(--text-muted)' }}>{txt}</p>
              ))}
            </div>
          </div>

          {/* Illustration */}
          <div style={{ position: 'relative', maxWidth: 420, maxHeight: 360, margin: '0 auto', width: '100%', padding: '40px 20px' }}>
            <div style={{
              position: 'absolute', inset: '10% 5%',
              background: 'var(--primary-tint)',
              borderRadius: '50% 42% 48% 45% / 45% 50% 42% 48%',
              transform: 'rotate(-4deg)',
            }}/>
            <img
              src={tab.illo} alt="" className="float"
              style={{ position: 'relative', width: '100%', maxHeight: 300, objectFit: 'contain', display: 'block' }}
            />
          </div>
        </div>

        {/* Scroll progress bar */}
        <div style={{ height: 3, background: 'var(--border-soft)', flexShrink: 0 }}>
          <div style={{
            height: '100%',
            width: `${((activeIdx + 1) / tabs.length) * 100}%`,
            background: 'var(--primary)',
            transition: 'width 0.5s cubic-bezier(.22,1,.36,1)',
          }}/>
        </div>
      </div>
    </div>
  )
}
