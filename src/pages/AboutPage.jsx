import { useEffect } from 'react'
import { Footer } from '../App'

function AboutPage({ onNavigate, onWaitlist }) {
  useEffect(() => {
    document.title = 'About | GradSource'
    return () => { document.title = 'GradSource' }
  }, [])

  const paragraphs = [
    { text: "Hi, I'm Aston.", hero: true },
    { text: "I'm a final year Management student at the University of Nottingham. Like most people in my year, I felt the pressure — from parents, from peers — to start applying for graduate jobs. So I did. I spent hours on every application, completed assessment after assessment, and mostly got ghosted or rejected with no explanation and no feedback." },
    { text: "What hit hardest wasn't my own experience — it was watching some of the brightest people I know burn out from the process. Talented, driven people struggling not because they lacked ability, but because the system was never designed to find it. GradSource exists because I believe that is worth fixing." },
    { text: "I want to build a company that creates real long-term value — and I think the way to do that is to genuinely improve people's lives. Helping someone find the right career feels like exactly that. I also want GradSource to show other people that you can turn a frustration into something meaningful. That building your own thing is a real option." },
    { text: "Outside of GradSource, I'm on the padel court, on the tennis court, or on the golf course. I'm an avid Leeds United supporter and love spending time with friends and family." },
  ]

  return (
    <div style={{ paddingTop: 68, fontFamily: 'DM Sans, sans-serif' }}>

      {/* Hero */}
      <div style={{ background: '#0A0F1E', padding: '80px 24px 72px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h1
            className="font-syne"
            style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, color: '#FFFFFF', marginBottom: 16, lineHeight: 1.15 }}
          >
            The Person Behind GradSource
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 18, lineHeight: 1.7 }}>
            Built by a graduate, for graduates.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px' }}>

        {/* Text */}
        <div style={{ maxWidth: 720, margin: '0 auto 48px', marginBottom: 48 }}>
          {paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                color: p.hero ? '#0A0F1E' : '#475569',
                fontSize: p.hero ? 20 : 16,
                fontWeight: p.hero ? 700 : 400,
                lineHeight: 1.8,
                marginBottom: 20,
              }}
            >
              {p.text}
            </p>
          ))}
          <p
            className="font-syne"
            style={{ fontSize: 13, fontWeight: 700, color: '#D4A017', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 28 }}
          >
            Aston Buck — Founder, GradSource
          </p>
        </div>

        {/* Currently Reading card + favourite book + tags */}
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{
            background: '#FFFFFF',
            borderLeft: '4px solid #D4A017',
            borderRadius: 8,
            padding: '20px 24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
            marginBottom: 14,
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#D4A017', marginBottom: 8 }}>📖 Currently Reading</div>
            <div className="font-syne" style={{ fontSize: 18, fontWeight: 800, color: '#0A0F1E', marginBottom: 10 }}>
              Barbarians at the Gate
            </div>
            <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.75, margin: 0 }}>
              A book about how the most entrenched processes in finance were turned upside down almost overnight. It's a good reminder that the way things have always been done is never the way they always will be.
            </p>
          </div>

          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 36 }}>
            Favourite book: Zero to One — Peter Thiel
          </p>

          {/* Fun details strip */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['⛳ Golf', '🎾 Padel', '🎾 Tennis', '📖 Reader', '👨‍👩‍👧 Family First'].map(tag => (
              <div
                key={tag}
                style={{
                  background: 'rgba(245,200,66,0.1)',
                  border: '1px solid rgba(212,160,23,0.25)',
                  borderRadius: 100,
                  padding: '6px 16px',
                  fontSize: 13,
                  color: '#334155',
                  fontWeight: 500,
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Leeds United card */}
          <div style={{
            background: '#FFFFFF',
            borderLeft: '4px solid #D4A017',
            borderRadius: 8,
            padding: '16px 20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
            marginTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}>
            <div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>⚽ Who do you support?</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0A0F1E' }}>Leeds United</div>
            </div>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/5/54/Leeds_United_F.C._logo.svg"
              alt="Leeds United crest"
              style={{ width: 60, height: 60, objectFit: 'contain', flexShrink: 0 }}
            />
          </div>
        </div>

        {/* Photo cards */}
        <div style={{ display: 'flex', gap: 24, marginTop: 60, flexWrap: 'wrap' }}>
          {[
            {
              src: '/aston-golf.jpeg',
              alt: 'Aston at TPC Sawgrass',
              question: 'What is your favourite course you\'ve played?',
              answer: 'TPC Sawgrass',
            },
            {
              src: '/aston-girlfriend.jpeg',
              alt: 'Aston with his girlfriend',
              question: 'What do you do outside of GradSource?',
              answer: 'Spend time with the people closest to me.',
            },
          ].map(card => (
            <div key={card.src} style={{ flex: '1 1 300px' }}>
              <div style={{
                background: 'rgba(245,200,66,0.06)',
                borderLeft: '4px solid #D4A017',
                borderRadius: 8,
                padding: '16px 20px',
                marginBottom: 16,
              }}>
                <p style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>{card.question}</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#0A0F1E' }}>{card.answer}</p>
              </div>
              <img
                src={card.src}
                alt={card.alt}
                style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.10)', display: 'block' }}
              />
            </div>
          ))}
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}

export default AboutPage
