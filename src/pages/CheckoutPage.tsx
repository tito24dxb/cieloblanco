import { useState, useEffect } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import FadeIn from '../components/FadeIn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Loader2, CreditCard, Smartphone, Plus, Truck } from 'lucide-react';
import { SiApplepay, SiGooglepay } from 'react-icons/si';
import { useCreateOrder, useGetProduct } from '../hooks/useQueries';
import { toast } from 'sonner';
import { ProductCombinationType, ShippingCarrier } from '../backend';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: '/layout/checkout' }) as { productId?: number; quantity?: number };
  const createOrder = useCreateOrder();

  const productId = search.productId ? BigInt(search.productId) : 1n;
  const quantity = search.quantity || 1;

  const { data: product, isLoading: productLoading } = useGetProduct(productId);
  const { data: combinedProduct, isLoading: combinedProductLoading } = useGetProduct(
    product?.combinedProductId || 0n
  );

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'México',
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [combinedProductAdded, setCombinedProductAdded] = useState(false);

  const productPrice = product ? Number(product.price) / 100 : 0;
  const combinedProductPrice = combinedProduct ? Number(combinedProduct.price) / 100 : 0;
  const shippingPrice = product ? Number(product.shippingPrice) / 100 : 0;
  
  const subtotal = productPrice * quantity;
  const combinedSubtotal = combinedProductAdded ? combinedProductPrice : 0;
  const total = subtotal + combinedSubtotal + shippingPrice;

  const hasCombination = product?.combinationType && product?.combinedProductId && combinedProduct;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPaymentModal(true);
  };

  const processOrder = async () => {
    try {
      const orderNumber = await createOrder.mutateAsync({
        name: formData.fullName,
        email: formData.email,
        address: `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`,
        productId: productId,
        quantity: BigInt(quantity),
        totalAmount: BigInt(Math.round(total * 100)),
      });

      sessionStorage.setItem('lastOrderNumber', orderNumber);
      return orderNumber;
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Error al procesar el pedido');
      throw error;
    }
  };

  const handlePaymentConfirm = async () => {
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await processOrder();
      
      setIsProcessing(false);
      setShowPaymentModal(false);
      navigate({ to: '/seguimiento' });
    } catch (error) {
      setIsProcessing(false);
    }
  };

  const handlePaymentMethodClick = async (method: string) => {
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await processOrder();
      
      setIsProcessing(false);
      setShowPaymentModal(false);
      navigate({ to: '/seguimiento' });
    } catch (error) {
      setIsProcessing(false);
    }
  };

  const handleAddCombinedProduct = () => {
    setCombinedProductAdded(true);
    toast.success('¡Producto agregado al carrito!');
  };

  const getCombinationTitle = (type: ProductCombinationType) => {
    return type === ProductCombinationType.bundle ? 'Combínalo con esto' : 'Personalízalo';
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  if (productLoading || combinedProductLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-white flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-gold" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-white flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Producto no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-6xl tracking-[0.2em] mb-4">
              PAGO
            </h1>
            <div className="w-20 h-[1px] bg-gold mx-auto" />
          </div>
        </FadeIn>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <FadeIn delay={100}>
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl tracking-[0.15em] mb-6">
                    Información de Envío
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-xs uppercase tracking-[0.15em]">
                      Nombre Completo
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                    <Label htmlFor="address" className="text-xs uppercase tracking-[0.15em]">
                      Dirección
                    </Label>
                    <Input
                      id="address"
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      className="border-border/50 focus:border-gold transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-xs uppercase tracking-[0.15em]">
                        Ciudad
                      </Label>
                      <Input
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                        className="border-border/50 focus:border-gold transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="text-xs uppercase tracking-[0.15em]">
                        Código Postal
                      </Label>
                      <Input
                        id="postalCode"
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        required
                        className="border-border/50 focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-xs uppercase tracking-[0.15em]">
                      País
                    </Label>
                    <Input
                      id="country"
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      required
                      className="border-border/50 focus:border-gold transition-colors"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold/90 text-background uppercase tracking-[0.2em] py-6 transition-all duration-300 text-sm"
                  >
                    Pagar Ahora
                  </Button>
                </form>
              </div>
            </FadeIn>

            {/* Order Summary */}
            <FadeIn delay={200}>
              <div className="bg-secondary/10 rounded-sm p-8 space-y-6 h-fit sticky top-24">
                <h2 className="font-serif text-2xl tracking-[0.15em]">
                  Resumen del Pedido
                </h2>

                <Separator className="bg-border/30" />

                {/* Main Product */}
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-28 bg-background rounded-sm overflow-hidden flex-shrink-0">
                      <img
                        src={product.image.getDirectURL()}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg tracking-[0.1em] mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Cantidad: {quantity}
                      </p>
                      <p className="text-base font-medium mt-2">
                        ${productPrice.toFixed(2)} {product.currency}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Combined Product Section */}
                {hasCombination && !combinedProductAdded && (
                  <>
                    <Separator className="bg-gold/30" />
                    <div className="space-y-4 bg-gold/5 -mx-8 px-8 py-6 border-y border-gold/20">
                      <h3 className="font-serif text-lg tracking-[0.15em] text-gold">
                        {getCombinationTitle(product.combinationType!)}
                      </h3>
                      
                      <div className="flex gap-4 items-start">
                        <div className="w-20 h-28 bg-background rounded-sm overflow-hidden flex-shrink-0 border border-gold/20">
                          <img
                            src={combinedProduct.image.getDirectURL()}
                            alt={combinedProduct.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif text-base tracking-[0.1em] mb-1">
                            {combinedProduct.name}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {combinedProduct.description}
                          </p>
                          <p className="text-base font-medium text-gold">
                            ${combinedProductPrice.toFixed(2)} {combinedProduct.currency}
                          </p>
                        </div>
                      </div>

                      <Button
                        onClick={handleAddCombinedProduct}
                        className="w-full bg-gold hover:bg-gold/90 text-white uppercase tracking-[0.2em] py-5 transition-all duration-300 text-sm group"
                      >
                        <Plus className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                        ¡Lo quiero!
                      </Button>
                    </div>
                  </>
                )}

                {/* Combined Product Added */}
                {combinedProductAdded && combinedProduct && (
                  <>
                    <Separator className="bg-border/30" />
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-28 bg-background rounded-sm overflow-hidden flex-shrink-0">
                          <img
                            src={combinedProduct.image.getDirectURL()}
                            alt={combinedProduct.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif text-lg tracking-[0.1em] mb-1">
                            {combinedProduct.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Cantidad: 1
                          </p>
                          <p className="text-base font-medium mt-2">
                            ${combinedProductPrice.toFixed(2)} {combinedProduct.currency}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <Separator className="bg-border/30" />

                <div className="space-y-3">
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {combinedProductAdded && (
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">Producto Adicional</span>
                      <span>${combinedSubtotal.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Envío</span>
                    {shippingPrice === 0 ? (
                      <span className="text-gold">Gratis</span>
                    ) : (
                      <span>${shippingPrice.toFixed(2)}</span>
                    )}
                  </div>
                  {product.shippingCarrier && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Truck className="h-4 w-4" />
                      <span>{getShippingCarrierLabel(product.shippingCarrier)}</span>
                    </div>
                  )}
                </div>

                <Separator className="bg-border/30" />

                <div className="flex justify-between text-xl font-serif">
                  <span>Total</span>
                  <span className="text-gold">${total.toFixed(2)} {product.currency}</span>
                </div>

                <p className="text-xs text-muted-foreground text-center pt-4">
                  Los impuestos se calcularán en el checkout
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-[500px] bg-white font-serif">
          <DialogHeader>
            <DialogTitle className="text-2xl tracking-[0.15em] text-center">
              MÉTODO DE PAGO
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-muted-foreground">
              Completa tu información de pago de forma segura
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Total Amount Display */}
            <div className="bg-gold/10 border border-gold/30 rounded-sm p-4 text-center">
              <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-1">
                Monto Total
              </p>
              <p className="text-3xl font-serif text-gold">
                ${total.toFixed(2)} {product.currency}
              </p>
            </div>

            {/* Card Payment Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span>Tarjeta de Crédito/Débito</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-xs uppercase tracking-[0.15em]">
                    Número de Tarjeta
                  </Label>
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value.slice(0, 19));
                      setPaymentData({ ...paymentData, cardNumber: formatted });
                    }}
                    maxLength={19}
                    className="border-border/50 focus:border-gold transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="text-xs uppercase tracking-[0.15em]">
                      Fecha de Expiración
                    </Label>
                    <Input
                      id="expiryDate"
                      type="text"
                      placeholder="MM/AA"
                      value={paymentData.expiryDate}
                      onChange={(e) => {
                        const formatted = formatExpiryDate(e.target.value);
                        setPaymentData({ ...paymentData, expiryDate: formatted });
                      }}
                      maxLength={5}
                      className="border-border/50 focus:border-gold transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-xs uppercase tracking-[0.15em]">
                      CVV
                    </Label>
                    <Input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      value={paymentData.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                        setPaymentData({ ...paymentData, cvv: value });
                      }}
                      maxLength={4}
                      className="border-border/50 focus:border-gold transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-border/30" />

            {/* Alternative Payment Methods */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-muted-foreground">
                <Smartphone className="h-4 w-4" />
                <span>Métodos Alternativos</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handlePaymentMethodClick('apple-pay')}
                  disabled={isProcessing}
                  className="h-14 border-border/50 hover:border-gold hover:bg-gold/5 transition-all"
                >
                  <SiApplepay className="h-8 w-8" />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handlePaymentMethodClick('google-pay')}
                  disabled={isProcessing}
                  className="h-14 border-border/50 hover:border-gold hover:bg-gold/5 transition-all"
                >
                  <SiGooglepay className="h-8 w-8" />
                </Button>
              </div>
            </div>

            <Separator className="bg-border/30" />

            {/* Confirm Payment Button */}
            <Button
              onClick={handlePaymentConfirm}
              disabled={isProcessing}
              className="w-full bg-gold hover:bg-gold/90 text-background uppercase tracking-[0.2em] py-6 transition-all duration-300 text-sm disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Procesando...
                </>
              ) : (
                'Confirmar Pago'
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Esta es una demostración. No se procesarán pagos reales.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
