import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Portafolio', href: '/portafolio' },
  { label: 'Proceso', href: '/proceso' },
  { label: 'Criterios', href: '/criterios' },
  { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-border/30' : 'border-b border-transparent'
      }`}
      style={{
        background: scrolled
          ? 'hsla(var(--background), 0.97)'
          : 'hsla(var(--background), 0.85)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 min-w-0">
            <img
              src="/airo-assets/images/logo/horizontal"
              alt="Montiver"
              className="block h-auto max-h-10 md:max-h-12 w-auto max-w-full object-contain self-center"
            />
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  location.pathname === link.href
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/agendar"
              className="ml-4 px-5 py-2.5 text-sm font-semibold tracking-wide bg-primary text-primary-foreground border border-primary hover:bg-transparent hover:text-primary transition-all duration-200"
            >
              Agendar Reunión
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border/20 bg-background">
          <nav aria-label="Navegación móvil" className="flex flex-col px-6 py-6 gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-base font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/agendar"
              className="mt-2 px-5 py-3 text-sm font-semibold text-center bg-primary text-primary-foreground"
            >
              Agendar Reunión
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
