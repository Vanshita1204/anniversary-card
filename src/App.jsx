import { useRef, useEffect, useState } from 'react'
import anime from 'animejs/lib/anime.es.js'
import './App.css'

// ── Data ───────────────────────────────────────────────────────────────────

const EVENTS = [
  {
    event: 'मेहंदी', title: 'Mehendi', theme: 'Rajwada',
    date: '1st July 2026', time: '7:30 pm onwards',
    desc: 'Gather as henna weaves its stories across palms. Music fills the air while intricate patterns take shape — an evening where every design is a blessing.',
    dress: 'Drape yourself in heritage', icon: '🌿',
  },
  {
    event: 'फूल हल्दी', title: 'Phool Haldi', theme: 'Carnival',
    date: '2nd July 2026', time: '11:30 am',
    desc: 'The glow of turmeric, the warmth of blessings. A sacred morning ritual that turns everything golden — including us.',
    dress: 'Dress festive — bring colour and joy', icon: '🌼',
  },
  {
    event: 'वर्षगांठ', title: 'Anniversary Evening', theme: 'Grand Night',
    date: '2nd July 2026', time: '7:30 pm onwards',
    desc: 'The hall comes alive. The family takes the floor. Twenty-five years of love celebrated loud, bold, and gloriously. This is the night you dress for.',
    dress: 'Your grandest self, tonight', icon: '✨',
  },
]

const MAPS_URL = 'https://www.google.com/maps/place/damson+plum/data=!4m2!3m1!1s0x399bfb39f252e88b:0x9d4a6b6383d7ec6b'

const PHOTOS = [
  { label: 'Together', year: '2001', src: `${import.meta.env.BASE_URL}photo-2001.jpg` }, { label: 'Early days', year: '2003' },
  { label: 'A memory', year: '2009', src: `${import.meta.env.BASE_URL}photo-2009.jpg` }, { label: 'A moment', year: '2014' },
  { label: 'Always', year: '2020' },
]

// ── Sparkle utilities ───────────────────────────────────────────────────────

function spawnSparkles(count) {
  const layer = document.getElementById('sparkle-layer')
  if (!layer) return
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div')
    s.className = 'sparkle'
    const size = 2 + Math.random() * 5
    s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${size}px;height:${size}px;`
    layer.appendChild(s)
    anime({
      targets: s, opacity: [0, 0.85, 0], scale: [0, 1.4, 0],
      duration: 850 + Math.random() * 500, easing: 'easeOutExpo',
      complete: () => s.remove()
    })
  }
}

// ── FloralBg ────────────────────────────────────────────────────────────────

function FloralBg() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ns = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(ns, 'svg')
    svg.setAttribute('viewBox', '0 0 800 1400')
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice')
    const colors = ['#c49a3c', '#8b4060', '#9b5ab8', '#2d7a40', '#c2607a']
    function petal(x, y, r, rot, color) {
      const g = document.createElementNS(ns, 'g')
      g.setAttribute('transform', `translate(${x},${y}) rotate(${rot})`)
      for (let i = 0; i < 6; i++) {
        const e = document.createElementNS(ns, 'ellipse')
        e.setAttribute('rx', r * 0.35)
        e.setAttribute('ry', r)
        e.setAttribute('transform', `rotate(${i * 60}) translate(0,${-r * 0.6})`)
        e.setAttribute('fill', color)
        e.setAttribute('opacity', '0.55')
        g.appendChild(e)
      }
      const c = document.createElementNS(ns, 'circle')
      c.setAttribute('r', r * 0.28)
      c.setAttribute('fill', color)
      c.setAttribute('opacity', '0.7')
      g.appendChild(c)
      return g
    }
    const positions = [
      [80, 120, 18, 15, 0], [720, 200, 14, 40, 1], [200, 420, 22, 70, 2], [650, 550, 16, 20, 3],
      [100, 680, 20, 55, 4], [740, 750, 18, 30, 0], [300, 900, 15, 80, 1], [600, 1000, 20, 10, 2],
      [150, 1150, 17, 45, 3], [700, 1280, 22, 65, 4], [400, 350, 13, 25, 0], [500, 780, 16, 50, 1],
    ]
    positions.forEach(([x, y, r, rot, ci]) => svg.appendChild(petal(x, y, r, rot, colors[ci])))
    el.appendChild(svg)
  }, [])
  return <div className="floral-bg" ref={ref} aria-hidden="true" />
}

// ── HeroToran ───────────────────────────────────────────────────────────────

const TORAN_LEAVES = [55, 135, 215, 300, 385, 465, 545]
const TORAN_BLOOMS = [95, 175, 255, 345, 425, 505]
const TORAN_PENDANTS = [95, 215, 300, 385, 505]
const BLOOM_COLORS = ['#e8960a', '#c9921a', '#c2607a']
const PEND_COLORS = [['#c9921a', '#e8b030'], ['#9b1f3a', '#c2607a'], ['#1a6b6b', '#2a9090']]

function HeroToran() {
  useEffect(() => {
    const rope = document.querySelector('.toran-rope')
    if (rope) {
      try {
        const len = rope.getTotalLength()
        rope.style.strokeDasharray = len
        rope.style.strokeDashoffset = len
      // eslint-disable-next-line no-empty
      } catch { }
    }
    anime.timeline()
      .add({ targets: '.toran-rope', strokeDashoffset: [anime.setDashoffset, 0], duration: 900, easing: 'easeOutQuad' })
      .add({ targets: '.toran-leaf', opacity: [0, 1], translateY: [-18, 0], duration: 550, delay: anime.stagger(65, { from: 'center' }), easing: 'spring(1, 72, 10, 0)' }, '-=400')
      .add({ targets: '.toran-bloom', opacity: [0, 1], scale: [0, 1], duration: 480, delay: anime.stagger(75, { from: 'center' }), easing: 'spring(1, 90, 12, 0)' }, '-=350')
      .add({ targets: '.toran-pendant', opacity: [0, 1], translateY: [-28, 0], duration: 600, delay: anime.stagger(90, { from: 'center' }), easing: 'spring(1, 60, 8, 0)' }, '-=280')
  }, [])

  const LEAF_PATH = 'M0,0 C5,9 8,22 4,40 Q0,50 -4,40 C-8,22 -5,9 0,0 Z'

  return (
    <div className="hero-toran-wrap" aria-hidden="true">
      <svg width="100%" viewBox="0 0 600 130" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin meet">
        <path className="toran-rope"
          d="M-10,22 Q75,34 150,22 Q225,12 300,18 Q375,24 450,14 Q525,6 610,22"
          fill="none" stroke="#8b6914" strokeWidth="1.8" opacity="0.55" />
        {TORAN_LEAVES.map((x, i) => (
          <g key={`lf${i}`} className="toran-leaf" transform={`translate(${x},24) rotate(${i % 2 === 0 ? -12 : 12})`} opacity="0">
            <path d={LEAF_PATH} fill={i % 3 === 0 ? '#2d6e1a' : i % 3 === 1 ? '#3d8a22' : '#4a9e2a'} opacity="0.88" />
            <line x1="0" y1="2" x2="0" y2="42" stroke="rgba(10,60,10,0.35)" strokeWidth="0.6" />
          </g>
        ))}
        {TORAN_BLOOMS.map((x, i) => (
          <g key={`bl${i}`} className="toran-bloom" transform={`translate(${x},22)`} opacity="0">
            {[0, 51, 102, 153, 204, 255, 306].map((deg, pi) => (
              <ellipse key={pi} rx="4" ry="8.5"
                transform={`rotate(${deg}) translate(0,-5.5)`}
                fill={BLOOM_COLORS[i % 3]} opacity="0.82" />
            ))}
            <circle r="4.5" fill="#fff8d0" opacity="0.95" />
            <circle r="1.8" fill="#e8aa20" opacity="0.8" />
          </g>
        ))}
        {TORAN_PENDANTS.map((x, i) => {
          const [main, dot] = PEND_COLORS[i % 3]
          return (
            <g key={`pd${i}`} className="toran-pendant" transform={`translate(${x},62)`} opacity="0">
              <line x1="0" y1="0" x2="0" y2="20" stroke="#8b6914" strokeWidth="0.9" opacity="0.45" />
              <path d="M0,20 C8,20 12,27 10,36 Q7,44 0,47 Q-7,44 -10,36 C-12,27 -8,20 0,20 Z"
                fill={main} opacity="0.78" />
              <circle cx="0" cy="47" r="3.2" fill={dot} opacity="0.92" />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ── HeroSideOrnament ────────────────────────────────────────────────────────

function HeroSideOrnament() {
  return (
    <svg width="72" height="290" viewBox="0 0 52 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="orn-stem" d="M26,8 L26,212" stroke="#c49a3c" strokeWidth="0.8" opacity="0.5" />
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <ellipse key={`t${i}`} cx="26" cy="22" rx="3" ry="8"
          transform={`rotate(${deg},26,22) translate(0,-5.5)`}
          fill="#c2607a" opacity="0.55" />
      ))}
      <circle cx="26" cy="22" r="4" fill="#fff3e0" opacity="0.9" />
      <circle cx="26" cy="22" r="1.8" fill="#c49a3c" opacity="0.9" />
      <path d="M26,68 C17,58 8,52 13,43 C17,35 24,43 26,58" fill="#3d8a22" opacity="0.38" />
      <path d="M26,68 C35,58 44,52 39,43 C35,35 28,43 26,58" fill="#3d8a22" opacity="0.38" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <ellipse key={`c${i}`} cx="26" cy="110" rx="4.5" ry="12"
          transform={`rotate(${deg},26,110) translate(0,-9)`}
          fill={i % 2 === 0 ? '#c9921a' : '#9b1f3a'} opacity="0.48" />
      ))}
      <circle cx="26" cy="110" r="7" fill="#fff8d0" opacity="0.92" />
      <circle cx="26" cy="110" r="3.2" fill="#c49a3c" opacity="0.88" />
      <path d="M26,152 C17,162 8,168 13,177 C17,185 24,177 26,162" fill="#3d8a22" opacity="0.38" />
      <path d="M26,152 C35,162 44,168 39,177 C35,185 28,177 26,162" fill="#3d8a22" opacity="0.38" />
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <ellipse key={`b${i}`} cx="26" cy="198" rx="3" ry="8"
          transform={`rotate(${deg},26,198) translate(0,-5.5)`}
          fill="#c2607a" opacity="0.55" />
      ))}
      <circle cx="26" cy="198" r="4" fill="#fff3e0" opacity="0.9" />
      <circle cx="26" cy="198" r="1.8" fill="#c49a3c" opacity="0.9" />
      {[44, 88, 132, 176].map(y => (
        <circle key={y} cx="26" cy={y} r="1.6" fill="#c49a3c" opacity="0.32" />
      ))}
    </svg>
  )
}

// ── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  useEffect(() => {
    const paths = document.querySelectorAll('.hero-mandala circle, .hero-mandala ellipse')
    paths.forEach(el => {
      try {
        const len = el.getTotalLength()
        el.style.strokeDasharray = len
        el.style.strokeDashoffset = len
      // eslint-disable-next-line no-empty
      } catch { }
    })
    anime({
      targets: paths,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 3200,
      delay: anime.stagger(18),
      easing: 'easeInOutSine',
      complete: () => anime({ targets: '.hero-mandala', rotate: 360, duration: 70000, easing: 'linear', loop: true }),
    })

    const hindiEl = document.getElementById('hero-hindi')
    if (hindiEl) {
      const raw = hindiEl.textContent
      hindiEl.style.opacity = 1
      try {
        const clusters = [...new Intl.Segmenter('hi', { granularity: 'grapheme' }).segment(raw)].map(s => s.segment)
        hindiEl.innerHTML = clusters.map(c =>
          c === ' ' ? ' ' : `<span class="letter" style="display:inline-block;opacity:0;transform:translateY(20px)">${c}</span>`
        ).join('')
      } catch {
        // Intl.Segmenter not supported (Firefox Android, older browsers) — skip per-letter split, text already visible via inline opacity
      }
    }

    const tl = anime.timeline({ easing: 'easeOutExpo' })
    tl
      .add({ targets: '#hero-hindi .letter', opacity: [0, 1], translateY: [20, 0], duration: 600, delay: anime.stagger(35) })
      .add({ targets: '#hero-title', opacity: [0, 1], translateY: [40, 0], duration: 900 }, '-=200')
      .add({ targets: '#hero-divider', opacity: [0, 1], scaleX: [0, 1], duration: 800 }, '-=400')
      .add({ targets: '#hero-names', opacity: [0, 1], translateY: [24, 0], duration: 700, easing: 'spring(1, 80, 10, 0)' }, '-=300')
      .add({ targets: '#hero-tagline', opacity: [0, 1], translateY: [12, 0], duration: 600, easing: 'easeOutQuad' }, '-=200')
      .add({ targets: '#hero-title-bar', opacity: [0, 1], scaleX: [0, 1], duration: 800, easing: 'easeOutExpo' }, '-=700')
      .add({ targets: '.corner-ornament', opacity: [0, 0.5], scale: [0.6, 1], duration: 600, delay: anime.stagger(80), easing: 'easeOutBack' }, 200)
      .add({ targets: '.hero-peacock-wrap.left', opacity: [0, 1], translateX: ['-40px', '0px'], translateY: ['-50%', '-50%'], scale: [0.8, 1], duration: 1000, easing: 'spring(1, 58, 10, 0)' }, 500)
      .add({ targets: '.hero-peacock-wrap.right', opacity: [0, 1], translateX: ['40px', '0px'], translateY: ['-50%', '-50%'], scale: [0.8, 1], duration: 1000, easing: 'spring(1, 58, 10, 0)' }, '-=1000')

    anime({
      targets: '.orn-stem',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1400, delay: 700, easing: 'easeOutCubic',
    })
  }, [])

  const ORNAMENT_POS = ['tl', 'tr', 'bl', 'br']

  return (
    <div id="hero">
      <HeroToran />
      <div className="hero-border" />
      {ORNAMENT_POS.map(pos => (
        <svg key={pos} className={`corner-ornament ${pos}`} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2 L2 28 Q2 54 28 54" stroke="#c49a3c" strokeWidth="1" fill="none" />
          <circle cx="2" cy="2" r="2.5" fill="#c49a3c" />
          <path d="M10 2 Q18 2 18 10" stroke="#c49a3c" strokeWidth="0.6" fill="none" opacity="0.5" />
          <path d="M2 10 Q2 18 10 18" stroke="#c49a3c" strokeWidth="0.6" fill="none" opacity="0.5" />
        </svg>
      ))}

      <div className="hero-glow" aria-hidden="true" />

      {['left', 'right'].map(side => (
        <div key={side} className={`hero-peacock-wrap ${side}`} aria-hidden="true">
          <HeroSideOrnament />
        </div>
      ))}

      <svg className="hero-mandala" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(250,250)">
          <circle r="220" fill="none" stroke="#c49a3c" strokeWidth="0.5" />
          <circle r="185" fill="none" stroke="#c49a3c" strokeWidth="0.3" />
          <circle r="148" fill="none" stroke="#c49a3c" strokeWidth="0.5" />
          <circle r="108" fill="none" stroke="#c49a3c" strokeWidth="0.3" />
          <circle r="68" fill="none" stroke="#c49a3c" strokeWidth="0.5" />
          <circle r="38" fill="none" stroke="#c49a3c" strokeWidth="1" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
            const fills = ['#c9921a', '#9b1f3a', '#1a6b6b', '#9b5ab8', '#c9921a', '#9b1f3a', '#1a6b6b', '#9b5ab8']
            return <ellipse key={`pf${deg}`} rx="14" ry="40" transform={`rotate(${deg}) translate(0,-96)`} fill={fills[i]} opacity="0.2" />
          })}
          <g>
            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
              <ellipse key={deg} rx="18" ry="48" transform={`rotate(${deg}) translate(0,-96)`} fill="none" stroke="#c49a3c" strokeWidth="0.6" />
            ))}
          </g>
          <g>
            {[[148, 0], [104, 104], [0, 148], [-104, 104], [-148, 0], [-104, -104], [0, -148], [104, -104]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="2.5" fill="#c49a3c" opacity="0.5" />
            ))}
          </g>
        </g>
      </svg>

      <div className="hero-content">
        <p className="hero-hindi" id="hero-hindi">पच्चीस वर्षों का उत्सव</p>

        <div className="hero-title-bar" id="hero-title-bar" aria-hidden="true">
          <svg width="100%" height="22" viewBox="0 0 480 22" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="tbg-l" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#c49a3c" stopOpacity="0" />
                <stop offset="100%" stopColor="#c49a3c" stopOpacity="0.55" />
              </linearGradient>
              <linearGradient id="tbg-r" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#c49a3c" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#c49a3c" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="0" y1="11" x2="208" y2="11" stroke="url(#tbg-l)" strokeWidth="0.8" />
            <circle cx="172" cy="11" r="1.4" fill="#c49a3c" opacity="0.45" />
            <circle cx="188" cy="11" r="2" fill="#c49a3c" opacity="0.6" />
            <circle cx="202" cy="11" r="1.4" fill="#c49a3c" opacity="0.45" />
            <path d="M240,2 L250,11 L240,20 L230,11 Z" fill="#c49a3c" opacity="0.65" />
            <circle cx="240" cy="11" r="3.5" fill="#fff8d0" opacity="0.92" />
            <circle cx="240" cy="11" r="1.4" fill="#c49a3c" opacity="0.88" />
            <circle cx="278" cy="11" r="1.4" fill="#c49a3c" opacity="0.45" />
            <circle cx="292" cy="11" r="2" fill="#c49a3c" opacity="0.6" />
            <circle cx="308" cy="11" r="1.4" fill="#c49a3c" opacity="0.45" />
            <line x1="272" y1="11" x2="480" y2="11" stroke="url(#tbg-r)" strokeWidth="0.8" />
          </svg>
        </div>

        <h1 className="hero-title" id="hero-title">
          Silver Jubilee
          <span>25 Years · 2nd July 2026</span>
        </h1>
        <div className="hero-divider" id="hero-divider" />
        <p className="hero-names" id="hero-names">
          <em>Shweta &amp; Deepesh Jain</em>
        </p>
        <p className="hero-tagline" id="hero-tagline">
          Lucknow &nbsp;·&nbsp; You are what makes this celebration complete
        </p>
      </div>
    </div>
  )
}

// ── SectionOrnament ─────────────────────────────────────────────────────────

function SectionOrnament() {
  return (
    <svg width="46" height="170" viewBox="0 0 44 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22,6 L22,154" stroke="#c49a3c" strokeWidth="0.7" opacity="0.42" />
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <ellipse key={`t${i}`} cx="22" cy="18" rx="2.5" ry="7"
          transform={`rotate(${deg},22,18) translate(0,-5)`}
          fill="#c2607a" opacity="0.5" />
      ))}
      <circle cx="22" cy="18" r="3.2" fill="#fff3e0" opacity="0.9" />
      <circle cx="22" cy="18" r="1.4" fill="#c49a3c" opacity="0.85" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <ellipse key={`c${i}`} cx="22" cy="80" rx="3.8" ry="10"
          transform={`rotate(${deg},22,80) translate(0,-8)`}
          fill={i % 2 === 0 ? '#c9921a' : '#9b1f3a'} opacity="0.4" />
      ))}
      <circle cx="22" cy="80" r="5.5" fill="#fff8d0" opacity="0.92" />
      <circle cx="22" cy="80" r="2.4" fill="#c49a3c" opacity="0.88" />
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <ellipse key={`b${i}`} cx="22" cy="142" rx="2.5" ry="7"
          transform={`rotate(${deg},22,142) translate(0,-5)`}
          fill="#c2607a" opacity="0.5" />
      ))}
      <circle cx="22" cy="142" r="3.2" fill="#fff3e0" opacity="0.9" />
      <circle cx="22" cy="142" r="1.4" fill="#c49a3c" opacity="0.85" />
      {[38, 58, 102, 122].map(y => (
        <circle key={y} cx="22" cy={y} r="1.3" fill="#c49a3c" opacity="0.28" />
      ))}
    </svg>
  )
}

const SectionOrns = () => (
  <>
    <div className="section-orn-wrap left" aria-hidden="true"><div className="section-orn"><SectionOrnament /></div></div>
    <div className="section-orn-wrap right" aria-hidden="true"><div className="section-orn"><SectionOrnament /></div></div>
  </>
)

// ── GarlandDivider ──────────────────────────────────────────────────────────

function GarlandDivider() {
  return (
    <div className="garland-divider" data-reveal>
      <svg width="300" height="24" viewBox="0 0 300 24" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="12" x2="300" y2="12" stroke="rgba(196,154,60,0.15)" strokeWidth="1" />
        <g transform="translate(55,12)"><circle r="6" fill="#c49a3c" opacity="0.5" /><circle r="3.5" fill="#ddb85a" opacity="0.7" /></g>
        <g transform="translate(95,12)"><circle r="4.5" fill="#c2607a" opacity="0.45" /><circle r="2.5" fill="#e0809a" opacity="0.65" /></g>
        <g transform="translate(135,12)"><circle r="8" fill="#c49a3c" opacity="0.55" /><circle r="4.5" fill="#f5e8c8" opacity="0.8" /></g>
        <g transform="translate(175,12)"><circle r="4.5" fill="#9b5ab8" opacity="0.4" /><circle r="2.5" fill="#c880e0" opacity="0.6" /></g>
        <g transform="translate(215,12)"><circle r="6" fill="#c49a3c" opacity="0.5" /><circle r="3.5" fill="#ddb85a" opacity="0.7" /></g>
        <ellipse cx="75" cy="7" rx="5" ry="2.5" fill="#2d5a1a" opacity="0.35" transform="rotate(-18,75,7)" />
        <ellipse cx="115" cy="17" rx="4.5" ry="2" fill="#2d5a1a" opacity="0.35" transform="rotate(14,115,17)" />
        <ellipse cx="155" cy="5" rx="6" ry="2.5" fill="#2d5a1a" opacity="0.35" transform="rotate(-8,155,5)" />
        <ellipse cx="195" cy="18" rx="4.5" ry="2" fill="#2d5a1a" opacity="0.35" transform="rotate(18,195,18)" />
      </svg>
    </div>
  )
}

// ── FoldCrease ───────────────────────────────────────────────────────────────

function FoldCrease() {
  return (
    <div className="fold-crease" aria-hidden="true">
      <svg className="fold-crease-diamond" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M9,1 L17,9 L9,17 L1,9 Z" fill="none" stroke="#c49a3c" strokeWidth="1" opacity="0.7" />
        <circle cx="9" cy="9" r="2.5" fill="#c49a3c" opacity="0.55" />
      </svg>
    </div>
  )
}

// ── ScratchCard ──────────────────────────────────────────────────────────────

const REVEAL_TARGET = new Date('2026-07-02T20:00:00')

function calcTimeLeft() {
  const diff = Math.max(0, REVEAL_TARGET.getTime() - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff % 86400000 / 3600000),
    mins: Math.floor(diff % 3600000 / 60000),
    secs: Math.floor(diff % 60000 / 1000),
  }
}

function ScratchCard() {
  const canvasRef = useRef(null)
  const revealRef = useRef(null)
  const isDrawing = useRef(false)
  const revealedRef = useRef(false)
  const [revealed, setRevealed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let ctx = null
    let scratchCount = 0

    function initCanvas() {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      if (w === 0 || h === 0) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx = canvas.getContext('2d')
      ctx.scale(dpr, dpr)

      const grad = ctx.createLinearGradient(0, 0, w, h)
      grad.addColorStop(0, '#b07c08')
      grad.addColorStop(0.38, '#e8b432')
      grad.addColorStop(0.62, '#d4a020')
      grad.addColorStop(1, '#b07c08')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      ctx.fillStyle = 'rgba(255,252,210,0.18)'
      for (let x = 10; x < w; x += 13) {
        for (let y = 10; y < h; y += 13) {
          ctx.beginPath()
          ctx.arc(x, y, 0.7, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.save()
      ctx.strokeStyle = 'rgba(255,248,190,0.09)'
      ctx.lineWidth = 1
      for (let i = -h; i < w + h; i += 20) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i + h, h)
        ctx.stroke()
      }
      ctx.restore()

      const corner = (cx, cy, sx, sy) => {
        ctx.save()
        ctx.strokeStyle = 'rgba(255,248,190,0.4)'
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(cx + sx * 22, cy)
        ctx.lineTo(cx, cy)
        ctx.lineTo(cx, cy + sy * 22)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(cx, cy, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,248,190,0.5)'
        ctx.fill()
        ctx.restore()
      }
      corner(16, 16, 1, 1)
      corner(w - 16, 16, -1, 1)
      corner(16, h - 16, 1, -1)
      corner(w - 16, h - 16, -1, -1)

      ctx.save()
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = 'rgba(255,252,220,0.85)'
      ctx.font = `500 13px 'DM Sans', sans-serif`
      ctx.fillText('✦  Scratch to reveal  ✦', w / 2, h / 2 - 10)
      ctx.font = `300 10px 'DM Sans', sans-serif`
      ctx.fillStyle = 'rgba(255,252,220,0.5)'
      ctx.fillText('the celebration date', w / 2, h / 2 + 10)
      ctx.restore()
    }

    const visObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        requestAnimationFrame(initCanvas)
        visObs.disconnect()
      }
    }, { threshold: 0.1 })
    visObs.observe(canvas)

    function getXY(e) {
      const rect = canvas.getBoundingClientRect()
      const src = e.touches ? e.touches[0] : e
      return { x: src.clientX - rect.left, y: src.clientY - rect.top }
    }

    function triggerReveal() {
      revealedRef.current = true

      // Blinding golden flash
      const wrapper = canvas.parentElement
      const flash = document.createElement('div')
      flash.style.cssText = 'position:absolute;inset:0;border-radius:16px;pointer-events:none;z-index:30;opacity:0;background:rgba(255,248,160,0.96)'
      wrapper.appendChild(flash)
      anime({
        targets: flash,
        opacity: [0, 1, 1, 0],
        duration: 750,
        easing: 'easeOutExpo',
        complete: () => flash.remove(),
      })

      // Canvas scales up and dissolves
      anime({
        targets: canvas,
        opacity: [1, 0],
        scale: [1, 1.18],
        duration: 700,
        delay: 120,
        easing: 'easeOutCubic',
      })

      // Radial sparkle burst from card centre
      const rect = canvas.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const layer = document.getElementById('sparkle-layer')
      if (layer) {
        const BURST_COLORS = ['#e8b432', '#c49a3c', '#c2607a', '#fff8d0', '#9b1f3a', '#e8960a']
        for (let i = 0; i < 36; i++) {
          const s = document.createElement('div')
          s.className = 'sparkle burst'
          const size = 4 + Math.random() * 9
          s.style.background = BURST_COLORS[i % BURST_COLORS.length]
          s.style.cssText += `left:${cx}px;top:${cy}px;width:${size}px;height:${size}px;`
          layer.appendChild(s)
          const angle = (i / 36) * Math.PI * 2 + (Math.random() - 0.5) * 0.5
          const dist = 55 + Math.random() * 130
          anime({
            targets: s,
            translateX: Math.cos(angle) * dist,
            translateY: Math.sin(angle) * dist,
            opacity: [0, 1, 0],
            scale: [0, 2.2, 0],
            duration: 900 + Math.random() * 600,
            easing: 'easeOutExpo',
            complete: () => s.remove(),
          })
        }
      }

      // Set state — React 18 batches these together
      setTimeout(() => {
        setTimeLeft(calcTimeLeft())
        setRevealed(true)
      }, 280)
    }

    function doScratch(e) {
      if (!ctx || !isDrawing.current || revealedRef.current) return
      const { x, y } = getXY(e)
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(x, y, 26, 0, Math.PI * 2)
      ctx.fill()

      scratchCount++
      if (scratchCount % 6 === 0) {
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
        let gone = 0
        for (let i = 3; i < data.length; i += 64) {
          if (data[i] < 128) gone++
        }
        if (gone / (data.length / 64) > 0.52) triggerReveal()
      }
    }

    const onDown = e => { isDrawing.current = true; doScratch(e) }
    const onUp = () => { isDrawing.current = false }
    const onTouchStart = e => { e.preventDefault(); onDown(e) }
    const onTouchMove = e => { e.preventDefault(); doScratch(e) }

    canvas.addEventListener('mousedown', onDown)
    canvas.addEventListener('mousemove', doScratch)
    canvas.addEventListener('mouseup', onUp)
    canvas.addEventListener('touchstart', onTouchStart, { passive: false })
    canvas.addEventListener('touchmove', onTouchMove, { passive: false })
    canvas.addEventListener('touchend', onUp)

    return () => {
      visObs.disconnect()
      canvas.removeEventListener('mousedown', onDown)
      canvas.removeEventListener('mousemove', doScratch)
      canvas.removeEventListener('mouseup', onUp)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onUp)
    }
  }, [])

  // Dramatic entrance animation for revealed content
  useEffect(() => {
    if (!revealed || !revealRef.current) return
    const el = revealRef.current
    const hindi = el.querySelector('.scratch-date-hindi')
    const date = el.querySelector('.scratch-date')
    const line = el.querySelector('.scratch-line')
    const countdown = el.querySelector('.scratch-countdown')

    // Set initial hidden states for each child, make parent visible
    anime.set([hindi, date, line].filter(Boolean), { opacity: 0 })
    if (countdown) anime.set(countdown, { opacity: 0, translateY: 22 })
    anime.set(el, { opacity: 1 })

    // Staggered spring entrance
    const tl = anime.timeline()
    tl.add({
      targets: hindi,
      opacity: [0, 1], translateY: [-18, 0],
      duration: 520, easing: 'easeOutExpo',
    }, 0)
    tl.add({
      targets: date,
      opacity: [0, 1], scale: [0.45, 1],
      duration: 1000, easing: 'spring(1, 44, 8, 0)',
    }, 140)
    tl.add({
      targets: line,
      scaleX: [0, 1], opacity: [0, 1],
      duration: 650, easing: 'easeOutExpo', transformOrigin: 'center center',
    }, 560)
    if (countdown) {
      tl.add({
        targets: countdown,
        opacity: [0, 1], translateY: [22, 0],
        duration: 700, easing: 'spring(1, 55, 10, 0)',
      }, 780)
    }
  }, [revealed])

  // Countdown tick
  useEffect(() => {
    if (!revealed) return
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [revealed])

  const pad = n => String(n).padStart(2, '0')

  return (
    <section id="scratch-section">
      <SectionOrns />
      <p className="section-label" data-reveal>रहस्य</p>
      <h2 className="section-title" data-reveal>The Big Day</h2>
      <p className="section-sub" data-reveal>Scratch the card below to reveal the date</p>

      <div className="scratch-wrapper">
        <div className="scratch-reveal" ref={revealRef}>
          <div className="scratch-date-hindi">२ जुलाई २०२६</div>
          <div className="scratch-date">2nd July 2026</div>
          <div className="scratch-line" />
          {timeLeft && (
            <div className="scratch-countdown">
              <div className="countdown-unit">
                <span className="countdown-num">{pad(timeLeft.days)}</span>
                <span className="countdown-label">Days</span>
              </div>
              <span className="countdown-colon">:</span>
              <div className="countdown-unit">
                <span className="countdown-num">{pad(timeLeft.hours)}</span>
                <span className="countdown-label">Hours</span>
              </div>
              <span className="countdown-colon">:</span>
              <div className="countdown-unit">
                <span className="countdown-num">{pad(timeLeft.mins)}</span>
                <span className="countdown-label">Mins</span>
              </div>
              <span className="countdown-colon">:</span>
              <div className="countdown-unit">
                <span className="countdown-num">{pad(timeLeft.secs)}</span>
                <span className="countdown-label">Secs</span>
              </div>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} className="scratch-canvas" />
      </div>
    </section>
  )
}

// ── EventCard ────────────────────────────────────────────────────────────────

function EventCard() {
  const bookRef = useRef(null)
  const navigating = useRef(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = bookRef.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      anime({
        targets: el,
        opacity: [0, 1], scale: [0.88, 1],
        duration: 900, easing: 'spring(1, 70, 10, 0)',
      })
      obs.unobserve(el)
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function goTo(next) {
    if (navigating.current || next === active || next < 0 || next >= EVENTS.length) return
    navigating.current = true
    const el = bookRef.current
    anime({
      targets: el,
      opacity: 0, scale: 0.92,
      duration: 200, easing: 'easeInQuad',
      complete: () => {
        setActive(next)
        anime({
          targets: el,
          opacity: 1, scale: 1,
          duration: 380, easing: 'easeOutExpo',
          complete: () => { navigating.current = false }
        })
      }
    })
  }

  const ev = EVENTS[active]

  return (
    <section id="card-section">
      <SectionOrns />
      <p className="section-label" data-reveal>उत्सव</p>
      <h2 className="section-title" data-reveal>The Celebrations</h2>
      <p className="section-sub" data-reveal>Three events · Three days of joy</p>
      <GarlandDivider />

      <div className="book-wrapper">
        <div className="book" ref={bookRef}>
          <div className="book-page" data-page={active}>
            <div className="book-page-inner">
              <div className="page-rajwada" aria-hidden="true" />
              <div className="page-band" />
              <div className="page-theme-label">{ev.theme}</div>
              <div className="page-top-icon">{ev.icon}</div>
              <div className="page-event-hindi">{ev.event}</div>
              <div className="page-event-title">{ev.title}</div>
              <div className="page-hr" />
              <div className="page-pill-row">
                <div className="page-pill">{ev.date}</div>
                <div className="page-pill">{ev.time}</div>
              </div>
              <p className="page-desc">{ev.desc}</p>
              <div className="page-dress-tag">
                <div className="page-dress-label">What to wear</div>
                <div className="page-dress-value">{ev.dress}</div>
              </div>
              <div className="page-venue-row">
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">📍 Hotel Damson Plum, Lucknow</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="book-controls">
        <button className="book-btn" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous event">‹</button>
        <div className="book-page-dots">
          {EVENTS.map((_, i) => (
            <div key={i} className={`book-dot${i === active ? ' active' : ''}`} onClick={() => goTo(i)} />
          ))}
        </div>
        <button className="book-btn" onClick={() => goTo(active + 1)} disabled={active === EVENTS.length - 1} aria-label="Next event">›</button>
      </div>
    </section>
  )
}

// ── VenueSection ─────────────────────────────────────────────────────────────

function VenueSection() {
  const cardRef = useRef(null)
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      anime({ targets: el, opacity: [0, 1], translateY: [30, 0], duration: 800, easing: 'easeOutExpo' })
      obs.unobserve(el)
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="venue-section">
      <SectionOrns />
      <p className="section-label" data-reveal>स्थान</p>
      <h2 className="section-title" data-reveal>Venue</h2>
      <p className="section-sub" data-reveal>2nd July 2026 · One beautiful hall</p>
      <div className="venue-card" ref={cardRef}>
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
          <div className="venue-map-placeholder"><div className="venue-map-pin">📍</div></div>
        </a>
        <div className="venue-body">
          <div className="venue-name">Hotel Damson Plum</div>
          <div className="venue-address">
            Plot No. F-1, 2, Amar Shaheed Path<br />
            Golf City, Sector B, Ansal API<br />
            Lucknow, Uttar Pradesh 226030
          </div>
          <a className="venue-map-link" href={MAPS_URL} target="_blank" rel="noopener noreferrer">📍 Open in Google Maps</a>
        </div>
      </div>
    </section>
  )
}

// ── PhotosSection ─────────────────────────────────────────────────────────────

function PhotosSection() {
  const gridRef = useRef(null)
  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      anime({ targets: '.photo-placeholder', opacity: [0, 1], scale: [0.94, 1], duration: 700, delay: anime.stagger(80), easing: 'easeOutExpo' })
      obs.unobserve(el)
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="photos-section">
      <SectionOrns />
      <p className="section-label" data-reveal>यादें</p>
      <h2 className="section-title" data-reveal>Through the Years</h2>
      <p className="section-sub" data-reveal>Shweta &amp; Deepesh Jain · 25 years</p>
      <div className="photos-grid" ref={gridRef}>
        {PHOTOS.map((p, i) => (
          <div key={i} className="photo-placeholder">
            {p.src
              ? <img src={p.src} alt={p.label} className="photo-img" />
              : <div className="photo-placeholder-icon">🖼</div>
            }
            <div className="photo-placeholder-label">{p.label}</div>
            <div className="photo-year-badge">{p.year}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── FooterSection ─────────────────────────────────────────────────────────────

function FooterSection() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      anime({ targets: [el.querySelector('.footer-main'), el.querySelector('.footer-sub')], opacity: [0, 1], translateY: [20, 0], duration: 700, delay: anime.stagger(120), easing: 'easeOutExpo' })
      obs.unobserve(el)
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <footer ref={ref}>
      <SectionOrns />
      <div className="footer-main">Thank you for being part of this story — your presence is the gift.</div>
      <div className="footer-sub">With love &nbsp;·&nbsp; July 2026</div>
    </footer>
  )
}

// ── EnvelopeScene ─────────────────────────────────────────────────────────────

function EnvelopeScene({ onOpen }) {
  const stageRef = useRef(null)
  const flapRef = useRef(null)
  const peekRef = useRef(null)
  const sceneRef = useRef(null)
  const hintRef = useRef(null)
  const openedRef = useRef(false)

  useEffect(() => {
    anime({
      targets: stageRef.current,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 900,
      easing: 'easeOutExpo',
      delay: 200,
    })
    anime({
      targets: hintRef.current,
      opacity: [0, 0.7],
      translateY: [12, 0],
      duration: 700,
      easing: 'easeOutExpo',
      delay: 900,
    })
  }, [])

  function handleOpen() {
    if (openedRef.current) return
    openedRef.current = true

    anime({
      targets: flapRef.current,
      rotateX: [-168],
      duration: 700,
      easing: 'easeInOutQuad',
    })

    anime({
      targets: peekRef.current,
      opacity: [0, 1],
      translateY: [0, -100],
      duration: 800,
      delay: 350,
      easing: 'easeOutExpo',
    })

    anime({
      targets: hintRef.current,
      opacity: 0,
      duration: 300,
    })

    anime({
      targets: sceneRef.current,
      opacity: [1, 0],
      duration: 600,
      delay: 1100,
      easing: 'easeInQuad',
      complete: () => onOpen(),
    })
  }

  return (
    <div className="env-scene" ref={sceneRef}>
      <FloralBg />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="env-stage" ref={stageRef} onClick={handleOpen} style={{ opacity: 0 }}>
          <div className="env-envelope">
            <div className="env-flap" ref={flapRef}>
              <svg className="env-flap-shape" viewBox="0 0 420 194" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="flap-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e8d080" />
                    <stop offset="100%" stopColor="#c8a830" />
                  </linearGradient>
                </defs>
                <polygon points="0,0 420,0 210,194" fill="url(#flap-grad)" />
                <polyline points="0,0 420,0 210,194 0,0" fill="none" stroke="rgba(196,154,60,0.55)" strokeWidth="1" />
                <line x1="0" y1="0" x2="210" y2="194" stroke="rgba(196,154,60,0.2)" strokeWidth="0.5" />
                <line x1="420" y1="0" x2="210" y2="194" stroke="rgba(196,154,60,0.2)" strokeWidth="0.5" />
              </svg>
            </div>

            <div className="env-fold-mark-left" aria-hidden="true" />
            <div className="env-fold-mark-right" aria-hidden="true" />

            <div className="env-seal">
              <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="seal-grad" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#e8a030" />
                    <stop offset="100%" stopColor="#9b1f3a" />
                  </radialGradient>
                </defs>
                <circle cx="40" cy="40" r="36" fill="url(#seal-grad)" />
                <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,240,180,0.4)" strokeWidth="1.5" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                  <ellipse key={i} cx="40" cy="40" rx="3.5" ry="11"
                    transform={`rotate(${deg},40,40) translate(0,-18)`}
                    fill="rgba(255,248,200,0.35)" />
                ))}
                <circle cx="40" cy="40" r="18" fill="none" stroke="rgba(255,240,180,0.35)" strokeWidth="0.8" />
                <text x="40" y="46" textAnchor="middle"
                  fontFamily="'Noto Serif Devanagari', 'Hind', sans-serif"
                  fontSize="16" fontWeight="600"
                  fill="rgba(255,248,210,0.95)">२५</text>
              </svg>
            </div>

            <div className="env-card-peek" ref={peekRef}>
              <div style={{ textAlign: 'center', padding: '12px 16px' }}>
                <div style={{ fontFamily: "'Noto Serif Devanagari', 'Hind', sans-serif", fontSize: '0.8rem', color: '#c49a3c', letterSpacing: '0.1em', marginBottom: '4px' }}>पच्चीस वर्षों का उत्सव</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#7a4020' }}>Silver Jubilee</div>
                <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg,transparent,#c49a3c,transparent)', margin: '8px auto' }} />
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a06040', opacity: 0.7 }}>Shweta &amp; Deepesh Jain</div>
              </div>
            </div>
          </div>
        </div>

        <p className="env-hint" ref={hintRef}>Click to open your invitation</p>
      </div>
    </div>
  )
}

// ── CardScene ─────────────────────────────────────────────────────────────────

function CardScene() {
  const panel2Ref = useRef(null)
  const panel3Ref = useRef(null)
  const panel4Ref = useRef(null)
  const panel5Ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const el = entry.target
        if (el.classList.contains('section-title')) {
          el.style.opacity = 1
          el.style.clipPath = 'inset(0 100% 0 0)'
          anime({ targets: el, clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'], translateY: [20, 0], duration: 900, easing: 'easeOutExpo' })
        } else if (el.classList.contains('section-label')) {
          el.style.opacity = 1
          anime({
            targets: el,
            clipPath: ['polygon(50% 0%,100% 50%,50% 100%,0% 50%)', 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)'],
            scale: [0.82, 1],
            opacity: [0, 1],
            duration: 680,
            easing: 'easeOutBack',
          })
        } else if (el.classList.contains('garland-divider') || el.classList.contains('paisley-divider')) {
          el.style.opacity = 1
          anime({ targets: el.querySelectorAll('g, path, circle'), scale: [0, 1], opacity: [0, 1], transformOrigin: 'center', duration: 500, delay: anime.stagger(55, { from: 'center' }), easing: 'spring(1, 80, 12, 0)' })
          anime({ targets: el.querySelector('line'), opacity: [0, 1], scaleX: [0, 1], transformOrigin: 'left center', duration: 700, easing: 'easeOutExpo' })
          if (el.classList.contains('garland-divider')) {
            anime({ targets: el.querySelectorAll('ellipse'), scale: [0, 1], opacity: [0, 1], duration: 400, delay: anime.stagger(80), easing: 'spring(1, 60, 10, 0)' })
          }
        } else if (el.classList.contains('section-orn')) {
          const isRight = el.parentElement.classList.contains('right')
          anime({ targets: el, opacity: [0, 1], translateX: [isRight ? 28 : -28, 0], scale: [0.88, 1], duration: 1000, easing: 'spring(1, 58, 10, 0)' })
        } else {
          anime({ targets: el, opacity: [0, 1], translateY: [24, 0], duration: 750, easing: 'easeOutExpo' })
        }
        obs.unobserve(el)
      })
    }, { threshold: 0.15 })

    document.querySelectorAll('[data-reveal], .section-label, .section-title, .section-sub, .garland-divider, .paisley-divider, .section-orn').forEach(el => obs.observe(el))

    const refs = [panel2Ref, panel3Ref, panel4Ref, panel5Ref]
    const delays = [600, 1400, 2200, 3000]

    const timers = refs.map((ref, i) => {
      return setTimeout(() => {
        const el = ref.current
        if (!el) return
        const targetH = el.scrollHeight
        anime({
          targets: el,
          height: [0, targetH],
          duration: 900,
          easing: 'easeInOutQuart',
          complete: () => {
            el.style.height = 'auto'
          },
        })
      }, delays[i])
    })

    return () => {
      obs.disconnect()
      timers.forEach(t => clearTimeout(t))
    }
  }, [])

  return (
    <div className="card-letter">
      {/* Panel 1: Hero / cover */}
      <Hero />

      <FoldCrease />

      {/* Panel 2: Scratch card */}
      <div className="fold-panel-wrap" ref={panel2Ref} style={{ height: 0 }}>
        <ScratchCard />
      </div>

      <FoldCrease />

      {/* Panel 3: Events */}
      <div className="fold-panel-wrap" ref={panel3Ref} style={{ height: 0 }}>
        <EventCard />
      </div>

      <FoldCrease />

      {/* Panel 4: Venue */}
      <div className="fold-panel-wrap" ref={panel4Ref} style={{ height: 0 }}>
        <VenueSection />
      </div>

      <FoldCrease />

      {/* Panel 5: Photos + Footer */}
      <div className="fold-panel-wrap" ref={panel5Ref} style={{ height: 0 }}>
        <PhotosSection />
        <FooterSection />
      </div>
    </div>
  )
}

// ── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [phase, setPhase] = useState('envelope')

  useEffect(() => {
    const timer = setInterval(() => spawnSparkles(2), 1400)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <div className="sparkle-layer" id="sparkle-layer" />
      {phase === 'envelope' && (
        <EnvelopeScene onOpen={() => setPhase('card')} />
      )}
      {phase === 'card' && (
        <>
          <FloralBg />
          <CardScene />
        </>
      )}
    </>
  )
}
