import { SiInstagram } from 'react-icons/si';
import { ShieldCheck } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-background border-t border-border/30">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-serif tracking-[0.2em] mb-3">CIELO BLANCO</h3>
            <p className="text-xs text-muted-foreground tracking-wide">
              Espíritu Puro. Origen Sagrado.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] mb-3 text-gold">Conectar</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/cieloblancomezcal?igsh=NGl1Z3g3c3k0MWpv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] mb-3 text-gold">Legal</h4>
            <div className="space-y-2">
              <button
                onClick={() => navigate({ to: '/politica-privacidad' })}
                className="block text-xs text-muted-foreground hover:text-gold transition-colors text-left"
              >
                Política de Privacidad
              </button>
              <button
                onClick={() => navigate({ to: '/terminos-servicio' })}
                className="block text-xs text-muted-foreground hover:text-gold transition-colors text-left"
              >
                Términos de Servicio
              </button>
              <button
                onClick={() => navigate({ to: '/admin' })}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-gold transition-colors"
              >
                <ShieldCheck className="h-3 w-3" />
                Administración
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border/30 text-center text-xs text-muted-foreground">
          <p>Cielo Blanco S.A de C.V todos los derechos reservados 2025</p>
        </div>
      </div>
    </footer>
  );
}
