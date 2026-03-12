import { useState, useEffect, useRef } from 'react'
import {
  Zap, Menu, X, ChevronRight, Trophy, Star, TrendingUp, Users, CheckCircle,
  XCircle, BarChart2, Brain, Linkedin, FileText, GraduationCap, Target,
  DollarSign, Shield, Clock, Award, ArrowRight, Twitter, Building2,
  ChevronDown, Send, Sparkles, Lock, Eye, EyeOff
} from 'lucide-react'

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #FFFFFF; font-family: 'DM Sans', sans-serif; color: #0A0F1E; overflow-x: hidden; }
.font-syne { font-family: 'Syne', sans-serif; }
.dot-grid {
  background-image: radial-gradient(circle, rgba(245,200,66,0.22) 1px, transparent 1px);
  background-size: 28px 28px;
}
.glow-teal { box-shadow: 0 0 20px rgba(0,212,255,0.2), 0 0 40px rgba(0,212,255,0.08); }
.glow-gold { box-shadow: 0 0 24px rgba(245,200,66,0.3), 0 0 48px rgba(245,200,66,0.12); }
.glow-border-teal { border: 1px solid rgba(0,212,255,0.35); box-shadow: 0 4px 20px rgba(0,212,255,0.08); }
.glow-border-gold { border: 1px solid rgba(245,200,66,0.45); box-shadow: 0 4px 24px rgba(245,200,66,0.14); }
.frosted { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); background: rgba(255,255,255,0.93); border-bottom: 1px solid rgba(0,0,0,0.07); box-shadow: 0 2px 24px rgba(0,0,0,0.07); }
.fade-up { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
.fade-up.visible { opacity: 1; transform: translateY(0); }
.pulse-ring { animation: pulseRing 2s ease-in-out infinite; }
@keyframes pulseRing {
  0%, 100% { box-shadow: 0 0 0 0 rgba(245,200,66,0.5); }
  50% { box-shadow: 0 0 0 10px rgba(245,200,66,0); }
}
.float { animation: float 4s ease-in-out infinite; }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.shimmer { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent); background-size: 200% 100%; animation: shimmer 2.5s infinite; }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
.slide-in-row { opacity: 0; transform: translateX(-20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.slide-in-row.visible { opacity: 1; transform: translateX(0); }
.toast { animation: fadeInOut 3s ease forwards; }
@keyframes fadeInOut { 0% { opacity: 0; transform: translateY(10px); } 15%,80% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-10px); } }
.tab-active { border-bottom: 2px solid #D4A017; color: #D4A017; }
.score-bar { transition: width 1.2s ease; }
`

function useScrollAnimation() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('.fade-up')
            children.forEach((child, i) => {
              setTimeout(() => child.classList.add('visible'), i * 120)
            })
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function AnimatedSection({ children, className = '' }) {
  const ref = useScrollAnimation()
  return (
    <div ref={ref} className={`fade-up ${className}`}>
      {children}
    </div>
  )
}

// ─── NAV ───────────────────────────────────────────────────────────────────────
function Nav({ onWaitlist }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, transition: 'all 0.3s' }}
      className={scrolled ? 'frosted' : ''}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <div style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', borderRadius: 8, padding: 6, display: 'flex' }}>
            <Zap size={18} color="#0A0F1E" strokeWidth={2.5} />
          </div>
          <span className="font-syne" style={{ fontSize: 20, fontWeight: 700, color: '#0A0F1E', letterSpacing: '-0.5px' }}>GradSource</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          {['For Candidates', 'For Employers', 'How It Works', 'Pricing'].map(l => (
            <a key={l} href="#" style={{ color: '#475569', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#D4A017'}
              onMouseLeave={e => e.target.style.color = '#475569'}>{l}</a>
          ))}
          <button onClick={onWaitlist} style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
            Join the Waitlist
          </button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: '#0A0F1E', cursor: 'pointer' }} className="mobile-menu-btn">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <style>{`
        @media(max-width:768px){
          .desktop-nav{display:none!important;}
          .mobile-menu-btn{display:flex!important;}
        }
      `}</style>
      {menuOpen && (
        <div className="frosted" style={{ padding: '16px 24px 24px', borderTop: '1px solid rgba(245,200,66,0.2)' }}>
          {['For Candidates', 'For Employers', 'How It Works', 'Pricing'].map(l => (
            <a key={l} href="#" onClick={() => setMenuOpen(false)} style={{ display: 'block', color: '#475569', padding: '12px 0', fontSize: 15, textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>{l}</a>
          ))}
          <button onClick={() => { setMenuOpen(false); onWaitlist() }} style={{ marginTop: 16, width: '100%', background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 8, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            Join the Waitlist
          </button>
        </div>
      )}
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
const leaderboardData = [
  { rank: 1, name: 'Sophia R.', uni: 'LSE', linkedin: 92, aptitude: 91, technical: 88, simulation: 94, score: 95 },
  { rank: 2, name: 'Marcus T.', uni: 'Warwick', linkedin: 88, aptitude: 89, technical: 85, simulation: 90, score: 91 },
  { rank: 3, name: 'Priya K.', uni: 'Imperial', linkedin: 85, aptitude: 87, technical: 90, simulation: 85, score: 88 },
  { rank: 4, name: 'James O.', uni: 'UCL', linkedin: 80, aptitude: 84, technical: 82, simulation: 87, score: 84 },
  { rank: 5, name: 'Anika S.', uni: 'Bath', linkedin: 76, aptitude: 80, technical: 78, simulation: 81, score: 79 },
]

function LeaderboardWidget() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    setTimeout(() => setVisible(true), 800)
  }, [])
  const rankColor = (r) => r === 1 ? '#F5C842' : r === 2 ? '#94a3b8' : r === 3 ? '#cd7f32' : '#475569'
  return (
    <div className="float glow-border-teal" style={{ borderRadius: 16, background: 'rgba(13,27,42,0.9)', overflow: 'hidden', width: '100%', maxWidth: 580 }}>
      <div style={{ background: 'rgba(0,212,255,0.08)', padding: '14px 20px', borderBottom: '1px solid rgba(0,212,255,0.15)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ marginLeft: 8, fontSize: 13, color: '#64748b', fontFamily: 'monospace' }}>Junior Analyst — Live Leaderboard</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0,212,255,0.1)' }}>
              {['#', 'Candidate', 'LinkedIn', 'Aptitude', 'Technical', 'Simulation', 'Score'].map(h => (
                <th key={h} style={{ padding: '10px 12px', color: '#00D4FF', fontWeight: 600, textAlign: 'left', whiteSpace: 'nowrap', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((row, i) => (
              <tr key={row.rank} className={`slide-in-row ${visible ? 'visible' : ''}`}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transitionDelay: `${i * 150}ms`, background: row.rank === 1 ? 'rgba(245,200,66,0.05)' : 'transparent' }}>
                <td style={{ padding: '12px 12px', color: rankColor(row.rank), fontWeight: 700, fontSize: 15 }}>{row.rank}</td>
                <td style={{ padding: '12px 12px' }}>
                  <div style={{ fontWeight: 600, color: '#e2e8f0' }}>{row.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{row.uni}</div>
                </td>
                {[row.linkedin, row.aptitude, row.technical, row.simulation].map((v, j) => (
                  <td key={j} style={{ padding: '12px 12px', color: v >= 90 ? '#00F5C4' : v >= 80 ? '#00D4FF' : '#94a3b8', fontWeight: 600 }}>{v}</td>
                ))}
                <td style={{ padding: '12px 12px' }}>
                  <span style={{ background: row.rank === 1 ? 'rgba(245,200,66,0.15)' : 'rgba(0,212,255,0.1)', color: row.rank === 1 ? '#F5C842' : '#00D4FF', borderRadius: 6, padding: '3px 10px', fontWeight: 700, fontSize: 14 }}>{row.score}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Hero({ onWaitlist }) {
  return (
    <section className="dot-grid" style={{ minHeight: '100vh', paddingTop: 120, paddingBottom: 80, position: 'relative', overflow: 'hidden', background: '#FFFFFF' }}>
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(245,200,66,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(212,160,23,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <Sparkles size={14} color="#D4A017" />
              <span style={{ fontSize: 13, color: '#D4A017', fontWeight: 500 }}>Next-Generation Graduate Hiring</span>
            </div>
            <h1 className="font-syne" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, lineHeight: 1.1, color: '#0A0F1E', marginBottom: 24, letterSpacing: '-1px' }}>
              The Leaderboard for<br />
              <span style={{ background: 'linear-gradient(135deg, #F5C842, #D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Graduate Talent</span>
            </h1>
            <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}>
              Stop drowning in CVs. GradSource replaces gut-feel hiring with dynamic, criteria-based talent leaderboards — built specifically for the financial sector.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button onClick={onWaitlist} style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'DM Sans, sans-serif' }}>
                I'm a Candidate — It's Free <ChevronRight size={16} />
              </button>
              <button onClick={onWaitlist} style={{ background: 'transparent', color: '#1E3A5F', border: '2px solid rgba(30,58,95,0.35)', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'DM Sans, sans-serif' }}>
                I'm an Employer <ChevronRight size={16} />
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 40, flexWrap: 'wrap' }}>
              {[['312+', 'Graduates Joined'], ['50+', 'Employers Interested'], ['Free', 'For Candidates']].map(([v, l]) => (
                <div key={l}>
                  <div className="font-syne" style={{ fontSize: 22, fontWeight: 700, color: '#D4A017' }}>{v}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <LeaderboardWidget />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── PROBLEM ──────────────────────────────────────────────────────────────────
function Problem() {
  const ref = useScrollAnimation()
  return (
    <section ref={ref} style={{ background: '#0D1B2A', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 className="font-syne" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: '#fff' }}>
            Hiring is Broken.<br /><span style={{ color: '#F5C842' }}>We Fixed It.</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
          <div className="fade-up" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <XCircle size={20} color="#ef4444" />
              <span className="font-syne" style={{ fontSize: 18, fontWeight: 700, color: '#94a3b8' }}>The Old Way</span>
            </div>
            {[
              'Stack of identical CVs',
              'No objective insight',
              'Rejected candidates never know why',
              'Gut-feel decisions',
              'Weeks of back-and-forth',
              'Bias-prone shortlisting',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <X size={10} color="#ef4444" />
                </div>
                <span style={{ color: '#64748b', fontSize: 14, textDecoration: 'line-through' }}>{item}</span>
              </div>
            ))}
          </div>
          <div className="fade-up glow-border-gold" style={{ background: 'rgba(245,200,66,0.05)', borderRadius: 16, padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <CheckCircle size={20} color="#F5C842" />
              <span className="font-syne" style={{ fontSize: 18, fontWeight: 700, color: '#F5C842' }}>The GradSource Way</span>
            </div>
            {[
              'Ranked, criteria-based leaderboards',
              'Objective multi-factor scoring',
              'AI-powered personalised feedback',
              'Data-driven shortlisting',
              'One integrated platform',
              'Pay per successful hire',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle size={10} color="#F5C842" />
                </div>
                <span style={{ color: '#e2e8f0', fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CANDIDATE DEMO ───────────────────────────────────────────────────────────
function CandidateDemo() {
  const [step, setStep] = useState(1)
  const [showPass, setShowPass] = useState(false)
  const ref = useScrollAnimation()

  const Step1 = () => (
    <div style={{ padding: 32 }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ background: 'linear-gradient(135deg,#00D4FF,#00F5C4)', borderRadius: 6, padding: 5, display: 'flex' }}><Zap size={14} color="#0A0F1E" /></div>
          <span className="font-syne" style={{ color: '#fff', fontWeight: 700 }}>GradSource</span>
        </div>
        <p style={{ color: '#64748b', fontSize: 13 }}>Sign in to your candidate account</p>
      </div>
      <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, marginBottom: 6 }}>Email</label>
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: '#e2e8f0', fontSize: 14 }}>sophia.rhodes@lse.ac.uk</div>
      <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, marginBottom: 6 }}>Password</label>
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 8, padding: '10px 14px', marginBottom: 24, color: '#e2e8f0', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>{showPass ? 'password123' : '••••••••••••'}</span>
        <button onClick={() => setShowPass(!showPass)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>{showPass ? <EyeOff size={14} /> : <Eye size={14} />}</button>
      </div>
      <button onClick={() => setStep(2)} style={{ width: '100%', background: 'linear-gradient(135deg,#00D4FF,#00F5C4)', color: '#0A0F1E', border: 'none', borderRadius: 8, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Sign In</button>
    </div>
  )

  const Step2 = () => (
    <div style={{ padding: 24 }}>
      <div style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: 10, padding: 16, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#00D4FF,#00F5C4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span className="font-syne" style={{ color: '#0A0F1E', fontWeight: 800, fontSize: 16 }}>SR</span>
        </div>
        <div>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>Welcome back, Sophia 👋</div>
          <div style={{ color: '#64748b', fontSize: 12 }}>LSE · BSc Finance · Graduate 2024</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'LinkedIn Connected', color: '#00D4FF', icon: <Linkedin size={14} />, val: '✓ Connected' },
          { label: 'Aptitude Test', color: '#00F5C4', icon: <Brain size={14} />, val: '91/100' },
          { label: 'Financial Modelling', color: '#F5C842', icon: <BarChart2 size={14} />, val: '88/100' },
          { label: 'AI Sales Simulation', color: '#00D4FF', icon: <Sparkles size={14} />, val: null, pulse: true },
        ].map(c => (
          <div key={c.label} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(${c.color === '#00D4FF' ? '0,212,255' : c.color === '#00F5C4' ? '0,245,196' : '245,200,66'},0.2)`, borderRadius: 8, padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, color: c.color }}>{c.icon}<span style={{ fontSize: 10, fontWeight: 600 }}>{c.label.toUpperCase()}</span></div>
            {c.pulse ? (
              <button className="pulse-ring" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: '#00D4FF', borderRadius: 6, padding: '4px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Start Now</button>
            ) : (
              <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: 14 }}>{c.val}</div>
            )}
          </div>
        ))}
      </div>
      <button onClick={() => setStep(3)} style={{ width: '100%', background: 'linear-gradient(135deg,#00D4FF,#00F5C4)', color: '#0A0F1E', border: 'none', borderRadius: 8, padding: '11px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>View Matched Roles →</button>
    </div>
  )

  const Step3 = () => (
    <div style={{ padding: 24 }}>
      <h3 className="font-syne" style={{ color: '#fff', fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Your Matched Roles</h3>
      {[
        { role: 'Junior Financial Analyst', company: 'Apex Capital', match: 97, color: '#00F5C4' },
        { role: 'Graduate Risk Associate', company: 'Meridian Bank', match: 91, color: '#00D4FF' },
        { role: 'Sales & Trading Analyst', company: 'Vortex Markets', match: 84, color: '#F5C842' },
      ].map(job => (
        <div key={job.role} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 14, marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>{job.role}</div>
            <div style={{ color: '#64748b', fontSize: 11 }}>{job.company}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <span style={{ color: job.color, fontWeight: 700, fontSize: 13 }}>{job.match}% match</span>
            <button onClick={() => setStep(4)} style={{ background: 'rgba(0,212,255,0.1)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.3)', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>I'm Interested</button>
          </div>
        </div>
      ))}
    </div>
  )

  const Step4 = () => (
    <div style={{ padding: 28, textAlign: 'center' }}>
      <div style={{ fontSize: 40, marginBottom: 8 }}>🏆</div>
      <div className="font-syne" style={{ color: '#F5C842', fontSize: 17, fontWeight: 800, marginBottom: 4 }}>You're in the Top 5% of Candidates</div>
      <div style={{ color: '#64748b', fontSize: 13, marginBottom: 20 }}>Overall Rank <span style={{ color: '#00D4FF', fontWeight: 700 }}>#3</span> of 247</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16, textAlign: 'left' }}>
        {[['LinkedIn', 88], ['Aptitude', 91], ['Technical', 88], ['Simulation', '—']].map(([k, v]) => (
          <div key={k} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ color: '#64748b', fontSize: 10, marginBottom: 4 }}>{k.toUpperCase()}</div>
            <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: 16 }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.25)', borderRadius: 10, padding: 14, textAlign: 'left', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <Brain size={13} color="#00D4FF" />
          <span style={{ color: '#00D4FF', fontSize: 12, fontWeight: 600 }}>AI Insight</span>
        </div>
        <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.6 }}>Employers are currently prioritising Excel modelling and regulatory awareness. Complete your simulation to move to <span style={{ color: '#00F5C4', fontWeight: 600 }}>#1</span>.</p>
      </div>
      <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}>Restart Demo</button>
    </div>
  )

  return (
    <section ref={ref} style={{ padding: '100px 24px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>CANDIDATE EXPERIENCE</span>
          </div>
          <h2 className="font-syne" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, color: '#0A0F1E' }}>See It From a<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Graduate's Perspective</span></h2>
        </div>
        <div className="fade-up" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 480 }}>
            <div className="glow-border-teal" style={{ borderRadius: 16, background: '#0D1B2A', overflow: 'hidden' }}>
              <div style={{ background: 'rgba(0,212,255,0.06)', padding: '12px 16px', borderBottom: '1px solid rgba(0,212,255,0.1)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
                <span style={{ marginLeft: 8, fontSize: 12, color: '#64748b' }}>app.gradsource.io/candidate</span>
              </div>
              <div style={{ minHeight: 380 }}>
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}
                {step === 4 && <Step4 />}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '16px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                {[1, 2, 3, 4].map(s => (
                  <div key={s} style={{ width: s === step ? 20 : 8, height: 8, borderRadius: 4, background: s === step ? '#00D4FF' : 'rgba(255,255,255,0.15)', transition: 'all 0.3s' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── EMPLOYER DEMO ────────────────────────────────────────────────────────────
function EmployerDemo() {
  const [step, setStep] = useState(1)
  const [toast, setToast] = useState(null)
  const [rowsVisible, setRowsVisible] = useState(false)
  const ref = useScrollAnimation()

  const showToast = (name) => {
    setToast(`Interview invitation sent to ${name}`)
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    if (step === 3) setTimeout(() => setRowsVisible(true), 100)
  }, [step])

  const criteria = [
    { label: 'CV / Experience', pct: 15, note: 'Min 1yr experience' },
    { label: 'Education', pct: 10, note: '2:1 Finance degree' },
    { label: 'Aptitude Test', pct: 20, note: 'Top 20%' },
    { label: 'Technical Assessment', pct: 25, note: 'Top 5% financial modelling' },
    { label: 'AI Simulation', pct: 20, note: 'Sales roleplay' },
    { label: 'LinkedIn', pct: 10, note: 'Active profile, 200+ connections' },
  ]

  const Step1 = () => (
    <div style={{ padding: 32 }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ background: 'linear-gradient(135deg,#F5C842,#ffad00)', borderRadius: 6, padding: 5, display: 'flex' }}><Building2 size={14} color="#0A0F1E" /></div>
          <span className="font-syne" style={{ color: '#fff', fontWeight: 700 }}>GradSource Employer</span>
        </div>
        <p style={{ color: '#64748b', fontSize: 13 }}>Sign in to your employer account</p>
      </div>
      <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, marginBottom: 6 }}>Email</label>
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 8, padding: '10px 14px', marginBottom: 24, color: '#e2e8f0', fontSize: 14 }}>hiring@apexcapital.co.uk</div>
      <button onClick={() => setStep(2)} style={{ width: '100%', background: 'linear-gradient(135deg,#F5C842,#ffad00)', color: '#0A0F1E', border: 'none', borderRadius: 8, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Sign In as Employer</button>
    </div>
  )

  const Step2 = () => (
    <div style={{ padding: 20 }}>
      <h3 className="font-syne" style={{ color: '#fff', fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Create Job Listing</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
        {[['Job Title', 'Junior Financial Analyst'], ['Company', 'Apex Capital'], ['Sector', 'Fintech'], ['Location', 'London Hybrid'], ['Salary', '£32,000–£38,000']].map(([k, v]) => (
          <div key={k} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 7, padding: '8px 10px', gridColumn: k === 'Job Title' || k === 'Salary' ? 'span 2' : undefined }}>
            <div style={{ color: '#64748b', fontSize: 9, marginBottom: 2 }}>{k.toUpperCase()}</div>
            <div style={{ color: '#e2e8f0', fontSize: 12, fontWeight: 500 }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 8, fontWeight: 600 }}>CRITERIA WEIGHTING</div>
        {criteria.map(c => (
          <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ flex: 1, fontSize: 11, color: '#94a3b8', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.label}</div>
            <div style={{ width: 70, height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${c.pct * 4}%`, background: 'linear-gradient(90deg,#00D4FF,#00F5C4)', borderRadius: 3 }} />
            </div>
            <span style={{ color: '#00D4FF', fontSize: 11, fontWeight: 700, width: 26 }}>{c.pct}%</span>
          </div>
        ))}
      </div>
      <button onClick={() => { setStep(3); setRowsVisible(false) }} style={{ width: '100%', background: 'linear-gradient(135deg,#F5C842,#ffad00)', color: '#0A0F1E', border: 'none', borderRadius: 8, padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Publish Role →</button>
    </div>
  )

  const Step3 = () => (
    <div style={{ padding: 16, position: 'relative' }}>
      <div style={{ color: '#00D4FF', fontSize: 12, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00F5C4', animation: 'pulseRing 1.5s infinite' }} />
        Junior Financial Analyst — Live Applicant Leaderboard
      </div>
      <div style={{ overflowX: 'auto', marginBottom: 12 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0,212,255,0.1)' }}>
              {['#', 'Candidate', 'Apt', 'Tech', 'Sim', 'Score', 'Action'].map(h => (
                <th key={h} style={{ padding: '6px 8px', color: '#64748b', fontWeight: 600, textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((row, i) => (
              <tr key={row.rank} className={`slide-in-row ${rowsVisible ? 'visible' : ''}`}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transitionDelay: `${i * 120}ms`, background: row.rank === 1 ? 'rgba(245,200,66,0.04)' : undefined }}>
                <td style={{ padding: '8px', color: row.rank === 1 ? '#F5C842' : '#64748b', fontWeight: 700 }}>{row.rank}</td>
                <td style={{ padding: '8px' }}>
                  <div style={{ color: '#e2e8f0', fontWeight: 500 }}>{row.name}</div>
                  <div style={{ color: '#64748b', fontSize: 10 }}>{row.uni}</div>
                </td>
                <td style={{ padding: '8px', color: '#00F5C4', fontWeight: 600 }}>{row.aptitude}</td>
                <td style={{ padding: '8px', color: '#00D4FF', fontWeight: 600 }}>{row.technical}</td>
                <td style={{ padding: '8px', color: '#94a3b8' }}>{row.simulation}</td>
                <td style={{ padding: '8px' }}>
                  <span style={{ background: row.rank === 1 ? 'rgba(245,200,66,0.15)' : 'rgba(0,212,255,0.1)', color: row.rank === 1 ? '#F5C842' : '#00D4FF', borderRadius: 5, padding: '2px 7px', fontWeight: 700 }}>{row.score}</span>
                </td>
                <td style={{ padding: '8px' }}>
                  <select onChange={e => { if (e.target.value) { showToast(row.name.split(' ')[0]); e.target.value = '' } }}
                    style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00D4FF', borderRadius: 5, padding: '3px 5px', fontSize: 10, cursor: 'pointer' }}>
                    <option value="">Action</option>
                    <option>Invite to Interview</option>
                    <option>Request Further Assessment</option>
                    <option>Send Additional Questions</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
        {[['247', 'Total Applicants'], ['18', 'Completed All Criteria'], ['5', 'Shortlisted']].map(([v, l]) => (
          <div key={l} style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: 7, padding: '6px 10px', flex: 1, minWidth: 60 }}>
            <div style={{ color: '#00D4FF', fontWeight: 800, fontSize: 14 }}>{v}</div>
            <div style={{ color: '#64748b', fontSize: 10 }}>{l}</div>
          </div>
        ))}
      </div>
      {toast && (
        <div className="toast" style={{ position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,245,196,0.1)', border: '1px solid rgba(0,245,196,0.3)', borderRadius: 8, padding: '8px 16px', color: '#00F5C4', fontSize: 12, whiteSpace: 'nowrap', zIndex: 10 }}>
          ✓ {toast}
        </div>
      )}
      <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 11, textDecoration: 'underline', display: 'block', textAlign: 'center', width: '100%' }}>Restart Demo</button>
    </div>
  )

  return (
    <section ref={ref} style={{ padding: '100px 24px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>EMPLOYER EXPERIENCE</span>
          </div>
          <h2 className="font-syne" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, color: '#0A0F1E' }}>See It From an<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Employer's Perspective</span></h2>
        </div>
        <div className="fade-up" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 520 }}>
            <div className="glow-border-gold" style={{ borderRadius: 16, background: '#0A0F1E', overflow: 'hidden' }}>
              <div style={{ background: 'rgba(245,200,66,0.05)', padding: '12px 16px', borderBottom: '1px solid rgba(245,200,66,0.1)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
                <span style={{ marginLeft: 8, fontSize: 12, color: '#64748b' }}>employer.gradsource.io</span>
              </div>
              <div style={{ minHeight: 380 }}>
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '14px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                {[1, 2, 3].map(s => (
                  <div key={s} style={{ width: s === step ? 20 : 8, height: 8, borderRadius: 4, background: s === step ? '#F5C842' : 'rgba(255,255,255,0.15)', transition: 'all 0.3s' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="fade-up" style={{ textAlign: 'center', marginTop: 40 }}>
          <p className="font-syne" style={{ fontSize: 20, color: '#475569', marginBottom: 4 }}>This is GradSource. Ready to hire smarter?</p>
        </div>
      </div>
    </section>
  )
}

// ─── FOR CANDIDATES ───────────────────────────────────────────────────────────
const candidateFeatures = [
  { icon: <Linkedin size={22} />, title: 'LinkedIn Presence', desc: 'Your professional footprint scores as a real signal — not just a checkbox.' },
  { icon: <Brain size={22} />, title: 'Aptitude Tests', desc: 'Standardised cognitive assessments that level the playing field.' },
  { icon: <BarChart2 size={22} />, title: 'Technical Assessments', desc: 'Sector-specific challenges: financial modelling, Excel, case studies.' },
  { icon: <GraduationCap size={22} />, title: 'Education & Credentials', desc: 'Your degree, institution and academic achievements given full context.' },
  { icon: <FileText size={22} />, title: 'CV & Experience', desc: 'Work history is still included — just as one part of a richer picture.' },
  { icon: <Sparkles size={22} />, title: 'AI-Powered Simulations', desc: 'Immersive roleplay scenarios that reveal how you actually perform.' },
]

function ForCandidates({ onWaitlist }) {
  const ref = useScrollAnimation()
  return (
    <section ref={ref} style={{ padding: '100px 24px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>FOR CANDIDATES</span>
          </div>
          <h2 className="font-syne" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, color: '#0A0F1E' }}>Built for Graduates<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>With More to Show</span></h2>
          <p style={{ color: '#64748b', marginTop: 16, fontSize: 16 }}>Free forever. No subscription. No hidden costs.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 48 }}>
          {candidateFeatures.map((f, i) => (
            <div key={f.title} className="fade-up glow-border-gold" style={{ background: '#FFFFFF', borderRadius: 14, padding: 24, transitionDelay: `${i * 80}ms` }}>
              <div style={{ color: '#D4A017', marginBottom: 14 }}>{f.icon}</div>
              <div className="font-syne" style={{ color: '#0A0F1E', fontWeight: 700, marginBottom: 8, fontSize: 15 }}>{f.title}</div>
              <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="fade-up" style={{ background: '#FFFFFF', border: '2px solid rgba(245,200,66,0.3)', borderLeft: '4px solid #D4A017', borderRadius: 14, padding: '32px 36px', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 24px rgba(245,200,66,0.1)' }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div className="font-syne" style={{ fontSize: 20, fontWeight: 800, color: '#0A0F1E', marginBottom: 10 }}>Finally — Feedback That Actually Helps You Grow</div>
            <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.7, maxWidth: 520 }}>Traditional processes leave candidates in the dark. GradSource AI analyses what employers are actively seeking and delivers personalised, actionable feedback on skills to develop — turning every application into a learning opportunity, not a dead end.</p>
          </div>
          <button onClick={onWaitlist} style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 10, padding: '14px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'DM Sans, sans-serif' }}>
            Build Your Profile — Free Forever
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── FOR EMPLOYERS ────────────────────────────────────────────────────────────
const employerFeatures = [
  { icon: <Target size={22} />, title: 'Custom Criteria Weighting', desc: 'Define exactly what matters most for your role and weight it accordingly.' },
  { icon: <TrendingUp size={22} />, title: 'Ranked Talent Leaderboards', desc: 'Instantly see your best-fit candidates ranked by your own criteria.' },
  { icon: <Sparkles size={22} />, title: 'AI-Powered Simulations', desc: 'Watch candidates perform in realistic roleplay scenarios before you meet them.' },
  { icon: <BarChart2 size={22} />, title: 'Real-Time Candidate Intelligence', desc: 'Live updates as candidates complete assessments. No waiting for batches.' },
  { icon: <Shield size={22} />, title: 'All-in-One Process', desc: 'From job post to shortlist without ever leaving the platform.' },
  { icon: <DollarSign size={22} />, title: 'Pay Per Hire', desc: '£1,500 per successful hire. No retainers, no subscriptions, no risk.' },
]

const targetBadges = ['Fintech Startups', 'Financial Services', 'Investment Banks', 'Accounting Practices', 'SMEs']

function ForEmployers({ onWaitlist }) {
  const ref = useScrollAnimation()
  return (
    <section ref={ref} style={{ padding: '100px 24px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>FOR EMPLOYERS</span>
          </div>
          <h2 className="font-syne" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, color: '#0A0F1E' }}>Hire Smarter.<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Pay Only When You Do.</span></h2>
          <p style={{ color: '#64748b', marginTop: 16, fontSize: 16 }}>£1,500 per successful hire. No monthly fees.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 20 }}>
            {targetBadges.map(b => (
              <span key={b} style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.35)', borderRadius: 100, padding: '5px 14px', fontSize: 12, color: '#D4A017', fontWeight: 600 }}>{b}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 48 }}>
          {employerFeatures.map((f, i) => (
            <div key={f.title} className="fade-up glow-border-gold" style={{ background: '#F8FAFC', borderRadius: 14, padding: 24, transitionDelay: `${i * 80}ms` }}>
              <div style={{ color: '#D4A017', marginBottom: 14 }}>{f.icon}</div>
              <div className="font-syne" style={{ color: '#0A0F1E', fontWeight: 700, marginBottom: 8, fontSize: 15 }}>{f.title}</div>
              <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="fade-up" style={{ textAlign: 'center' }}>
          <button onClick={onWaitlist} style={{ background: 'linear-gradient(135deg,#F5C842,#ffad00)', color: '#0A0F1E', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
            Join Employer Waitlist
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
const steps = [
  { n: 1, title: 'Employers Set Criteria', desc: 'Define your role requirements and weight each assessment factor exactly as you need it. Go live in minutes.' },
  { n: 2, title: 'Graduates Compete', desc: 'Candidates complete multi-factor assessments — from aptitude tests to AI simulations — all in one place.' },
  { n: 3, title: 'Hire From the Leaderboard', desc: 'Review a ranked, criteria-matched leaderboard. Invite your top candidates to interview. Pay only when you hire.' },
]

function HowItWorks() {
  const ref = useScrollAnimation()
  return (
    <section ref={ref} style={{ padding: '100px 24px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div className="fade-up">
          <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>HOW IT WORKS</span>
          </div>
          <h2 className="font-syne" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, color: '#0A0F1E', marginBottom: 64 }}>Three Steps to<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Better Hiring</span></h2>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 32, left: '16.5%', right: '16.5%', height: 2, borderTop: '2px dashed rgba(245,200,66,0.4)', display: 'none' }} className="connector-line" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, position: 'relative' }}>
            {steps.map((s, i) => (
              <div key={s.n} className="fade-up" style={{ transitionDelay: `${i * 150}ms` }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(245,200,66,0.15),rgba(212,160,23,0.08))', border: '2px solid rgba(245,200,66,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 22, fontWeight: 800, color: '#D4A017', fontFamily: 'Syne, sans-serif' }}>
                  {s.n}
                </div>
                <h3 className="font-syne" style={{ color: '#0A0F1E', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{s.title}</h3>
                <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── AI FEEDBACK SPOTLIGHT ────────────────────────────────────────────────────
function AIFeedback({ onWaitlist }) {
  const ref = useScrollAnimation()
  return (
    <section ref={ref} style={{ padding: '100px 24px', background: '#0D1B2A' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(245,200,66,0.06), rgba(212,160,23,0.03))', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 20, padding: '60px 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div className="fade-up">
            <div className="font-syne" style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, color: '#fff', marginBottom: 20, lineHeight: 1.2 }}>
              The Platform That<br /><span style={{ color: '#F5C842' }}>Makes Candidates Better</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
              GradSource AI continuously monitors what financial sector employers are actively prioritising — from Excel proficiency to regulatory awareness — and maps those signals against your individual candidate performance.
            </p>
            <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
              Every interaction generates a personalised intelligence report. Not just "you scored 78%" but exactly what that means, what top candidates do differently, and your clearest path to improvement.
            </p>
            <button onClick={onWaitlist} style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 10, padding: '13px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
              Get AI-Powered Feedback
            </button>
          </div>
          <div className="fade-up glow-border-gold" style={{ background: 'rgba(245,200,66,0.06)', borderRadius: 16, padding: 28, transitionDelay: '150ms' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Brain size={18} color="#F5C842" />
              <span className="font-syne" style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>Your AI Feedback Report</span>
              <span style={{ marginLeft: 'auto', background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '2px 10px', fontSize: 10, color: '#F5C842' }}>LIVE</span>
            </div>
            {[['LinkedIn', 88], ['Aptitude', 91], ['Technical', 88], ['Simulation', 'Pending']].map(([k, v]) => (
              <div key={k} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>{k}</span>
                  <span style={{ fontSize: 12, color: typeof v === 'number' ? '#F5C842' : '#64748b', fontWeight: 700 }}>{v}</span>
                </div>
                {typeof v === 'number' && (
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 2 }}>
                    <div style={{ height: '100%', width: `${v}%`, background: 'linear-gradient(90deg,#F5C842,#D4A017)', borderRadius: 2, transition: 'width 1.2s ease' }} />
                  </div>
                )}
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(245,200,66,0.2)', marginTop: 20, paddingTop: 20 }}>
              <div style={{ fontSize: 12, color: '#F5C842', fontWeight: 600, marginBottom: 12 }}>Key Insights</div>
              {[
                'Employers prioritising Excel & financial modelling (+15% weight)',
                'Your aptitude score places you in the 91st percentile nationally',
                'Complete AI simulation to unlock full shortlist eligibility',
                'Regulatory awareness training recommended to reach top 1%',
              ].map(tip => (
                <div key={tip} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(245,200,66,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <ChevronRight size={8} color="#F5C842" />
                  </div>
                  <span style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── PRICING ──────────────────────────────────────────────────────────────────
function Pricing({ onWaitlist }) {
  const ref = useScrollAnimation()
  const plans = [
    {
      name: 'Candidates', price: 'Free', sub: 'Forever', popular: false, teal: true,
      features: ['Complete candidate profile', 'All assessments included', 'AI-powered feedback reports', 'Matched role recommendations', 'Interview preparation tools', 'Salary benchmarking'],
    },
    {
      name: 'Employers Standard', price: '£1,500', sub: 'per successful hire', popular: false, teal: false,
      features: ['Unlimited job postings', 'Full candidate leaderboard', 'Custom criteria weighting', 'AI simulation assessments', 'Real-time candidate data', 'No monthly fees — ever'],
    },
    {
      name: 'GradSource Premium', price: '£1,500', sub: 'per hire + premium features', popular: true, gold: true,
      features: ['Everything in Standard', 'Dedicated account manager', 'Priority candidate matching', 'Advanced analytics dashboard', 'Custom branding on assessments', 'Employer brand page'],
    },
  ]
  return (
    <section ref={ref} id="pricing" style={{ padding: '100px 24px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>PRICING</span>
          </div>
          <h2 className="font-syne" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, color: '#0A0F1E' }}>Simple, Transparent<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Pricing That Works</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {plans.map((p, i) => (
            <div key={p.name} className={`fade-up ${p.gold ? 'glow-border-gold' : p.teal ? 'glow-border-teal' : ''}`}
              style={{ background: p.gold ? 'rgba(245,200,66,0.03)' : p.teal ? 'rgba(0,212,255,0.03)' : '#F8FAFC', border: !p.gold && !p.teal ? '1px solid rgba(0,0,0,0.08)' : undefined, borderRadius: 16, padding: 32, position: 'relative', transitionDelay: `${i * 100}ms` }}>
              {p.popular && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', borderRadius: 100, padding: '4px 16px', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>Most Popular</div>
              )}
              <div className="font-syne" style={{ color: p.gold ? '#D4A017' : p.teal ? '#00D4FF' : '#475569', fontSize: 13, fontWeight: 700, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.name}</div>
              <div className="font-syne" style={{ fontSize: 36, fontWeight: 800, color: '#0A0F1E', lineHeight: 1 }}>{p.price}</div>
              <div style={{ color: '#64748b', fontSize: 13, marginBottom: 28 }}>{p.sub}</div>
              {p.features.map(f => (
                <div key={f} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <CheckCircle size={15} color={p.gold ? '#D4A017' : '#00D4FF'} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 13, color: '#475569' }}>{f}</span>
                </div>
              ))}
              <button onClick={onWaitlist} style={{ marginTop: 24, width: '100%', background: p.gold ? 'linear-gradient(135deg,#F5C842,#D4A017)' : p.teal ? 'linear-gradient(135deg,#F5C842,#D4A017)' : '#0A0F1E', color: '#0A0F1E', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', ...(!p.gold && !p.teal ? { color: '#FFFFFF' } : {}) }}>
                {p.teal ? 'Get Started Free' : 'Join Waitlist'}
              </button>
            </div>
          ))}
        </div>
        <div className="fade-up" style={{ textAlign: 'center', marginTop: 32 }}>
          <p style={{ color: '#64748b', fontSize: 13 }}>Candidates are always free. Employers are never charged unless a hire is made and accepted by both parties.</p>
        </div>
      </div>
    </section>
  )
}

// ─── WAITLIST ─────────────────────────────────────────────────────────────────
function Waitlist() {
  const [tab, setTab] = useState('candidate')
  const [count, setCount] = useState(312)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', university: '', company: '', size: '' })
  const ref = useScrollAnimation()

  const handleSubmit = (e) => {
    e.preventDefault()
    setCount(c => c + 1)
    setSubmitted(true)
  }

  return (
    <section ref={ref} id="waitlist" style={{ padding: '100px 24px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="font-syne" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, color: '#0A0F1E', marginBottom: 12 }}>
            Be First. Shape the<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Future of Hiring.</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '8px 20px', marginTop: 16 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#D4A017', animation: 'pulseRing 1.5s infinite' }} />
            <span style={{ color: '#D4A017', fontWeight: 700 }}>{count}</span>
            <span style={{ color: '#64748b', fontSize: 14 }}>people already joined</span>
          </div>
        </div>
        <div className="fade-up glow-border-gold" style={{ background: '#FFFFFF', borderRadius: 20, overflow: 'hidden' }}>
          {!submitted ? (
            <>
              <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                {['candidate', 'employer'].map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    style={{ flex: 1, background: 'none', border: 'none', padding: '16px', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: tab === t ? '#D4A017' : '#64748b', fontFamily: 'DM Sans, sans-serif', borderBottom: tab === t ? '2px solid #D4A017' : '2px solid transparent', transition: 'all 0.2s' }}>
                    {t === 'candidate' ? 'I\'m a Candidate' : 'I\'m an Employer'}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} style={{ padding: 32 }}>
                {[
                  { key: 'name', label: 'Full Name', placeholder: 'Your name', required: true },
                  { key: 'email', label: 'Email Address', placeholder: 'your@email.com', type: 'email', required: true },
                  ...(tab === 'candidate' ? [{ key: 'university', label: 'University (optional)', placeholder: 'e.g. London School of Economics' }] : [
                    { key: 'company', label: 'Company Name', placeholder: 'e.g. Apex Capital', required: true },
                  ]),
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', color: '#475569', fontSize: 12, marginBottom: 6, fontWeight: 500 }}>{f.label}</label>
                    <input type={f.type || 'text'} required={f.required} placeholder={f.placeholder}
                      value={form[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      style={{ width: '100%', background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '11px 14px', color: '#0A0F1E', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
                  </div>
                ))}
                {tab === 'employer' && (
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', color: '#475569', fontSize: 12, marginBottom: 6, fontWeight: 500 }}>Company Size</label>
                    <select value={form.size} onChange={e => setForm(prev => ({ ...prev, size: e.target.value }))}
                      style={{ width: '100%', background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '11px 14px', color: form.size ? '#0A0F1E' : '#64748b', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }}>
                      <option value="" disabled>Select company size</option>
                      {['1–10', '11–50', '51–200', '201–500', '500+'].map(s => <option key={s} value={s}>{s} employees</option>)}
                    </select>
                  </div>
                )}
                <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 8, fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <Send size={16} /> Join the Waitlist
                </button>
                <p style={{ color: '#94a3b8', fontSize: 12, textAlign: 'center', marginTop: 12 }}>No spam, ever. We'll only contact you about early access.</p>
              </form>
            </>
          ) : (
            <div style={{ padding: 48, textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
              <div className="font-syne" style={{ fontSize: 22, fontWeight: 800, color: '#0A0F1E', marginBottom: 8 }}>You're on the list!</div>
              <p style={{ color: '#64748b', fontSize: 15, marginBottom: 24 }}>We'll be in touch soon. You're one of <span style={{ color: '#D4A017', fontWeight: 700 }}>{count}</span> people shaping the future of graduate hiring.</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', university: '', company: '', size: '' }) }}
                style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.4)', color: '#D4A017', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Submit another
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#0A0F1E', borderTop: '1px solid rgba(245,200,66,0.12)', padding: '60px 24px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', borderRadius: 8, padding: 6, display: 'flex' }}>
                <Zap size={16} color="#0A0F1E" strokeWidth={2.5} />
              </div>
              <span className="font-syne" style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>GradSource</span>
            </div>
            <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.7, maxWidth: 200 }}>Redefining graduate hiring for the financial sector.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <a href="#" style={{ color: '#475569', display: 'flex', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#F5C842'}
                onMouseLeave={e => e.currentTarget.style.color = '#475569'}>
                <Linkedin size={18} />
              </a>
              <a href="#" style={{ color: '#475569', display: 'flex', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#F5C842'}
                onMouseLeave={e => e.currentTarget.style.color = '#475569'}>
                <Twitter size={18} />
              </a>
            </div>
          </div>
          {[
            { title: 'Platform', links: ['For Candidates', 'For Employers', 'How It Works', 'Pricing'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
            { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>{col.title}</div>
              {col.links.map(l => (
                <a key={l} href="#" style={{ display: 'block', color: '#475569', fontSize: 13, marginBottom: 10, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#F5C842'}
                  onMouseLeave={e => e.target.style.color = '#475569'}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#334155', fontSize: 12 }}>© 2025 GradSource Ltd. All rights reserved.</span>
          <span style={{ color: '#334155', fontSize: 12 }}>Built for the next generation of financial talent.</span>
        </div>
      </div>
    </footer>
  )
}

// ─── WAITLIST MODAL ───────────────────────────────────────────────────────────
function WaitlistModal({ open, onClose }) {
  const [tab, setTab] = useState('candidate')
  const [submitted, setSubmitted] = useState(false)
  const [count, setCount] = useState(312)
  const [form, setForm] = useState({ name: '', email: '', university: '', company: '', size: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setCount(c => c + 1)
    setSubmitted(true)
  }

  if (!open) return null
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)' }} />
      <div className="glow-border-gold" style={{ position: 'relative', background: '#FFFFFF', borderRadius: 20, width: '100%', maxWidth: 460, maxHeight: '90vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', zIndex: 1 }}>
          <X size={20} />
        </button>
        <div style={{ padding: '32px 32px 0', textAlign: 'center' }}>
          <div className="font-syne" style={{ fontSize: 22, fontWeight: 800, color: '#0A0F1E', marginBottom: 4 }}>Join the Waitlist</div>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>Be first to access GradSource</p>
        </div>
        {!submitted ? (
          <>
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.08)', margin: '0 32px' }}>
              {['candidate', 'employer'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  style={{ flex: 1, background: 'none', border: 'none', padding: '12px', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: tab === t ? '#D4A017' : '#64748b', fontFamily: 'DM Sans, sans-serif', borderBottom: tab === t ? '2px solid #D4A017' : '2px solid transparent' }}>
                  {t === 'candidate' ? 'Candidate' : 'Employer'}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} style={{ padding: 32 }}>
              {[
                { key: 'name', label: 'Full Name', placeholder: 'Your name', required: true },
                { key: 'email', label: 'Email', placeholder: 'your@email.com', type: 'email', required: true },
                ...(tab === 'candidate' ? [{ key: 'university', label: 'University (optional)', placeholder: 'e.g. LSE' }] : [
                  { key: 'company', label: 'Company', placeholder: 'e.g. Apex Capital', required: true },
                ]),
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', color: '#475569', fontSize: 12, marginBottom: 5 }}>{f.label}</label>
                  <input type={f.type || 'text'} required={f.required} placeholder={f.placeholder}
                    value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ width: '100%', background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '10px 13px', color: '#0A0F1E', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
                </div>
              ))}
              {tab === 'employer' && (
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', color: '#475569', fontSize: 12, marginBottom: 5 }}>Company Size</label>
                  <select value={form.size} onChange={e => setForm(p => ({ ...p, size: e.target.value }))}
                    style={{ width: '100%', background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '10px 13px', color: form.size ? '#0A0F1E' : '#64748b', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }}>
                    <option value="" disabled>Select company size</option>
                    {['1–10', '11–50', '51–200', '201–500', '500+'].map(s => <option key={s} value={s}>{s} employees</option>)}
                  </select>
                </div>
              )}
              <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 4, fontFamily: 'DM Sans, sans-serif' }}>
                Join Waitlist
              </button>
              <p style={{ color: '#334155', fontSize: 11, textAlign: 'center', marginTop: 10 }}>No spam, ever.</p>
            </form>
          </>
        ) : (
          <div style={{ padding: 40, textAlign: 'center' }}>
            <div style={{ fontSize: 44 }}>🎉</div>
            <div className="font-syne" style={{ fontSize: 20, fontWeight: 800, color: '#0A0F1E', margin: '12px 0 8px' }}>You're on the list!</div>
            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>You're <span style={{ color: '#D4A017', fontWeight: 700 }}>#{count}</span> in line for early access.</p>
            <button onClick={onClose} style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Close</button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const openWaitlist = () => setModalOpen(true)

  return (
    <>
      <style>{FONTS}</style>
      <div style={{ fontFamily: 'DM Sans, sans-serif' }}>
        <Nav onWaitlist={openWaitlist} />
        <Hero onWaitlist={openWaitlist} />
        <Problem />
        <CandidateDemo />
        <EmployerDemo />
        <ForCandidates onWaitlist={openWaitlist} />
        <ForEmployers onWaitlist={openWaitlist} />
        <HowItWorks />
        <AIFeedback onWaitlist={openWaitlist} />
        <Pricing onWaitlist={openWaitlist} />
        <Waitlist />
        <Footer />
        <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </>
  )
}
