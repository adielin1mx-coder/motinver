import { Link } from 'react-router';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { sobre_nosotros } from 'virtual:content';

export default function SobreNosotrosPage() {
  const site = 'https://montiver.com';

  return (
    <>
      <Helmet>
        <title>Sobre Nosotros — Montiver</title>
        <meta name="description" content="Conoce la historia, el equipo y la filosofía de Montiver. Fundado por emprendedores para emprendedores, con más de 12 años transformando startups en Latinoamérica." />
        <link rel="canonical" href={`${site}/sobre-nosotros`} />
        <meta property="og:title" content="Sobre Nosotros — Montiver" />
        <meta property="og:description" content="El fondo de inversión fundado por emprendedores para emprendedores. Conoce nuestro equipo y filosofía." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/sobre-nosotros`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <main>
        {/* Hero */}
        <section className="relative pt-36 pb-0 bg-background overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
                {sobre_nosotros.hero.eyebrow}
              </span>
              <h1
                className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {sobre_nosotros.hero.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {sobre_nosotros.hero.subtitle}
              </p>
            </motion.div>
          </div>

          {/* Hero image */}
          <div className="relative h-72 lg:h-96 overflow-hidden">
            <img
              src="/airo-assets/images/pages/about/hero"
              alt="Equipo Montiver en reunión"
              className="w-full h-full object-cover"
              loading="eager"
              width={1200}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
          </div>
        </section>

        {/* Stats band */}
        <section className="bg-muted py-14">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {sobre_nosotros.stats[0].value}
                </div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{sobre_nosotros.stats[0].label}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {sobre_nosotros.stats[1].value}
                </div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{sobre_nosotros.stats[1].label}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {sobre_nosotros.stats[2].value}
                </div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{sobre_nosotros.stats[2].label}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {sobre_nosotros.stats[3].value}
                </div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{sobre_nosotros.stats[3].label}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <div className="sticky top-28">
                  <h2
                    className="text-4xl font-bold text-foreground"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {sobre_nosotros.story.title}
                  </h2>
                  <div className="mt-4 w-10 h-0.5 bg-primary" />
                </div>
              </div>
              <div className="lg:col-span-8 flex flex-col gap-6">
                <p className="text-base text-muted-foreground leading-relaxed">{sobre_nosotros.story.paragraphs[0].text}</p>
                <p className="text-base text-muted-foreground leading-relaxed">{sobre_nosotros.story.paragraphs[1].text}</p>
                <p className="text-base text-muted-foreground leading-relaxed">{sobre_nosotros.story.paragraphs[2].text}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
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
              {sobre_nosotros.values.title}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sobre_nosotros.values.items.map((value, i) => (
                <motion.div
                  key={value.id}
                  className="bg-background border border-border/30 p-8 hover:border-primary/40 transition-colors duration-300"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                >
                  <h3 className="text-lg font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
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
                className="text-4xl font-bold text-foreground mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {sobre_nosotros.team.title}
              </h2>
              <p className="text-muted-foreground max-w-xl">{sobre_nosotros.team.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Member 1 */}
              <motion.div
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0, ease: 'easeOut' }}
              >
                <div className="relative h-64 overflow-hidden mb-5 bg-card">
                  <img
                    src="/airo-assets/images/team/alejandro-reyes"
                    alt={sobre_nosotros.team.members[0].name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={400}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-0.5">{sobre_nosotros.team.members[0].name}</h3>
                <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">{sobre_nosotros.team.members[0].role}</div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{sobre_nosotros.team.members[0].bio}</p>
                <div className="text-xs text-muted-foreground/60">{sobre_nosotros.team.members[0].focus}</div>
              </motion.div>

              {/* Member 2 */}
              <motion.div
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              >
                <div className="relative h-64 overflow-hidden mb-5 bg-card">
                  <img
                    src="/airo-assets/images/team/valentina-cruz"
                    alt={sobre_nosotros.team.members[1].name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={400}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-0.5">{sobre_nosotros.team.members[1].name}</h3>
                <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">{sobre_nosotros.team.members[1].role}</div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{sobre_nosotros.team.members[1].bio}</p>
                <div className="text-xs text-muted-foreground/60">{sobre_nosotros.team.members[1].focus}</div>
              </motion.div>

              {/* Member 3 */}
              <motion.div
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              >
                <div className="relative h-64 overflow-hidden mb-5 bg-card">
                  <img
                    src="/airo-assets/images/team/diego-montoya"
                    alt={sobre_nosotros.team.members[2].name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={400}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-0.5">{sobre_nosotros.team.members[2].name}</h3>
                <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">{sobre_nosotros.team.members[2].role}</div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{sobre_nosotros.team.members[2].bio}</p>
                <div className="text-xs text-muted-foreground/60">{sobre_nosotros.team.members[2].focus}</div>
              </motion.div>
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
                {sobre_nosotros.cta.title}
              </motion.h2>
              <p className="text-muted-foreground mb-8">{sobre_nosotros.cta.subtitle}</p>
              <Link
                to="/agendar"
                className="inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
              >
                {sobre_nosotros.cta.button}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
