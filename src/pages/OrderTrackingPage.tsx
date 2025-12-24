import { useState, useEffect } from 'react';
import FadeIn from '../components/FadeIn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Package, Truck, MapPin, CheckCircle2, Search } from 'lucide-react';
import { useGetOrderByNumber } from '../hooks/useQueries';
import { OrderStatusEnum, ShippingCarrier } from '../backend';

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [searchedOrderNumber, setSearchedOrderNumber] = useState('');
  const { data: orderDetails, isLoading, error, refetch } = useGetOrderByNumber(searchedOrderNumber);

  useEffect(() => {
    const lastOrder = sessionStorage.getItem('lastOrderNumber');
    if (lastOrder) {
      setOrderNumber(lastOrder);
      setSearchedOrderNumber(lastOrder);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      setSearchedOrderNumber(orderNumber.trim());
      // Force refetch when search is triggered
      setTimeout(() => {
        refetch();
      }, 100);
    }
  };

  const getStatusSteps = () => {
    const steps = [
      { 
        key: OrderStatusEnum.PedidoRecibido, 
        label: 'Pedido Recibido', 
        icon: Package 
      },
      { 
        key: OrderStatusEnum.PedidoDespachado, 
        label: 'Pedido Despachado', 
        icon: Package 
      },
      { 
        key: OrderStatusEnum.PedidoEnTransito, 
        label: 'Pedido en Tránsito', 
        icon: Truck 
      },
      { 
        key: OrderStatusEnum.PedidoEntregado, 
        label: 'Pedido Entregado', 
        icon: CheckCircle2 
      },
    ];

    return steps;
  };

  const getCurrentStepIndex = (status: OrderStatusEnum) => {
    const steps = getStatusSteps();
    return steps.findIndex(step => step.key === status);
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

  const steps = getStatusSteps();
  const currentStepIndex = orderDetails ? getCurrentStepIndex(orderDetails.status) : -1;
  const isInTransit = orderDetails?.status === OrderStatusEnum.PedidoEnTransito;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-6xl tracking-[0.2em] mb-4">
              SEGUIMIENTO DE PEDIDO
            </h1>
            <div className="w-20 h-[1px] bg-gold mx-auto mb-6" />
            <p className="text-muted-foreground text-sm tracking-wide max-w-2xl mx-auto">
              Ingresa tu número de pedido para rastrear el estado de tu compra
            </p>
          </div>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          <FadeIn delay={100}>
            <Card className="border-border/30 shadow-sm mb-12">
              <CardContent className="pt-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="orderNumber" className="text-xs uppercase tracking-[0.15em]">
                      Número de Pedido
                    </Label>
                    <div className="flex gap-3">
                      <Input
                        id="orderNumber"
                        type="text"
                        placeholder="CB-12345"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        required
                        className="border-border/50 focus:border-gold transition-colors flex-1"
                      />
                      <Button
                        type="submit"
                        className="bg-gold hover:bg-gold/90 text-background uppercase tracking-[0.2em] px-8"
                        disabled={isLoading}
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Buscar
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </FadeIn>

          {isLoading && (
            <FadeIn delay={200}>
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
                <p className="mt-4 text-muted-foreground text-sm">Buscando pedido...</p>
              </div>
            </FadeIn>
          )}

          {error && searchedOrderNumber && !isLoading && (
            <FadeIn delay={200}>
              <Card className="border-destructive/30 bg-destructive/5">
                <CardContent className="pt-6 text-center">
                  <p className="text-destructive text-sm">
                    No se pudo encontrar el pedido. Verifica el número e intenta nuevamente.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          )}

          {orderDetails && !isLoading && (
            <>
              <FadeIn delay={200}>
                <Card className="border-border/30 shadow-sm mb-8">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-serif text-xl tracking-[0.15em] mb-2">
                            Pedido {orderDetails.orderNumber}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {orderDetails.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {orderDetails.email}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">Total</p>
                          <p className="font-serif text-xl text-gold">
                            ${(Number(orderDetails.totalAmount) / 100).toFixed(2)} MXN
                          </p>
                        </div>
                      </div>
                      <Separator className="bg-border/30" />
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                          Dirección de Envío
                        </p>
                        <p className="text-sm">{orderDetails.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn delay={300}>
                <Card className="border-border/30 shadow-sm">
                  <CardContent className="pt-8 pb-8">
                    <h3 className="font-serif text-2xl tracking-[0.15em] mb-8 text-center">
                      Estado del Pedido
                    </h3>

                    <div className="relative">
                      {/* Progress Line */}
                      <div className="absolute top-8 left-0 right-0 h-[2px] bg-border/30 hidden md:block">
                        <div
                          className="h-full bg-gold transition-all duration-500"
                          style={{
                            width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
                          }}
                        />
                      </div>

                      {/* Steps */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
                        {steps.map((step, index) => {
                          const Icon = step.icon;
                          const isCompleted = index <= currentStepIndex;
                          const isCurrent = index === currentStepIndex;

                          return (
                            <div key={step.key} className="flex flex-col items-center text-center">
                              <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 relative z-10 ${
                                  isCompleted
                                    ? 'bg-gold text-white'
                                    : 'bg-secondary/20 text-muted-foreground'
                                } ${isCurrent ? 'ring-4 ring-gold/30' : ''}`}
                              >
                                <Icon className="h-7 w-7" />
                              </div>
                              <p
                                className={`text-sm font-medium tracking-wide ${
                                  isCompleted ? 'text-foreground' : 'text-muted-foreground'
                                }`}
                              >
                                {step.label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Tracking Information */}
                    {isInTransit && orderDetails.trackingNumber && orderDetails.shippingCarrier && (
                      <div className="mt-12 bg-gold/5 border border-gold/20 rounded-sm p-6">
                        <div className="flex items-start gap-4">
                          <Truck className="h-6 w-6 text-gold flex-shrink-0 mt-1" />
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-foreground">
                              <span className="text-muted-foreground">Empresa de envío:</span>{' '}
                              {getShippingCarrierLabel(orderDetails.shippingCarrier)}
                            </p>
                            <p className="text-sm font-medium text-foreground">
                              <span className="text-muted-foreground">Número de seguimiento:</span>{' '}
                              <span className="font-mono">{orderDetails.trackingNumber}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-12 text-center">
                      <p className="text-sm text-muted-foreground">
                        {currentStepIndex === steps.length - 1
                          ? '¡Tu pedido ha sido entregado! Gracias por tu compra.'
                          : 'Tu pedido está en camino. Te notificaremos cuando haya actualizaciones.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
