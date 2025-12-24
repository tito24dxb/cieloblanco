import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCreateWhatsAppContact } from '../hooks/useQueries';
import { toast } from 'sonner';

const WHATSAPP_NUMBER = '525519654396';

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    reason: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createWhatsAppContact = useCreateWhatsAppContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.reason.trim()) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save contact to backend
      await createWhatsAppContact.mutateAsync({
        name: formData.name.trim(),
        reason: formData.reason.trim(),
      });

      // Create WhatsApp message
      const message = `Hola, soy ${formData.name.trim()}. ${formData.reason.trim()}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

      // Redirect to WhatsApp
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // Reset form and close modal
      setFormData({ name: '', reason: '' });
      setIsOpen(false);
      toast.success('Redirigiendo a WhatsApp...');
    } catch (error) {
      console.error('Error al enviar contacto:', error);
      toast.error('Error al procesar tu solicitud. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-white hover:bg-white/95 text-[#25D366] rounded-full p-4 shadow-luxury transition-all duration-300 hover:scale-110 border border-gold/20 group"
        aria-label="Contactar por WhatsApp"
      >
        <SiWhatsapp className="h-7 w-7 transition-transform group-hover:rotate-12" />
      </button>

      {/* Contact Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl tracking-[0.15em] text-center">
              Contactar por WhatsApp
            </DialogTitle>
            <div className="w-16 h-[1px] bg-gold mx-auto mt-3" />
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp-name" className="text-xs uppercase tracking-[0.15em]">
                Nombre
              </Label>
              <Input
                id="whatsapp-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Tu nombre"
                className="border-border/50 focus:border-gold transition-colors"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp-reason" className="text-xs uppercase tracking-[0.15em]">
                Motivo de Contacto
              </Label>
              <Textarea
                id="whatsapp-reason"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                required
                rows={4}
                placeholder="¿En qué podemos ayudarte?"
                className="border-border/50 focus:border-gold transition-colors resize-none"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                  setFormData({ name: '', reason: '' });
                }}
                className="flex-1 border-border/50"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gold hover:bg-gold/90 text-background uppercase tracking-[0.2em] transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <MessageCircle className="mr-2 h-4 w-4 animate-pulse" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <SiWhatsapp className="mr-2 h-4 w-4" />
                    Enviar
                  </>
                )}
              </Button>
            </div>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Serás redirigido a WhatsApp para continuar la conversación
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
