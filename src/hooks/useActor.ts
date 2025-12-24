import { useState, useEffect } from 'react';

// Mock actor interface for demo purposes
interface MockActor {
  getAllProducts: () => Promise<any[]>;
  getProduct: (id: bigint) => Promise<any | null>;
  createProduct: (...args: any[]) => Promise<any>;
  updateProduct: (...args: any[]) => Promise<any>;
  updateProductStock: (...args: any[]) => Promise<any>;
  deleteProduct: (id: bigint) => Promise<boolean>;
  createOrder: (...args: any[]) => Promise<string>;
  getOrderByNumber: (orderNumber: string) => Promise<any | null>;
  getAllOrders: () => Promise<any[]>;
  updateOrderStatus: (...args: any[]) => Promise<any>;
  deleteOrder: (orderNumber: string) => Promise<boolean>;
  getCallerUserProfile: () => Promise<any | null>;
  saveCallerUserProfile: (profile: any) => Promise<any>;
  createLead: (...args: any[]) => Promise<any>;
  getAllLeads: () => Promise<any[]>;
  markLeadAsContacted: (id: bigint) => Promise<any>;
  deleteLead: (id: bigint) => Promise<boolean>;
  getLogo: () => Promise<any | null>;
  updateLogo: (logo: any) => Promise<any>;
  getAllGalleryImages: () => Promise<any[]>;
  addGalleryImage: (...args: any[]) => Promise<any>;
  updateGalleryImage: (...args: any[]) => Promise<any>;
  deleteGalleryOrBouquetImage: (id: bigint) => Promise<boolean>;
  [key: string]: any;
}

export function useActor() {
  const [actor, setActor] = useState<MockActor | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    // Mock actor initialization
    const initActor = async () => {
      setIsFetching(true);
      try {
        // Simulate actor creation delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockActor: MockActor = {
          getAllProducts: async () => [],
          getProduct: async (id: bigint) => null,
          createProduct: async (...args: any[]) => ({ id: BigInt(Date.now()) }),
          updateProduct: async (...args: any[]) => ({ id: args[0] }),
          updateProductStock: async (...args: any[]) => ({ id: args[0] }),
          deleteProduct: async (id: bigint) => true,
          createOrder: async (...args: any[]) => `CB-${Date.now()}`,
          getOrderByNumber: async (orderNumber: string) => null,
          getAllOrders: async () => [],
          updateOrderStatus: async (...args: any[]) => ({ orderNumber: args[0] }),
          deleteOrder: async (orderNumber: string) => true,
          getCallerUserProfile: async () => null,
          saveCallerUserProfile: async (profile: any) => profile,
          createLead: async (...args: any[]) => ({ id: BigInt(Date.now()) }),
          getAllLeads: async () => [],
          markLeadAsContacted: async (id: bigint) => ({ id }),
          deleteLead: async (id: bigint) => true,
          getLogo: async () => null,
          updateLogo: async (logo: any) => logo,
          getAllGalleryImages: async () => [],
          addGalleryImage: async (...args: any[]) => ({ id: BigInt(Date.now()) }),
          updateGalleryImage: async (...args: any[]) => ({ id: args[0] }),
          deleteGalleryOrBouquetImage: async (id: bigint) => true,
          createWhatsAppContact: async (...args: any[]) => ({ id: BigInt(Date.now()) }),
          getAllWhatsAppContacts: async () => [],
          markWhatsAppContactAsContacted: async (id: bigint) => ({ id }),
          deleteWhatsAppContact: async (id: bigint) => true,
        };
        
        setActor(mockActor);
      } catch (error) {
        console.error('Failed to initialize actor:', error);
      } finally {
        setIsFetching(false);
      }
    };

    initActor();
  }, []);

  return { actor, isFetching };
}