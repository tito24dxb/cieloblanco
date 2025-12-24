import { useState, useEffect } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (currentPath !== '/home') {
      navigate({ to: '/home' });
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navigateToPage = (path: string) => {
    navigate({ to: path });
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { label: 'Inicio', action: () => navigateToPage('/home') },
    { label: 'Esencia', action: () => scrollToSection('essence') },
    { label: 'Tienda', action: () => navigateToPage('/tienda') },
    { label: 'Proceso', action: () => scrollToSection('craft') },
    { label: 'Galería', action: () => scrollToSection('gallery') },
    { label: 'Seguimiento', action: () => navigateToPage('/seguimiento') },
    { label: 'Contacto', action: () => scrollToSection('contact') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gold/10' 
          : 'bg-white/60 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => navigateToPage('/home')}
            className="flex items-center hover:opacity-80 transition-opacity duration-300"
          >
            <img
              src="/assets/1-removebg-preview.png"
              alt="CIELO BLANCO"
              className="h-12 w-auto object-contain"
            />
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-sm uppercase tracking-[0.15em] text-foreground hover:text-gold transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-gold transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gold/20 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="text-sm uppercase tracking-[0.15em] text-foreground hover:text-gold transition-colors duration-300 text-left py-2"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
