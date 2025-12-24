import FadeIn from '../components/FadeIn';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useGetAllProducts } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';

export default function ShopPage() {
  const { data: products, isLoading } = useGetAllProducts();
  const navigate = useNavigate();

  const handleViewMore = (productId: bigint) => {
    navigate({ to: '/producto/$productId', params: { productId: String(productId) } });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-6xl tracking-[0.2em] mb-4">
              TIENDA
            </h1>
            <div className="w-20 h-[1px] bg-gold mx-auto" />
          </div>
        </FadeIn>

        {isLoading ? (
          <div className="text-center py-20">
            <Loader2 className="h-16 w-16 animate-spin text-gold mx-auto" />
            <p className="mt-6 text-muted-foreground text-lg">Cargando productos...</p>
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {products.map((product, index) => (
              <FadeIn key={Number(product.id)} delay={100 + index * 50}>
                <div className="bg-white rounded-sm shadow-luxury overflow-hidden transition-transform duration-300 hover:scale-[1.02] cursor-pointer group">
                  {/* Product Image */}
                  <div 
                    className="relative bg-white p-8 flex items-center justify-center aspect-square"
                    onClick={() => handleViewMore(product.id)}
                  >
                    <img
                      src={product.image.getDirectURL()}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h2 className="font-serif text-2xl tracking-[0.15em] mb-2">
                        {product.name}
                      </h2>
                      <div className="w-12 h-[1px] bg-gold mb-3" />
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {product.description}
                    </p>

                    {/* View More Button */}
                    <div className="pt-4">
                      <Button
                        onClick={() => handleViewMore(product.id)}
                        variant="outline"
                        className="w-full border-gold text-gold hover:bg-gold/10 uppercase tracking-[0.2em] py-5 transition-all duration-300 text-sm"
                      >
                        Ver más
                      </Button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground mb-4">
              No hay productos disponibles en este momento
            </p>
            <p className="text-sm text-muted-foreground">
              Por favor, vuelve pronto para ver nuestras ofertas
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
