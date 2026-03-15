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
html, body { width: 100%; overflow-x: hidden; }
body { background: #FFFFFF; font-family: 'DM Sans', sans-serif; color: #0A0F1E; }
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
.page-transition { transition: opacity 0.3s ease; }
.back-btn { display: inline-flex; align-items: center; gap: 6px; background: none; border: 1px solid rgba(0,0,0,0.12); border-radius: 8px; padding: 8px 14px; font-size: 13px; font-weight: 600; color: #475569; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
.back-btn:hover { border-color: #D4A017; color: #D4A017; }
`

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY

const UK_UNIVERSITIES = ['Abertay University','Aberystwyth University','Anglia Ruskin University','Arts University Bournemouth','Aston University','Bangor University','Bath Spa University','Birmingham City University','Bishop Grosseteste University','Bournemouth University','Brunel University London','Buckinghamshire New University','Canterbury Christ Church University','Cardiff Metropolitan University','Cardiff University','City University of London','Coventry University','De Montfort University','Durham University','Edge Hill University','Edinburgh Napier University','Falmouth University','Glasgow Caledonian University','Glasgow School of Art','Goldsmiths University of London','Heriot-Watt University','Imperial College London','Keele University','King\'s College London','Kingston University','Lancaster University','Leeds Arts University','Leeds Beckett University','Leeds Trinity University','Liverpool Hope University','Liverpool John Moores University','London Metropolitan University','London South Bank University','Loughborough University','Manchester Metropolitan University','Middlesex University','Newcastle University','Newman University','Northumbria University','Norwich University of the Arts','Nottingham Trent University','Open University','Oxford Brookes University','Queen Margaret University Edinburgh','Queen Mary University of London','Queen\'s University Belfast','Robert Gordon University','Roehampton University','Royal Agricultural University','Royal College of Art','Royal Holloway University of London','Sheffield Hallam University','Southampton Solent University','St George\'s University of London','St Mary\'s University Twickenham','Staffordshire University','Swansea University','Teesside University','Ulster University','University College London','University for the Creative Arts','University of Aberdeen','University of Bath','University of Bedfordshire','University of Birmingham','University of Bolton','University of Bradford','University of Brighton','University of Bristol','University of Buckingham','University of Cambridge','University of Central Lancashire','University of Chester','University of Chichester','University of Cumbria','University of Derby','University of Dundee','University of East Anglia','University of East London','University of Edinburgh','University of Essex','University of Exeter','University of Glasgow','University of Gloucestershire','University of Greenwich','University of Hertfordshire','University of Huddersfield','University of Hull','University of Kent','University of Leeds','University of Leicester','University of Lincoln','University of Liverpool','University of Manchester','University of Northampton','University of Nottingham','University of Oxford','University of Plymouth','University of Portsmouth','University of Reading','University of Salford','University of Sheffield','University of South Wales','University of Southampton','University of St Andrews','University of Stirling','University of Strathclyde','University of Suffolk','University of Sunderland','University of Surrey','University of Sussex','University of the Arts London','University of the Highlands and Islands','University of the West of England','University of the West of Scotland','University of Wales Trinity Saint David','University of Warwick','University of West London','University of Westminster','University of Winchester','University of Wolverhampton','University of Worcester','University of York','Wrexham Glyndwr University','York St John University','Other']

async function addToBrevo({ email, name, role, university }) {
  const listIds = role === 'employer' ? [4] : [3]
  console.log('university:', university)
  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': BREVO_API_KEY,
    },
    body: JSON.stringify({ email, attributes: { FIRSTNAME: name, UNIVERSITY: university }, listIds, updateEnabled: true }),
  })
  if (!res.ok && res.status !== 204) throw new Error('Brevo error')
}

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
function Nav({ onWaitlist, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id) => {
    onNavigate('home')
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 350)
  }

  const navLinks = [
    { label: 'For Candidates', action: () => onNavigate('candidate') },
    { label: 'For Employers', action: () => onNavigate('employer') },
    { label: 'How It Works', action: () => scrollTo('how-it-works') },
    { label: 'Pricing', action: () => scrollTo('pricing') },
  ]

  return (
    <nav
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, transition: 'all 0.3s' }}
      className={scrolled ? 'frosted' : ''}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <div onClick={() => onNavigate('home')} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <div style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', borderRadius: 8, padding: 6, display: 'flex' }}>
            <Zap size={18} color="#0A0F1E" strokeWidth={2.5} />
          </div>
          <span className="font-syne" style={{ fontSize: 20, fontWeight: 700, color: '#0A0F1E', letterSpacing: '-0.5px' }}>GradSource</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          {navLinks.map(({ label, action }) => (
            <a key={label} href="#" onClick={e => { e.preventDefault(); if (action) action() }}
              style={{ color: '#475569', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#D4A017'}
              onMouseLeave={e => e.target.style.color = '#475569'}>{label}</a>
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
          {navLinks.map(({ label, action }) => (
            <a key={label} href="#" onClick={e => { e.preventDefault(); setMenuOpen(false); if (action) action() }}
              style={{ display: 'block', color: '#475569', padding: '12px 0', fontSize: 15, textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>{label}</a>
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
  const rankColor = (r) => r === 1 ? '#D4A017' : r === 2 ? '#64748b' : r === 3 ? '#92400e' : '#94a3b8'
  return (
    <div className="float glow-border-gold" style={{ borderRadius: 16, background: '#FFFFFF', overflow: 'hidden', width: '100%', maxWidth: 580, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
      <div style={{ background: '#F8FAFC', padding: '14px 20px', borderBottom: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ marginLeft: 8, fontSize: 13, color: '#64748b', fontFamily: 'monospace' }}>Junior Analyst — Live Leaderboard</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#0A0F1E' }}>
              {['#', 'Candidate', 'LinkedIn', 'Aptitude', 'Technical', 'Simulation', 'Score'].map(h => (
                <th key={h} style={{ padding: '10px 12px', color: '#FFFFFF', fontWeight: 600, textAlign: 'left', whiteSpace: 'nowrap', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((row, i) => (
              <tr key={row.rank} className={`slide-in-row ${visible ? 'visible' : ''}`}
                style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', transitionDelay: `${i * 150}ms`, background: row.rank === 1 ? 'rgba(245,200,66,0.08)' : i % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                <td style={{ padding: '12px 12px', color: rankColor(row.rank), fontWeight: 700, fontSize: 15 }}>{row.rank}</td>
                <td style={{ padding: '12px 12px' }}>
                  <div style={{ fontWeight: 600, color: '#0A0F1E' }}>{row.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{row.uni}</div>
                </td>
                {[row.linkedin, row.aptitude, row.technical, row.simulation].map((v, j) => (
                  <td key={j} style={{ padding: '12px 12px', color: v >= 90 ? '#D4A017' : v >= 80 ? '#1E3A5F' : '#64748b', fontWeight: 600 }}>{v}</td>
                ))}
                <td style={{ padding: '12px 12px' }}>
                  <span style={{ background: row.rank === 1 ? 'rgba(245,200,66,0.15)' : 'rgba(30,58,95,0.08)', color: row.rank === 1 ? '#D4A017' : '#1E3A5F', borderRadius: 6, padding: '3px 10px', fontWeight: 700, fontSize: 14 }}>{row.score}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Hero({ onWaitlist, onNavigate }) {
  return (
    <section className="dot-grid" style={{ minHeight: '100vh', paddingTop: 120, paddingBottom: 80, position: 'relative', overflow: 'hidden', background: '#FFFFFF' }}>
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(245,200,66,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(212,160,23,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80, alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <Sparkles size={14} color="#D4A017" />
              <span style={{ fontSize: 13, color: '#D4A017', fontWeight: 500 }}>Skills-Based Graduate Hiring for Financial Services</span>
            </div>
            <h1 className="font-syne" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, lineHeight: 1.1, color: '#0A0F1E', marginBottom: 24, letterSpacing: '-1px' }}>
              The Leaderboard for<br />
              <span style={{ background: 'linear-gradient(135deg, #F5C842, #D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Graduate Talent</span>
            </h1>
            <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}>
              Skills-based hiring infrastructure for boutique financial firms and startups. Candidates assessed once. Pre-screened leaderboards built to your criteria. Pay only when you hire.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button onClick={() => onNavigate('candidate')} style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'DM Sans, sans-serif' }}>
                I'm a Candidate — It's Free <ChevronRight size={16} />
              </button>
              <button onClick={() => onNavigate('employer')} style={{ background: 'transparent', color: '#1E3A5F', border: '2px solid rgba(30,58,95,0.35)', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'DM Sans, sans-serif' }}>
                I'm an Employer <ChevronRight size={16} />
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 40, flexWrap: 'wrap' }}>
              {[['287+', 'Candidates Joined'], ['31+', 'Employers Interested'], ['Free', 'For Candidates']].map(([v, l]) => (
                <div key={l}>
                  <div className="font-syne" style={{ fontSize: 22, fontWeight: 700, color: '#D4A017' }}>{v}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 280 }}>
            <LeaderboardWidget />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── UNIVERSITY BAR ───────────────────────────────────────────────────────────
const universities = ['LSE', 'Imperial', 'Warwick', 'UCL', 'Bath', 'Durham', 'Exeter', 'Nottingham']

function UniversityBar() {
  return (
    <div style={{ background: '#F8FAFC', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '20px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500, whiteSpace: 'nowrap' }}>Trusted by graduates from</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
          {universities.map(u => (
            <span key={u} style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 100, padding: '5px 14px', fontSize: 12, color: '#1E3A5F', fontWeight: 600 }}>{u}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── PROBLEM ──────────────────────────────────────────────────────────────────
function Problem() {
  const ref = useScrollAnimation()
  return (
    <section ref={ref} style={{ background: '#FFFFFF', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 className="font-syne" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: '#0A0F1E' }}>
            Hiring is Broken.<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>We Fixed It.</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
          <div className="fade-up" style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <XCircle size={20} color="#ef4444" />
              <span className="font-syne" style={{ fontSize: 18, fontWeight: 700, color: '#475569' }}>The Old Way</span>
            </div>
            {[
              'Hundreds of CVs to review manually',
              'No insight into real candidate capability',
              'Candidates repeat identical assessments across dozens of applications',
              'Smaller firms cannot compete with Big Four screening processes',
              'Recruitment agencies charging 10–15% of salary',
              'Gut-feel decisions based on academic record alone',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <X size={10} color="#ef4444" />
                </div>
                <span style={{ color: '#94a3b8', fontSize: 14, textDecoration: 'line-through' }}>{item}</span>
              </div>
            ))}
          </div>
          <div className="fade-up glow-border-gold" style={{ background: '#FFFFFF', borderRadius: 16, padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <CheckCircle size={20} color="#D4A017" />
              <span className="font-syne" style={{ fontSize: 18, fontWeight: 700, color: '#D4A017' }}>The GradSource Way</span>
            </div>
            {[
              'Criteria-based pre-screening — only qualified candidates surfaced',
              'Candidates assessed once using Big-Four-quality evaluations',
              'Performance leaderboards ranked to your exact criteria',
              'Boutique firms access institutional-grade screening',
              'Flat £1,999 success fee — pay only when you hire',
              'Skills-based discovery that goes far beyond the CV',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle size={10} color="#D4A017" />
                </div>
                <span style={{ color: '#1E3A5F', fontSize: 14 }}>{item}</span>
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
          <div style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', borderRadius: 6, padding: 5, display: 'flex' }}><Zap size={14} color="#0A0F1E" /></div>
          <span className="font-syne" style={{ color: '#0A0F1E', fontWeight: 700 }}>GradSource</span>
        </div>
        <p style={{ color: '#64748b', fontSize: 13 }}>Sign in to your candidate account</p>
      </div>
      <label style={{ display: 'block', color: '#475569', fontSize: 12, marginBottom: 6 }}>Email</label>
      <div style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: '#0A0F1E', fontSize: 14 }}>sophia.rhodes@lse.ac.uk</div>
      <label style={{ display: 'block', color: '#475569', fontSize: 12, marginBottom: 6 }}>Password</label>
      <div style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '10px 14px', marginBottom: 24, color: '#0A0F1E', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>{showPass ? 'password123' : '••••••••••••'}</span>
        <button onClick={() => setShowPass(!showPass)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>{showPass ? <EyeOff size={14} /> : <Eye size={14} />}</button>
      </div>
      <button onClick={() => setStep(2)} style={{ width: '100%', background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 8, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Sign In</button>
    </div>
  )

  const Step2 = () => (
    <div style={{ padding: 24 }}>
      <div style={{ background: 'rgba(245,200,66,0.07)', border: '1px solid rgba(245,200,66,0.25)', borderRadius: 10, padding: 16, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#F5C842,#D4A017)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span className="font-syne" style={{ color: '#0A0F1E', fontWeight: 800, fontSize: 16 }}>SR</span>
        </div>
        <div>
          <div style={{ color: '#0A0F1E', fontWeight: 600, fontSize: 15 }}>Welcome back, Sophia 👋</div>
          <div style={{ color: '#64748b', fontSize: 12 }}>LSE · BSc Finance · Graduate 2024</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'LinkedIn Connected', color: '#00D4FF', borderRgb: '0,212,255', icon: <Linkedin size={14} />, val: '✓ Connected' },
          { label: 'Aptitude Test', color: '#D4A017', borderRgb: '212,160,23', icon: <Brain size={14} />, val: '91/100' },
          { label: 'Financial Modelling', color: '#D4A017', borderRgb: '212,160,23', icon: <BarChart2 size={14} />, val: '88/100' },
          { label: 'AI Sales Simulation', color: '#D4A017', borderRgb: '212,160,23', icon: <Sparkles size={14} />, val: null, pulse: true },
        ].map(c => (
          <div key={c.label} style={{ background: '#F8FAFC', border: `1px solid rgba(${c.borderRgb},0.25)`, borderRadius: 8, padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, color: c.color }}>{c.icon}<span style={{ fontSize: 10, fontWeight: 600 }}>{c.label.toUpperCase()}</span></div>
            {c.pulse ? (
              <button className="pulse-ring" style={{ background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.4)', color: '#D4A017', borderRadius: 6, padding: '4px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Start Now</button>
            ) : (
              <div style={{ color: '#0A0F1E', fontWeight: 700, fontSize: 14 }}>{c.val}</div>
            )}
          </div>
        ))}
      </div>
      <button onClick={() => setStep(3)} style={{ width: '100%', background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 8, padding: '11px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>View Matched Roles →</button>
    </div>
  )

  const Step3 = () => (
    <div style={{ padding: 24 }}>
      <h3 className="font-syne" style={{ color: '#0A0F1E', fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Your Matched Roles</h3>
      {[
        { role: 'Junior Financial Analyst', company: 'Apex Capital', match: 97, color: '#D4A017' },
        { role: 'Graduate Risk Associate', company: 'Meridian Bank', match: 91, color: '#1E3A5F' },
        { role: 'Sales & Trading Analyst', company: 'Vortex Markets', match: 84, color: '#64748b' },
      ].map(job => (
        <div key={job.role} style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 10, padding: 14, marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ color: '#0A0F1E', fontWeight: 600, fontSize: 13 }}>{job.role}</div>
            <div style={{ color: '#64748b', fontSize: 11 }}>{job.company}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <span style={{ color: job.color, fontWeight: 700, fontSize: 13 }}>{job.match}% match</span>
            <button onClick={() => setStep(4)} style={{ background: 'rgba(245,200,66,0.1)', color: '#D4A017', border: '1px solid rgba(245,200,66,0.35)', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>I'm Interested</button>
          </div>
        </div>
      ))}
    </div>
  )

  const Step4 = () => (
    <div style={{ padding: 28, textAlign: 'center' }}>
      <div style={{ fontSize: 40, marginBottom: 8 }}>🏆</div>
      <div className="font-syne" style={{ color: '#D4A017', fontSize: 17, fontWeight: 800, marginBottom: 4 }}>You're in the Top 5% of Candidates</div>
      <div style={{ color: '#64748b', fontSize: 13, marginBottom: 20 }}>Overall Rank <span style={{ color: '#D4A017', fontWeight: 700 }}>#3</span> of 247</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16, textAlign: 'left' }}>
        {[['LinkedIn', 88], ['Aptitude', 91], ['Technical', 88], ['Simulation', '—']].map(([k, v]) => (
          <div key={k} style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ color: '#64748b', fontSize: 10, marginBottom: 4 }}>{k.toUpperCase()}</div>
            <div style={{ color: '#0A0F1E', fontWeight: 700, fontSize: 16 }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(245,200,66,0.06)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 10, padding: 14, textAlign: 'left', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <Brain size={13} color="#D4A017" />
          <span style={{ color: '#D4A017', fontSize: 12, fontWeight: 600 }}>AI Insight</span>
        </div>
        <p style={{ color: '#475569', fontSize: 12, lineHeight: 1.6 }}>Boutique firms are currently prioritising financial modelling and regulatory awareness. Complete your simulation to move to <span style={{ color: '#D4A017', fontWeight: 600 }}>#1</span> and unlock pre-screened matches.</p>
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
            <div className="glow-border-gold" style={{ borderRadius: 16, background: '#FFFFFF', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
              <div style={{ background: '#F8FAFC', padding: '12px 16px', borderBottom: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 8 }}>
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
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '16px 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                {[1, 2, 3, 4].map(s => (
                  <div key={s} style={{ width: s === step ? 20 : 8, height: 8, borderRadius: 4, background: s === step ? '#D4A017' : 'rgba(0,0,0,0.1)', transition: 'all 0.3s' }} />
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
          <div style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', borderRadius: 6, padding: 5, display: 'flex' }}><Building2 size={14} color="#0A0F1E" /></div>
          <span className="font-syne" style={{ color: '#0A0F1E', fontWeight: 700 }}>GradSource Employer</span>
        </div>
        <p style={{ color: '#64748b', fontSize: 13 }}>Sign in to your employer account</p>
      </div>
      <label style={{ display: 'block', color: '#475569', fontSize: 12, marginBottom: 6 }}>Email</label>
      <div style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '10px 14px', marginBottom: 24, color: '#0A0F1E', fontSize: 14 }}>hiring@apexcapital.co.uk</div>
      <button onClick={() => setStep(2)} style={{ width: '100%', background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 8, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Sign In as Employer</button>
    </div>
  )

  const Step2 = () => (
    <div style={{ padding: 20 }}>
      <h3 className="font-syne" style={{ color: '#0A0F1E', fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Create Job Listing</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
        {[['Job Title', 'Junior Financial Analyst'], ['Company', 'Apex Capital'], ['Sector', 'Fintech'], ['Location', 'London Hybrid'], ['Salary', '£32,000–£38,000']].map(([k, v]) => (
          <div key={k} style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 7, padding: '8px 10px', gridColumn: k === 'Job Title' || k === 'Salary' ? 'span 2' : undefined }}>
            <div style={{ color: '#64748b', fontSize: 9, marginBottom: 2 }}>{k.toUpperCase()}</div>
            <div style={{ color: '#0A0F1E', fontSize: 12, fontWeight: 500 }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ color: '#475569', fontSize: 11, marginBottom: 8, fontWeight: 600 }}>CRITERIA WEIGHTING</div>
        {criteria.map(c => (
          <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ flex: 1, fontSize: 11, color: '#64748b', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.label}</div>
            <div style={{ width: 70, height: 5, background: 'rgba(0,0,0,0.08)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${c.pct * 4}%`, background: 'linear-gradient(90deg,#F5C842,#D4A017)', borderRadius: 3 }} />
            </div>
            <span style={{ color: '#D4A017', fontSize: 11, fontWeight: 700, width: 26 }}>{c.pct}%</span>
          </div>
        ))}
      </div>
      <button onClick={() => { setStep(3); setRowsVisible(false) }} style={{ width: '100%', background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 8, padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Publish Role →</button>
    </div>
  )

  const Step3 = () => (
    <div style={{ padding: 16, position: 'relative' }}>
      <div style={{ color: '#D4A017', fontSize: 12, fontWeight: 600, marginBottom: 12, marginTop: 316, display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4A017', animation: 'pulseRing 1.5s infinite' }} />
        Junior Financial Analyst — Live Applicant Leaderboard
      </div>
      <div style={{ overflowX: 'auto', marginBottom: 12 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
          <thead>
            <tr style={{ background: '#0A0F1E' }}>
              {['#', 'Candidate', 'Apt', 'Tech', 'Sim', 'Score', 'Action'].map(h => (
                <th key={h} style={{ padding: '6px 8px', color: '#FFFFFF', fontWeight: 600, textAlign: 'left', whiteSpace: 'nowrap', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((row, i) => (
              <tr key={row.rank} className={`slide-in-row ${rowsVisible ? 'visible' : ''}`}
                style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', transitionDelay: `${i * 120}ms`, background: row.rank === 1 ? 'rgba(245,200,66,0.08)' : i % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                <td style={{ padding: '8px', color: row.rank === 1 ? '#D4A017' : '#64748b', fontWeight: 700 }}>{row.rank}</td>
                <td style={{ padding: '8px' }}>
                  <div style={{ color: '#0A0F1E', fontWeight: 500 }}>{row.name}</div>
                  <div style={{ color: '#64748b', fontSize: 10 }}>{row.uni}</div>
                </td>
                <td style={{ padding: '8px', color: '#D4A017', fontWeight: 600 }}>{row.aptitude}</td>
                <td style={{ padding: '8px', color: '#1E3A5F', fontWeight: 600 }}>{row.technical}</td>
                <td style={{ padding: '8px', color: '#64748b' }}>{row.simulation}</td>
                <td style={{ padding: '8px' }}>
                  <span style={{ background: row.rank === 1 ? 'rgba(245,200,66,0.15)' : 'rgba(30,58,95,0.08)', color: row.rank === 1 ? '#D4A017' : '#1E3A5F', borderRadius: 5, padding: '2px 7px', fontWeight: 700 }}>{row.score}</span>
                </td>
                <td style={{ padding: '8px' }}>
                  <select onChange={e => { if (e.target.value) { showToast(row.name.split(' ')[0]); e.target.value = '' } }}
                    style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.12)', color: '#1E3A5F', borderRadius: 5, padding: '3px 5px', fontSize: 10, cursor: 'pointer' }}>
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
          <div key={l} style={{ background: 'rgba(245,200,66,0.07)', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 7, padding: '6px 10px', flex: 1, minWidth: 60 }}>
            <div style={{ color: '#D4A017', fontWeight: 800, fontSize: 14 }}>{v}</div>
            <div style={{ color: '#64748b', fontSize: 10 }}>{l}</div>
          </div>
        ))}
      </div>
      {toast && (
        <div className="toast" style={{ position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 8, padding: '8px 16px', color: '#D4A017', fontSize: 12, whiteSpace: 'nowrap', zIndex: 10 }}>
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
            <div className="glow-border-gold" style={{ borderRadius: 16, background: '#FFFFFF', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
              <div style={{ background: '#F8FAFC', padding: '12px 16px', borderBottom: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 8 }}>
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
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '14px 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                {[1, 2, 3].map(s => (
                  <div key={s} style={{ width: s === step ? 20 : 8, height: 8, borderRadius: 4, background: s === step ? '#D4A017' : 'rgba(0,0,0,0.1)', transition: 'all 0.3s' }} />
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
  { icon: <BarChart2 size={22} />, title: 'Industry-Specific Assessments', desc: 'Replicate real analytical and commercial tasks used in financial roles — the same standard as the Big Four.' },
  { icon: <Target size={22} />, title: 'Assess Once, Match Many', desc: 'Complete your evaluation once and get matched with multiple relevant employers simultaneously. No repeated applications ever.' },
  { icon: <FileText size={22} />, title: 'No Repeated Applications', desc: 'Your profile and scores do the talking — no cover letters, no repeated identical tests across dozens of firms.' },
  { icon: <GraduationCap size={22} />, title: 'Matched to Your Preferences', desc: 'Set your salary expectations, location, role type and sector. Only relevant opportunities are surfaced to you.' },
  { icon: <Linkedin size={22} />, title: 'LinkedIn Activity', desc: 'We analyse your LinkedIn presence to reflect your professional engagement and reward candidates already building their professional brand.' },
  { icon: <Sparkles size={22} />, title: 'AI-Powered Feedback', desc: 'Receive personalised feedback on exactly what employers in your target sector are prioritising — turning every assessment into a career development opportunity.' },
]

function ForCandidates({ onWaitlist, onNavigate }) {
  const ref = useScrollAnimation()
  return (
    <section ref={ref} style={{ padding: '100px 24px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>FOR CANDIDATES</span>
          </div>
          <h2 className="font-syne" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, color: '#0A0F1E' }}>Demonstrate Your Ability Once.<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Get Matched With the Right Opportunities.</span></h2>
          <p style={{ color: '#64748b', marginTop: 16, fontSize: 16 }}>No more application fatigue. Complete our industry-specific assessments once and let GradSource match you with boutique financial firms and startups that fit your skills and ambitions. Always free.</p>
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
            <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.7, maxWidth: 520 }}>Traditional hiring processes leave candidates in the dark. You apply, you get rejected, you never know why. GradSource changes that entirely. After every assessment and simulation, our AI analyses what employers in your sector are actively prioritising and delivers personalised actionable feedback on the skills you need to develop. Whether it is financial modelling, commercial awareness or decision-making under pressure — you will know exactly what to work on and why. Every assessment becomes a learning opportunity, not a dead end.</p>
          </div>
          <button onClick={() => onNavigate('candidate')} style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 10, padding: '14px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'DM Sans, sans-serif' }}>
            Build Your Profile — Free Forever
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── FOR EMPLOYERS ────────────────────────────────────────────────────────────
const employerFeatures = [
  { icon: <Target size={22} />, title: 'Define Your Criteria', desc: 'Set required skills, role type, salary range, location and sector. GradSource builds your pre-screened leaderboard automatically.' },
  { icon: <TrendingUp size={22} />, title: 'Pre-Screened Leaderboards', desc: 'Only candidates who meet your exact requirements are surfaced — ranked by assessment performance, not CV presentation.' },
  { icon: <Sparkles size={22} />, title: 'Big-Four-Quality Screening', desc: 'Industry-specific assessments, simulations and aptitude tests that replicate real financial sector tasks and decision-making.' },
  { icon: <BarChart2 size={22} />, title: 'Structured Engagement', desc: 'Invite shortlisted candidates to interview or send firm-specific follow-up questions directly through the platform.' },
  { icon: <Shield size={22} />, title: 'Candidate Anonymity', desc: 'Candidate identities remain fully confidential until they express interest in your role — ensuring fair skills-first evaluation with no unconscious bias.' },
  { icon: <DollarSign size={22} />, title: 'Pay Per Hire', desc: 'Flat £1,999 success fee only when you hire. No monthly commitment on the standard plan. No hire, no charge, ever.' },
]

const targetBadges = ['Boutique Financial Firms', 'Fintech Startups', 'Small Investment Organisations', 'Accounting Practices', 'Financial Services SMEs']

function ForEmployers({ onWaitlist, onNavigate }) {
  const ref = useScrollAnimation()
  return (
    <section ref={ref} style={{ padding: '100px 24px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>FOR EMPLOYERS</span>
          </div>
          <h2 className="font-syne" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, color: '#0A0F1E' }}>Hire Smarter.<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Pay Only When You Do.</span></h2>
          <p style={{ color: '#64748b', marginTop: 16, fontSize: 16 }}>Set your criteria. We pre-screen. You hire from the leaderboard. Boutique firms and startups finally get Big-Four-quality candidate screening without the internal infrastructure to support it.</p>
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
          <button onClick={() => onNavigate('employer')} style={{ background: 'linear-gradient(135deg,#F5C842,#ffad00)', color: '#0A0F1E', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
            Explore Employer Features
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── ROI CALCULATOR ────────────────────────────────────────────────────────────
function ROICalculator({ onWaitlist }) {
  const [hires, setHires] = useState(5)
  const [hoursPerHire, setHoursPerHire] = useState(40)
  const [hourlyRate, setHourlyRate] = useState(60)
  const ref = useScrollAnimation()

  const traditionalCost = (8500 * hires) + (hoursPerHire * hourlyRate * hires)
  const gradSourceCost = (1999 * hires) + (8 * hourlyRate * hires)
  const hoursSaved = (hoursPerHire - 8) * hires
  const totalSaving = traditionalCost - gradSourceCost

  const fmt = (n) => '£' + n.toLocaleString('en-GB')

  const Slider = ({ label, min, max, value, onChange, prefix = '', suffix = '' }) => (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span style={{ fontSize: 14, color: '#475569', fontWeight: 500 }}>{label}</span>
        <span className="font-syne" style={{ fontSize: 20, fontWeight: 800, color: '#D4A017' }}>{prefix}{value.toLocaleString('en-GB')}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: '#D4A017', cursor: 'pointer', height: 4 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 11, color: '#94a3b8' }}>{prefix}{min}{suffix}</span>
        <span style={{ fontSize: 11, color: '#94a3b8' }}>{prefix}{max}{suffix}</span>
      </div>
    </div>
  )

  return (
    <section ref={ref} style={{ padding: '100px 24px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>ROI CALCULATOR</span>
          </div>
          <h2 className="font-syne" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, color: '#0A0F1E', marginBottom: 16 }}>
            See How Much GradSource<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Saves You</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>
            Traditional recruitment agencies charge 10–15% of a graduate starting salary. On a £30,000 role that is up to £4,500 — before you factor in the hours your team spends screening. GradSource charges a flat £1,999, only when you hire.
          </p>
        </div>
        <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'start' }}>
          {/* Sliders */}
          <div style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 20, padding: '36px 32px' }}>
            <h3 className="font-syne" style={{ fontSize: 17, fontWeight: 700, color: '#0A0F1E', marginBottom: 28 }}>Your Hiring Profile</h3>
            <Slider label="Number of hires per year" min={1} max={20} value={hires} onChange={setHires} />
            <Slider label="Hours spent screening per hire" min={10} max={80} value={hoursPerHire} onChange={setHoursPerHire} suffix=" hrs" />
            <Slider label="Your hourly cost of internal time" min={20} max={150} value={hourlyRate} onChange={setHourlyRate} prefix="£" />
          </div>
          {/* Results */}
          <div>
            <div style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 20, padding: '36px 32px', marginBottom: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12, padding: 20 }}>
                  <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Traditional Cost</div>
                  <div className="font-syne" style={{ fontSize: 22, fontWeight: 800, color: '#475569' }}>{fmt(traditionalCost)}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Recruiter fees + internal time</div>
                </div>
                <div style={{ background: 'rgba(245,200,66,0.06)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 12, padding: 20 }}>
                  <div style={{ fontSize: 12, color: '#D4A017', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>GradSource Cost</div>
                  <div className="font-syne" style={{ fontSize: 22, fontWeight: 800, color: '#D4A017' }}>{fmt(gradSourceCost)}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>£1,999/hire + ~8hrs screening</div>
                </div>
              </div>
              <div style={{ background: 'linear-gradient(135deg, rgba(245,200,66,0.08), rgba(212,160,23,0.04))', border: '1px solid rgba(245,200,66,0.35)', borderRadius: 16, padding: '24px 28px', textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>Total Annual Saving</div>
                <div className="font-syne" style={{ fontSize: 'clamp(32px,5vw,48px)', fontWeight: 800, color: '#D4A017', lineHeight: 1 }}>{fmt(totalSaving)}</div>
                <div style={{ fontSize: 14, color: '#475569', marginTop: 10 }}>
                  That's <strong style={{ color: '#0A0F1E' }}>{hoursSaved.toLocaleString('en-GB')} hours</strong> back and <strong style={{ color: '#D4A017' }}>{fmt(totalSaving)}</strong> saved every year
                </div>
              </div>
            </div>
            <button onClick={onWaitlist} style={{ width: '100%', background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 12, padding: '15px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
              Start saving — join the employer waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── COMPARISON TABLE ─────────────────────────────────────────────────────────
const comparisonRows = [
  { label: 'Cost per hire',                    gs: '£1,999 flat fee',               rec: '10–15% of salary avg £8,500',  jb: '£500+ no quality filter' },
  { label: 'Hours spent screening',            gs: '~8 hours',                      rec: '40+ hours',                    jb: '60+ hours' },
  { label: 'Candidate pre-screening',          gs: true, gsSub: 'Automatic criteria-based', rec: false, recSub: 'Manual CV review', jb: false, jbSub: 'None' },
  { label: 'Assessment quality',               gs: true, gsSub: 'Big-Four standard',rec: false, recSub: 'Basic interview only', jb: false, jbSub: 'None' },
  { label: 'Candidate feedback',               gs: true, gsSub: 'AI-powered personalised', rec: false, jb: false },
  { label: 'Skills-first anonymised',          gs: true, gsSub: 'Always',           rec: false, recSub: 'Bias risk',     jb: false, jbSub: 'Bias risk' },
  { label: 'Pay only on success',              gs: true, gsSub: 'Yes',              rec: false, recSub: 'Fees regardless', jb: false, jbSub: 'Subscription fee' },
  { label: 'Graduate sector focus',            gs: true, gsSub: 'Financial sector specific', rec: false, recSub: 'General market', jb: false, jbSub: 'General market' },
  { label: 'Reduces application fatigue',      gs: true, gsSub: 'Assess once match many', rec: false, jb: false },
  { label: 'Quality hire success rate',        gs: '87%',                           rec: '52%',                          jb: '34%' },
]

function ComparisonTable() {
  const ref = useScrollAnimation()
  const Cell = ({ value, sub, gold, border }) => {
    const borderStyle = border ? { borderLeft: '2px solid rgba(245,200,66,0.3)', borderRight: '2px solid rgba(245,200,66,0.3)' } : {}
    if (value === true) return (
      <td style={{ padding: '14px 16px', textAlign: 'center', ...borderStyle }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <CheckCircle size={16} color="#D4A017" />
          {sub && <span style={{ fontSize: 11, color: gold ? '#D4A017' : '#64748b' }}>{sub}</span>}
        </div>
      </td>
    )
    if (value === false) return (
      <td style={{ padding: '14px 16px', textAlign: 'center', ...borderStyle }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <XCircle size={16} color="#ef4444" />
          {sub && <span style={{ fontSize: 11, color: '#94a3b8' }}>{sub}</span>}
        </div>
      </td>
    )
    return (
      <td style={{ padding: '14px 16px', textAlign: 'center', fontSize: 13, color: gold ? '#D4A017' : '#475569', fontWeight: gold ? 700 : 400, ...borderStyle }}>{value}</td>
    )
  }

  return (
    <section ref={ref} style={{ padding: '0 24px 100px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 className="font-syne" style={{ fontSize: 'clamp(24px,3vw,40px)', fontWeight: 800, color: '#0A0F1E' }}>
            GradSource vs<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>The Alternatives</span>
          </h2>
        </div>
        <div className="fade-up" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
            <thead>
              <tr style={{ background: '#0A0F1E' }}>
                <th style={{ padding: '14px 16px', textAlign: 'left', color: '#FFFFFF', fontSize: 13, fontWeight: 600 }}>Feature</th>
                <th style={{ padding: '14px 16px', textAlign: 'center', color: '#F5C842', fontSize: 13, fontWeight: 700, borderLeft: '2px solid rgba(245,200,66,0.5)', borderRight: '2px solid rgba(245,200,66,0.5)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <span style={{ background: 'rgba(245,200,66,0.2)', border: '1px solid rgba(245,200,66,0.5)', borderRadius: 100, padding: '1px 8px', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', color: '#F5C842' }}>BEST VALUE</span>
                    GradSource
                  </div>
                </th>
                <th style={{ padding: '14px 16px', textAlign: 'center', color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>Traditional Recruiter</th>
                <th style={{ padding: '14px 16px', textAlign: 'center', color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>Traditional Job Board</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.label} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F8FAFC', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#0A0F1E', fontWeight: 500 }}>{row.label}</td>
                  <Cell value={row.gs} sub={row.gsSub} gold border />
                  <Cell value={row.rec} sub={row.recSub} />
                  <Cell value={row.jb} sub={row.jbSub} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
const steps = [
  { n: 1, title: 'Employers Define Criteria', desc: 'Set your requirements — skills, role type, salary range and location. GradSource automatically builds your pre-screened candidate leaderboard.' },
  { n: 2, title: 'Candidates Assessed Once', desc: 'Graduates complete industry-specific assessments, simulations and aptitude tests once. Their performance is matched against your criteria in real time and ranked accordingly.' },
  { n: 3, title: 'Hire From the Leaderboard', desc: 'Browse your ranked pre-screened talent pool. Invite to interview or send follow-up questions. Pay the flat £1,999 fee only when you successfully make a hire.' },
]

function HowItWorks() {
  const ref = useScrollAnimation()
  return (
    <section ref={ref} id="how-it-works" style={{ padding: '100px 24px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div className="fade-up">
          <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>HOW IT WORKS</span>
          </div>
          <h2 className="font-syne" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, color: '#0A0F1E', marginBottom: 64 }}>From Criteria to Hire<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>in Three Steps</span></h2>
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
function AIFeedback({ onWaitlist, onNavigate }) {
  const ref = useScrollAnimation()
  return (
    <section ref={ref} style={{ padding: '100px 24px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 20, padding: '60px 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 48, alignItems: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.06)' }}>
          <div className="fade-up">
            <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 20 }}>
              <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>AI FEEDBACK</span>
            </div>
            <div className="font-syne" style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, color: '#0A0F1E', marginBottom: 20, lineHeight: 1.2 }}>
              The Platform That<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Makes Candidates Better</span>
            </div>
            <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
              Our AI continuously monitors what employers in financial services are actively prioritising in their hiring criteria — then maps that intelligence back to each candidate's performance. Every simulation, every test, every assessment generates a personalised development report: what you did well, what needs work, and which specific skills will make you more competitive for the roles you want.
            </p>
            <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
              As candidates improve, leaderboard rankings update in real time — creating a dynamic merit-based talent pool that gets stronger over time. This is not a rejection letter. It is a roadmap.
            </p>
            <button onClick={() => onNavigate('candidate')} style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 10, padding: '13px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
              Get AI-Powered Feedback
            </button>
          </div>
          <div className="fade-up glow-border-gold" style={{ background: '#F8FAFC', borderRadius: 16, padding: 28, transitionDelay: '150ms' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Brain size={18} color="#D4A017" />
              <span className="font-syne" style={{ color: '#0A0F1E', fontWeight: 700, fontSize: 15 }}>Your AI Feedback Report</span>
              <span style={{ marginLeft: 'auto', background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '2px 10px', fontSize: 10, color: '#D4A017' }}>Powered by GradSource AI</span>
            </div>
            {[['LinkedIn', 88], ['Aptitude', 91], ['Technical', 88], ['Simulation', 'Pending']].map(([k, v]) => (
              <div key={k} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: '#64748b' }}>{k}</span>
                  <span style={{ fontSize: 12, color: typeof v === 'number' ? '#D4A017' : '#64748b', fontWeight: 700 }}>{v}</span>
                </div>
                {typeof v === 'number' && (
                  <div style={{ height: 4, background: 'rgba(0,0,0,0.07)', borderRadius: 2 }}>
                    <div style={{ height: '100%', width: `${v}%`, background: 'linear-gradient(90deg,#F5C842,#D4A017)', borderRadius: 2, transition: 'width 1.2s ease' }} />
                  </div>
                )}
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', marginTop: 20, paddingTop: 20 }}>
              <div style={{ fontSize: 12, color: '#D4A017', fontWeight: 600, marginBottom: 12 }}>Key Insights</div>
              {[
                'Boutique firms prioritising financial modelling & Excel proficiency (+15% weight)',
                'Your aptitude score places you in the 91st percentile of pre-screened candidates',
                'Complete AI simulation to unlock full pre-screening eligibility',
                'Regulatory awareness training recommended to reach top 1% ranking',
              ].map(tip => (
                <div key={tip} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(245,200,66,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <ChevronRight size={8} color="#D4A017" />
                  </div>
                  <span style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const testimonials = [
  { quote: 'We interviewed 3 candidates from GradSource and hired 2 of them. The leaderboard made it immediately obvious who was worth our time. Saved us weeks of screening.', name: 'James Whitfield', title: 'Head of Talent, Apex Capital', type: 'employer' },
  { quote: 'Every other platform just rejected me with no feedback. GradSource told me exactly what I needed to improve and I landed my first role in fintech within 6 weeks.', name: 'Priya Sharma', title: 'Graduate Analyst, Meridian Bank', type: 'candidate' },
  { quote: 'The anonymised leaderboard is genius. We focus entirely on performance, not names or universities. It\'s changed how we think about hiring completely.', name: 'Sarah Chen', title: 'COO, Vortex Markets', type: 'employer' },
  { quote: 'I finally understood why I kept failing interviews. The AI feedback was more useful than anything my university careers service ever told me.', name: 'Marcus Thompson', title: 'LSE Finance Graduate', type: 'candidate' },
  { quote: 'At £1,999 per hire versus the £8,500 we were paying recruiters, the ROI is obvious. And the quality of pre-screened candidates is genuinely better.', name: 'David Okafor', title: 'Founding Partner, Crestline Advisors', type: 'employer' },
  { quote: 'The simulation felt like a real client call. It was intense but I knew exactly what employers were looking for going into interviews. Game changer.', name: 'Anika Reeves', title: 'Bath University, now at Barclays', type: 'candidate' },
]

function Testimonials() {
  const ref = useScrollAnimation()
  return (
    <section ref={ref} style={{ padding: '100px 24px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>TESTIMONIALS</span>
          </div>
          <h2 className="font-syne" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, color: '#0A0F1E', marginBottom: 12 }}>
            What People Are Saying
          </h2>
          <p style={{ color: '#64748b', fontSize: 16 }}>Early feedback from our beta users</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {testimonials.map((t, i) => (
            <div key={t.name} className="fade-up" style={{
              background: '#FFFFFF',
              borderRadius: 16,
              padding: 28,
              borderLeft: `4px solid ${t.type === 'employer' ? '#D4A017' : '#1E3A5F'}`,
              boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
              transitionDelay: `${i * 80}ms`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} fill="#F5C842" color="#F5C842" />
                  ))}
                </div>
                <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.75, marginBottom: 20, fontStyle: 'italic' }}>"{t.quote}"</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: t.type === 'employer' ? 'linear-gradient(135deg,#F5C842,#D4A017)' : 'linear-gradient(135deg,#1E3A5F,#0A0F1E)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="font-syne" style={{ fontSize: 13, fontWeight: 800, color: t.type === 'employer' ? '#0A0F1E' : '#FFFFFF' }}>{t.name.split(' ').map(w => w[0]).join('')}</span>
                </div>
                <div>
                  <div className="font-syne" style={{ fontSize: 14, fontWeight: 700, color: '#0A0F1E' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{t.title}</div>
                </div>
              </div>
            </div>
          ))}
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
      name: 'Candidates', price: 'Free', sub: 'Always. No exceptions.', popular: false, teal: true,
      features: ['Join and complete all assessments completely free', 'Matched to relevant employers automatically based on your scores', 'Receive AI-powered personalised feedback reports after every assessment', 'Set your preferences and let the right opportunities come to you', 'No premium candidate tier — always free, always fair'],
    },
    {
      name: 'Employers Standard', price: '£1,999', sub: 'per successful hire', popular: false, teal: false,
      features: ['Flat success fee — only pay when you make a hire', 'Post unlimited roles and define custom hiring criteria', 'Access pre-screened performance leaderboards built to your requirements', 'Structured candidate engagement: interviews and follow-up questions', 'No monthly fee — no hire means no charge, ever'],
    },
    {
      name: 'GradSource Premium', price: '£1,500', sub: 'per hire + £89 per month', popular: true, gold: true,
      note: 'Save £499 per hire vs Standard. Your £89/month subscription pays for itself after just one hire.',
      features: ['Reduced per-hire fee — subscription pays for itself after just one hire', 'Everything included in Standard', 'Access to the very top percentile of candidates first', 'Enhanced talent discovery and advanced filtering tools', 'Priority leaderboard access and advanced criteria weighting', 'Dedicated account manager', 'Custom branding on candidate-facing assessments', 'Competitor hiring intelligence and benchmarking insights'],
    },
  ]
  return (
    <section ref={ref} id="pricing" style={{ padding: '100px 24px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>PRICING</span>
          </div>
          <h2 className="font-syne" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, color: '#0A0F1E', marginBottom: 12 }}>Simple, Transparent<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Pricing</span></h2>
          <p style={{ color: '#64748b', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>No hidden fees. No retainers. No percentage of salary. Just results.</p>
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
              {p.note && (
                <div style={{ background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 8, padding: '10px 14px', marginTop: 12 }}>
                  <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>{p.note}</span>
                </div>
              )}
              <button onClick={onWaitlist} style={{ marginTop: 24, width: '100%', background: p.gold ? 'linear-gradient(135deg,#F5C842,#D4A017)' : p.teal ? 'linear-gradient(135deg,#F5C842,#D4A017)' : '#0A0F1E', color: '#0A0F1E', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', ...(!p.gold && !p.teal ? { color: '#FFFFFF' } : {}) }}>
                {p.teal ? 'Get Started Free' : 'Join Waitlist'}
              </button>
            </div>
          ))}
        </div>
        <div className="fade-up" style={{ textAlign: 'center', marginTop: 32 }}>
          <p style={{ color: '#64748b', fontSize: 13 }}>Candidates are always free. Employers are never charged unless a hire is made and accepted.</p>
        </div>
      </div>
    </section>
  )
}

// ─── WAITLIST ─────────────────────────────────────────────────────────────────
function Waitlist() {
  const [tab, setTab] = useState('candidate')
  const [count, setCount] = useState(287)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', company: '', size: '' })
  const [university, setUniversity] = useState('')
  const ref = useScrollAnimation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      console.log('university:', university)
      await addToBrevo({ email: form.email, name: form.name, role: tab, university: university || undefined })
      setCount(c => c + 1)
      setSubmitted(true)
    } catch {
      setError('Something went wrong — please try again or email us at astonbuck@icloud.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section ref={ref} id="waitlist" style={{ padding: '100px 24px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.4)', borderRadius: 100, padding: '8px 20px', marginBottom: 20 }}>
            <span style={{ fontSize: 14, color: '#D4A017', fontWeight: 700 }}>🔥 First 50 employers lock in Standard pricing — limited early access spots remaining</span>
          </div>
          <div className="font-syne" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, color: '#0A0F1E', marginBottom: 12 }}>
            Be First. Shape the<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Future of Hiring.</span>
          </div>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '8px 20px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#D4A017', animation: 'pulseRing 1.5s infinite' }} />
              <span style={{ color: '#D4A017', fontWeight: 700 }}>{count}</span>
              <span style={{ color: '#64748b', fontSize: 14 }}>candidates joined</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(30,58,95,0.06)', border: '1px solid rgba(30,58,95,0.2)', borderRadius: 100, padding: '8px 20px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1E3A5F', animation: 'pulseRing 1.5s infinite' }} />
              <span style={{ color: '#1E3A5F', fontWeight: 700 }}>31</span>
              <span style={{ color: '#64748b', fontSize: 14 }}>employers interested</span>
            </div>
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
                  ...(tab === 'candidate' ? [{ key: 'university', label: 'University (optional)', select: true }] : [
                    { key: 'company', label: 'Company Name', placeholder: 'e.g. Apex Capital', required: true },
                  ]),
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', color: '#475569', fontSize: 12, marginBottom: 6, fontWeight: 500 }}>{f.label}</label>
                    {f.select ? (
                      <select value={university} onChange={e => setUniversity(e.target.value)}
                        style={{ width: '100%', background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '11px 14px', color: university ? '#0A0F1E' : '#64748b', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }}>
                        <option value="">Select your university</option>
                        {UK_UNIVERSITIES.map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                    ) : (
                      <input type={f.type || 'text'} required={f.required} placeholder={f.placeholder}
                        value={form[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                        style={{ width: '100%', background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '11px 14px', color: '#0A0F1E', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
                    )}
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
                <button type="submit" disabled={loading} style={{ width: '100%', background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 8, fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1 }}>
                  <Send size={16} /> {loading ? 'Joining...' : 'Join the Waitlist'}
                </button>
                {error && <p style={{ color: '#ef4444', fontSize: 12, textAlign: 'center', marginTop: 10 }}>{error}</p>}
                <p style={{ color: '#94a3b8', fontSize: 12, textAlign: 'center', marginTop: 12 }}>No spam, ever. We'll only contact you about early access.</p>
              </form>
            </>
          ) : (
            <div style={{ padding: 48, textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
              <div className="font-syne" style={{ fontSize: 22, fontWeight: 800, color: '#0A0F1E', marginBottom: 8 }}>You're on the list!</div>
              <p style={{ color: '#64748b', fontSize: 15, marginBottom: 24 }}>We'll be in touch soon. You're one of <span style={{ color: '#D4A017', fontWeight: 700 }}>{count}</span> people shaping the future of financial sector graduate hiring.</p>
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

// ─── PARTNERSHIPS ─────────────────────────────────────────────────────────────
function Partnerships() {
  return (
    <section style={{ background: '#0A0F1E', padding: '60px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 20 }}>
          <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>PARTNERSHIPS</span>
        </div>
        <h2 className="font-syne" style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, color: '#FFFFFF', marginBottom: 16 }}>
          Work With Us
        </h2>
        <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.8, maxWidth: 600, margin: '0 auto 32px' }}>
          Are you a university careers service, fintech accelerator, professional body or financial sector organisation? Help us build the infrastructure that connects the best graduate talent with the firms that need them most.
        </p>
        <a href="mailto:astonbuck@icloud.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', borderRadius: 10, padding: '13px 28px', fontSize: 14, fontWeight: 700, textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
          Get in Touch <ChevronRight size={16} />
        </a>
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
            <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.7, maxWidth: 200 }}>Skills-based graduate hiring infrastructure for the financial sector.</p>
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [count, setCount] = useState(287)
  const [form, setForm] = useState({ name: '', email: '', university: '', company: '', size: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await addToBrevo({ email: form.email, name: form.name, role: tab, university: form.university || undefined })
      setCount(c => c + 1)
      setSubmitted(true)
    } catch {
      setError('Something went wrong — please try again or email us at astonbuck@icloud.com')
    } finally {
      setLoading(false)
    }
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
                ...(tab === 'candidate' ? [{ key: 'university', label: 'University (optional)', select: true }] : [
                  { key: 'company', label: 'Company', placeholder: 'e.g. Apex Capital', required: true },
                ]),
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', color: '#475569', fontSize: 12, marginBottom: 5 }}>{f.label}</label>
                  {f.select ? (
                    <select value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{ width: '100%', background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '10px 13px', color: form[f.key] ? '#0A0F1E' : '#64748b', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }}>
                      <option value="">Select your university</option>
                      {UK_UNIVERSITIES.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  ) : (
                    <input type={f.type || 'text'} required={f.required} placeholder={f.placeholder}
                      value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{ width: '100%', background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '10px 13px', color: '#0A0F1E', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
                  )}
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
              <button type="submit" disabled={loading} style={{ width: '100%', background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4, fontFamily: 'DM Sans, sans-serif', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Joining...' : 'Join Waitlist'}
              </button>
              {error && <p style={{ color: '#ef4444', fontSize: 11, textAlign: 'center', marginTop: 8 }}>{error}</p>}
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

// ─── CANDIDATE PAGE ───────────────────────────────────────────────────────────
function CandidatePage({ onBack, onWaitlist }) {
  const [surveyFrustration, setSurveyFrustration] = useState('')
  const [surveyAssessments, setSurveyAssessments] = useState([])
  const [surveyIndustry, setSurveyIndustry] = useState('')
  const [surveyPay, setSurveyPay] = useState('')
  const [surveyEmail, setSurveyEmail] = useState('')
  const [surveySubmitted, setSurveySubmitted] = useState(false)
  const [signupForm, setSignupForm] = useState({ name: '', email: '', university: '' })
  const [signupSubmitted, setSignupSubmitted] = useState(false)
  const [signupLoading, setSignupLoading] = useState(false)
  const [signupError, setSignupError] = useState(null)
  const [signupCount, setSignupCount] = useState(287)

  const assessmentOptions = ['Aptitude Test', 'Financial Modelling', 'Sales Simulation', 'Psychometric Profile', 'LinkedIn Review', 'CV Review', 'Industry Knowledge Test']
  const industryOptions = ['Fintech', 'Investment Banking', 'Financial Services', 'Accounting', 'Insurance', 'Asset Management', 'Other']

  const toggleAssessment = (a) => setSurveyAssessments(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])

  const handleSurveySubmit = (e) => {
    e.preventDefault()
    const body = `Biggest frustration with job applications:\n${surveyFrustration}\n\nMost valuable assessments:\n${surveyAssessments.join(', ') || 'None selected'}\n\nTarget industry:\n${surveyIndustry}\n\nWould pay for premium features:\n${surveyPay}\n\nEmail:\n${surveyEmail || 'Not provided'}`
    window.location.href = `mailto:astonbuck@icloud.com?subject=${encodeURIComponent('GradSource Candidate Survey Response')}&body=${encodeURIComponent(body)}`
    setSurveySubmitted(true)
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    setSignupLoading(true)
    setSignupError(null)
    try {
      await addToBrevo({ email: signupForm.email, name: signupForm.name, role: 'candidate', university: signupForm.university || undefined })
      setSignupCount(c => c + 1)
      setSignupSubmitted(true)
    } catch {
      setSignupError('Something went wrong — please try again or email us at astonbuck@icloud.com')
    } finally {
      setSignupLoading(false)
    }
  }

  return (
    <div style={{ paddingTop: 68 }}>
      {/* Back button */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 0' }}>
        <button className="back-btn" onClick={onBack}>
          <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} /> Back to Home
        </button>
      </div>

      {/* Hero */}
      <section style={{ background: '#FFFFFF', padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>FOR CANDIDATES</span>
          </div>
          <h1 className="font-syne" style={{ fontSize: 'clamp(32px,5vw,58px)', fontWeight: 800, color: '#0A0F1E', lineHeight: 1.1, marginBottom: 20, letterSpacing: '-1px' }}>
            Everything You Need<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>to Stand Out</span>
          </h1>
          <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, maxWidth: 580, margin: '0 auto' }}>
            Complete our industry-specific assessments once and let GradSource match you with boutique financial firms and startups that fit your skills and ambitions. No repeated applications. No cover letters. Always free.
          </p>
        </div>
      </section>

      {/* Features grid */}
      <section style={{ background: '#F8FAFC', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 className="font-syne" style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, color: '#0A0F1E', textAlign: 'center', marginBottom: 48 }}>
            Your Profile, Your Way
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {candidateFeatures.map((f, i) => (
              <div key={f.title} className="glow-border-gold" style={{ background: '#FFFFFF', borderRadius: 14, padding: 24 }}>
                <div style={{ color: '#D4A017', marginBottom: 14 }}>{f.icon}</div>
                <div className="font-syne" style={{ color: '#0A0F1E', fontWeight: 700, marginBottom: 8, fontSize: 15 }}>{f.title}</div>
                <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Feedback benefits */}
      <section style={{ background: '#FFFFFF', padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ background: '#F8FAFC', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 20, padding: '48px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 40, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 20 }}>
                <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>AI FEEDBACK</span>
              </div>
              <h2 className="font-syne" style={{ fontSize: 'clamp(20px,3vw,32px)', fontWeight: 800, color: '#0A0F1E', marginBottom: 16, lineHeight: 1.2 }}>
                Finally — Feedback That<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Actually Helps You Grow</span>
              </h2>
              <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.8 }}>
                GradSource AI maps live employer priorities against your scores and tells you exactly what to improve. Not "you scored 78%" — but what that means, what top candidates do differently, and your clearest path to a top 5 ranking.
              </p>
            </div>
            <div>
              {[['Know where you rank', 'See your position on every employer\'s live leaderboard.'], ['Understand the gap', 'Find out precisely what separates you from rank #1.'], ['Get a clear action plan', 'Prioritised steps to raise your score before you apply again.'], ['Track your progress', 'Watch your profile strengthen with every completed assessment.']].map(([title, desc]) => (
                <div key={title} style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(245,200,66,0.15)', border: '1px solid rgba(245,200,66,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <CheckCircle size={10} color="#D4A017" />
                  </div>
                  <div>
                    <div className="font-syne" style={{ fontSize: 14, fontWeight: 700, color: '#0A0F1E', marginBottom: 2 }}>{title}</div>
                    <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sign up form */}
      <section style={{ background: '#F8FAFC', padding: '80px 24px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="font-syne" style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, color: '#0A0F1E', marginBottom: 12 }}>
              Join the Waitlist
            </h2>
            <p style={{ color: '#64748b', fontSize: 15 }}>Free forever. No subscription. No hidden costs.</p>
          </div>
          <div className="glow-border-gold" style={{ background: '#FFFFFF', borderRadius: 20, overflow: 'hidden' }}>
            {!signupSubmitted ? (
              <form onSubmit={handleSignupSubmit} style={{ padding: 36 }}>
                {[{ key: 'name', label: 'Full Name', placeholder: 'Your name', required: true }, { key: 'email', label: 'Email Address', placeholder: 'your@email.com', type: 'email', required: true }, { key: 'university', label: 'University (optional)', select: true }].map(f => (
                  <div key={f.key} style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', color: '#475569', fontSize: 12, marginBottom: 6, fontWeight: 500 }}>{f.label}</label>
                    {f.select ? (
                      <select value={signupForm[f.key]} onChange={e => setSignupForm(p => ({ ...p, [f.key]: e.target.value }))}
                        style={{ width: '100%', background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '11px 14px', color: signupForm[f.key] ? '#0A0F1E' : '#64748b', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }}>
                        <option value="">Select your university</option>
                        {UK_UNIVERSITIES.map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                    ) : (
                      <input type={f.type || 'text'} required={f.required} placeholder={f.placeholder}
                        value={signupForm[f.key]} onChange={e => setSignupForm(p => ({ ...p, [f.key]: e.target.value }))}
                        style={{ width: '100%', background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '11px 14px', color: '#0A0F1E', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
                    )}
                  </div>
                ))}
                <button type="submit" disabled={signupLoading} style={{ width: '100%', background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, cursor: signupLoading ? 'not-allowed' : 'pointer', marginTop: 8, fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: signupLoading ? 0.7 : 1 }}>
                  <Send size={16} /> {signupLoading ? 'Joining...' : "Join as a Candidate — It's Free"}
                </button>
                {signupError && <p style={{ color: '#ef4444', fontSize: 12, textAlign: 'center', marginTop: 10 }}>{signupError}</p>}
                <p style={{ color: '#94a3b8', fontSize: 12, textAlign: 'center', marginTop: 12 }}>No spam, ever. We'll only contact you about early access.</p>
              </form>
            ) : (
              <div style={{ padding: 48, textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <div className="font-syne" style={{ fontSize: 22, fontWeight: 800, color: '#0A0F1E', marginBottom: 8 }}>You're on the list!</div>
                <p style={{ color: '#64748b', fontSize: 15 }}>You're <span style={{ color: '#D4A017', fontWeight: 700 }}>#{signupCount}</span> in line for early access.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Survey */}
      <section style={{ background: '#FFFFFF', padding: '80px 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 16 }}>
              <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>CANDIDATE SURVEY</span>
            </div>
            <h2 className="font-syne" style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, color: '#0A0F1E', marginBottom: 12 }}>
              Help Us Build Something Special
            </h2>
            <p style={{ color: '#64748b', fontSize: 15 }}>2 minutes. Shapes the entire product. We read every response.</p>
          </div>
          {!surveySubmitted ? (
            <form onSubmit={handleSurveySubmit} style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 20, padding: 36 }}>
              {/* Q1 */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'block', color: '#0A0F1E', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>What's your biggest frustration with job applications?</label>
                <textarea required value={surveyFrustration} onChange={e => setSurveyFrustration(e.target.value)} placeholder="Tell us honestly — what's broken about the current process?"
                  style={{ width: '100%', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '11px 14px', color: '#0A0F1E', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif', minHeight: 90, resize: 'vertical' }} />
              </div>
              {/* Q2 */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'block', color: '#0A0F1E', fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Which assessments would you find most valuable?</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {assessmentOptions.map(a => (
                    <label key={a} style={{ display: 'flex', alignItems: 'center', gap: 8, background: surveyAssessments.includes(a) ? 'rgba(245,200,66,0.1)' : '#FFFFFF', border: `1px solid ${surveyAssessments.includes(a) ? 'rgba(245,200,66,0.5)' : 'rgba(0,0,0,0.1)'}`, borderRadius: 8, padding: '8px 12px', cursor: 'pointer', transition: 'all 0.15s' }}>
                      <input type="checkbox" checked={surveyAssessments.includes(a)} onChange={() => toggleAssessment(a)} style={{ accentColor: '#D4A017' }} />
                      <span style={{ fontSize: 13, color: surveyAssessments.includes(a) ? '#D4A017' : '#475569', fontWeight: surveyAssessments.includes(a) ? 600 : 400 }}>{a}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Q3 */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'block', color: '#0A0F1E', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Target industry</label>
                <select required value={surveyIndustry} onChange={e => setSurveyIndustry(e.target.value)}
                  style={{ width: '100%', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '11px 14px', color: surveyIndustry ? '#0A0F1E' : '#64748b', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }}>
                  <option value="" disabled>Select your target industry</option>
                  {industryOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              {/* Q4 */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'block', color: '#0A0F1E', fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Would you pay for premium features?</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['Yes', 'No', 'Maybe'].map(opt => (
                    <button key={opt} type="button" onClick={() => setSurveyPay(opt)}
                      style={{ flex: 1, padding: '10px', borderRadius: 8, border: `1px solid ${surveyPay === opt ? 'rgba(245,200,66,0.6)' : 'rgba(0,0,0,0.1)'}`, background: surveyPay === opt ? 'rgba(245,200,66,0.1)' : '#FFFFFF', color: surveyPay === opt ? '#D4A017' : '#475569', fontWeight: surveyPay === opt ? 700 : 400, fontSize: 14, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s' }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              {/* Q5 */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'block', color: '#0A0F1E', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Email <span style={{ color: '#94a3b8', fontWeight: 400 }}>(optional — if you'd like a response)</span></label>
                <input type="email" value={surveyEmail} onChange={e => setSurveyEmail(e.target.value)} placeholder="your@email.com"
                  style={{ width: '100%', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '11px 14px', color: '#0A0F1E', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
              </div>
              <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
                Submit Survey
              </button>
            </form>
          ) : (
            <div style={{ background: '#F8FAFC', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 20, padding: 48, textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🙏</div>
              <div className="font-syne" style={{ fontSize: 22, fontWeight: 800, color: '#0A0F1E', marginBottom: 8 }}>Thank you!</div>
              <p style={{ color: '#64748b', fontSize: 15 }}>You're helping build something special.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ─── EMPLOYER PAGE ────────────────────────────────────────────────────────────
function EmployerPage({ onBack, onWaitlist }) {
  return (
    <div style={{ paddingTop: 68 }}>
      {/* Back button */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 0' }}>
        <button className="back-btn" onClick={onBack}>
          <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} /> Back to Home
        </button>
      </div>

      {/* Hero */}
      <section style={{ background: '#FFFFFF', padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: '#D4A017', fontWeight: 600 }}>FOR EMPLOYERS</span>
          </div>
          <h1 className="font-syne" style={{ fontSize: 'clamp(32px,5vw,58px)', fontWeight: 800, color: '#0A0F1E', lineHeight: 1.1, marginBottom: 20, letterSpacing: '-1px' }}>
            Hire Smarter.<br /><span style={{ background: 'linear-gradient(135deg,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Pay Only When You Do.</span>
          </h1>
          <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, maxWidth: 580, margin: '0 auto 24px' }}>
            Set your criteria. GradSource pre-screens and ranks candidates automatically. Boutique firms and startups finally get Big-Four-quality hiring infrastructure without the internal capacity to support it. Pay only when you hire.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {targetBadges.map(b => (
              <span key={b} style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.35)', borderRadius: 100, padding: '5px 14px', fontSize: 12, color: '#D4A017', fontWeight: 600 }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Employer features */}
      <section style={{ background: '#F8FAFC', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 className="font-syne" style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, color: '#0A0F1E', textAlign: 'center', marginBottom: 48 }}>
            Everything You Need to Hire with Confidence
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {employerFeatures.map((f) => (
              <div key={f.title} className="glow-border-gold" style={{ background: '#FFFFFF', borderRadius: 14, padding: 24 }}>
                <div style={{ color: '#D4A017', marginBottom: 14 }}>{f.icon}</div>
                <div className="font-syne" style={{ color: '#0A0F1E', fontWeight: 700, marginBottom: 8, fontSize: 15 }}>{f.title}</div>
                <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employer demo */}
      <EmployerDemo />

      {/* Pricing */}
      <Pricing onWaitlist={onWaitlist} />

      {/* Employer signup */}
      <section style={{ background: '#F8FAFC', padding: '80px 24px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="font-syne" style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, color: '#0A0F1E', marginBottom: 12 }}>
              Join the Employer Waitlist
            </h2>
            <p style={{ color: '#64748b', fontSize: 15 }}>£1,999 flat success fee per hire. No monthly fees on Standard. No hire, no charge, ever.</p>
          </div>
          <EmployerSignupForm onWaitlist={onWaitlist} />
        </div>
      </section>

      <Footer />
    </div>
  )
}

function EmployerSignupForm({ onWaitlist }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', size: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [count, setCount] = useState(50)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await addToBrevo({ email: form.email, name: form.name, role: 'employer' })
      setCount(c => c + 1)
      setSubmitted(true)
    } catch {
      setError('Something went wrong — please try again or email us at astonbuck@icloud.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glow-border-gold" style={{ background: '#FFFFFF', borderRadius: 20, overflow: 'hidden' }}>
      {!submitted ? (
        <form onSubmit={handleSubmit} style={{ padding: 36 }}>
          {[{ key: 'name', label: 'Full Name', placeholder: 'Your name', required: true }, { key: 'email', label: 'Work Email', placeholder: 'you@company.com', type: 'email', required: true }, { key: 'company', label: 'Company Name', placeholder: 'e.g. Apex Capital', required: true }].map(f => (
            <div key={f.key} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#475569', fontSize: 12, marginBottom: 6, fontWeight: 500 }}>{f.label}</label>
              <input type={f.type || 'text'} required={f.required} placeholder={f.placeholder}
                value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '11px 14px', color: '#0A0F1E', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
            </div>
          ))}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#475569', fontSize: 12, marginBottom: 6, fontWeight: 500 }}>Company Size</label>
            <select value={form.size} onChange={e => setForm(p => ({ ...p, size: e.target.value }))}
              style={{ width: '100%', background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '11px 14px', color: form.size ? '#0A0F1E' : '#64748b', fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }}>
              <option value="" disabled>Select company size</option>
              {['1–10', '11–50', '51–200', '201–500', '500+'].map(s => <option key={s} value={s}>{s} employees</option>)}
            </select>
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', background: 'linear-gradient(135deg,#F5C842,#D4A017)', color: '#0A0F1E', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 8, fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1 }}>
            <Send size={16} /> {loading ? 'Joining...' : 'Join Employer Waitlist'}
          </button>
          {error && <p style={{ color: '#ef4444', fontSize: 12, textAlign: 'center', marginTop: 10 }}>{error}</p>}
          <p style={{ color: '#94a3b8', fontSize: 12, textAlign: 'center', marginTop: 12 }}>No commitment. We'll reach out before launch.</p>
        </form>
      ) : (
        <div style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
          <div className="font-syne" style={{ fontSize: 22, fontWeight: 800, color: '#0A0F1E', marginBottom: 8 }}>You're on the list!</div>
          <p style={{ color: '#64748b', fontSize: 15 }}>You're employer <span style={{ color: '#D4A017', fontWeight: 700 }}>#{count}</span> — we'll be in touch before launch.</p>
        </div>
      )}
    </div>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [page, setPage] = useState('home')
  const [displayPage, setDisplayPage] = useState('home')
  const [opacity, setOpacity] = useState(1)

  const openWaitlist = () => setModalOpen(true)

  const navigate = (newPage) => {
    if (newPage === page) return
    setOpacity(0)
    setTimeout(() => {
      setPage(newPage)
      setDisplayPage(newPage)
      window.scrollTo({ top: 0 })
      setOpacity(1)
    }, 300)
  }

  return (
    <>
      <style>{FONTS}</style>
      <div style={{ fontFamily: 'DM Sans, sans-serif', width: '100%', maxWidth: '100%', overflowX: 'hidden', position: 'relative' }}>
        <Nav onWaitlist={openWaitlist} onNavigate={navigate} />
        <div className="page-transition" style={{ opacity }}>
          {displayPage === 'home' && (
            <>
              <Hero onWaitlist={openWaitlist} onNavigate={navigate} />
              <UniversityBar />
              <Problem />
              <CandidateDemo />
              <EmployerDemo />
              <ForCandidates onWaitlist={openWaitlist} onNavigate={navigate} />
              <ForEmployers onWaitlist={openWaitlist} onNavigate={navigate} />
              <ROICalculator onWaitlist={openWaitlist} />
              <ComparisonTable />
              <HowItWorks />
              <AIFeedback onWaitlist={openWaitlist} onNavigate={navigate} />
              <Testimonials />
              <Pricing onWaitlist={openWaitlist} />
              <Waitlist />
              <Partnerships />
              <Footer />
            </>
          )}
          {displayPage === 'candidate' && (
            <CandidatePage onBack={() => navigate('home')} onWaitlist={openWaitlist} />
          )}
          {displayPage === 'employer' && (
            <EmployerPage onBack={() => navigate('home')} onWaitlist={openWaitlist} />
          )}
        </div>
        <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </>
  )
}
