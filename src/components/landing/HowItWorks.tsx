import { useScrollReveal } from '../../hooks/useScrollReveal'

const pillars = [
  {
    n: '01',
    title: 'Technical Understanding',
    text: 'Know how AI works: machine learning, training data, neural networks, and why models hallucinate. Understanding the mechanism lets you predict when a tool will help and when it will fail.',
  },
  {
    n: '02',
    title: 'Evaluative Skills',
    text: "Critically assess AI output for accuracy, bias, and appropriate use. The model sounds confident even when it's wrong — your job is to know the difference and not outsource that judgment.",
  },
  {
    n: '03',
    title: 'Practical Application',
    text: 'Use AI tools effectively and responsibly in learning, research, and teaching. This means knowing which tool fits which task, how to prompt well, and when to put it down.',
  },
  {
    n: '04',
    title: 'Ethical Considerations',
    text: 'Understand the real stakes: privacy, copyright, academic integrity, and the societal impacts of AI-generated content. Responsible use protects you and the people your work affects.',
  },
]

export function HowItWorks() {
  const headRef = useScrollReveal<HTMLDivElement>()
  const gridRef = useScrollReveal<HTMLDivElement>({ threshold: 0.08, rootMargin: '0px 0px -20px 0px' })

  return (
    <section style={{
      background: 'var(--bg)',
      padding: '100px 80px',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>

        {/* Header */}
        <div ref={headRef} className="reveal" style={{ marginBottom: 64, maxWidth: 640 }}>
          <div style={{
            fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--primary)', marginBottom: 18,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 20, height: 1, background: 'var(--primary)', display: 'inline-block', flexShrink: 0 }}/>
            EDUCAUSE AI Literacy Framework, 2024
          </div>
          <h2 className="display" style={{ fontSize: 'clamp(34px, 3.4vw, 46px)', margin: '0 0 20px', lineHeight: 1.15 }}>
            What AI literacy actually means.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--text-muted)', margin: 0 }}>
            EDUCAUSE defines AI literacy as four connected competencies. You need all four — technical knowledge without ethics is reckless, and ethics without practical skills is theoretical.
          </p>
        </div>

        {/* Pillar cards */}
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {pillars.map((p, i) => (
            <div
              key={p.n}
              className="card reveal"
              style={{ padding: 28, transitionDelay: `${i * 0.1}s` }}
            >
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 32,
                color: 'var(--primary)', marginBottom: 12, lineHeight: 1,
              }}>{p.n}</div>
              <h4 style={{
                fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 700,
                margin: '0 0 10px', color: 'var(--text)', lineHeight: 1.3,
              }}>{p.title}</h4>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)' }}>{p.text}</p>
            </div>
          ))}
        </div>

        {/* Attribution */}
        <div style={{
          marginTop: 32, paddingTop: 24,
          borderTop: '1px solid var(--border-soft)',
          fontFamily: 'var(--font-ui)', fontSize: 11,
          color: 'var(--text-dim)', letterSpacing: '0.06em',
        }}>
          Framework: EDUCAUSE AI Literacy in Teaching and Learning (ALTL), 2024 — developed by a cross-institutional working group.
        </div>

      </div>
    </section>
  )
}
