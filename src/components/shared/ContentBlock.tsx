import type { Block } from '../../data/content'
import { Icon } from './Icon'

const ICON_MAP = {
  sparkle: Icon.Sparkle,
  warn:    Icon.Warn,
  check:   Icon.Check,
  book:    Icon.Book,
}

export function ContentBlock({ block }: { block: Block }) {
  if (block.type === 'p') {
    return <p style={{ margin: '0 0 16px', fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)' }}>{block.text}</p>
  }

  if (block.type === 'h') {
    return (
      <h3 style={{
        margin: '36px 0 12px', fontFamily: 'var(--font-ui)', fontSize: 17, fontWeight: 700,
        color: 'var(--text)', letterSpacing: '-0.01em',
        paddingBottom: 8, borderBottom: '1px solid var(--border-soft)',
      }}>{block.text}</h3>
    )
  }

  if (block.type === 'list') {
    return (
      <ul style={{ margin: '4px 0 20px', paddingLeft: 20, color: 'var(--text-muted)' }}>
        {block.items.map((it, i) => (
          <li key={i} style={{ margin: '9px 0', fontSize: 15.5, lineHeight: 1.6 }}>
            {it.bold && <strong style={{ color: 'var(--text)', fontWeight: 700 }}>{it.bold}</strong>}
            {it.bold && ' — '}
            {it.text}
          </li>
        ))}
      </ul>
    )
  }

  if (block.type === 'tools') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '10px 0 20px' }}>
        {block.items.map((t, i) => (
          <ToolCard key={i} tool={t}/>
        ))}
      </div>
    )
  }

  if (block.type === 'callout') {
    const toneMap = {
      info:    { c: '#A8C4D8', bg: 'rgba(168,196,216,0.07)', border: '#A8C4D8' },
      warn:    { c: '#C9AD93', bg: 'rgba(201,173,147,0.07)', border: '#C9AD93' },
      danger:  { c: '#A87878', bg: 'rgba(168,120,120,0.07)', border: '#A87878' },
      success: { c: '#879A77', bg: 'rgba(135,154,119,0.07)', border: '#879A77' },
    }
    const m = toneMap[block.tone]
    const IconComp = block.iconName ? ICON_MAP[block.iconName] : Icon.Sparkle
    return (
      <div style={{
        margin: '18px 0', padding: '14px 18px',
        background: m.bg,
        borderLeft: `3px solid ${m.border}`,
        borderRadius: '0 8px 8px 0',
        display: 'flex', gap: 12, alignItems: 'flex-start',
      }}>
        <div style={{ color: m.c, marginTop: 2, flexShrink: 0, opacity: 0.9 }}><IconComp/></div>
        <div>
          {block.title && (
            <div style={{
              fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 11,
              color: m.c, marginBottom: 5,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>{block.title}</div>
          )}
          <div style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-muted)' }}>{block.text}</div>
        </div>
      </div>
    )
  }

  if (block.type === 'promptPair') {
    return (
      <div style={{
        margin: '16px 0 20px',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden',
      }}>
        <div style={{ padding: '14px 16px', background: 'rgba(115,120,124,0.07)', borderRight: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#73787C', flexShrink: 0, display: 'block' }}/>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: '#73787C', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>Weak prompt</div>
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.6, fontFamily: 'monospace' }}>"{block.weak}"</div>
        </div>
        <div style={{ padding: '14px 16px', background: 'rgba(135,154,119,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#879A77', flexShrink: 0, display: 'block' }}/>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: '#879A77', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>Strong prompt</div>
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--text)', fontStyle: 'italic', lineHeight: 1.6, fontFamily: 'monospace' }}>"{block.strong}"</div>
        </div>
      </div>
    )
  }

  if (block.type === 'story') {
    return (
      <div style={{ margin: '20px 0 28px', paddingLeft: 24, paddingTop: 4, position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 0, top: -10,
          fontFamily: 'var(--font-display)', fontSize: 80, lineHeight: 0.8,
          color: 'var(--primary)', opacity: 0.3, userSelect: 'none', pointerEvents: 'none',
        }}>"</div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 700 }}>
          Real example · {block.who}
        </div>
        <div style={{ fontSize: 15.5, lineHeight: 1.7, color: 'var(--text)', fontStyle: 'italic' }}>{block.text}</div>
      </div>
    )
  }

  if (block.type === 'resources') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '10px 0 18px' }}>
        {block.items.map((r, i) => (
          <ResourceRow key={i} item={r}/>
        ))}
      </div>
    )
  }

  return null
}

function ToolCard({ tool }: { tool: { name: string; letter: string; color: string; desc: string; bestFor: string } }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '13px 16px',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderLeft: `3px solid ${tool.color}`,
      borderRadius: '0 8px 8px 0',
      transition: 'background .15s',
    }}
    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-2)'; }}
    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--surface)'; }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{tool.name}</div>
          <div style={{
            fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.07em', textTransform: 'uppercase',
            color: tool.color, flexShrink: 0,
            padding: '2px 7px', borderRadius: 4,
            boxShadow: `inset 0 0 0 1px ${tool.color}`,
          }}>{tool.bestFor}</div>
        </div>
        <div style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--text-muted)' }}>{tool.desc}</div>
      </div>
    </div>
  )
}

function ResourceRow({ item }: { item: { title: string; kind: string; source: string; url?: string } }) {
  const baseStyle = {
    display: 'flex' as const, alignItems: 'center' as const, gap: 12,
    padding: '11px 14px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    transition: 'border-color .15s, background .15s',
  }
  const content = (
    <>
      <div style={{ color: 'var(--primary)', opacity: 0.8 }}><Icon.Book/></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{item.title}</div>
        <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{item.kind} · {item.source}</div>
      </div>
      <div style={{ color: 'var(--text-dim)', opacity: item.url ? 0.85 : 0.4 }}><Icon.External/></div>
    </>
  )
  if (item.url) {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer"
        style={{ ...baseStyle, textDecoration: 'none', cursor: 'pointer' }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'var(--primary-hover)'; el.style.background = 'var(--bg-2)'; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'var(--border)'; el.style.background = 'var(--surface)'; }}>
        {content}
      </a>
    )
  }
  return (
    <div style={baseStyle}
      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(201,173,147,0.3)'; el.style.background = 'var(--bg-2)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'var(--border)'; el.style.background = 'var(--surface)'; }}>
      {content}
    </div>
  )
}
