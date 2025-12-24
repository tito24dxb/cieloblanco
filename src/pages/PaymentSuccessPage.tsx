import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import FadeIn from '../components/FadeIn';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
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
              <CheckCircle className="h-24 w-24 text-gold" />
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-4xl md:text-6xl tracking-[0.2em]">
                ¡GRACIAS!
              </h1>
              <div className="w-20 h-[1px] bg-gold mx-auto" />
            </div>

            <div className="space-y-4">
              <p className="text-xl text-muted-foreground">
                Tu pedido ha sido confirmado
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Recibirás un correo electrónico de confirmación con los detalles de tu pedido 
                y la información de seguimiento en breve.
              </p>
            </div>

            <div className="pt-8 space-y-4">
              <Button
                onClick={() => navigate({ to: '/' })}
                className="bg-gold hover:bg-gold/90 text-background uppercase tracking-[0.2em] px-8 py-6 transition-all duration-300 text-sm"
              >
                Volver al Inicio
              </Button>
            </div>

            <p className="text-sm text-muted-foreground pt-8">
              Si tienes alguna pregunta sobre tu pedido, por favor contáctanos.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
