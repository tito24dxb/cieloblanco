import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import FadeIn from '../components/FadeIn';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export default function PaymentFailurePage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <XCircle className="h-24 w-24 text-destructive" />
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-4xl md:text-6xl tracking-[0.2em]">
                PAGO CANCELADO
              </h1>
              <div className="w-20 h-[1px] bg-gold mx-auto" />
            </div>

            <div className="space-y-4">
              <p className="text-xl text-muted-foreground">
                Tu pago no se ha completado
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                No se ha realizado ningún cargo a tu tarjeta. Si experimentaste algún problema 
                durante el proceso de pago, por favor intenta de nuevo o contáctanos para obtener ayuda.
              </p>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate({ to: '/checkout' })}
                className="bg-gold hover:bg-gold/90 text-background uppercase tracking-[0.2em] px-8 py-6 transition-all duration-300 text-sm"
              >
                Intentar de Nuevo
              </Button>
              <Button
                onClick={() => navigate({ to: '/' })}
                variant="outline"
                className="border-gold text-gold hover:bg-gold/10 uppercase tracking-[0.2em] px-8 py-6 transition-all duration-300 text-sm"
              >
                Volver al Inicio
              </Button>
            </div>

            <p className="text-sm text-muted-foreground pt-8">
              Si necesitas asistencia, por favor contáctanos.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
