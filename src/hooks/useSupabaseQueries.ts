import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase, type Product, type Order, type Lead, type WhatsAppContact } from '../lib/supabase';

// Products
export function useGetAllProducts() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
}

export function useGetProduct(productId: string) {
  return useQuery<Product | null>({
    queryKey: ['product', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
      }
      return data;
    },
    enabled: !!productId,
    staleTime: 0,
    refetchOnMount: 'always',
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...productData }: Partial<Product> & { id: string }) => {
      const { data, error } = await supabase
        .from('products')
        .update({ ...productData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', data.id] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

// Orders
export function useGetAllOrders() {
  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
}

export function useGetOrderByNumber(orderNumber: string) {
  return useQuery<Order | null>({
    queryKey: ['order', orderNumber],
    queryFn: async () => {
      if (!orderNumber) return null;
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', orderNumber)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
      }
      return data;
    },
    enabled: !!orderNumber,
    retry: false,
    staleTime: 0,
    refetchOnMount: 'always',
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: {
      customer_name: string;
      customer_email: string;
      shipping_address: string;
      product_id: string;
      quantity: number;
      total_amount: number;
    }) => {
      // Generate order number
      const { data: orderNumberData, error: orderNumberError } = await supabase
        .rpc('generate_order_number');
      
      if (orderNumberError) throw orderNumberError;
      
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          ...orderData,
          order_number: orderNumberData,
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data.order_number;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      orderNumber, 
      status, 
      trackingNumber, 
      shippingCarrier 
    }: { 
      orderNumber: string; 
      status: Order['status'];
      trackingNumber?: string;
      shippingCarrier?: Order['shipping_carrier'];
    }) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status, 
          tracking_number: trackingNumber || null,
          shipping_carrier: shippingCarrier || null,
          updated_at: new Date().toISOString()
        })
        .eq('order_number', orderNumber)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', data.order_number] });
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderNumber: string) => {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('order_number', orderNumber);
      
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

// Leads
export function useGetAllLeads() {
  return useQuery<Lead[]>({
    queryKey: ['leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (leadData: {
      name: string;
      email: string;
      phone: string;
      product_id: string;
      desired_quantity?: number;
    }) => {
      const { data, error } = await supabase
        .from('leads')
        .insert([leadData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

export function useMarkLeadAsContacted() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (leadId: string) => {
      const { data, error } = await supabase
        .from('leads')
        .update({ contacted: true })
        .eq('id', leadId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (leadId: string) => {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);
      
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

// WhatsApp Contacts
export function useGetAllWhatsAppContacts() {
  return useQuery<WhatsAppContact[]>({
    queryKey: ['whatsappContacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('whatsapp_contacts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
}

export function useCreateWhatsAppContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contactData: {
      name: string;
      reason: string;
    }) => {
      const { data, error } = await supabase
        .from('whatsapp_contacts')
        .insert([contactData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsappContacts'] });
    },
  });
}

export function useMarkWhatsAppContactAsContacted() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contactId: string) => {
      const { data, error } = await supabase
        .from('whatsapp_contacts')
        .update({ contacted: true })
        .eq('id', contactId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsappContacts'] });
    },
  });
}

export function useDeleteWhatsAppContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contactId: string) => {
      const { error } = await supabase
        .from('whatsapp_contacts')
        .delete()
        .eq('id', contactId);
      
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsappContacts'] });
    },
  });
}