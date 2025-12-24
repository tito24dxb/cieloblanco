import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import FadeIn from '../components/FadeIn';

export default function WelcomePage() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleYes = () => {
    setIsExiting(true);
    sessionStorage.setItem('ageVerified', 'true');
    setTimeout(() => {
      navigate({ to: '/home' });
    }, 300);
  };

  const handleNo = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, oklch(var(--gold)) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <FadeIn>
        <div className={`relative transition-all duration-500 ${isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {/* Compact elegant modal card */}
          <div className="relative bg-white/95 backdrop-blur-xl border border-gold/20 rounded-lg shadow-2xl p-6 sm:p-8 md:p-10 max-w-md mx-auto">
            {/* Decorative corner accents - smaller */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/40 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/40 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/40 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/40 rounded-br-lg" />

            <div className="text-center space-y-6">
              {/* Brand Logo - more subtle */}
              <div className="space-y-3">
                <div className="flex justify-center mb-2">
                  <img
                    src="/assets/1.png"
                    alt="CIELO BLANCO"
                    className="h-12 sm:h-14 w-auto object-contain opacity-90"
                  />
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-foreground">
                  CIELO BLANCO
                </h1>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-8 h-[1px] bg-gold/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                  <div className="w-8 h-[1px] bg-gold/60" />
                </div>
              </div>

              {/* Age Verification Message - more compact */}
              <div className="space-y-4 py-4">
                <h2 className="font-serif text-xl sm:text-2xl tracking-[0.15em] text-foreground">
                  ¿Tienes más de 18 años?
                </h2>
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground font-light">
                  Debes ser mayor de edad
                </p>
              </div>

              {/* Action Buttons - more compact */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch pt-2">
                <Button
                  onClick={handleYes}
                  className="flex-1 bg-gold hover:bg-gold/90 text-white uppercase tracking-[0.2em] py-5 sm:py-6 transition-all duration-300 text-xs sm:text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Sí, tengo 18+
                </Button>
                <Button
                  onClick={handleNo}
                  variant="outline"
                  className="flex-1 border border-gold/30 text-foreground hover:bg-gold/5 hover:border-gold uppercase tracking-[0.2em] py-5 sm:py-6 transition-all duration-300 text-xs sm:text-sm font-medium"
                >
                  No
                </Button>
              </div>

              {/* Legal Notice - more compact */}
              <div className="pt-6 border-t border-gold/10 mt-6">
                <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
                  El consumo excesivo de alcohol es dañino para la salud.
                  <br />
                  Prohibida su venta a menores de edad.
                </p>
              </div>
            </div>
          </div>

          {/* Soft glow effect - more subtle */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold rounded-full" />
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
