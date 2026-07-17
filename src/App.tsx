import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Phone, MessageSquare, ClipboardList, Paintbrush, Droplets, Zap, Tv,
  Grid3X3, DoorOpen, Archive, Wrench, Mail, Globe, ChevronDown,
  Star, Shield, Clock, Menu, X, CheckCircle, ChevronLeft,
  ChevronRight, Expand, MapPin,
} from 'lucide-react';

/* ── Constants ────────────────────────────────────────────────────── */
const PHONE      = '747-370-4618';
const PHONE_HREF = 'tel:+17473704618';
const SMS_HREF   = 'sms:+17473704618';
const EMAIL      = 'info@fixnowhs.com';
const WEBSITE    = 'fixnowhs.com';

/* ── Data ─────────────────────────────────────────────────────────── */
const services = [
  { icon: Grid3X3,    label: 'Drywall Repair',    desc: 'Patches, holes, cracks & full panel replacement done right.' },
  { icon: Paintbrush, label: 'Painting',           desc: 'Interior & exterior painting with premium finish quality.' },
  { icon: Droplets,   label: 'Plumbing',           desc: 'Leak fixes, fixture installs & pipe repairs.' },
  { icon: Zap,        label: 'Electrical',         desc: 'Outlets, switches, ceiling fans & light fixtures.' },
  { icon: Tv,         label: 'TV Mounting',        desc: 'Secure wall mounting with clean cable management.' },
  { icon: Grid3X3,    label: 'Flooring',           desc: 'Hardwood, tile, vinyl & laminate installation.' },
  { icon: DoorOpen,   label: 'Door Installation',  desc: 'Interior, exterior & closet door fitting & hardware.' },
  { icon: Archive,    label: 'Garage Storage',     desc: 'Custom shelving, cabinets & overhead storage systems.' },
  { icon: Wrench,     label: 'General Handyman',   desc: 'Anything your home needs — we handle it all.' },
];

const galleryItems = [
  { src: '/images/photo_2026-07-12_00-43-26.jpg', label: 'Exterior Repair',     alt: 'Stucco and concrete exterior repair work' },
  { src: '/images/photo_2026-07-12_00-43-28.jpg', label: 'Drywall Work',         alt: 'Drywall installation and finishing in progress' },
  { src: '/images/photo_2026-07-12_00-43-32.jpg', label: 'Interior Painting',    alt: 'Smooth professional interior paint finish' },
  { src: '/images/photo_2026-07-12_00-43-33.jpg', label: 'Wall Finishing',       alt: 'Clean interior wall and ceiling finish' },
  { src: '/images/photo_2026-07-12_00-43-35.jpg', label: 'Accent Wall Painting', alt: 'Bold accent wall painting — salon project' },
];

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '10+',  label: 'Years Experience' },
  { value: '98%',  label: 'Client Satisfaction' },
  { value: '24h',  label: 'Response Time' },
];

/* ── Hooks ────────────────────────────────────────────────────────── */
function useIntersection(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ── RevealSection ────────────────────────────────────────────────── */
function RevealSection({
  children, className = '', delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useIntersection();
  return (
    <div
      ref={ref}
      className={`section-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Lightbox ────────────────────────────────────────────────────── */
function Lightbox({
  items, index, onClose, onPrev, onNext,
}: {
  items: typeof galleryItems;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="lightbox-content relative w-full max-w-5xl mx-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <span className="text-white font-bold text-lg">{item.label}</span>
            <span className="text-white/35 text-sm ml-3">{index + 1} / {items.length}</span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/8 hover:bg-white/15 text-white/70 hover:text-white transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10">
          <img
            src={item.src}
            alt={item.alt}
            className="w-full max-h-[75vh] object-contain"
          />
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between mt-5 px-1">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 bg-white/8 hover:bg-white/15 text-white/70 hover:text-white transition-all px-5 py-2.5 rounded-xl text-sm font-semibold"
          >
            <ChevronLeft size={16} /> Previous
          </button>
          {/* Dots */}
          <div className="flex gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => onClose()}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === index ? 'bg-[#1D6F42] w-5' : 'bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
          <button
            onClick={onNext}
            className="flex items-center gap-2 bg-white/8 hover:bg-white/15 text-white/70 hover:text-white transition-all px-5 py-2.5 rounded-xl text-sm font-semibold"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── GalleryItem ─────────────────────────────────────────────────── */
function GalleryItem({
  item, onClick,
}: { item: typeof galleryItems[0]; onClick: () => void }) {
  return (
    <div
      className="gallery-slot rounded-3xl border border-white/8 relative overflow-hidden group w-full h-full cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View ${item.label} project photo`}
    >
      {/* Real photo */}
      <img
        src={item.src}
        alt={item.alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Permanent subtle gradient at bottom for label legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Label — always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <div className="text-white font-bold text-sm tracking-wide">{item.label}</div>
      </div>

      {/* Hover overlay */}
      <div className="slot-overlay absolute inset-0 bg-black/30 flex items-center justify-center z-20">
        <div className="flex items-center gap-2 bg-[#1D6F42] text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-xl shadow-[#1D6F42]/40">
          <Expand size={14} /> View Photo
        </div>
      </div>
    </div>
  );
}

/* ── App ─────────────────────────────────────────────────────────── */
export default function App() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openLightbox = useCallback((i: number) => setLightboxIdx(i), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevSlide = useCallback(() =>
    setLightboxIdx(i => i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length), []);
  const nextSlide = useCallback(() =>
    setLightboxIdx(i => i === null ? null : (i + 1) % galleryItems.length), []);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#gallery',  label: 'Gallery' },
    { href: '#about',    label: 'About' },
    { href: '#contact',  label: 'Contact' },
  ];

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">

      {/* ═══════════════ NAV ═══════════════ */}
      <header className={`fixed top-0 left-0 right-0 z-50 nav-blur transition-all duration-400 ${
        scrolled ? 'bg-black/85 border-b border-white/6 py-3' : 'bg-transparent py-5'
      }`}>
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-[#1D6F42] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-[#1D6F42]/30">
              <Wrench size={17} className="text-white" />
            </div>
            <span className="font-black text-lg tracking-tight">Fix Now</span>
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="text-sm text-white/65 hover:text-white transition-colors duration-200 font-medium tracking-wide">
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={PHONE_HREF}
            className="hidden md:flex btn-primary items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold text-white shadow-lg shadow-[#1D6F42]/20"
          >
            <Phone size={15} /> {PHONE}
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-white/12 hover:border-white/30 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {/* Mobile dropdown */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="px-6 pb-6 pt-3 flex flex-col gap-3 bg-black/95 border-t border-white/6">
            {navLinks.map(({ href, label }) => (
              <a
                key={href} href={href}
                onClick={() => setMenuOpen(false)}
                className="text-white/75 hover:text-white font-medium py-2 border-b border-white/5 transition-colors"
              >
                {label}
              </a>
            ))}
            <a href={PHONE_HREF} className="btn-primary flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm mt-2 shadow-lg shadow-[#1D6F42]/25">
              <Phone size={15} /> Call Now — {PHONE}
            </a>
          </div>
        </div>
      </header>

      {/* ═══════════════ HERO ═══════════════ */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-24 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      >
        {/* Dark overlay — multi-layer for depth */}
        <div className="absolute inset-0 bg-black/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        {/* Green atmospheric glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#1D6F42]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          {/* Pill badge */}
          <div className="animate-fade-in inline-flex items-center gap-2.5 bg-white/8 border border-white/15 rounded-full px-5 py-2 text-xs font-semibold text-white/75 mb-10 tracking-widest uppercase backdrop-blur-sm">
            <MapPin size={12} className="text-[#1D6F42]" />
            Serving Los Angeles & Surrounding Areas
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up delay-200 font-black tracking-tight leading-[0.95] mb-8"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 7.5rem)' }}>
            <span className="text-gradient block">FIX NOW</span>
            <span className="text-white block">HANDYMAN</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in-up delay-300 text-xl md:text-2xl text-white/60 max-w-xl mx-auto mb-14 leading-relaxed font-light tracking-wide">
            Professional Home Services in Los Angeles
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href={PHONE_HREF}
              className="btn-primary animate-pulse-green flex items-center gap-3 px-10 py-5 rounded-full text-lg font-bold text-white w-full sm:w-auto justify-center shadow-2xl shadow-[#1D6F42]/30"
            >
              <Phone size={20} />
              Call Now — {PHONE}
            </a>

            <a
              href={SMS_HREF}
              className="btn-outline flex items-center gap-3 px-10 py-5 rounded-full text-lg font-bold text-white w-full sm:w-auto justify-center backdrop-blur-sm"
            >
              <MessageSquare size={20} />
              Text Message
            </a>

            <a
              href="#contact"
              className="btn-outline flex items-center gap-3 px-10 py-5 rounded-full text-lg font-bold text-white w-full sm:w-auto justify-center backdrop-blur-sm"
            >
              <ClipboardList size={20} />
              Free Estimate
            </a>
          </div>

          {/* Trust row */}
          <div className="animate-fade-in delay-600 flex flex-wrap items-center justify-center gap-8 text-white/45 text-sm">
            {[
              { icon: Shield, label: 'Licensed & Insured' },
              { icon: Star,   label: '5-Star Rated' },
              { icon: Clock,  label: 'Same Day Available' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 font-medium">
                <Icon size={15} className="text-[#1D6F42]" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <a
          href="#services"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/25 hover:text-white/60 transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={28} />
        </a>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="py-16 px-6 border-y border-white/6 bg-[#0a0a0a]">
        <RevealSection>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map(({ value, label }, i) => (
              <div key={label} className="text-center" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="text-4xl md:text-5xl font-black text-[#1D6F42] mb-2 tracking-tight">{value}</div>
                <div className="text-white/45 text-sm font-semibold tracking-widest uppercase">{label}</div>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section id="services" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-18">
            <p className="text-[#1D6F42] text-xs font-bold tracking-[0.25em] uppercase mb-4">What We Do</p>
            <h2 className="text-4xl md:text-6xl font-black mb-5 tracking-tight">Our Services</h2>
            <p className="text-white/45 text-xl max-w-lg mx-auto leading-relaxed">
              From minor repairs to full installations — precision and care on every job.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, label, desc }, i) => (
              <RevealSection key={label} delay={i * 55}>
                <div className="card-hover h-full bg-white/[0.03] border border-white/8 rounded-2xl p-8 flex flex-col gap-5 group">
                  <div className="w-13 h-13 bg-[#1D6F42]/12 border border-[#1D6F42]/25 rounded-2xl flex items-center justify-center w-12 h-12 group-hover:bg-[#1D6F42]/22 transition-colors duration-300">
                    <Icon size={22} className="text-[#1D6F42]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{label}</h3>
                    <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-line" />

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section id="gallery" className="py-28 px-6 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-18">
            <p className="text-[#1D6F42] text-xs font-bold tracking-[0.25em] uppercase mb-4">Our Work</p>
            <h2 className="text-4xl md:text-6xl font-black mb-5 tracking-tight">Project Gallery</h2>
            <p className="text-white/45 text-xl max-w-lg mx-auto leading-relaxed">
              Real projects, real results. Every job is treated with the same premium standard of care.
            </p>
          </RevealSection>

          {/* Desktop bento grid — 5 photos */}
          <RevealSection className="hidden md:block">
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: '300px 300px 360px',
              }}
            >
              {/* Photo 1 — exterior repair: wide left (col 1-2, row 1) */}
              <div style={{ gridColumn: '1 / 3', gridRow: '1' }} className="h-full">
                <GalleryItem item={galleryItems[0]} onClick={() => openLightbox(0)} />
              </div>
              {/* Photo 2 — drywall: normal right (col 3, row 1) */}
              <div style={{ gridColumn: '3', gridRow: '1' }} className="h-full">
                <GalleryItem item={galleryItems[1]} onClick={() => openLightbox(1)} />
              </div>
              {/* Photo 3 — painted wall: normal left (col 1, row 2) */}
              <div style={{ gridColumn: '1', gridRow: '2' }} className="h-full">
                <GalleryItem item={galleryItems[2]} onClick={() => openLightbox(2)} />
              </div>
              {/* Photo 4 — wall finish: wide right (col 2-3, row 2) */}
              <div style={{ gridColumn: '2 / 4', gridRow: '2' }} className="h-full">
                <GalleryItem item={galleryItems[3]} onClick={() => openLightbox(3)} />
              </div>
              {/* Photo 5 — accent wall: full width (col 1-3, row 3) */}
              <div style={{ gridColumn: '1 / 4', gridRow: '3' }} className="h-full">
                <GalleryItem item={galleryItems[4]} onClick={() => openLightbox(4)} />
              </div>
            </div>
          </RevealSection>

          {/* Mobile grid */}
          <RevealSection className="md:hidden">
            <div className="grid grid-cols-2 gap-3">
              {galleryItems.map((item, i) => (
                <div
                  key={item.src}
                  className={i === 4 ? 'col-span-2' : ''}
                  style={{ height: i === 4 ? 240 : 200 }}
                >
                  <GalleryItem item={item} onClick={() => openLightbox(i)} />
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      <div className="divider-line" />

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <RevealSection>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-white/8">
                  <img
                    src="https://images.pexels.com/photos/8961070/pexels-photo-8961070.jpeg?auto=compress&cs=tinysrgb&w=900"
                    alt="Fix Now Handyman professional at work in Los Angeles"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay tint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                {/* Badge */}
                <div className="absolute -bottom-6 -right-4 md:-right-6 bg-[#1D6F42] rounded-2xl px-6 py-5 shadow-2xl shadow-[#1D6F42]/30 border border-[#1D6F42]/50">
                  <div className="text-3xl font-black leading-none">10+</div>
                  <div className="text-white/80 text-sm font-semibold mt-1">Years of Excellence</div>
                </div>
                {/* Decorative corner dot */}
                <div className="absolute -top-4 -left-4 w-24 h-24 border border-[#1D6F42]/20 rounded-2xl" />
              </div>
            </RevealSection>

            <RevealSection delay={100}>
              <p className="text-[#1D6F42] text-xs font-bold tracking-[0.25em] uppercase mb-5">About Us</p>
              <h2 className="text-4xl md:text-5xl font-black mb-7 leading-[1.05] tracking-tight">
                Your Trusted Local<br />Home Experts
              </h2>
              <p className="text-white/55 text-lg leading-relaxed mb-5">
                Fix Now Handyman was founded with a simple mission: deliver premium home repair and improvement services that Los Angeles homeowners can truly rely on. Every technician on our team is vetted, experienced, and committed to excellence.
              </p>
              <p className="text-white/45 leading-relaxed mb-10">
                We treat your home like our own — no cutting corners, no surprise charges, no headaches. Just clean, professional work done right the first time.
              </p>

              <ul className="space-y-4 mb-12">
                {[
                  'Licensed, bonded & fully insured',
                  'Transparent, upfront pricing',
                  'Same-day and weekend availability',
                  '100% satisfaction guaranteed',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3.5 text-white/80 font-medium">
                    <CheckCircle size={19} className="text-[#1D6F42] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={PHONE_HREF}
                  className="btn-primary flex items-center justify-center gap-2.5 px-9 py-4.5 rounded-full font-bold text-base shadow-xl shadow-[#1D6F42]/25 py-4"
                >
                  <Phone size={17} /> Call Us Today
                </a>
                <a
                  href="#contact"
                  className="btn-outline flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-bold text-base"
                >
                  <ClipboardList size={17} /> Free Estimate
                </a>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <div className="divider-line" />

      {/* ═══════════════ CONTACT ═══════════════ */}
      <section id="contact" className="py-28 px-6 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-18">
            <p className="text-[#1D6F42] text-xs font-bold tracking-[0.25em] uppercase mb-4">Get In Touch</p>
            <h2 className="text-4xl md:text-6xl font-black mb-5 tracking-tight">Contact Us</h2>
            <p className="text-white/45 text-xl max-w-md mx-auto leading-relaxed">
              Ready to fix something? Reach out — we respond fast.
            </p>
          </RevealSection>

          {/* Contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              { icon: Phone,  label: 'Phone',   value: PHONE,   href: PHONE_HREF,          hint: 'Call or text anytime'       },
              { icon: Mail,   label: 'Email',   value: EMAIL,   href: `mailto:${EMAIL}`,   hint: 'We reply within 24 hours'   },
              { icon: Globe,  label: 'Website', value: WEBSITE, href: `https://${WEBSITE}`, hint: 'View more information'      },
            ].map(({ icon: Icon, label, value, href, hint }, i) => (
              <RevealSection key={label} delay={i * 80}>
                <a
                  href={href}
                  className="card-hover flex flex-col items-center text-center gap-5 bg-white/[0.028] border border-white/8 rounded-2xl p-10 group h-full"
                >
                  <div className="w-16 h-16 bg-[#1D6F42]/12 border border-[#1D6F42]/25 rounded-2xl flex items-center justify-center group-hover:bg-[#1D6F42]/22 transition-colors duration-300">
                    <Icon size={26} className="text-[#1D6F42]" />
                  </div>
                  <div>
                    <div className="text-white/35 text-xs font-bold uppercase tracking-[0.2em] mb-2">{label}</div>
                    <div className="text-white font-bold text-base mb-1 break-all">{value}</div>
                    <div className="text-white/35 text-sm">{hint}</div>
                  </div>
                </a>
              </RevealSection>
            ))}
          </div>

          {/* CTA banner */}
          <RevealSection>
            <div className="relative overflow-hidden rounded-3xl border border-[#1D6F42]/25 p-12 md:p-16 text-center"
                 style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(29,111,66,0.2) 0%, rgba(29,111,66,0.06) 50%, transparent 80%), #0a0a0a' }}>
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#1D6F42]/8 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#1D6F42]/6 rounded-full blur-[60px] pointer-events-none" />

              <div className="relative">
                <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Ready for a Free Estimate?</h3>
                <p className="text-white/50 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                  No obligation, no pressure. Honest advice and fair pricing for your home.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={PHONE_HREF}
                    className="btn-primary animate-pulse-green flex items-center justify-center gap-3 px-12 py-5 rounded-full font-bold text-lg shadow-2xl shadow-[#1D6F42]/30"
                  >
                    <Phone size={20} /> Call {PHONE}
                  </a>
                  <a
                    href={SMS_HREF}
                    className="btn-outline flex items-center justify-center gap-3 px-12 py-5 rounded-full font-bold text-lg"
                  >
                    <MessageSquare size={20} /> Text Us
                  </a>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="border-t border-white/6 py-12 px-6 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1D6F42] rounded-xl flex items-center justify-center shadow-lg shadow-[#1D6F42]/25">
              <Wrench size={16} className="text-white" />
            </div>
            <div>
              <div className="font-black text-base text-white leading-none">Fix Now Handyman</div>
              <div className="text-white/35 text-xs mt-0.5">Los Angeles, CA</div>
            </div>
          </div>

          <div className="text-white/30 text-sm text-center">
            &copy; {new Date().getFullYear()} Fix Now Handyman. All rights reserved.
          </div>

          <div className="flex items-center gap-5 text-sm">
            <a href={PHONE_HREF} className="text-white/40 hover:text-[#1D6F42] transition-colors font-medium">{PHONE}</a>
            <span className="text-white/15">|</span>
            <a href={`mailto:${EMAIL}`} className="text-white/40 hover:text-[#1D6F42] transition-colors font-medium">{EMAIL}</a>
          </div>
        </div>
      </footer>

      {/* ═══════════════ MOBILE FLOATING CALL BUTTON ═══════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden pb-safe">
        <div className="flex items-center gap-3 px-4 pb-6 pt-3 bg-gradient-to-t from-black via-black/90 to-transparent">
          <a
            href={PHONE_HREF}
            className="mobile-fab btn-primary animate-pulse-green flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-base tracking-wide"
          >
            <Phone size={20} />
            Call Now — {PHONE}
          </a>
          <a
            href={SMS_HREF}
            className="mobile-fab flex-shrink-0 w-16 h-16 bg-[#1D6F42]/15 border-2 border-[#1D6F42]/50 rounded-2xl flex items-center justify-center hover:bg-[#1D6F42]/25 transition-colors"
            aria-label="Text us"
          >
            <MessageSquare size={22} className="text-[#1D6F42]" />
          </a>
        </div>
      </div>

      {/* ═══════════════ LIGHTBOX ═══════════════ */}
      {lightboxIdx !== null && (
        <Lightbox
          items={galleryItems}
          index={lightboxIdx}
          onClose={closeLightbox}
          onPrev={prevSlide}
          onNext={nextSlide}
        />
      )}
    </div>
  );
}
