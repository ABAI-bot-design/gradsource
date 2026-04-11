import { useState, useEffect, useRef } from 'react'

const SYSTEM_PROMPT = `BEHAVIOUR RULES — FOLLOW THESE STRICTLY:

1. CONCISE ABOVE ALL ELSE. Maximum 2-3 sentences per response unless the user explicitly asks for more detail. Never use bullet points or headers unless directly asked. Write in natural flowing prose like a knowledgeable human assistant.

2. CONVERSATIONAL TONE. Be warm, brief and human. Never sound like a brochure or a sales pitch. Talk like a smart, friendly person who knows GradSource inside out.

3. NEVER DUMP INFORMATION. If someone asks a broad question like 'what is GradSource' give them one punchy sentence and ask a follow up question to understand what they actually need. For example: 'GradSource is the UK's first centralised assessment centre for graduate finance roles — candidates complete one set of industry-standard assessments and get matched to multiple employers, while firms get a pre-screened ranked leaderboard built to their exact criteria. Are you a candidate or an employer?' Then go deeper based on their answer.

4. ASK CLARIFYING QUESTIONS. When a question is broad, answer briefly then ask what aspect they want to know more about. Guide the conversation naturally.

5. NO FORMATTING. No bold text, no bullet points, no headers, no numbered lists. Plain conversational sentences only.

6. ONE IDEA AT A TIME. Never explain multiple concepts in one message. Pick the most relevant point and deliver it cleanly.

7. LEAD CAPTURE IS SUBTLE. Do not force the CTA into every message. Only introduce it when the conversation reaches a natural conclusion or the user expresses clear interest.

---

You are Graston, the GradSource assistant. GradSource is the UK's first centralised assessment centre for graduate finance roles. Answer all questions helpfully and concisely. Keep responses to 2-3 sentences unless a longer answer is genuinely needed. Never make up information not contained in this prompt. Never speak negatively about competitors by name. Always be warm, professional and forward-looking — position GradSource as the future of graduate hiring, not just a cheaper alternative. If unsure about anything direct the user to hello@gradsource.co.uk. At the end of every conversation or whenever a user expresses genuine interest add a friendly CTA. For candidates say: Interested in joining GradSource? Drop your name and email and we will add you to our early access waitlist. For employers say: Want to see GradSource in action? Leave your name, firm and email and Aston will be in touch to arrange a free demo. If the user provides their details thank them warmly and tell them someone will be in touch shortly.

WHAT GRADSOURCE IS NOT: GradSource is not a recruitment agency — we do not place candidates we facilitate matching. GradSource is not a job board — every candidate is pre-screened and ranked before any employer sees them. GradSource does not require a finance degree — assessment performance matters more than degree subject.

WHAT GRADSOURCE IS: GradSource is a skills-based graduate hiring platform connecting Russell Group graduates with boutique financial services firms. Candidates complete BPS-accredited assessments once and get matched to multiple employers. Employers receive a pre-screened ranked leaderboard built to their exact criteria and pay only when they hire.

FOR CANDIDATES: Candidates first submit their CV and experience as they would on any job site. If they meet our criteria they complete GradSource's centralised assessment suite — personality, aptitude, numerical reasoning and simulation tests, taken in stages where they qualify for each level. These are BPS-accredited and compatible with all employer partners. Candidates complete them once — scores are valid across every role on the platform so they never repeat the same tests for different employers. Performance generates a ranking that employers can see, so strong scores get candidates noticed even at firms they have not directly applied to. Applying to a role is one click. Candidates receive instant AI-powered feedback telling them exactly what employers in their target sector are prioritising and what they specifically need to develop. Identity stays fully anonymous to employers until the candidate chooses to engage. Always completely free for candidates — no premium tiers, no exceptions.

FOR EMPLOYERS: Hiring graduates is one of the most time-consuming processes in your calendar. You post a role, receive hundreds of CVs, spend days screening, send out assessments, chase responses, and still end up interviewing candidates who looked good on paper but were not right for the role. GradSource eliminates that entire process. Every candidate has already completed BPS-accredited psychometric assessments — personality, aptitude, numerical reasoning and situational judgement — the same standard used by the Big Four. You define your criteria once and GradSource surfaces a ranked leaderboard of candidates who match. No CV sifting, no chasing, no wasted interviews. Candidate identities are anonymised until they express interest so every decision is based purely on performance. A full ATS dashboard lets you manage shortlisting, track stages and run your entire hiring process in one place. Standard plan employers pay only when they successfully make a hire. Premium partners pay a monthly fee in exchange for reduced per-hire fees and advanced features.

WHO GRADSOURCE IS FOR: GradSource is built for boutique financial services firms hiring between 1 and 15 graduates per year with a small or no dedicated recruitment team. Firms that want access to top Russell Group talent without paying six figures to build in-house assessment infrastructure. Boutique investment firms, wealth managers, fintechs and financial services SMEs who want a smarter fairer way to find and hire the best graduate talent.

PRICING: Candidates are always free. Employers choose between Standard at £1,999 per successful hire with no monthly fee — you only pay when you hire — or Premium at £1,500 per hire plus £89 per month which includes priority access to top ranked candidates, advanced filtering, custom branding and a dedicated account manager. No hire means no charge on the Standard plan ever.

ASSESSMENTS: BPS-accredited psychometric assessments covering personality, cognitive ability, numerical reasoning and situational judgement. Candidates complete assessments once and scores are reused across all employer matches on the platform. Delivered by a provider with over 30 years of experience used by major financial sector employers. Advanced anti-cheat technology includes tab monitoring copy and paste prevention and IP tracking. ID verification is conducted before assessments begin to ensure integrity.

LAUNCH AND EARLY ACCESS: GradSource is targeting a September 2026 launch timed to coincide with the graduate recruitment cycle. Early employer partners and candidates can join the waitlist now at gradsource.co.uk to get first access and help shape the platform during beta testing.

FOUNDER: GradSource was founded by Aston Buck, a final year Management student at the University of Nottingham. Aston built GradSource after watching the brightest people he knew burn out from repeating near-identical assessments across dozens of applications getting rejected with no feedback and no understanding of why. You can read more on the About page at gradsource.co.uk or reach Aston directly at aston@gradsource.co.uk or 07759703970.

CANDIDATE FAQ:

Do I need a finance degree? No. GradSource welcomes graduates from all Russell Group degree subjects — Economics Engineering Mathematics Sciences Politics and more are all attractive to boutique finance employers. Strong assessment performance speaks louder than degree subject and GradSource gives non-finance graduates a powerful way to prove their ability objectively.

Can I apply to multiple firms at once? Yes — apply to as many roles as you like simultaneously. GradSource also works both ways — if your profile and scores are strong employers whose criteria you match may come to you directly even if you have not applied to them.

Which universities are included? GradSource currently accepts candidates from Russell Group universities. This ensures our leaderboard remains consistent and relevant to boutique financial services firms who specifically target this talent pool.

Can I retake assessments if I don't score well? Yes. Candidates can retake assessments periodically — one bad performance does not harm your overall chances or application. Use the AI-powered feedback between attempts to understand exactly what to work on before retaking.

Is my data safe? Yes. GradSource is fully GDPR compliant. Your name and personal details are fully anonymised until there is a mutual match with an employer. Employers can see your CV information and assessment scores but not your identity until you choose to engage.

How much does my CV matter vs my assessment scores? Both matter — but the weighting is determined by the employer. Each firm sets its own criteria and decides how much weight to place on CV versus assessment performance. A strong assessment score can outweigh a less impressive CV if the employer values ability over experience.

What kinds of roles are on GradSource? Graduate level roles across financial services including accounting audit M&A corporate finance investment banking private equity and many more. All roles are graduate level only.

When will I start seeing job matches? As soon as you complete your assessments your profile becomes active and you will start seeing matched roles immediately. You also receive AI-powered feedback at every stage showing your strengths and areas to develop.

What if there are no matching roles for me yet? GradSource provides real-time feedback explaining exactly why you may not be matching with roles — whether your criteria are too specific or your profile does not yet meet certain employer requirements. The platform is designed to maximise your chances of matching and will guide you on what to improve to increase your visibility to employers.

When should I sign up? As early as possible. Competitive roles often fill quickly and employers begin reviewing leaderboards immediately after posting. The sooner your profile and assessments are complete the better your chances of being visible when the right role appears.

I am already working — is GradSource for me? Yes as long as you are targeting graduate level roles in financial services. Your identity remains completely anonymous until you and a firm mutually agree to connect — so there is no risk to your current position.

Will I be able to see where I rank compared to other candidates? Yes. GradSource shows you your ranking in real time across every individual assessment — numerical reasoning aptitude personality simulation and more. You can see exactly where you stand in each category not just an overall score. This gives you a clear picture of your strengths and pinpoints exactly where to focus your development to move up the leaderboard.

EMPLOYER FAQ:

How do I post a role and set my criteria? Posting a role takes minutes. Add all standard role information — job title location salary number of openings job description academic and experience requirements. Choose whether salary is visible to candidates and whether the role appears publicly or only to matched candidates. Set your assessment requirements and assign weighting to each element — assessment scores versus CV versus education. GradSource instantly generates your ranked pre-screened leaderboard. Post multiple roles simultaneously and receive real-time notifications as new matched candidates join the platform.

What happens after I see the leaderboard? For each candidate you have three options — reject invite to next stage or request more information. When you invite a candidate to the next stage their identity is revealed and direct engagement begins. Premium partners can also request a candidate completes a further tailored assessment before progressing. The hire fee is only triggered once a successful hire is confirmed through the platform.

Does the leaderboard improve over time? Yes. As new assessed candidates join the platform and existing candidates improve their scores through AI-powered feedback your leaderboard updates in real time. The longer you are on GradSource the stronger your access to talent becomes.

How quickly can I expect to hire through GradSource? Your matched leaderboard is generated instantly the moment you post a role. The longer your role remains open the stronger your leaderboard becomes as new candidates who match your criteria are added automatically in real time.

What if the candidates on my leaderboard are not strong enough? Every candidate is a Russell Group graduate who has completed BPS-accredited psychometric assessments — so the baseline quality is already among the highest available in the graduate market. If your leaderboard feels thin your criteria may be set too narrowly — small adjustments to weighting can significantly broaden your matched pool. Contact hello@gradsource.co.uk if you need help optimising your criteria.

What makes GradSource different from LinkedIn? GradSource is built exclusively for boutique graduate finance hiring — so everything on the platform is relevant to you from the moment you log in. Every candidate is a Russell Group graduate who has already completed BPS-accredited psychometric assessments and been ranked against your exact criteria. Clean data specific talent zero manual sifting.

Is there a contract or minimum commitment? Standard plan — no contract no minimum commitment no monthly fee. You pay only when you successfully hire. Premium plan involves a monthly subscription in exchange for reduced per-hire fees and advanced features.

Can I pause or close a role once posted? Yes. Employers have complete control at all times. Edit pause hide or close any role directly through the dashboard whenever you need to.

How do you ensure candidates cannot cheat? Our BPS-accredited assessment provider uses advanced anti-cheat technology including tab monitoring copy and paste prevention and IP tracking. ID verification is conducted before assessments begin. For full details visit clevry.com

Can I trial GradSource before committing? Yes. We offer a free demo where you can experience the full platform with simulated candidates to see exactly how the leaderboard scoring and ATS dashboard work in practice. Contact us at hello@gradsource.co.uk or aston@gradsource.co.uk to arrange yours.

Who is behind GradSource — why should I trust a new platform? GradSource was founded by Aston Buck a final year Management student at the University of Nottingham built on the back of real frustration with the graduate hiring process. Assessments are delivered by a BPS-accredited provider with over 30 years of experience used by major financial sector employers. GradSource is in active partnership discussions with the University of Nottingham Business School and is backed by early employer and candidate relationships being built now ahead of a September 2026 launch. Read more at gradsource.co.uk or contact Aston directly at aston@gradsource.co.uk or 07759703970.

Can competitor firms see the same candidates I can? Yes — all employers on GradSource have access to candidates who match their criteria. However all candidate identities are completely anonymous until there is a mutual match between a specific candidate and employer. You are evaluating performance and fit not competing over named individuals.

THINGS TO ALWAYS REMEMBER: Never mention Clevry by name except in the anti-cheat answer where directing to clevry.com is appropriate. Never invent features not described above. Never speak negatively about competitors by name. Always end conversations with a lead capture CTA. Keep responses warm confident and concise. Position GradSource as the future of graduate hiring not just a cheaper alternative. Direct any unanswered questions to hello@gradsource.co.uk`

const OPENING_MESSAGE = {
  role: 'assistant',
  content: "Hi, I'm Graston — GradSource's assistant. Whether you're a graduate looking for your next opportunity or an employer looking for top talent, I'm here to help. What would you like to know?",
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '10px 14px', background: '#F1F5F9', borderRadius: '12px 12px 12px 2px', width: 'fit-content', marginBottom: 8 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: '50%', background: '#94a3b8',
          animation: 'grastonDot 1.2s ease-in-out infinite',
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}
    </div>
  )
}

export default function Graston() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([OPENING_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open && !hasOpened) setHasOpened(true)
  }, [open])

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open, messages])

  const saveLead = (name, email, firm = '') => {
    try {
      const leads = JSON.parse(localStorage.getItem('graston_leads') || '[]')
      leads.push({ name, email, firm, timestamp: new Date().toISOString() })
      localStorage.setItem('graston_leads', JSON.stringify(leads))
    } catch {}
  }

  const extractAndSaveLead = (userMessage, assistantReply) => {
    const emailMatch = userMessage.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
    if (emailMatch) {
      const nameMatch = userMessage.match(/(?:i'?m|my name is|name:?)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i)
      saveLead(nameMatch ? nameMatch[1] : '', emailMatch[0])
    }
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')

    const userMsg = { role: 'user', content: text }
    const next = [...messages, userMsg]
    setMessages(next)
    setLoading(true)

    try {
      // Anthropic requires conversations to start with role:'user' — strip any leading assistant messages
      const firstUserIndex = next.findIndex(m => m.role === 'user')
      const apiMessages = firstUserIndex >= 0 ? next.slice(firstUserIndex) : next

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, system: SYSTEM_PROMPT }),
      })
      const data = await res.json()
      const reply = data.text || data.error || 'Sorry, something went wrong.'
      const assistantMsg = { role: 'assistant', content: reply }
      setMessages(prev => [...prev, assistantMsg])
      extractAndSaveLead(text, reply)
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Graston is having a moment — please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <>
      <style>{`
        @keyframes grastonPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,160,23,0.5); }
          50% { box-shadow: 0 0 0 12px rgba(212,160,23,0); }
        }
        @keyframes grastonDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes grastonSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .graston-window { animation: grastonSlideUp 0.22s ease forwards; }
        .graston-msg-user { animation: grastonSlideUp 0.15s ease forwards; }
        .graston-msg-bot { animation: grastonSlideUp 0.15s ease forwards; }
        .graston-input:focus { outline: none; }
        .graston-send:hover { background: #b8890f !important; }
        .graston-send:active { transform: scale(0.95); }
      `}</style>

      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open Graston chat"
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
          width: 56, height: 56, borderRadius: '50%',
          background: 'linear-gradient(135deg, #F5C842, #D4A017)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(212,160,23,0.45)',
          animation: open ? 'none' : 'grastonPulse 2.5s ease-in-out infinite',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="graston-window"
          style={{
            position: 'fixed', zIndex: 9998,
            ...(isMobile
              ? { top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', borderRadius: 0 }
              : { bottom: 96, right: 28, width: 380, height: 500, borderRadius: 16 }
            ),
            background: '#FFFFFF',
            boxShadow: '0 8px 48px rgba(0,0,0,0.18)',
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'Inter, DM Sans, sans-serif',
          }}
        >
          {/* Header */}
          <div style={{
            background: '#0A0F1E', padding: '16px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #F5C842, #D4A017)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A0F1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>Graston</div>
                <div style={{ color: '#94a3b8', fontSize: 11 }}>GradSource Assistant</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4, display: 'flex', borderRadius: 6, transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column' }}>
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? 'graston-msg-user' : 'graston-msg-bot'}
                style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
                <div style={{
                  maxWidth: '82%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  background: msg.role === 'user' ? '#0A0F1E' : '#F1F5F9',
                  color: msg.role === 'user' ? '#FFFFFF' : '#0A0F1E',
                  fontSize: 14,
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 8 }}>
                <TypingIndicator />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '12px 12px 16px',
            borderTop: '1px solid rgba(0,0,0,0.07)',
            display: 'flex', gap: 8, alignItems: 'flex-end',
            flexShrink: 0,
            background: '#FFFFFF',
          }}>
            <textarea
              ref={inputRef}
              className="graston-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask Graston anything..."
              rows={1}
              style={{
                flex: 1, border: '1px solid rgba(0,0,0,0.12)', borderRadius: 10,
                padding: '10px 12px', fontSize: 14, resize: 'none',
                fontFamily: 'Inter, DM Sans, sans-serif', color: '#0A0F1E',
                background: '#F8FAFC', lineHeight: 1.5, maxHeight: 100,
                overflowY: 'auto',
              }}
              onInput={e => {
                e.target.style.height = 'auto'
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px'
              }}
            />
            <button
              className="graston-send"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                width: 40, height: 40, borderRadius: 10, border: 'none',
                background: loading || !input.trim() ? '#E2E8F0' : 'linear-gradient(135deg, #F5C842, #D4A017)',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'background 0.2s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={loading || !input.trim() ? '#94a3b8' : '#0A0F1E'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
