import { Link } from 'react-router';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { proceso } from 'virtual:content';

export default function ProcesoPage() {
  const site = 'https://montiver.com';

  return (
    <>
      <Helmet>
        <title>Proceso de Inversión — Montiver</title>
        <meta name="description" content="Conoce el proceso de inversión de Montiver: 4 pasos transparentes para acceder a capital desde pre-seed hasta Series B. Respuesta en 72 horas." />
        <link rel="canonical" href={`${site}/proceso`} />
        <meta property="og:title" content="Proceso de Inversión — Montiver" />
        <meta property="og:description" content="4 pasos para acceder al capital de Montiver. Transparente, ágil y diseñado para fundadores." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/proceso`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <main>
        {/* Hero */}
        <section className="pt-36 pb-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
                {proceso.hero.eyebrow}
              </span>
              <h1
                className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {proceso.hero.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {proceso.hero.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col gap-0">
              {proceso.steps.map((step, i) => (
                <motion.div
                  key={step.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-14 border-b border-border/20 last:border-0"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                >
                  {/* Number */}
                  <div className="lg:col-span-2 flex items-start">
                    <span
                      className="text-7xl font-bold leading-none"
                      style={{ color: 'hsl(var(--primary))', fontFamily: 'var(--font-heading)' }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-2xl font-bold text-foreground">{step.title}</h2>
                    </div>
                    <div
                      className="inline-block text-xs font-semibold px-3 py-1 mb-4 border"
                      style={{ color: 'hsl(var(--primary))', borderColor: 'hsl(var(--primary) / 0.3)' }}
                    >
                      {step.duration}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>

                  {/* Details */}
                  <div className="lg:col-span-5">
                    <ul className="flex flex-col gap-3">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle size={16} className="shrink-0 mt-0.5 text-primary" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Criteria */}
        <section className="py-20 bg-background">
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
                {proceso.criteria.title}
              </h2>
              <p className="text-muted-foreground max-w-xl">{proceso.criteria.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {proceso.criteria.items.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="bg-card border border-border/30 p-7 hover:border-primary/40 transition-colors duration-300"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                >
                  <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ticket sizes */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.h2
              className="text-4xl font-bold text-foreground mb-12"
              style={{ fontFamily: 'var(--font-heading)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {proceso.tickets.title}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {proceso.tickets.items.map((ticket, i) => (
                <motion.div
                  key={ticket.id}
                  className="bg-background border border-border/30 p-8 hover:border-primary/40 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
                >
                  <div
                    className="text-xs font-semibold tracking-widest uppercase mb-4 pb-4 border-b border-border/30"
                    style={{ color: 'hsl(var(--primary))' }}
                  >
                    {ticket.stage}
                  </div>
                  <div
                    className="text-3xl font-bold text-foreground mb-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {ticket.range}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">Equity: {ticket.equity}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{ticket.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Showcase */}
        <section className="py-20 bg-background overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                {proceso.showcase.eyebrow}
              </span>
              <h2
                className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {proceso.showcase.title}
              </h2>
              <p className="text-muted-foreground max-w-xl">{proceso.showcase.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Showcase item 0 */}
              <motion.div
                className="relative bg-card border border-border/30 p-8 hover:border-primary/40 transition-colors duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0, ease: 'easeOut' }}
              >
                <div
                  className="text-4xl font-bold leading-none mb-6 select-none"
                  style={{ color: 'hsl(var(--primary) / 0.25)', fontFamily: 'var(--font-heading)' }}
                  aria-hidden="true"
                >
                  "
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-6 italic">
                  {proceso.showcase.items[0].quote}
                </p>
                <div className="pt-5 border-t border-border/30">
                  <div className="text-sm font-bold text-foreground">{proceso.showcase.items[0].author}</div>
                  <div className="text-xs text-muted-foreground mb-3">{proceso.showcase.items[0].role}</div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs px-2 py-0.5 font-semibold"
                      style={{ background: 'hsl(var(--primary) / 0.12)', color: 'hsl(var(--primary))' }}
                    >
                      {proceso.showcase.items[0].stage}
                    </span>
                    <span className="text-xs font-semibold text-primary">{proceso.showcase.items[0].result}</span>
                  </div>
                </div>
              </motion.div>

              {/* Showcase item 1 */}
              <motion.div
                className="relative bg-card border border-border/30 p-8 hover:border-primary/40 transition-colors duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              >
                <div
                  className="text-4xl font-bold leading-none mb-6 select-none"
                  style={{ color: 'hsl(var(--primary) / 0.25)', fontFamily: 'var(--font-heading)' }}
                  aria-hidden="true"
                >
                  "
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-6 italic">
                  {proceso.showcase.items[1].quote}
                </p>
                <div className="pt-5 border-t border-border/30">
                  <div className="text-sm font-bold text-foreground">{proceso.showcase.items[1].author}</div>
                  <div className="text-xs text-muted-foreground mb-3">{proceso.showcase.items[1].role}</div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs px-2 py-0.5 font-semibold"
                      style={{ background: 'hsl(var(--primary) / 0.12)', color: 'hsl(var(--primary))' }}
                    >
                      {proceso.showcase.items[1].stage}
                    </span>
                    <span className="text-xs font-semibold text-primary">{proceso.showcase.items[1].result}</span>
                  </div>
                </div>
              </motion.div>

              {/* Showcase item 2 */}
              <motion.div
                className="relative bg-card border border-border/30 p-8 hover:border-primary/40 transition-colors duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              >
                <div
                  className="text-4xl font-bold leading-none mb-6 select-none"
                  style={{ color: 'hsl(var(--primary) / 0.25)', fontFamily: 'var(--font-heading)' }}
                  aria-hidden="true"
                >
                  "
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-6 italic">
                  {proceso.showcase.items[2].quote}
                </p>
                <div className="pt-5 border-t border-border/30">
                  <div className="text-sm font-bold text-foreground">{proceso.showcase.items[2].author}</div>
                  <div className="text-xs text-muted-foreground mb-3">{proceso.showcase.items[2].role}</div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs px-2 py-0.5 font-semibold"
                      style={{ background: 'hsl(var(--primary) / 0.12)', color: 'hsl(var(--primary))' }}
                    >
                      {proceso.showcase.items[2].stage}
                    </span>
                    <span className="text-xs font-semibold text-primary">{proceso.showcase.items[2].result}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats bar */}
            <motion.div
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-0 border border-border/30 bg-muted"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            >
              <div className="px-8 py-6 border-b md:border-b-0 md:border-r border-border/30 text-center">
                <div className="text-3xl font-bold text-primary mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  72h
                </div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Tiempo de respuesta</div>
              </div>
              <div className="px-8 py-6 border-b md:border-b-0 md:border-r border-border/30 text-center">
                <div className="text-3xl font-bold text-primary mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  3 sem.
                </div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Due diligence promedio</div>
              </div>
              <div className="px-8 py-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  5 días
                </div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Despliegue de capital</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="relative pl-8 lg:pl-12 max-w-2xl">
              <div className="absolute -left-0 top-0 bottom-0 w-1 bg-primary" aria-hidden="true" />
              <motion.h2
                className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {proceso.cta.title}
              </motion.h2>
              <p className="text-muted-foreground mb-8">{proceso.cta.subtitle}</p>
              <Link
                to="/agendar"
                className="inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
              >
                {proceso.cta.button}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
