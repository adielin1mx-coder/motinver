import { Link } from 'react-router';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { ArrowRight, XCircle, TrendingUp } from 'lucide-react';
import { criterios } from 'virtual:content';

const CONVICTION_COLOR: Record<string, string> = {
  Alta: 'hsl(var(--primary))',
  Media: 'hsl(var(--secondary))',
  Baja: 'hsl(var(--muted-foreground))',
};

export default function CriteriosPage() {
  const site = 'https://montiver.com';

  return (
    <>
      <Helmet>
        <title>Criterios de Inversión — Montiver</title>
        <meta
          name="description"
          content="Conoce la tesis de inversión de Montiver: sectores de enfoque, criterios de selección, etapas y tamaños de ticket. Todo lo que necesitas saber antes de aplicar."
        />
        <link rel="canonical" href={`${site}/criterios`} />
        <meta property="og:title" content="Criterios de Inversión — Montiver" />
        <meta property="og:description" content="Tesis de inversión, sectores de enfoque y criterios de selección de Montiver." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/criterios`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative pt-36 pb-0 bg-background overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
                {criterios.hero.eyebrow}
              </span>
              <h1
                className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {criterios.hero.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {criterios.hero.subtitle}
              </p>
            </motion.div>
          </div>

          <div className="relative h-64 lg:h-80 overflow-hidden">
            <img
              src="/airo-assets/images/pages/criteria/hero"
              alt="Análisis de inversión y estrategia de portafolio"
              className="w-full h-full object-cover"
              loading="eager"
              width={1200}
              height={500}
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent pointer-events-none" />
          </div>
        </section>

        {/* ── Thesis ───────────────────────────────────────────────────── */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <div className="sticky top-28">
                  <h2
                    className="text-4xl font-bold text-foreground"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {criterios.thesis.title}
                  </h2>
                  <div className="mt-4 w-10 h-0.5 bg-primary" />
                </div>
              </div>
              <div className="lg:col-span-8 flex flex-col gap-5">
                <p className="text-base text-muted-foreground leading-relaxed">
                  {criterios.thesis.body[0].text}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {criterios.thesis.body[1].text}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Focus sectors ────────────────────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                {criterios.focus.eyebrow}
              </span>
              <h2
                className="text-4xl font-bold text-foreground mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {criterios.focus.title}
              </h2>
              <p className="text-muted-foreground max-w-xl">{criterios.focus.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {criterios.focus.sectors.map((sector, i) => (
                <motion.div
                  key={sector.id}
                  className="bg-background border border-border/30 p-7 hover:border-primary/40 transition-colors duration-300 flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">{sector.name}</h3>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 shrink-0 ml-3"
                      style={{
                        background: `${CONVICTION_COLOR[sector.conviction]}22`,
                        color: CONVICTION_COLOR[sector.conviction],
                      }}
                    >
                      {sector.conviction}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {sector.description}
                  </p>
                  <div className="pt-4 border-t border-border/20">
                    <span className="text-xs text-muted-foreground/70">{sector.examples}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Evaluation criteria ──────────────────────────────────────── */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                {criterios.criteria.eyebrow}
              </span>
              <h2
                className="text-4xl font-bold text-foreground mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {criterios.criteria.title}
              </h2>
              <p className="text-muted-foreground max-w-xl">{criterios.criteria.subtitle}</p>
            </motion.div>

            <div className="flex flex-col gap-0 border border-border/30">
              {criterios.criteria.items.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="grid grid-cols-1 lg:grid-cols-12 border-b border-border/30 last:border-b-0"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                >
                  {/* Left: number + title + weight */}
                  <div className="lg:col-span-4 p-7 bg-card border-b lg:border-b-0 lg:border-r border-border/30 flex flex-col justify-between">
                    <div>
                      <div
                        className="text-4xl font-bold mb-2 leading-none"
                        style={{ color: 'hsl(var(--primary) / 0.3)', fontFamily: 'var(--font-heading)' }}
                      >
                        {item.number}
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            width: item.weight,
                            background: 'hsl(var(--primary))',
                            maxWidth: '100%',
                          }}
                        />
                        <span className="text-xs font-bold text-primary">{item.weight}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Peso en evaluación</span>
                    </div>
                  </div>

                  {/* Right: description + signals */}
                  <div className="lg:col-span-8 p-7">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {item.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.signals.map((signal) => (
                        <div key={signal} className="flex items-start gap-2">
                          <TrendingUp
                            size={13}
                            className="text-primary mt-0.5 shrink-0"
                          />
                          <span className="text-xs text-foreground/80">{signal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Investment stages ────────────────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                {criterios.stages.eyebrow}
              </span>
              <h2
                className="text-4xl font-bold text-foreground"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {criterios.stages.title}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {criterios.stages.items.map((stage, i) => (
                <motion.div
                  key={stage.id}
                  className="relative bg-background border p-8 flex flex-col"
                  style={{
                    borderColor: stage.ideal
                      ? 'hsl(var(--primary) / 0.5)'
                      : 'hsl(var(--border) / 0.3)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
                >
                  {stage.ideal && (
                    <div
                      className="absolute top-0 right-0 text-xs font-bold px-3 py-1"
                      style={{
                        background: 'hsl(var(--primary))',
                        color: 'hsl(var(--primary-foreground))',
                      }}
                    >
                      Etapa ideal
                    </div>
                  )}
                  <h3
                    className="text-2xl font-bold text-foreground mb-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {stage.stage}
                  </h3>
                  <div className="text-primary font-bold text-lg mb-1">{stage.ticket}</div>
                  <div className="text-xs text-muted-foreground mb-4">Equity: {stage.equity}</div>
                  <div
                    className="text-xs font-semibold px-2 py-1 mb-5 self-start"
                    style={{
                      background: 'hsl(var(--primary) / 0.1)',
                      color: 'hsl(var(--primary))',
                    }}
                  >
                    {stage.milestone}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {stage.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What we don't fund ───────────────────────────────────────── */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <motion.div
                  className="sticky top-28"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <h2
                    className="text-4xl font-bold text-foreground mb-3"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {criterios.nonFocus.title}
                  </h2>
                  <div className="w-10 h-0.5 bg-primary mb-4" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {criterios.nonFocus.subtitle}
                  </p>
                </motion.div>
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {criterios.nonFocus.items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      className="flex items-start gap-3 p-5 bg-card border border-border/20"
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.06, ease: 'easeOut' }}
                    >
                      <XCircle size={16} className="text-destructive shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="relative pl-8 lg:pl-12 max-w-2xl">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" aria-hidden="true" />
              <motion.h2
                className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {criterios.cta.title}
              </motion.h2>
              <p className="text-muted-foreground mb-8">{criterios.cta.subtitle}</p>
              <Link
                to="/agendar"
                className="inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
              >
                {criterios.cta.button}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
