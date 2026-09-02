import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { home } from 'virtual:content';

// ─── Animated counter hook ───────────────────────────────────────────────────
function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ─── Animated metric display (inline, no content props drilled) ──────────────
function AnimatedMetricValue({ rawValue, suffix, inView }: { rawValue: string; suffix: string; inView: boolean }) {
  const numericValue = parseFloat(rawValue.replace(/[^0-9.]/g, ''));
  const prefix = rawValue.replace(/[0-9.]+.*/, '');
  const count = useCounter(numericValue, 1800, inView);
  const isDecimal = numericValue % 1 !== 0;
  const displayValue = isDecimal
    ? (inView ? (count / 10).toFixed(1) : '0.0')
    : (inView ? count.toString() : '0');
  return (
    <span>
      <span>{prefix}</span>
      <span>{displayValue}</span>
      <span>{suffix}</span>
    </span>
  );
}

// ─── Metrics section (self-contained, no content props) ──────────────────────
function MetricsSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-muted overflow-hidden py-20" ref={ref}>
      {/* Giant decorative number */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-bold leading-none"
          style={{
            fontSize: 'clamp(8rem, 25vw, 22rem)',
            color: 'hsl(var(--primary) / 0.04)',
            fontFamily: 'var(--font-heading)',
          }}
        >
          47+
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="text-center">
            <div className="text-5xl lg:text-6xl font-bold mb-2" style={{ color: 'hsl(var(--primary))', fontFamily: 'var(--font-heading)' }}>
              <AnimatedMetricValue rawValue={home.metrics[0].value} suffix={home.metrics[0].suffix} inView={inView} />
            </div>
            <div className="text-sm font-medium tracking-wide uppercase text-muted-foreground">{home.metrics[0].label}</div>
          </div>
          <div className="text-center">
            <div className="text-5xl lg:text-6xl font-bold mb-2" style={{ color: 'hsl(var(--primary))', fontFamily: 'var(--font-heading)' }}>
              <AnimatedMetricValue rawValue={home.metrics[1].value} suffix={home.metrics[1].suffix} inView={inView} />
            </div>
            <div className="text-sm font-medium tracking-wide uppercase text-muted-foreground">{home.metrics[1].label}</div>
          </div>
          <div className="text-center">
            <div className="text-5xl lg:text-6xl font-bold mb-2" style={{ color: 'hsl(var(--primary))', fontFamily: 'var(--font-heading)' }}>
              <AnimatedMetricValue rawValue={home.metrics[2].value} suffix={home.metrics[2].suffix} inView={inView} />
            </div>
            <div className="text-sm font-medium tracking-wide uppercase text-muted-foreground">{home.metrics[2].label}</div>
          </div>
          <div className="text-center">
            <div className="text-5xl lg:text-6xl font-bold mb-2" style={{ color: 'hsl(var(--primary))', fontFamily: 'var(--font-heading)' }}>
              <AnimatedMetricValue rawValue={home.metrics[3].value} suffix={home.metrics[3].suffix} inView={inView} />
            </div>
            <div className="text-sm font-medium tracking-wide uppercase text-muted-foreground">{home.metrics[3].label}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const site = 'https://montiver.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${site}/#website`, name: 'Montiver', url: `${site}/` },
      {
        '@type': 'Organization',
        '@id': `${site}/#organization`,
        name: 'Montiver',
        url: `${site}/`,
        description: 'Fondo de inversión para startups y empresas en crecimiento en Latinoamérica.',
      },
      {
        '@type': 'WebPage',
        '@id': `${site}/#webpage`,
        url: `${site}/`,
        name: 'Montiver — El capital que necesitas. El socio que mereces.',
        isPartOf: { '@id': `${site}/#website` },
        about: { '@id': `${site}/#organization` },
        datePublished: '2026-08-30',
        dateModified: '2026-08-30',
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Montiver — El capital que necesitas. El socio que mereces.</title>
        <meta name="description" content="Montiver es el fondo de inversión estratégico para startups y empresas en crecimiento. Financiamos desde pre-seed hasta Series B en Latinoamérica." />
        <link rel="canonical" href={site} />
        <meta property="og:title" content="Montiver — El capital que necesitas. El socio que mereces." />
        <meta property="og:description" content="Fondo de inversión estratégico para los fundadores más ambiciosos de Latinoamérica." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={site} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 pointer-events-none">
            <img
              src="/airo-assets/images/pages/home/hero"
              alt=""
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
            <div className="absolute inset-0 bg-background/30" />
          </div>

          {/* Geometric accent line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 pointer-events-none"
            style={{ background: 'hsl(var(--primary))' }}
          />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 w-full">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <span
                  className="inline-block text-xs font-semibold tracking-widest uppercase mb-6 px-3 py-1.5 border"
                  style={{ color: 'hsl(var(--primary))', borderColor: 'hsl(var(--primary) / 0.4)' }}
                >
                  {home.hero.eyebrow}
                </span>
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-7xl font-bold leading-tight mb-6 text-foreground"
                style={{ fontFamily: 'var(--font-heading)' }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              >
                <span>{home.hero.title}</span>
                <br />
                <span style={{ color: 'hsl(var(--primary))' }}>{home.hero.titleLine2}</span>
              </motion.h1>

              <motion.p
                className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              >
                {home.hero.subtitle}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              >
                <Link
                  to="/portafolio"
                  className="inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                >
                  {home.hero.ctaPrimary}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/agendar"
                  className="inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold border border-foreground/30 text-foreground hover:border-primary hover:text-primary transition-all duration-200"
                >
                  {home.hero.ctaSecondary}
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-12 mx-auto"
              style={{ background: 'linear-gradient(to bottom, hsl(var(--primary)), transparent)' }}
            />
          </div>
        </section>

        {/* ── METRICS ──────────────────────────────────────────────────────── */}
        <MetricsSection />

        {/* ── SECTORS ──────────────────────────────────────────────────────── */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <h2
                className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {home.sectors.title}
              </h2>
              <p className="text-muted-foreground max-w-xl">{home.sectors.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {home.sectors.items.map((sector, i) => (
                <motion.div
                  key={sector.id}
                  className="border border-border/40 px-5 py-4 hover:border-primary/60 transition-all duration-300 group cursor-default"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                      {sector.name}
                    </span>
                    <ChevronRight
                      size={14}
                      className="text-muted-foreground group-hover:text-primary transition-colors"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO PREVIEW ─────────────────────────────────────────────── */}
        <section className="py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                  {home.portfolio.eyebrow}
                </span>
                <h2
                  className="text-4xl lg:text-5xl font-bold text-foreground"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {home.portfolio.title}
                </h2>
              </div>
              <p className="text-muted-foreground max-w-sm md:text-right">{home.portfolio.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {home.portfolio.items.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="bg-background border border-border/30 overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`/airo-assets/images/pages/home/portfolio-${i + 1}`}
                      alt={item.company}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width={600}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
                    <div
                      className="absolute top-4 left-4 px-2.5 py-1 text-xs font-semibold"
                      style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--background))' }}
                    >
                      {item.stage}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-foreground">{item.company}</h3>
                      <span className="text-xs text-muted-foreground border border-border/40 px-2 py-0.5">
                        {item.sector}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                    <div
                      className="text-sm font-semibold pt-4 border-t border-border/30"
                      style={{ color: 'hsl(var(--primary))' }}
                    >
                      {item.metric}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/portafolio"
                className="inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                {home.portfolio.cta}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────────────────────── */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              className="mb-16 text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                {home.process.eyebrow}
              </span>
              <h2
                className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {home.process.title}
              </h2>
              <p className="text-muted-foreground">{home.process.subtitle}</p>
            </motion.div>

            {/* Steps */}
            <div className="relative">
              {/* Connector line (desktop) */}
              <div
                className="hidden lg:block absolute top-10 left-0 right-0 h-px"
                style={{ background: 'hsl(var(--border) / 0.4)' }}
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {home.process.steps.map((step, i) => (
                  <motion.div
                    key={step.id}
                    className="relative"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
                  >
                    {/* Number */}
                    <div
                      className="text-5xl font-bold mb-6 leading-none"
                      style={{ color: 'hsl(var(--primary))', fontFamily: 'var(--font-heading)' }}
                    >
                      {step.number}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
        <section className="py-24 bg-muted overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="relative">
              {/* Decorative accent */}
              <div
                className="absolute -left-6 top-0 bottom-0 w-1 pointer-events-none"
                style={{ background: 'hsl(var(--primary))' }}
                aria-hidden="true"
              />

              <div className="pl-8 lg:pl-12 max-w-3xl">
                <motion.h2
                  className="text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  {home.cta.title}
                </motion.h2>

                <motion.p
                  className="text-xl text-muted-foreground mb-10 leading-relaxed"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                >
                  {home.cta.subtitle}
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row items-start gap-5"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
                >
                  <Link
                    to="/agendar"
                    className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                  >
                    {home.cta.button}
                    <ArrowRight size={18} />
                  </Link>
                  <span className="text-sm text-muted-foreground self-center">{home.cta.note}</span>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
