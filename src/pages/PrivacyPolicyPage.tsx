import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import FadeIn from '../components/FadeIn';

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <FadeIn>
          <Button
            onClick={() => navigate({ to: '/home' })}
            variant="ghost"
            className="mb-8 text-gold hover:text-gold/80 hover:bg-gold/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Inicio
          </Button>

          <div className="space-y-8">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl tracking-[0.2em] mb-4">
                POLÍTICA DE PRIVACIDAD
              </h1>
              <div className="w-20 h-[1px] bg-gold mx-auto mb-6" />
              <p className="text-sm text-muted-foreground">
                Última actualización: Diciembre 2025
              </p>
            </div>

            <div className="prose prose-sm max-w-none space-y-8">
              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  1. Responsable del Tratamiento de Datos
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cielo Blanco S.A de C.V, con domicilio en México, es responsable del tratamiento de sus datos personales 
                  conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) 
                  y su Reglamento.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  2. Datos Personales Recopilados
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Recopilamos los siguientes datos personales cuando usted utiliza nuestro sitio web o realiza una compra:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Nombre completo</li>
                  <li>Correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Dirección de envío</li>
                  <li>Información de pago (procesada de forma segura por terceros)</li>
                  <li>Datos de navegación y cookies</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  3. Finalidades del Tratamiento
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Sus datos personales serán utilizados para las siguientes finalidades:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Procesar y gestionar sus pedidos</li>
                  <li>Enviar confirmaciones de compra y actualizaciones de envío</li>
                  <li>Proporcionar atención al cliente</li>
                  <li>Cumplir con obligaciones legales y fiscales</li>
                  <li>Mejorar nuestros productos y servicios</li>
                  <li>Enviar comunicaciones promocionales (con su consentimiento)</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  4. Derechos ARCO
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse (Derechos ARCO) al tratamiento de sus 
                  datos personales. Para ejercer estos derechos, puede contactarnos a través de:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Correo electrónico: privacidad@cieloblanco.com</li>
                  <li>Teléfono: +52 55 1965 4396</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Responderemos a su solicitud en un plazo máximo de 20 días hábiles conforme a la legislación aplicable.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  5. Transferencias de Datos
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Sus datos personales pueden ser compartidos con terceros únicamente en los siguientes casos:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Proveedores de servicios de pago y procesamiento de transacciones</li>
                  <li>Empresas de mensajería y logística para el envío de productos</li>
                  <li>Autoridades competentes cuando sea requerido por ley</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Todos los terceros están obligados a mantener la confidencialidad de sus datos y cumplir con la 
                  legislación mexicana de protección de datos.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  6. Medidas de Seguridad
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger sus datos personales 
                  contra daño, pérdida, alteración, destrucción o uso no autorizado. Estas medidas incluyen:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Cifrado de datos sensibles</li>
                  <li>Acceso restringido a información personal</li>
                  <li>Capacitación continua de nuestro personal</li>
                  <li>Auditorías de seguridad periódicas</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  7. Cookies y Tecnologías de Rastreo
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web. 
                  Puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  8. Cambios al Aviso de Privacidad
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nos reservamos el derecho de modificar este Aviso de Privacidad en cualquier momento. 
                  Las modificaciones serán publicadas en nuestro sitio web con la fecha de actualización correspondiente.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  9. Consentimiento
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Al utilizar nuestro sitio web y proporcionar sus datos personales, usted consiente el tratamiento 
                  de los mismos conforme a los términos establecidos en este Aviso de Privacidad.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  10. Contacto
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para cualquier duda o aclaración sobre este Aviso de Privacidad, puede contactarnos en:
                </p>
                <div className="bg-secondary/20 p-6 rounded-sm space-y-2">
                  <p className="text-muted-foreground">
                    <strong>Cielo Blanco S.A de C.V</strong>
                  </p>
                  <p className="text-muted-foreground">
                    Email: privacidad@cieloblanco.com
                  </p>
                  <p className="text-muted-foreground">
                    Teléfono: +52 55 1965 4396
                  </p>
                </div>
              </section>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
