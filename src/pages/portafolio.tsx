import { useState } from 'react';
import { Link } from 'react-router';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { ArrowRight, MapPin } from 'lucide-react';
import { portfolio } from 'virtual:content';

const stageColors: Record<string, string> = {
  'Pre-seed': '#4c6dc9',
  'Seed': '#C9A84C',
  'Series A': '#10B981',
  'Series B': '#8B5CF6',
};

export default function PortafolioPage() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const site = 'https://montiver.com';

  return (
    <>
      <Helmet>
        <title>Portafolio — Montiver</title>
        <meta name="description" content="Conoce las empresas que Montiver ha financiado. Startups y empresas en crecimiento desde pre-seed hasta Series B en Latinoamérica." />
        <link rel="canonical" href={`${site}/portafolio`} />
        <meta property="og:title" content="Portafolio — Montiver" />
        <meta property="og:description" content="47+ empresas financiadas. Conoce nuestro portafolio de startups y empresas en crecimiento." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/portafolio`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${site}/portafolio#webpage`,
          name: 'Portafolio — Montiver',
          url: `${site}/portafolio`,
          isPartOf: { '@id': `${site}/#website` },
          about: { '@id': `${site}/#organization` },
        })}</script>
      </Helmet>

      <main>
        {/* Hero */}
        <section className="pt-36 pb-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
                {portfolio.hero.eyebrow}
              </span>
              <h1
                className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {portfolio.hero.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {portfolio.hero.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-background border-b border-border/30 sticky top-20 z-30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div
              className="flex gap-1 overflow-x-auto py-4"
              role="group"
              aria-label="Filtrar por etapa"
            >
              {portfolio.filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="shrink-0 px-4 py-2 text-sm font-medium transition-all duration-200 border"
                  style={{
                    background: activeFilter === f ? 'hsl(var(--primary))' : 'transparent',
                    color: activeFilter === f ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))',
                    borderColor: activeFilter === f ? 'hsl(var(--primary))' : 'hsl(var(--border) / 0.4)',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Companies grid */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.companies.map((company, i) => (
                <motion.article
                  key={company.id}
                  className="bg-card border border-border/30 overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                  style={{
                    display: activeFilter === 'Todos' || company.stage === activeFilter ? 'block' : 'none',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-foreground mb-1">{company.company}</h2>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin size={11} />
                          <span>{company.country}</span>
                          <span>·</span>
                          <span>Fundada {company.founded}</span>
                        </div>
                      </div>
                      <span
                        className="shrink-0 px-2.5 py-1 text-xs font-semibold"
                        style={{
                          background: `${stageColors[company.stage] ?? '#C9A84C'}22`,
                          color: stageColors[company.stage] ?? '#C9A84C',
                          border: `1px solid ${stageColors[company.stage] ?? '#C9A84C'}44`,
                        }}
                      >
                        {company.stage}
                      </span>
                    </div>

                    {/* Sector */}
                    <div className="text-xs font-medium text-primary mb-3 uppercase tracking-wide">
                      {company.sector}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {company.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {company.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 border border-border/40 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Metric */}
                    <div className="pt-4 border-t border-border/30 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                        {company.metric}
                      </span>
                      <span className="text-xs text-muted-foreground">{company.metricLabel}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
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
                {portfolio.cta.title}
              </motion.h2>
              <p className="text-muted-foreground mb-8">{portfolio.cta.subtitle}</p>
              <Link
                to="/agendar"
                className="inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
              >
                {portfolio.cta.button}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
