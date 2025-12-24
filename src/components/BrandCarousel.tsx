import { useState, useEffect, useCallback } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import FadeIn from './FadeIn';

const carouselImages = [
  {
    src: '/assets/2.png',
    alt: 'CIELO BLANCO bottle with roses',
  },
  {
    src: '/assets/3.png',
    alt: 'CIELO BLANCO bottle preparation',
  },
  {
    src: '/assets/4.png',
    alt: 'CIELO BLANCO bottle collection',
  },
  {
    src: '/assets/5.png',
    alt: 'CIELO BLANCO traditional distillation',
  },
  {
    src: '/assets/6.png',
    alt: 'CIELO BLANCO outdoor setting',
  },
  {
    src: '/assets/generated/agave-fields-golden.dim_1200x800.png',
    alt: 'Golden agave fields',
  },
  {
    src: '/assets/generated/artisan-hands-agave.dim_800x600.png',
    alt: 'Artisan hands with agave',
  },
  {
    src: '/assets/generated/distillation-setup.dim_1000x750.png',
    alt: 'Traditional distillation setup',
  },
];

export default function BrandCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Auto-play carousel
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index} className="md:basis-4/5 lg:basis-3/4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-opacity duration-1000"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Gold-accented navigation dots */}
      <div className="flex justify-center items-center gap-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`transition-all duration-500 rounded-full ${
              current === index
                ? 'w-8 h-2 bg-gold'
                : 'w-2 h-2 bg-border hover:bg-gold/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
