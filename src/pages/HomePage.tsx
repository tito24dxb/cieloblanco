import ScrollCue from '../components/ScrollCue';
import FadeIn from '../components/FadeIn';
import ParallaxSection from '../components/ParallaxSection';
import BrandCarousel from '../components/BrandCarousel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { useGetAllProducts } from '../hooks/useQueries';

export default function HomePage() {
  const navigate = useNavigate();
  const { data: products, isLoading: productsLoading } = useGetAllProducts();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    setCurrentSlide(carouselApi.selectedScrollSnap());

    carouselApi.on('select', () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });

    // Auto-play carousel for multiple products
    const interval = setInterval(() => {
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselApi]);

  const scrollToSlide = useCallback(
    (index: number) => {
      carouselApi?.scrollTo(index);
    },
    [carouselApi]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleShopNow = () => {
    navigate({ to: '/tienda' });
  };

  const renderProductCard = (product: any) => (
    <div className="bg-white rounded-sm shadow-luxury overflow-hidden">
      <div className="p-8">
        {/* Product Image */}
        <div className="flex items-center justify-center mb-6">
          <img
            src={product.image.getDirectURL()}
            alt={product.name}
            className="w-full h-auto object-contain max-h-[300px] transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div>
            <h3 className="font-serif text-xl tracking-[0.15em] mb-2">
              {product.name}
            </h3>
            <div className="w-12 h-[1px] bg-gold" />
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Specifications */}
          {(product.specifications.alcoholContent || 
            product.specifications.agaveType || 
            product.specifications.bottleSize || 
            product.specifications.decorativeAccessories) && (
            <div className="pt-3 space-y-2 border-t border-border/30">
              <p className="text-xs uppercase tracking-[0.15em] text-gold mb-2">
                Especificaciones
              </p>
              <div className="space-y-1.5">
                {product.specifications.alcoholContent && (
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="w-1 h-1 bg-gold rounded-full mt-1.5 flex-shrink-0" />
                    <span><span className="font-medium">Contenido de alcohol:</span> {product.specifications.alcoholContent}</span>
                  </div>
                )}
                {product.specifications.agaveType && (
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="w-1 h-1 bg-gold rounded-full mt-1.5 flex-shrink-0" />
                    <span><span className="font-medium">Tipo de agave:</span> {product.specifications.agaveType}</span>
                  </div>
                )}
                {product.specifications.bottleSize && (
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="w-1 h-1 bg-gold rounded-full mt-1.5 flex-shrink-0" />
                    <span><span className="font-medium">Tamaño de botella:</span> {product.specifications.bottleSize}</span>
                  </div>
                )}
                {product.specifications.decorativeAccessories && (
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="w-1 h-1 bg-gold rounded-full mt-1.5 flex-shrink-0" />
                    <span><span className="font-medium">Accesorios:</span> {product.specifications.decorativeAccessories}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Ver más button */}
          <div className="pt-4">
            <Button
              onClick={() => navigate({ to: '/producto/$productId', params: { productId: String(product.id) } })}
              className="w-full bg-gold hover:bg-gold/90 text-background uppercase tracking-[0.2em] py-5 transition-all duration-300 text-sm group"
            >
              Ver más
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-6 animate-in fade-in duration-1000">
          <div className="mb-12 flex justify-center">
            <img
              src="/assets/1.png"
              alt="CIELO BLANCO Logo"
              className="h-32 md:h-40 lg:h-48 w-auto object-contain"
            />
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-[0.25em] mb-6 text-foreground">
            CIELO BLANCO
          </h1>
          <p className="text-base md:text-lg tracking-[0.3em] uppercase text-muted-foreground">
            Espíritu Puro. Origen Sagrado.
          </p>
        </div>

        <ScrollCue />
      </section>

      {/* The Essence Section */}
      <section id="essence" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-6xl tracking-[0.2em] text-center mb-6">
              LA ESENCIA
            </h2>
            <div className="w-20 h-[1px] bg-gold mx-auto mb-16" />
          </FadeIn>

          <div className="max-w-6xl mx-auto space-y-24">
            {/* Purity */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <FadeIn delay={100}>
                <ParallaxSection speed={0.3}>
                  <img
                    src="/assets/generated/agave-fields-golden.dim_1200x800.png"
                    alt="Campos de agave dorados"
                    className="w-full h-auto rounded-sm shadow-luxury"
                  />
                </ParallaxSection>
              </FadeIn>
              <FadeIn delay={200}>
                <div className="space-y-5">
                  <h3 className="font-serif text-3xl tracking-[0.15em] text-gold">Pureza</h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    En las tierras altas de Oaxaca, donde el cielo se encuentra con la tierra en perfecta armonía, 
                    cultivamos el agave sagrado. Cada planta es un testimonio de paciencia, creciendo 
                    durante siete a diez años bajo la mirada atenta del sol.
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Nuestro mezcal encarna la esencia de la pureza—intacta, sin compromisos y 
                    auténtica sin disculpas. Cada gota lleva el espíritu de la tierra y 
                    la dedicación de generaciones.
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Sacred Origin */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <FadeIn delay={100} className="md:order-2">
                <ParallaxSection speed={0.3}>
                  <img
                    src="/assets/generated/sunlight-agave.dim_900x600.png"
                    alt="Luz del sol sobre agave"
                    className="w-full h-auto rounded-sm shadow-luxury"
                  />
                </ParallaxSection>
              </FadeIn>
              <FadeIn delay={200} className="md:order-1">
                <div className="space-y-5">
                  <h3 className="font-serif text-3xl tracking-[0.15em] text-gold">Origen Sagrado</h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    El agave es más que una planta—es un regalo sagrado de la tierra. 
                    Venerado por civilizaciones antiguas, representa la conexión entre 
                    el cielo y la tierra, el espíritu y la materia.
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Honramos este legado tratando cada cosecha con reverencia, asegurando 
                    que cada botella de CIELO BLANCO lleve la sabiduría de siglos y 
                    la promesa de trascendencia.
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Philosophy */}
            <div className="text-center max-w-3xl mx-auto">
              <FadeIn delay={100}>
                <div className="space-y-6">
                  <h3 className="font-serif text-3xl tracking-[0.15em] text-gold">Nuestra Filosofía</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground italic">
                    "Para crear algo verdaderamente excepcional, uno debe abrazar tanto la tradición 
                    como la innovación, honrando el pasado mientras alcanza los cielos."
                  </p>
                  <div className="w-28 h-[1px] bg-gold mx-auto" />
                  <p className="text-base leading-relaxed text-muted-foreground">
                    CIELO BLANCO no es solo mezcal—es una experiencia, un viaje, un momento 
                    de conexión pura. Creemos en crear espíritus que eleven el alma 
                    y celebren la belleza de la simplicidad.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Store Section */}
      <section id="tienda" className="py-24 bg-secondary/20">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-6xl tracking-[0.2em] text-center mb-6">
              NUESTRA TIENDA
            </h2>
            <div className="w-20 h-[1px] bg-gold mx-auto mb-16" />
          </FadeIn>

          {productsLoading ? (
            <div className="text-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-gold mx-auto" />
              <p className="mt-4 text-muted-foreground">Cargando productos...</p>
            </div>
          ) : products && products.length === 1 ? (
            // Single product: centered display
            <div className="flex items-center justify-center min-h-[500px]">
              <FadeIn delay={100}>
                <div className="max-w-md w-full">
                  {renderProductCard(products[0])}
                </div>
              </FadeIn>
            </div>
          ) : products && products.length > 1 ? (
            // Multiple products: elegant carousel
            <FadeIn delay={100}>
              <div className="w-full max-w-6xl mx-auto space-y-8">
                <Carousel
                  setApi={setCarouselApi}
                  opts={{
                    align: 'center',
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {products.map((product) => (
                      <CarouselItem key={Number(product.id)} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-2">
                          {renderProductCard(product)}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>

                {/* Gold-accented navigation dots */}
                <div className="flex justify-center items-center gap-2">
                  {products.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSlide(index)}
                      className={`transition-all duration-500 rounded-full ${
                        currentSlide === index
                          ? 'w-8 h-2 bg-gold'
                          : 'w-2 h-2 bg-border hover:bg-gold/50'
                      }`}
                      aria-label={`Ir a producto ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </FadeIn>
          ) : (
            <div className="max-w-4xl mx-auto">
              <FadeIn delay={100}>
                <div className="bg-white rounded-sm shadow-luxury overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                    {/* Product Image */}
                    <div className="flex items-center justify-center">
                      <img
                        src="/assets/D_NQ_NP_2X_613603-MLA99333451234_112025-F.webp"
                        alt="CIELO BLANCO Mezcal"
                        className="w-full h-auto object-contain max-h-[400px] transition-transform duration-500 hover:scale-105"
                        style={{ maxWidth: '280px' }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center space-y-5">
                      <div>
                        <h3 className="font-serif text-2xl md:text-3xl tracking-[0.15em] mb-2">
                          CIELO BLANCO
                        </h3>
                        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                          Mezcal Artesanal
                        </p>
                      </div>

                      <div className="w-12 h-[1px] bg-gold" />

                      <p className="text-base leading-relaxed text-muted-foreground">
                        Mezcal premium elaborado con agave 100% Espadín de las tierras altas de Oaxaca. 
                        Destilado artesanalmente en pequeños lotes.
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1 h-1 bg-gold rounded-full" />
                          <span>750ml • 40% ABV</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1 h-1 bg-gold rounded-full" />
                          <span>Origen: Oaxaca, México</span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-3xl font-serif text-foreground">
                            $1,299.00
                          </span>
                          <span className="text-sm uppercase tracking-[0.15em] text-muted-foreground">
                            MXN
                          </span>
                        </div>

                        <Button
                          onClick={handleShopNow}
                          className="w-full bg-gold hover:bg-gold/90 text-background uppercase tracking-[0.2em] py-5 transition-all duration-300 text-sm group"
                        >
                          <ShoppingBag className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                          Ver en Tienda
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          )}

          {products && products.length > 0 && (
            <FadeIn delay={200}>
              <div className="text-center mt-12">
                <Button
                  onClick={handleShopNow}
                  variant="outline"
                  className="border-gold text-gold hover:bg-gold/10 uppercase tracking-[0.2em] px-8 py-6"
                >
                  Ver Todos los Productos
                </Button>
              </div>
            </FadeIn>
          )}

          <FadeIn delay={200}>
            <p className="text-center text-sm text-muted-foreground mt-8">
              Envío gratuito en pedidos dentro de México • Pago seguro
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The Craft Section */}
      <section id="craft" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-6xl tracking-[0.2em] text-center mb-6">
              EL ARTE
            </h2>
            <div className="w-20 h-[1px] bg-gold mx-auto mb-16" />
          </FadeIn>

          <div className="max-w-6xl mx-auto space-y-20">
            {/* Hand-Harvested Agave */}
            <FadeIn delay={100}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-serif text-gold/30">01</span>
                    <h3 className="font-serif text-2xl tracking-[0.15em]">Agave Cosechado a Mano</h3>
                  </div>
                  <div className="w-full h-[1px] bg-gold/30" />
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Nuestros jimadores, maestros de su oficio, seleccionan y cosechan cuidadosamente cada agave 
                    en su punto de madurez óptimo. Usando herramientas tradicionales transmitidas a través de generaciones, 
                    extraen el corazón de la planta con precisión y respeto.
                  </p>
                </div>
                <ParallaxSection speed={0.2}>
                  <img
                    src="/assets/generated/artisan-hands-agave.dim_800x600.png"
                    alt="Manos artesanales con agave"
                    className="w-full h-auto rounded-sm shadow-luxury"
                  />
                </ParallaxSection>
              </div>
            </FadeIn>

            {/* Traditional Distillation */}
            <FadeIn delay={100}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <ParallaxSection speed={0.2} className="md:order-2">
                  <img
                    src="/assets/generated/distillation-setup.dim_1000x750.png"
                    alt="Configuración de destilación tradicional"
                    className="w-full h-auto rounded-sm shadow-luxury"
                  />
                </ParallaxSection>
                <div className="space-y-5 md:order-1">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-serif text-gold/30">02</span>
                    <h3 className="font-serif text-2xl tracking-[0.15em]">Destilación Tradicional</h3>
                  </div>
                  <div className="w-full h-[1px] bg-gold/30" />
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Los corazones de agave asados se trituran y fermentan naturalmente, luego se destilan 
                    en alambiques de cobre. Este proceso consagrado por el tiempo preserva los sabores complejos 
                    y las cualidades aromáticas que definen un mezcal excepcional.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Artisanal Excellence */}
            <FadeIn delay={100}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-serif text-gold/30">03</span>
                    <h3 className="font-serif text-2xl tracking-[0.15em]">Excelencia Artesanal</h3>
                  </div>
                  <div className="w-full h-[1px] bg-gold/30" />
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Cada botella es una obra de arte, elaborada por artesanos expertos que entienden que 
                    el verdadero lujo reside en los detalles. Desde la primera cosecha hasta el vertido final, 
                    CIELO BLANCO representa la cúspide de la artesanía del mezcal.
                  </p>
                </div>
                <ParallaxSection speed={0.2}>
                  <img
                    src="/assets/generated/traditional-clay-pot.dim_600x600.png"
                    alt="Olla de barro tradicional"
                    className="w-full h-auto rounded-sm shadow-luxury"
                  />
                </ParallaxSection>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-secondary/20">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-6xl tracking-[0.2em] text-center mb-6">
              GALERÍA
            </h2>
            <div className="w-20 h-[1px] bg-gold mx-auto mb-16" />
          </FadeIn>

          <FadeIn delay={100}>
            <div className="text-center space-y-5 max-w-2xl mx-auto mb-16">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Experimenta la esencia de CIELO BLANCO a través de imágenes curadas que capturan 
                nuestra dedicación a la pureza, la artesanía y la elegancia atemporal.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Desde las botellas prístinas hasta los campos de agave dorados y los procesos artesanales, 
                cada visual cuenta la historia de nuestro compromiso con la excelencia.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <BrandCarousel />
          </FadeIn>
        </div>
      </section>

      {/* The Founder Section */}
      <section id="founder" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-6xl tracking-[0.2em] text-center mb-6">
              LA FUNDADORA
            </h2>
            <div className="w-20 h-[1px] bg-gold mx-auto mb-16" />
          </FadeIn>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <FadeIn delay={100}>
                <div className="relative">
                  <img
                    src="/assets/7.png"
                    alt="Blanca González, CEO de CIELO BLANCO"
                    className="w-full h-auto rounded-sm shadow-luxury"
                  />
                </div>
              </FadeIn>

              <FadeIn delay={200}>
                <div className="space-y-6">
                  <h3 className="font-serif text-3xl tracking-[0.15em] text-gold">
                    Blanca González
                  </h3>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    CEO y Fundadora
                  </p>
                  <div className="w-16 h-[1px] bg-gold" />
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Blanca Isela González Vázquez, empresaria y propietaria de la marca de mezcal Cielo Blanco, 
                    se graduó en Derecho por la UNAM y desde entonces ha combinado su formación académica con su pasión 
                    por el emprendimiento y la innovación. Su trabajo como Directora de Desarrollo Económico en dos 
                    municipios la posicionó como una líder proactiva y visionaria, siempre buscando oportunidades 
                    para impulsar el crecimiento y la creación de empleo.
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Además, su participación activa en organizaciones como Coparmex y la Cámara de 
                    Construcción refleja su compromiso con el fortalecimiento del tejido empresarial y la promoción de un 
                    ambiente favorable para los emprendedores. Blanca Isela es un ejemplo de liderazgo y dedicación 
                    en el mundo empresarial.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Where to Find Section */}
      <section id="contact" className="py-24 bg-secondary/20">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-6xl tracking-[0.2em] text-center mb-6">
              DÓNDE ENCONTRAR
            </h2>
            <div className="w-20 h-[1px] bg-gold mx-auto mb-16" />
          </FadeIn>

          <div className="max-w-2xl mx-auto">
            <FadeIn delay={100}>
              <div className="text-center mb-10 space-y-3">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Experimenta CIELO BLANCO en minoristas de lujo selectos y establecimientos exclusivos.
                </p>
                <p className="text-base text-muted-foreground">
                  Para consultas sobre disponibilidad o para conectar con nosotros, por favor contáctanos a continuación.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs uppercase tracking-[0.15em]">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="border-border/50 focus:border-gold transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-[0.15em]">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="border-border/50 focus:border-gold transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs uppercase tracking-[0.15em]">
                    Mensaje
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="border-border/50 focus:border-gold transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold/90 text-background uppercase tracking-[0.2em] py-5 transition-all duration-300 text-sm"
                >
                  Enviar Mensaje
                </Button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
