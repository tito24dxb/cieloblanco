import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Product, OrderDetails, OrderStatusEnum, UserProfile, Lead, SaleMethod, PaymentMethods, Specifications, ExternalBlob, ProductCombinationType, GalleryImage, ShippingCarrier } from '../backend';

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      const products = await actor.getAllProducts();
      return products;
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
}

export function useGetProduct(productId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Product | null>({
    queryKey: ['product', productId.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProduct(productId);
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: 'always',
  });
}

export function useCreateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData: {
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
    }) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.createProduct(
        productData.name,
        productData.description,
        productData.image,
        productData.price,
        productData.currency,
        productData.saleMethod,
        productData.mercadoLibreUrl,
        productData.paymentMethods,
        productData.specifications,
        productData.stock,
        productData.isOutOfStock,
        productData.combinationType,
        productData.combinedProductId,
        productData.shippingPrice,
        productData.shippingCarrier
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.refetchQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData: {
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
    }) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.updateProduct(
        productData.id,
        productData.name,
        productData.description,
        productData.image,
        productData.price,
        productData.currency,
        productData.saleMethod,
        productData.mercadoLibreUrl,
        productData.paymentMethods,
        productData.specifications,
        productData.stock,
        productData.isOutOfStock,
        productData.combinationType,
        productData.combinedProductId,
        productData.shippingPrice,
        productData.shippingCarrier
      );
    },
    onSuccess: (updatedProduct) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', updatedProduct.id.toString()] });
      queryClient.refetchQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProductStock() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, stock, isOutOfStock }: { productId: bigint; stock: bigint; isOutOfStock: boolean }) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.updateProductStock(productId, stock, isOutOfStock);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.productId.toString()] });
      queryClient.refetchQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.deleteProduct(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.refetchQueries({ queryKey: ['products'] });
    },
  });
}

export function useCreateOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: {
      name: string;
      email: string;
      address: string;
      productId: bigint;
      quantity: bigint;
      totalAmount: bigint;
    }) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.createOrder(
        orderData.name,
        orderData.email,
        orderData.address,
        orderData.productId,
        orderData.quantity,
        orderData.totalAmount
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.refetchQueries({ queryKey: ['orders'] });
    },
  });
}

export function useGetOrderByNumber(orderNumber: string) {
  const { actor, isFetching } = useActor();

  return useQuery<OrderDetails | null>({
    queryKey: ['order', orderNumber],
    queryFn: async () => {
      if (!actor || !orderNumber) return null;
      return actor.getOrderByNumber(orderNumber);
    },
    enabled: !!actor && !isFetching && !!orderNumber,
    retry: false,
    staleTime: 0,
    refetchOnMount: 'always',
  });
}

export function useGetAllOrders() {
  const { actor, isFetching } = useActor();

  return useQuery<OrderDetails[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      if (!actor) return [];
      const orders = await actor.getAllOrders();
      return orders;
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      orderNumber, 
      status, 
      trackingNumber, 
      shippingCarrier 
    }: { 
      orderNumber: string; 
      status: OrderStatusEnum;
      trackingNumber?: string | null;
      shippingCarrier?: ShippingCarrier | null;
    }) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.updateOrderStatus(orderNumber, status, trackingNumber || null, shippingCarrier || null);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', variables.orderNumber] });
      queryClient.refetchQueries({ queryKey: ['orders'] });
    },
  });
}

export function useDeleteOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderNumber: string) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.deleteOrder(orderNumber);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.refetchQueries({ queryKey: ['orders'] });
    },
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      queryClient.refetchQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useCreateLead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (leadData: {
      name: string;
      email: string;
      phone: string;
      productId: bigint;
      desiredQuantity: bigint | null;
    }) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.createLead(
        leadData.name,
        leadData.email,
        leadData.phone,
        leadData.productId,
        leadData.desiredQuantity
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.refetchQueries({ queryKey: ['leads'] });
    },
  });
}

export function useGetAllLeads() {
  const { actor, isFetching } = useActor();

  return useQuery<Lead[]>({
    queryKey: ['leads'],
    queryFn: async () => {
      if (!actor) return [];
      const leads = await actor.getAllLeads();
      return leads;
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
}

export function useMarkLeadAsContacted() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (leadId: bigint) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.markLeadAsContacted(leadId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.refetchQueries({ queryKey: ['leads'] });
    },
  });
}

export function useDeleteLead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (leadId: bigint) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.deleteLead(leadId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.refetchQueries({ queryKey: ['leads'] });
    },
  });
}

// WhatsApp Contact types and hooks
export interface WhatsAppContact {
  id: bigint;
  name: string;
  reason: string;
  createdAt: bigint;
  contacted: boolean;
}

export function useCreateWhatsAppContact() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contactData: {
      name: string;
      reason: string;
    }) => {
      if (!actor) throw new Error('Actor no disponible');
      return (actor as any).createWhatsAppContact(
        contactData.name,
        contactData.reason
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsappContacts'] });
      queryClient.refetchQueries({ queryKey: ['whatsappContacts'] });
    },
  });
}

export function useGetAllWhatsAppContacts() {
  const { actor, isFetching } = useActor();

  return useQuery<WhatsAppContact[]>({
    queryKey: ['whatsappContacts'],
    queryFn: async () => {
      if (!actor) return [];
      const contacts = await (actor as any).getAllWhatsAppContacts();
      return contacts;
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
}

export function useMarkWhatsAppContactAsContacted() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contactId: bigint) => {
      if (!actor) throw new Error('Actor no disponible');
      return (actor as any).markWhatsAppContactAsContacted(contactId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsappContacts'] });
      queryClient.refetchQueries({ queryKey: ['whatsappContacts'] });
    },
  });
}

export function useDeleteWhatsAppContact() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contactId: bigint) => {
      if (!actor) throw new Error('Actor no disponible');
      return (actor as any).deleteWhatsAppContact(contactId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsappContacts'] });
      queryClient.refetchQueries({ queryKey: ['whatsappContacts'] });
    },
  });
}

// Gallery and Logo hooks
export function useGetLogo() {
  const { actor, isFetching } = useActor();

  return useQuery<ExternalBlob | null>({
    queryKey: ['logo'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getLogo();
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
}

export function useUpdateLogo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newLogo: ExternalBlob) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.updateLogo(newLogo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logo'] });
      queryClient.refetchQueries({ queryKey: ['logo'] });
    },
  });
}

export function useGetAllGalleryImages() {
  const { actor, isFetching } = useActor();

  return useQuery<GalleryImage[]>({
    queryKey: ['galleryImages'],
    queryFn: async () => {
      if (!actor) return [];
      const images = await actor.getAllGalleryImages();
      return images;
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
}

export function useAddGalleryImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ image, description }: { image: ExternalBlob; description: string | null }) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.addGalleryImage(image, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
      queryClient.refetchQueries({ queryKey: ['galleryImages'] });
    },
  });
}

export function useUpdateGalleryImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ imageId, newImage, newDescription }: { imageId: bigint; newImage: ExternalBlob; newDescription: string | null }) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.updateGalleryImage(imageId, newImage, newDescription);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
      queryClient.refetchQueries({ queryKey: ['galleryImages'] });
    },
  });
}

export function useDeleteGalleryImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageId: bigint) => {
      if (!actor) throw new Error('Actor no disponible');
      return actor.deleteGalleryOrBouquetImage(imageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
      queryClient.refetchQueries({ queryKey: ['galleryImages'] });
    },
  });
}
