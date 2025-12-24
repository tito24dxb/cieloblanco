// Mock backend types for demo purposes

export interface ExternalBlob {
  getDirectURL(): string;
}

export interface Product {
  id: bigint;
  name: string;
  description: string;
  image: ExternalBlob;
  price: bigint;
  currency: string;
  saleMethod: SaleMethod;
  mercadoLibreUrl: string | null;
  paymentMethods: PaymentMethods;
  specifications: Specifications;
  stock: bigint;
  isOutOfStock: boolean;
  combinationType: ProductCombinationType | null;
  combinedProductId: bigint | null;
  shippingPrice: bigint;
  shippingCarrier: ShippingCarrier | null;
}

export interface OrderDetails {
  id: bigint;
  orderNumber: string;
  name: string;
  email: string;
  address: string;
  productId: bigint;
  quantity: bigint;
  totalAmount: bigint;
  status: OrderStatusEnum;
  trackingNumber: string | null;
  shippingCarrier: ShippingCarrier | null;
  createdAt: bigint;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Lead {
  id: bigint;
  name: string;
  email: string;
  phone: string;
  productId: bigint;
  desiredQuantity: bigint | null;
  contacted: boolean;
  createdAt: bigint;
}

export interface GalleryImage {
  id: bigint;
  image: ExternalBlob;
  description: string | null;
  createdAt: bigint;
}

export interface PaymentMethods {
  creditCard: boolean;
  cash: boolean;
  transfer: boolean;
}

export interface Specifications {
  alcoholContent: string | null;
  agaveType: string | null;
  bottleSize: string | null;
  decorativeAccessories: string | null;
}

export enum SaleMethod {
  internal = 'internal',
  mercadoLibre = 'mercadoLibre',
  both = 'both',
}

export enum ProductCombinationType {
  bundle = 'bundle',
  customization = 'customization',
}

export enum OrderStatusEnum {
  PedidoRecibido = 'PedidoRecibido',
  PedidoDespachado = 'PedidoDespachado',
  PedidoEnTransito = 'PedidoEnTransito',
  PedidoEntregado = 'PedidoEntregado',
}

export enum ShippingCarrier {
  FedEx = 'FedEx',
  DHL = 'DHL',
  Estafeta = 'Estafeta',
  Redpack = 'Redpack',
  UPS = 'UPS',
  Paqueteexpress = 'Paqueteexpress',
  Minutos99 = 'Minutos99',
  JTExpress = 'JTExpress',
}