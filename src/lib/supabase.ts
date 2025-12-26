import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  currency: string;
  sale_method: 'internal' | 'mercadoLibre' | 'both';
  mercado_libre_url?: string;
  payment_methods: {
    creditCard: boolean;
    cash: boolean;
    transfer: boolean;
  };
  specifications: {
    alcoholContent?: string;
    agaveType?: string;
    bottleSize?: string;
    decorativeAccessories?: string;
  };
  stock: number;
  is_out_of_stock: boolean;
  combination_type?: 'bundle' | 'customization';
  combined_product_id?: string;
  shipping_price: number;
  shipping_carrier?: 'FedEx' | 'DHL' | 'Estafeta' | 'Redpack' | 'UPS' | 'Paqueteexpress' | 'Minutos99' | 'JTExpress';
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  product_id: string;
  quantity: number;
  total_amount: number;
  status: 'PedidoRecibido' | 'PedidoDespachado' | 'PedidoEnTransito' | 'PedidoEntregado';
  tracking_number?: string;
  shipping_carrier?: 'FedEx' | 'DHL' | 'Estafeta' | 'Redpack' | 'UPS' | 'Paqueteexpress' | 'Minutos99' | 'JTExpress';
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  product_id: string;
  desired_quantity?: number;
  contacted: boolean;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  description?: string;
  created_at: string;
}
export interface SiteSetting {
  id: string;
  key: string;
  logo_url?: string;
  created_at: string;
  updated_at: string;
}
export interface WhatsAppContact {
  id: string;
  name: string;
  reason: string;
  contacted: boolean;
  created_at: string;
}