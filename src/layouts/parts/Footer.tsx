import { Link } from 'react-router';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Portafolio', href: '/portafolio' },
  { label: 'Proceso de Inversión', href: '/proceso' },
  { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
  { label: 'Agendar Reunión', href: '/agendar' },
];

const legalLinks = [
  { label: 'Política de Privacidad', href: '/privacidad' },
  { label: 'Términos de Uso', href: '/terminos' },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <img
                src="/airo-assets/images/logo/horizontal"
                alt="Montiver"
                className="block h-auto max-h-10 w-auto object-contain self-center"
              />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              El fondo de inversión que convierte ideas ambiciosas en empresas que transforman industrias.
            </p>
            <div className="mt-6 w-10 h-0.5 bg-primary" />
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-5 text-primary">
              Navegación
            </h3>
            <nav aria-label="Footer links" className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-5 text-primary">
              Contacto
            </h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <span>contacto@montiver.com</span>
              <span>+1 (555) 000-0000</span>
              <span>Ciudad de México, México</span>
            </div>
            <div className="mt-6">
              <Link
                to="/agendar"
                className="inline-block px-5 py-2.5 text-sm font-semibold border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                Agendar Reunión
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-border/10">
          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} Montiver. Todos los derechos reservados. Las inversiones conllevan riesgos. El rendimiento pasado no garantiza resultados futuros.
          </p>
          <div className="flex gap-5">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
