import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import FadeIn from '../components/FadeIn';

export default function TermsOfServicePage() {
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
                TÉRMINOS DE SERVICIO
              </h1>
              <div className="w-20 h-[1px] bg-gold mx-auto mb-6" />
              <p className="text-sm text-muted-foreground">
                Última actualización: Diciembre 2025
              </p>
            </div>

            <div className="prose prose-sm max-w-none space-y-8">
              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  1. Aceptación de los Términos
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Al acceder y utilizar el sitio web de Cielo Blanco S.A de C.V, usted acepta estar sujeto a estos 
                  Términos de Servicio y todas las leyes y regulaciones aplicables en México. Si no está de acuerdo 
                  con alguno de estos términos, no debe utilizar este sitio.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  2. Descripción del Servicio
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cielo Blanco ofrece la venta de mezcal artesanal premium a través de su plataforma en línea. 
                  Nuestros productos están destinados exclusivamente para personas mayores de 18 años en México.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  3. Verificación de Edad
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Al utilizar este sitio web, usted declara y garantiza que tiene al menos 18 años de edad. 
                  La venta de bebidas alcohólicas a menores de edad está estrictamente prohibida por la ley mexicana.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  4. Obligaciones del Usuario
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Al utilizar nuestro sitio web, usted se compromete a:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Proporcionar información veraz, precisa y actualizada</li>
                  <li>Mantener la confidencialidad de su cuenta y contraseña</li>
                  <li>No utilizar el sitio para fines ilegales o no autorizados</li>
                  <li>No interferir con el funcionamiento del sitio web</li>
                  <li>Consumir alcohol de manera responsable</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  5. Política de Compras
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>5.1 Precios:</strong> Todos los precios están expresados en pesos mexicanos (MXN) e incluyen 
                  impuestos aplicables. Nos reservamos el derecho de modificar los precios sin previo aviso.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>5.2 Disponibilidad:</strong> Los productos están sujetos a disponibilidad. En caso de que un 
                  producto no esté disponible después de realizar su pedido, le notificaremos y procesaremos el reembolso correspondiente.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>5.3 Métodos de Pago:</strong> Aceptamos tarjetas de crédito/débito, transferencias bancarias 
                  y efectivo según lo indicado en cada producto.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  6. Envíos y Entregas
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>6.1 Área de Cobertura:</strong> Realizamos envíos dentro del territorio mexicano.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>6.2 Tiempos de Entrega:</strong> Los tiempos de entrega varían según la ubicación del destinatario. 
                  Le proporcionaremos un número de seguimiento para rastrear su pedido.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>6.3 Verificación de Edad en la Entrega:</strong> El destinatario debe ser mayor de 18 años 
                  y presentar identificación oficial al momento de recibir el pedido.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  7. Política de Devoluciones
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Debido a la naturaleza de nuestros productos (bebidas alcohólicas), solo aceptamos devoluciones en 
                  los siguientes casos:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Producto defectuoso o dañado durante el envío</li>
                  <li>Error en el pedido (producto incorrecto enviado)</li>
                  <li>Producto vencido o en mal estado</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Las devoluciones deben solicitarse dentro de los 7 días posteriores a la recepción del producto.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  8. Limitaciones de Responsabilidad
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cielo Blanco S.A de C.V no será responsable por:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Daños indirectos, incidentales o consecuentes derivados del uso de nuestros productos</li>
                  <li>Interrupciones del servicio debido a mantenimiento o causas fuera de nuestro control</li>
                  <li>El consumo irresponsable de alcohol por parte de los usuarios</li>
                  <li>Retrasos en la entrega causados por terceros o eventos de fuerza mayor</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  9. Propiedad Intelectual
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Todo el contenido del sitio web, incluyendo textos, gráficos, logos, imágenes y software, es propiedad 
                  de Cielo Blanco S.A de C.V y está protegido por las leyes de propiedad intelectual de México. 
                  Queda prohibida su reproducción sin autorización expresa.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  10. Ley Aplicable y Jurisdicción
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Estos Términos de Servicio se rigen por las leyes de los Estados Unidos Mexicanos. 
                  Cualquier controversia derivada de estos términos será sometida a la jurisdicción de los tribunales 
                  competentes en México.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  11. Modificaciones a los Términos
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier momento. 
                  Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web. 
                  Es su responsabilidad revisar periódicamente estos términos.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  12. Consumo Responsable
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cielo Blanco promueve el consumo responsable de bebidas alcohólicas. Le recordamos que:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>El abuso en el consumo de alcohol es dañino para la salud</li>
                  <li>No debe conducir bajo los efectos del alcohol</li>
                  <li>Las mujeres embarazadas no deben consumir alcohol</li>
                  <li>Mantenga las bebidas alcohólicas fuera del alcance de menores</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl tracking-[0.15em] text-gold">
                  13. Atención al Cliente
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para cualquier consulta, queja o sugerencia relacionada con estos Términos de Servicio, 
                  puede contactarnos en:
                </p>
                <div className="bg-secondary/20 p-6 rounded-sm space-y-2">
                  <p className="text-muted-foreground">
                    <strong>Cielo Blanco S.A de C.V</strong>
                  </p>
                  <p className="text-muted-foreground">
                    Email: contacto@cieloblanco.com
                  </p>
                  <p className="text-muted-foreground">
                    Teléfono: +52 55 1965 4396
                  </p>
                  <p className="text-muted-foreground">
                    WhatsApp: +52 55 1965 4396
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
