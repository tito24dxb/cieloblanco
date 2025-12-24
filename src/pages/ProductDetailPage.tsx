import { useNavigate, useParams } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, ExternalLink, Loader2, ArrowLeft, Plus, Minus, Truck } from 'lucide-react';
import { SaleMethod, ProductCombinationType, ShippingCarrier } from '../backend';
import { useState } from 'react';
import { useGetProduct, useCreateLead } from '../hooks/useQueries';
import FadeIn from '../components/FadeIn';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const { productId } = useParams({ from: '/layout/producto/$productId' });
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const { data: product, isLoading } = useGetProduct(BigInt(productId));
  const { data: combinedProduct, isLoading: combinedProductLoading } = useGetProduct(
    product?.combinedProductId || 0n
  );
  const createLead = useCreateLead();

  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    desiredQuantity: '',
  });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const handleMercadoLibreRedirect = (url: string) => {
    setRedirecting(true);
    window.location.href = url;
  };

  const handleCheckout = (productId: bigint) => {
    navigate({ to: '/checkout', search: { productId: Number(productId), quantity } });
  };

  const handleBack = () => {
    navigate({ to: '/tienda' });
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);

    try {
      await createLead.mutateAsync({
        name: leadForm.name,
        email: leadForm.email,
        phone: leadForm.phone,
        productId: BigInt(productId),
        desiredQuantity: leadForm.desiredQuantity ? BigInt(leadForm.desiredQuantity) : null,
      });

      toast.success('¡Gracias! Te contactaremos pronto cuando tengamos stock disponible.');
      setLeadForm({ name: '', email: '', phone: '', desiredQuantity: '' });
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      toast.error('Error al enviar el formulario. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const getPaymentMethodIcon = (method: 'creditCard' | 'cash' | 'transfer') => {
    const icons = {
      creditCard: '/assets/generated/credit-card-logo.dim_64x64.png',
      cash: '/assets/generated/cash-logo.dim_64x64.png',
      transfer: '/assets/generated/transfer-logo.dim_64x64.png',
    };
    return icons[method];
  };

  const getPaymentMethodLabel = (method: 'creditCard' | 'cash' | 'transfer') => {
    const labels = {
      creditCard: 'Tarjeta de Crédito/Débito',
      cash: 'Efectivo',
      transfer: 'Transferencia',
    };
    return labels[method];
  };

  const getCombinationTitle = (type: ProductCombinationType) => {
    return type === ProductCombinationType.bundle ? 'Combínalo con esto' : 'Personalízalo';
  };

  const getShippingCarrierLabel = (carrier: ShippingCarrier) => {
    const labels = {
      [ShippingCarrier.FedEx]: 'FedEx',
      [ShippingCarrier.DHL]: 'DHL',
      [ShippingCarrier.Estafeta]: 'Estafeta',
      [ShippingCarrier.Redpack]: 'Redpack',
      [ShippingCarrier.UPS]: 'UPS',
      [ShippingCarrier.Paqueteexpress]: 'Paqueteexpress',
      [ShippingCarrier.Minutos99]: '99Minutos',
      [ShippingCarrier.JTExpress]: 'J&T Express',
    };
    return labels[carrier];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-gold mx-auto" />
          <p className="mt-6 text-muted-foreground text-lg">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Producto no encontrado</p>
          <Button
            onClick={handleBack}
            variant="outline"
            className="border-gold text-gold hover:bg-gold/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la tienda
          </Button>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.isOutOfStock || product.stock === 0n;
  const hasCombination = product.combinationType && product.combinedProductId && combinedProduct;
  const shippingPrice = Number(product.shippingPrice) / 100;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Back Button */}
        <FadeIn>
          <Button
            onClick={handleBack}
            variant="ghost"
            className="mb-8 text-gold hover:text-gold/80 hover:bg-gold/5 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la tienda
          </Button>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <FadeIn delay={100}>
            <div className="flex items-center justify-center bg-white p-12 rounded-sm shadow-luxury">
              <img
                src={product.image.getDirectURL()}
                alt={product.name}
                className="w-full h-auto object-contain max-h-[600px]"
              />
            </div>
          </FadeIn>

          {/* Product Details */}
          <FadeIn delay={200}>
            <div className="space-y-8">
              {/* Title */}
              <div>
                <h1 className="font-serif text-4xl md:text-5xl tracking-[0.15em] text-foreground mb-4">
                  {product.name}
                </h1>
                <div className="w-20 h-[1px] bg-gold" />
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-serif text-foreground">
                  ${(Number(product.price) / 100).toFixed(2)}
                </span>
                <span className="text-base uppercase tracking-[0.15em] text-muted-foreground">
                  {product.currency}
                </span>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Descripción
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </div>

              {/* Shipping Information */}
              {(product.shippingPrice !== undefined || product.shippingCarrier) && (
                <div className="space-y-4 pt-6 border-t border-border/30">
                  <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                    Información de Envío
                  </h2>
                  <div className="flex items-center gap-4 bg-secondary/10 p-4 rounded-sm">
                    <Truck className="h-6 w-6 text-gold flex-shrink-0" />
                    <div className="space-y-1">
                      {shippingPrice === 0 ? (
                        <p className="text-base font-medium text-gold">Envío Gratis</p>
                      ) : (
                        <p className="text-base font-medium">
                          Envío: ${shippingPrice.toFixed(2)} {product.currency}
                        </p>
                      )}
                      {product.shippingCarrier && (
                        <p className="text-sm text-muted-foreground">
                          Empresa: {getShippingCarrierLabel(product.shippingCarrier)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Specifications */}
              {(product.specifications.alcoholContent || product.specifications.agaveType || 
                product.specifications.bottleSize || product.specifications.decorativeAccessories) && (
                <div className="space-y-4 pt-6 border-t border-border/30">
                  <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                    Especificaciones
                  </h2>
                  <div className="space-y-3">
                    {product.specifications.alcoholContent && (
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
                        <span>Contenido de Alcohol: {product.specifications.alcoholContent}</span>
                      </div>
                    )}
                    {product.specifications.agaveType && (
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
                        <span>Tipo de Agave: {product.specifications.agaveType}</span>
                      </div>
                    )}
                    {product.specifications.bottleSize && (
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
                        <span>Tamaño de Botella: {product.specifications.bottleSize}</span>
                      </div>
                    )}
                    {product.specifications.decorativeAccessories && (
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
                        <span>Accesorios: {product.specifications.decorativeAccessories}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Out of Stock Section */}
              {isOutOfStock ? (
                <div className="space-y-6 pt-6 border-t border-border/30">
                  <div className="bg-gold/10 border border-gold/30 rounded-sm p-6 space-y-4">
                    <h2 className="text-lg font-serif tracking-[0.15em] text-gold">
                      Sin Stock Disponible
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Por ahora estamos sin stock, déjanos tus datos para mantenerte informado/a.
                    </p>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="lead-name" className="text-xs uppercase tracking-[0.15em]">
                        Nombre *
                      </Label>
                      <Input
                        id="lead-name"
                        type="text"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        required
                        className="border-border/50 focus:border-gold transition-colors"
                        placeholder="Tu nombre completo"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lead-email" className="text-xs uppercase tracking-[0.15em]">
                        Email *
                      </Label>
                      <Input
                        id="lead-email"
                        type="email"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        required
                        className="border-border/50 focus:border-gold transition-colors"
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lead-phone" className="text-xs uppercase tracking-[0.15em]">
                        Teléfono *
                      </Label>
                      <Input
                        id="lead-phone"
                        type="tel"
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        required
                        className="border-border/50 focus:border-gold transition-colors"
                        placeholder="+52 123 456 7890"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lead-quantity" className="text-xs uppercase tracking-[0.15em]">
                        Cantidad Deseada (Opcional)
                      </Label>
                      <Input
                        id="lead-quantity"
                        type="number"
                        min="1"
                        value={leadForm.desiredQuantity}
                        onChange={(e) => setLeadForm({ ...leadForm, desiredQuantity: e.target.value })}
                        className="border-border/50 focus:border-gold transition-colors"
                        placeholder="¿Cuántas botellas?"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="w-full bg-gold hover:bg-gold/90 text-white uppercase tracking-[0.2em] py-7 transition-all duration-300 text-sm disabled:opacity-50"
                    >
                      {isSubmittingLead ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        'Enviar'
                      )}
                    </Button>
                  </form>
                </div>
              ) : (
                <>
                  {/* Quantity Selector */}
                  <div className="space-y-4 pt-6 border-t border-border/30">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                      Cantidad
                    </h2>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={decrementQuantity}
                        className="h-12 w-12 border-gold text-gold hover:bg-gold/10 transition-all"
                      >
                        <Minus className="h-5 w-5" />
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-24 h-12 text-center text-lg font-serif border-border/50 focus:border-gold transition-colors"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={incrementQuantity}
                        className="h-12 w-12 border-gold text-gold hover:bg-gold/10 transition-all"
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  {(product.paymentMethods.creditCard || product.paymentMethods.cash || product.paymentMethods.transfer) && (
                    <div className="space-y-4 pt-6 border-t border-border/30">
                      <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                        Métodos de Pago Aceptados
                      </h2>
                      <div className="flex flex-wrap items-center gap-4">
                        {product.paymentMethods.creditCard && (
                          <div className="flex items-center gap-3 bg-secondary/20 px-5 py-3 rounded-sm">
                            <img
                              src={getPaymentMethodIcon('creditCard')}
                              alt="Tarjeta"
                              className="h-7 w-7 object-contain"
                            />
                            <span className="text-sm text-foreground">
                              {getPaymentMethodLabel('creditCard')}
                            </span>
                          </div>
                        )}
                        {product.paymentMethods.cash && (
                          <div className="flex items-center gap-3 bg-secondary/20 px-5 py-3 rounded-sm">
                            <img
                              src={getPaymentMethodIcon('cash')}
                              alt="Efectivo"
                              className="h-7 w-7 object-contain"
                            />
                            <span className="text-sm text-foreground">
                              {getPaymentMethodLabel('cash')}
                            </span>
                          </div>
                        )}
                        {product.paymentMethods.transfer && (
                          <div className="flex items-center gap-3 bg-secondary/20 px-5 py-3 rounded-sm">
                            <img
                              src={getPaymentMethodIcon('transfer')}
                              alt="Transferencia"
                              className="h-7 w-7 object-contain"
                            />
                            <span className="text-sm text-foreground">
                              {getPaymentMethodLabel('transfer')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-4 pt-8">
                    {(product.saleMethod === SaleMethod.mercadoLibre || product.saleMethod === SaleMethod.both) && product.mercadoLibreUrl && (
                      <Button
                        onClick={() => handleMercadoLibreRedirect(product.mercadoLibreUrl!)}
                        disabled={redirecting}
                        className="w-full bg-gold hover:bg-gold/90 text-white uppercase tracking-[0.2em] py-7 transition-all duration-300 text-sm group disabled:opacity-70"
                      >
                        {redirecting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Redirigiendo...
                          </>
                        ) : (
                          <>
                            <ExternalLink className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                            Comprar en Mercado Libre
                          </>
                        )}
                      </Button>
                    )}
                    
                    {(product.saleMethod === SaleMethod.internal || product.saleMethod === SaleMethod.both) && (
                      <Button
                        onClick={() => handleCheckout(product.id)}
                        className="w-full bg-gold hover:bg-gold/90 text-white uppercase tracking-[0.2em] py-7 transition-all duration-300 text-sm group"
                      >
                        <ShoppingCart className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                        Comprar Ahora
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </FadeIn>
        </div>

        {/* Combined Product Section */}
        {hasCombination && (
          <FadeIn delay={300}>
            <div className="mt-20 pt-12 border-t border-gold/20">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl tracking-[0.15em] text-foreground mb-4">
                  {getCombinationTitle(product.combinationType!)}
                </h2>
                <div className="w-20 h-[1px] bg-gold mx-auto" />
              </div>

              <div className="max-w-4xl mx-auto">
                <Card className="border-gold/30 overflow-hidden shadow-luxury hover:shadow-xl transition-shadow duration-300">
                  <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* Combined Product Image */}
                    <div className="flex items-center justify-center bg-muted/20 p-8 rounded-sm">
                      <img
                        src={combinedProduct.image.getDirectURL()}
                        alt={combinedProduct.name}
                        className="w-full h-auto object-contain max-h-[300px]"
                      />
                    </div>

                    {/* Combined Product Details */}
                    <div className="flex flex-col justify-center space-y-6">
                      <div>
                        <h3 className="font-serif text-2xl md:text-3xl tracking-[0.15em] text-foreground mb-3">
                          {combinedProduct.name}
                        </h3>
                        <div className="w-16 h-[1px] bg-gold" />
                      </div>

                      <p className="text-base leading-relaxed text-muted-foreground">
                        {combinedProduct.description}
                      </p>

                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-serif text-gold">
                          ${(Number(combinedProduct.price) / 100).toFixed(2)}
                        </span>
                        <span className="text-sm uppercase tracking-[0.15em] text-muted-foreground">
                          {combinedProduct.currency}
                        </span>
                      </div>

                      <Button
                        onClick={() => navigate({ to: '/producto/$productId', params: { productId: combinedProduct.id.toString() } })}
                        variant="outline"
                        className="border-gold text-gold hover:bg-gold/10 uppercase tracking-[0.15em] py-6 transition-all duration-300"
                      >
                        Ver más detalles
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
