import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Package, LogOut, Loader2, Plus, Pencil, Trash2, Upload, Image as ImageIcon, Users, Mail, Phone, Calendar, CheckCircle2, MessageCircle, X } from 'lucide-react';
import { useGetAllOrders, useUpdateOrderStatus, useDeleteOrder, useGetAllProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, useUpdateProductStock, useGetAllLeads, useMarkLeadAsContacted, useDeleteLead, useGetAllWhatsAppContacts, useMarkWhatsAppContactAsContacted, useDeleteWhatsAppContact, useGetLogo, useUpdateLogo, useGetAllGalleryImages, useAddGalleryImage, useUpdateGalleryImage, useDeleteGalleryImage } from '../hooks/useQueries';
import { OrderStatusEnum, Product, SaleMethod, Lead, ProductCombinationType, ShippingCarrier } from '../backend';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';
import FadeIn from '../components/FadeIn';
import type { WhatsAppContact } from '../hooks/useQueries';

const ADMIN_USERNAME = 'crisdorao';
const ADMIN_PASSWORD = 'Messi24@';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { data: orders, isLoading: ordersLoading, refetch: refetchOrders } = useGetAllOrders();
  const { data: products, isLoading: productsLoading, refetch: refetchProducts } = useGetAllProducts();
  const { data: leads, isLoading: leadsLoading, refetch: refetchLeads } = useGetAllLeads();
  const { data: whatsappContacts, isLoading: whatsappContactsLoading, refetch: refetchWhatsAppContacts } = useGetAllWhatsAppContacts();
  const { data: logo, isLoading: logoLoading, refetch: refetchLogo } = useGetLogo();
  const { data: galleryImages, isLoading: galleryImagesLoading, refetch: refetchGalleryImages } = useGetAllGalleryImages();
  
  const updateOrderStatus = useUpdateOrderStatus();
  const deleteOrder = useDeleteOrder();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const updateProductStock = useUpdateProductStock();
  const markLeadAsContacted = useMarkLeadAsContacted();
  const deleteLead = useDeleteLead();
  const markWhatsAppContactAsContacted = useMarkWhatsAppContactAsContacted();
  const deleteWhatsAppContact = useDeleteWhatsAppContact();
  const updateLogo = useUpdateLogo();
  const addGalleryImage = useAddGalleryImage();
  const updateGalleryImage = useUpdateGalleryImage();
  const deleteGalleryImage = useDeleteGalleryImage();

  // Delete confirmation dialogs state
  const [deleteOrderDialog, setDeleteOrderDialog] = useState<{ open: boolean; orderNumber: string | null }>({ open: false, orderNumber: null });
  const [deleteLeadDialog, setDeleteLeadDialog] = useState<{ open: boolean; leadId: bigint | null }>({ open: false, leadId: null });
  const [deleteWhatsAppDialog, setDeleteWhatsAppDialog] = useState<{ open: boolean; contactId: bigint | null }>({ open: false, contactId: null });
  const [deleteProductDialog, setDeleteProductDialog] = useState<{ open: boolean; productId: bigint | null }>({ open: false, productId: null });
  const [deleteGalleryDialog, setDeleteGalleryDialog] = useState<{ open: boolean; imageId: bigint | null }>({ open: false, imageId: null });

  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    isOutOfStock: false,
    image: null as File | null,
    saleMethod: 'internal' as 'internal' | 'mercadoLibre' | 'both',
    mercadoLibreUrl: '',
    paymentMethods: {
      creditCard: true,
      cash: false,
      transfer: false,
    },
    specifications: {
      alcoholContent: '',
      agaveType: '',
      bottleSize: '',
      decorativeAccessories: '',
    },
    combinationType: 'none' as 'none' | 'bundle' | 'personalization',
    combinedProductId: '',
    shippingPrice: '0',
    shippingCarrier: 'none' as 'none' | 'FedEx' | 'DHL' | 'Estafeta' | 'Redpack' | 'UPS' | 'Paqueteexpress' | '99Minutos' | 'JTExpress',
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [leadFilter, setLeadFilter] = useState<'all' | 'new' | 'contacted'>('all');
  const [whatsappFilter, setWhatsappFilter] = useState<'all' | 'new' | 'contacted'>('all');

  // Gallery management state
  const [isLogoDialogOpen, setIsLogoDialogOpen] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [logoUploadProgress, setLogoUploadProgress] = useState(0);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [galleryDescriptions, setGalleryDescriptions] = useState<string[]>([]);
  const [galleryUploadProgress, setGalleryUploadProgress] = useState(0);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  const [editingGalleryImage, setEditingGalleryImage] = useState<{ id: bigint; description: string | null } | null>(null);
  const [isEditGalleryDialogOpen, setIsEditGalleryDialogOpen] = useState(false);
  const [editGalleryFile, setEditGalleryFile] = useState<File | null>(null);
  const [editGalleryPreview, setEditGalleryPreview] = useState<string>('');
  const [editGalleryDescription, setEditGalleryDescription] = useState<string>('');

  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminAuthenticated', 'true');
        toast.success('Bienvenido al panel de administración');
      } else {
        toast.error('Credenciales incorrectas');
      }
      setIsLoggingIn(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuthenticated');
    setUsername('');
    setPassword('');
    toast.success('Sesión cerrada');
  };

  const handleStatusUpdate = async (orderNumber: string, status: OrderStatusEnum, trackingNumber?: string, shippingCarrier?: ShippingCarrier) => {
    try {
      await updateOrderStatus.mutateAsync({ orderNumber, status, trackingNumber, shippingCarrier });
      toast.success('Estado del pedido actualizado');
      refetchOrders();
    } catch (error) {
      toast.error('Error al actualizar el estado');
    }
  };

  const handleDeleteOrder = async () => {
    if (!deleteOrderDialog.orderNumber) return;
    
    try {
      await deleteOrder.mutateAsync(deleteOrderDialog.orderNumber);
      toast.success('Pedido eliminado exitosamente');
      setDeleteOrderDialog({ open: false, orderNumber: null });
      refetchOrders();
    } catch (error) {
      toast.error('Error al eliminar el pedido');
    }
  };

  const handleDeleteLead = async () => {
    if (!deleteLeadDialog.leadId) return;
    
    try {
      await deleteLead.mutateAsync(deleteLeadDialog.leadId);
      toast.success('Contacto eliminado exitosamente');
      setDeleteLeadDialog({ open: false, leadId: null });
      refetchLeads();
    } catch (error) {
      toast.error('Error al eliminar el contacto');
    }
  };

  const handleDeleteWhatsAppContact = async () => {
    if (!deleteWhatsAppDialog.contactId) return;
    
    try {
      await deleteWhatsAppContact.mutateAsync(deleteWhatsAppDialog.contactId);
      toast.success('Contacto de WhatsApp eliminado exitosamente');
      setDeleteWhatsAppDialog({ open: false, contactId: null });
      refetchWhatsAppContacts();
    } catch (error) {
      toast.error('Error al eliminar el contacto');
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteProductDialog.productId) return;
    
    try {
      await deleteProduct.mutateAsync(deleteProductDialog.productId);
      toast.success('Producto eliminado exitosamente');
      setDeleteProductDialog({ open: false, productId: null });
      refetchProducts();
    } catch (error) {
      toast.error('Error al eliminar el producto');
    }
  };

  const handleDeleteGalleryImage = async () => {
    if (!deleteGalleryDialog.imageId) return;
    
    try {
      await deleteGalleryImage.mutateAsync(deleteGalleryDialog.imageId);
      toast.success('Imagen eliminada exitosamente');
      setDeleteGalleryDialog({ open: false, imageId: null });
      refetchGalleryImages();
    } catch (error) {
      toast.error('Error al eliminar la imagen');
    }
  };

  const getStatusLabel = (status: OrderStatusEnum) => {
    const labels: Record<OrderStatusEnum, string> = {
      [OrderStatusEnum.Pendiente]: 'Pendiente',
      [OrderStatusEnum.PedidoRecibido]: 'Pedido Recibido',
      [OrderStatusEnum.PedidoDespachado]: 'Pedido Despachado',
      [OrderStatusEnum.PedidoEnTransito]: 'Pedido en Tránsito',
      [OrderStatusEnum.PedidoEntregado]: 'Pedido Entregado',
    };
    return labels[status] || status;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductForm({ ...productForm, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      if (!productForm.image && !editingProduct) {
        toast.error('Por favor selecciona una imagen');
        setIsSubmitting(false);
        return;
      }

      if ((productForm.saleMethod === 'mercadoLibre' || productForm.saleMethod === 'both') && !productForm.mercadoLibreUrl.trim()) {
        toast.error('Por favor ingresa la URL de Mercado Libre');
        setIsSubmitting(false);
        return;
      }

      if ((productForm.combinationType === 'bundle' || productForm.combinationType === 'personalization') && !productForm.combinedProductId) {
        toast.error('Por favor selecciona un producto para combinar');
        setIsSubmitting(false);
        return;
      }

      let imageBlob: ExternalBlob;

      if (productForm.image) {
        const arrayBuffer = await productForm.image.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        imageBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setUploadProgress(percentage);
        });
      } else if (editingProduct) {
        imageBlob = editingProduct.image;
      } else {
        throw new Error('No hay imagen disponible');
      }

      const saleMethodMap = {
        internal: SaleMethod.internal,
        mercadoLibre: SaleMethod.mercadoLibre,
        both: SaleMethod.both,
      };

      const combinationTypeMap = {
        none: null,
        bundle: ProductCombinationType.bundle,
        personalization: ProductCombinationType.personalization,
      };

      const shippingCarrierMap: Record<string, ShippingCarrier | null> = {
        'none': null,
        'FedEx': ShippingCarrier.FedEx,
        'DHL': ShippingCarrier.DHL,
        'Estafeta': ShippingCarrier.Estafeta,
        'Redpack': ShippingCarrier.Redpack,
        'UPS': ShippingCarrier.UPS,
        'Paqueteexpress': ShippingCarrier.Paqueteexpress,
        '99Minutos': ShippingCarrier.Minutos99,
        'JTExpress': ShippingCarrier.JTExpress,
      };

      const productData = {
        id: editingProduct?.id || 0n,
        name: productForm.name,
        description: productForm.description,
        price: BigInt(Math.round(parseFloat(productForm.price) * 100)),
        currency: 'MXN',
        image: imageBlob,
        saleMethod: saleMethodMap[productForm.saleMethod],
        mercadoLibreUrl: (productForm.saleMethod === 'mercadoLibre' || productForm.saleMethod === 'both') ? productForm.mercadoLibreUrl : null,
        paymentMethods: productForm.paymentMethods,
        specifications: productForm.specifications,
        stock: BigInt(productForm.stock || '0'),
        isOutOfStock: productForm.isOutOfStock,
        combinationType: combinationTypeMap[productForm.combinationType],
        combinedProductId: productForm.combinedProductId ? BigInt(productForm.combinedProductId) : null,
        shippingPrice: BigInt(Math.round(parseFloat(productForm.shippingPrice || '0') * 100)),
        shippingCarrier: shippingCarrierMap[productForm.shippingCarrier] || null,
      };

      if (editingProduct) {
        await updateProduct.mutateAsync(productData);
        toast.success('Producto actualizado exitosamente');
      } else {
        await createProduct.mutateAsync(productData);
        toast.success('Producto agregado exitosamente');
      }

      setIsProductDialogOpen(false);
      resetProductForm();
      refetchProducts();
    } catch (error: any) {
      console.error('Error al guardar producto:', error);
      toast.error(error.message || 'Error al guardar el producto');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    
    const saleMethodMap = {
      [SaleMethod.internal]: 'internal' as const,
      [SaleMethod.mercadoLibre]: 'mercadoLibre' as const,
      [SaleMethod.both]: 'both' as const,
    };

    const combinationTypeMap = {
      [ProductCombinationType.bundle]: 'bundle' as const,
      [ProductCombinationType.personalization]: 'personalization' as const,
    };

    const shippingCarrierMap: Record<ShippingCarrier, string> = {
      [ShippingCarrier.FedEx]: 'FedEx',
      [ShippingCarrier.DHL]: 'DHL',
      [ShippingCarrier.Estafeta]: 'Estafeta',
      [ShippingCarrier.Redpack]: 'Redpack',
      [ShippingCarrier.UPS]: 'UPS',
      [ShippingCarrier.Paqueteexpress]: 'Paqueteexpress',
      [ShippingCarrier.Minutos99]: '99Minutos',
      [ShippingCarrier.JTExpress]: 'JTExpress',
    };

    setProductForm({
      name: product.name,
      description: product.description,
      price: (Number(product.price) / 100).toString(),
      stock: product.stock.toString(),
      isOutOfStock: product.isOutOfStock,
      image: null,
      saleMethod: saleMethodMap[product.saleMethod],
      mercadoLibreUrl: product.mercadoLibreUrl || '',
      paymentMethods: product.paymentMethods,
      specifications: product.specifications,
      combinationType: product.combinationType ? combinationTypeMap[product.combinationType] : 'none',
      combinedProductId: product.combinedProductId ? product.combinedProductId.toString() : '',
      shippingPrice: (Number(product.shippingPrice) / 100).toString(),
      shippingCarrier: product.shippingCarrier ? shippingCarrierMap[product.shippingCarrier] as any : 'none',
    });
    setImagePreview(product.image.getDirectURL());
    setIsProductDialogOpen(true);
  };

  const handleStockUpdate = async (productId: bigint, stock: string, isOutOfStock: boolean) => {
    try {
      await updateProductStock.mutateAsync({
        productId,
        stock: BigInt(stock || '0'),
        isOutOfStock,
      });
      toast.success('Stock actualizado exitosamente');
      refetchProducts();
    } catch (error) {
      toast.error('Error al actualizar el stock');
    }
  };

  const handleMarkLeadAsContacted = async (leadId: bigint) => {
    try {
      await markLeadAsContacted.mutateAsync(leadId);
      toast.success('Lead marcado como contactado');
      refetchLeads();
    } catch (error) {
      toast.error('Error al actualizar el lead');
    }
  };

  const handleMarkWhatsAppContactAsContacted = async (contactId: bigint) => {
    try {
      await markWhatsAppContactAsContacted.mutateAsync(contactId);
      toast.success('Contacto marcado como contactado');
      refetchWhatsAppContacts();
    } catch (error) {
      toast.error('Error al actualizar el contacto');
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: '',
      stock: '',
      isOutOfStock: false,
      image: null,
      saleMethod: 'internal',
      mercadoLibreUrl: '',
      paymentMethods: {
        creditCard: true,
        cash: false,
        transfer: false,
      },
      specifications: {
        alcoholContent: '',
        agaveType: '',
        bottleSize: '',
        decorativeAccessories: '',
      },
      combinationType: 'none',
      combinedProductId: '',
      shippingPrice: '0',
      shippingCarrier: 'none',
    });
    setImagePreview('');
    setEditingProduct(null);
  };

  const getSaleMethodLabel = (method: SaleMethod) => {
    const labels = {
      [SaleMethod.internal]: 'Sitio Web Interno',
      [SaleMethod.mercadoLibre]: 'Mercado Libre',
      [SaleMethod.both]: 'Ambas',
    };
    return labels[method];
  };

  const getCombinationTypeLabel = (type: ProductCombinationType | undefined) => {
    if (!type) return 'Sin combinación';
    const labels = {
      [ProductCombinationType.bundle]: 'Bundle',
      [ProductCombinationType.personalization]: 'Personalización',
    };
    return labels[type];
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

  const filteredLeads = leads?.filter(lead => {
    if (leadFilter === 'new') return !lead.contacted;
    if (leadFilter === 'contacted') return lead.contacted;
    return true;
  }) || [];

  const filteredWhatsAppContacts = whatsappContacts?.filter(contact => {
    if (whatsappFilter === 'new') return !contact.contacted;
    if (whatsappFilter === 'contacted') return contact.contacted;
    return true;
  }) || [];

  const getProductName = (productId: bigint) => {
    const product = products?.find(p => p.id === productId);
    return product?.name || `Producto #${productId}`;
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('es-MX', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const availableProductsForCombination = products?.filter(p => 
    editingProduct ? p.id !== editingProduct.id : true
  ) || [];

  // Logo upload handlers
  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = async () => {
    if (!logoFile) {
      toast.error('Por favor selecciona una imagen para el logo');
      return;
    }

    setIsUploadingLogo(true);
    setLogoUploadProgress(0);

    try {
      const arrayBuffer = await logoFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const logoBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setLogoUploadProgress(percentage);
      });

      await updateLogo.mutateAsync(logoBlob);
      toast.success('Logo actualizado exitosamente');
      setIsLogoDialogOpen(false);
      setLogoFile(null);
      setLogoPreview('');
      refetchLogo();
    } catch (error: any) {
      console.error('Error al actualizar logo:', error);
      toast.error(error.message || 'Error al actualizar el logo');
    } finally {
      setIsUploadingLogo(false);
      setLogoUploadProgress(0);
    }
  };

  // Gallery upload handlers
  const handleGalleryFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setGalleryFiles(files);
    setGalleryDescriptions(new Array(files.length).fill(''));

    const previews: string[] = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);
        if (previews.length === files.length) {
          setGalleryPreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleGalleryUpload = async () => {
    if (galleryFiles.length === 0) {
      toast.error('Por favor selecciona al menos una imagen');
      return;
    }

    setIsUploadingGallery(true);
    setGalleryUploadProgress(0);

    try {
      const totalFiles = galleryFiles.length;
      let uploadedCount = 0;

      for (let i = 0; i < galleryFiles.length; i++) {
        const file = galleryFiles[i];
        const description = galleryDescriptions[i] || null;

        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const imageBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          const overallProgress = ((uploadedCount + percentage / 100) / totalFiles) * 100;
          setGalleryUploadProgress(Math.round(overallProgress));
        });

        await addGalleryImage.mutateAsync({ image: imageBlob, description });
        uploadedCount++;
        setGalleryUploadProgress(Math.round((uploadedCount / totalFiles) * 100));
      }

      toast.success(`${totalFiles} imagen(es) agregada(s) exitosamente`);
      setIsGalleryDialogOpen(false);
      setGalleryFiles([]);
      setGalleryPreviews([]);
      setGalleryDescriptions([]);
      refetchGalleryImages();
    } catch (error: any) {
      console.error('Error al agregar imágenes:', error);
      toast.error(error.message || 'Error al agregar imágenes a la galería');
    } finally {
      setIsUploadingGallery(false);
      setGalleryUploadProgress(0);
    }
  };

  const handleEditGalleryImage = (image: { id: bigint; description: string | null; imageUrl: string }) => {
    setEditingGalleryImage({ id: image.id, description: image.description });
    setEditGalleryDescription(image.description || '');
    setEditGalleryPreview(image.imageUrl);
    setIsEditGalleryDialogOpen(true);
  };

  const handleEditGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditGalleryFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditGalleryPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateGalleryImage = async () => {
    if (!editingGalleryImage) return;

    setIsUploadingGallery(true);
    setGalleryUploadProgress(0);

    try {
      let imageBlob: ExternalBlob;

      if (editGalleryFile) {
        const arrayBuffer = await editGalleryFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        imageBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setGalleryUploadProgress(percentage);
        });
      } else {
        const existingImage = galleryImages?.find(img => img.id === editingGalleryImage.id);
        if (!existingImage) {
          toast.error('Imagen no encontrada');
          return;
        }
        imageBlob = existingImage.image;
      }

      await updateGalleryImage.mutateAsync({
        imageId: editingGalleryImage.id,
        newImage: imageBlob,
        newDescription: editGalleryDescription || null,
      });

      toast.success('Imagen actualizada exitosamente');
      setIsEditGalleryDialogOpen(false);
      setEditingGalleryImage(null);
      setEditGalleryFile(null);
      setEditGalleryPreview('');
      setEditGalleryDescription('');
      refetchGalleryImages();
    } catch (error: any) {
      console.error('Error al actualizar imagen:', error);
      toast.error(error.message || 'Error al actualizar la imagen');
    } finally {
      setIsUploadingGallery(false);
      setGalleryUploadProgress(0);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <FadeIn>
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-6">
              <div className="mx-auto w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-2 border-gold/20" />
                <ShieldCheck className="h-10 w-10 text-gold relative z-10" />
              </div>
              <div className="space-y-3">
                <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.2em] leading-tight">
                  ADMINISTRACIÓN
                </h1>
                <p className="text-sm text-muted-foreground tracking-wide">
                  Panel de control CIELO BLANCO
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6 mt-12">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs uppercase tracking-[0.15em] font-medium">
                  Usuario
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border-border/50 focus:border-gold transition-colors h-12 bg-white"
                  placeholder="Ingresa tu usuario"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs uppercase tracking-[0.15em] font-medium">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-border/50 focus:border-gold transition-colors h-12 bg-white"
                  placeholder="Ingresa tu contraseña"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-gold hover:bg-gold/90 text-background uppercase tracking-[0.2em] h-12 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl mt-8"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Iniciando...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-border/30 text-center">
              <Button
                variant="ghost"
                onClick={() => navigate({ to: '/home' })}
                className="text-xs text-muted-foreground hover:text-gold transition-colors tracking-wide"
              >
                ← Volver al sitio
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-12 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-[0.2em] mb-2">
                PANEL DE ADMINISTRACIÓN
              </h1>
              <div className="w-20 h-[1px] bg-gold" />
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-border/50 hover:border-gold hover:bg-gold/5"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </FadeIn>

        <Tabs defaultValue="orders" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 gap-2">
            <TabsTrigger value="orders" className="text-xs md:text-sm">Pedidos</TabsTrigger>
            <TabsTrigger value="products" className="text-xs md:text-sm">Productos</TabsTrigger>
            <TabsTrigger value="leads" className="text-xs md:text-sm">Contactos</TabsTrigger>
            <TabsTrigger value="whatsapp" className="text-xs md:text-sm">WhatsApp</TabsTrigger>
            <TabsTrigger value="gallery" className="text-xs md:text-sm">Galería</TabsTrigger>
            <TabsTrigger value="settings" className="text-xs md:text-sm">Configuración</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl tracking-[0.15em]">Pedidos Recibidos</CardTitle>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-gold" />
                    </div>
                  ) : orders && orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Número</TableHead>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Producto</TableHead>
                            <TableHead>Cantidad</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order.orderNumber}>
                              <TableCell className="font-medium">{order.orderNumber}</TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="font-medium">{order.name}</div>
                                  <div className="text-xs text-muted-foreground">{order.email}</div>
                                </div>
                              </TableCell>
                              <TableCell>{getProductName(order.productId)}</TableCell>
                              <TableCell>{order.quantity.toString()}</TableCell>
                              <TableCell>${(Number(order.totalAmount) / 100).toFixed(2)}</TableCell>
                              <TableCell>
                                <Select
                                  value={order.status}
                                  onValueChange={(value) => handleStatusUpdate(order.orderNumber, value as OrderStatusEnum)}
                                >
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value={OrderStatusEnum.Pendiente}>Pendiente</SelectItem>
                                    <SelectItem value={OrderStatusEnum.PedidoRecibido}>Pedido Recibido</SelectItem>
                                    <SelectItem value={OrderStatusEnum.PedidoDespachado}>Pedido Despachado</SelectItem>
                                    <SelectItem value={OrderStatusEnum.PedidoEnTransito}>En Tránsito</SelectItem>
                                    <SelectItem value={OrderStatusEnum.PedidoEntregado}>Entregado</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="text-sm">{formatDate(order.createdAt)}</TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setDeleteOrderDialog({ open: true, orderNumber: order.orderNumber })}
                                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No hay pedidos registrados</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <FadeIn>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-2xl md:text-3xl tracking-[0.15em]">Productos Publicados</h2>
                <Dialog open={isProductDialogOpen} onOpenChange={(open) => {
                  setIsProductDialogOpen(open);
                  if (!open) resetProductForm();
                }}>
                  <DialogTrigger asChild>
                    <Button className="bg-gold hover:bg-gold/90 text-background">
                      <Plus className="h-4 w-4 mr-2" />
                      Nuevo Producto
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="font-serif text-2xl tracking-[0.15em]">
                        {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleProductSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="product-name" className="text-xs uppercase tracking-[0.15em]">
                          Nombre del Producto
                        </Label>
                        <Input
                          id="product-name"
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          required
                          className="border-border/50 focus:border-gold"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="product-description" className="text-xs uppercase tracking-[0.15em]">
                          Descripción
                        </Label>
                        <Textarea
                          id="product-description"
                          value={productForm.description}
                          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          required
                          rows={4}
                          className="border-border/50 focus:border-gold resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="product-price" className="text-xs uppercase tracking-[0.15em]">
                            Precio (MXN)
                          </Label>
                          <Input
                            id="product-price"
                            type="number"
                            step="0.01"
                            value={productForm.price}
                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                            required
                            className="border-border/50 focus:border-gold"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="product-stock" className="text-xs uppercase tracking-[0.15em]">
                            Stock Inicial
                          </Label>
                          <Input
                            id="product-stock"
                            type="number"
                            min="0"
                            value={productForm.stock}
                            onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                            required
                            className="border-border/50 focus:border-gold"
                          />
                        </div>
                      </div>

                      <div className="space-y-4 border border-gold/30 rounded-lg p-6 bg-gold/5">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-1 h-6 bg-gold rounded-full" />
                          <Label className="text-sm uppercase tracking-[0.15em] font-medium text-gold">
                            Información de Envío
                          </Label>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="shipping-price" className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                              Precio de Envío (MXN)
                            </Label>
                            <Input
                              id="shipping-price"
                              type="number"
                              step="0.01"
                              min="0"
                              value={productForm.shippingPrice}
                              onChange={(e) => setProductForm({ ...productForm, shippingPrice: e.target.value })}
                              placeholder="0 para envío gratis"
                              className="border-border/50 focus:border-gold bg-white"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="shipping-carrier" className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                              Empresa de Paquetería
                            </Label>
                            <Select
                              value={productForm.shippingCarrier}
                              onValueChange={(value: any) => setProductForm({ ...productForm, shippingCarrier: value })}
                            >
                              <SelectTrigger className="border-border/50 focus:border-gold bg-white">
                                <SelectValue placeholder="Selecciona empresa" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">Sin especificar</SelectItem>
                                <SelectItem value="FedEx">FedEx</SelectItem>
                                <SelectItem value="DHL">DHL</SelectItem>
                                <SelectItem value="Estafeta">Estafeta</SelectItem>
                                <SelectItem value="Redpack">Redpack</SelectItem>
                                <SelectItem value="UPS">UPS</SelectItem>
                                <SelectItem value="Paqueteexpress">Paqueteexpress</SelectItem>
                                <SelectItem value="99Minutos">99Minutos</SelectItem>
                                <SelectItem value="JTExpress">J&T Express</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border border-border/30 rounded-lg">
                        <Switch
                          id="out-of-stock"
                          checked={productForm.isOutOfStock}
                          onCheckedChange={(checked) => setProductForm({ ...productForm, isOutOfStock: checked })}
                        />
                        <Label htmlFor="out-of-stock" className="text-sm cursor-pointer">
                          Marcar como "Sin Stock"
                        </Label>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-[0.15em]">Método de Venta</Label>
                        <Select
                          value={productForm.saleMethod}
                          onValueChange={(value: any) => setProductForm({ ...productForm, saleMethod: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="internal">Sitio Web Interno</SelectItem>
                            <SelectItem value="mercadoLibre">Mercado Libre</SelectItem>
                            <SelectItem value="both">Ambas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {(productForm.saleMethod === 'mercadoLibre' || productForm.saleMethod === 'both') && (
                        <div className="space-y-2">
                          <Label htmlFor="mercadolibre-url" className="text-xs uppercase tracking-[0.15em]">
                            URL de Mercado Libre
                          </Label>
                          <Input
                            id="mercadolibre-url"
                            type="url"
                            value={productForm.mercadoLibreUrl}
                            onChange={(e) => setProductForm({ ...productForm, mercadoLibreUrl: e.target.value })}
                            placeholder="https://..."
                            className="border-border/50 focus:border-gold"
                          />
                        </div>
                      )}

                      <div className="space-y-3">
                        <Label className="text-xs uppercase tracking-[0.15em]">Métodos de Pago</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="credit-card"
                              checked={productForm.paymentMethods.creditCard}
                              onCheckedChange={(checked) =>
                                setProductForm({
                                  ...productForm,
                                  paymentMethods: { ...productForm.paymentMethods, creditCard: checked as boolean },
                                })
                              }
                            />
                            <Label htmlFor="credit-card" className="text-sm cursor-pointer">
                              Tarjeta de Crédito/Débito
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="cash"
                              checked={productForm.paymentMethods.cash}
                              onCheckedChange={(checked) =>
                                setProductForm({
                                  ...productForm,
                                  paymentMethods: { ...productForm.paymentMethods, cash: checked as boolean },
                                })
                              }
                            />
                            <Label htmlFor="cash" className="text-sm cursor-pointer">
                              Efectivo
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="transfer"
                              checked={productForm.paymentMethods.transfer}
                              onCheckedChange={(checked) =>
                                setProductForm({
                                  ...productForm,
                                  paymentMethods: { ...productForm.paymentMethods, transfer: checked as boolean },
                                })
                              }
                            />
                            <Label htmlFor="transfer" className="text-sm cursor-pointer">
                              Transferencia
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 border-t pt-4">
                        <Label className="text-xs uppercase tracking-[0.15em]">Especificaciones</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="alcohol-content" className="text-xs">
                              Contenido de Alcohol
                            </Label>
                            <Input
                              id="alcohol-content"
                              value={productForm.specifications.alcoholContent}
                              onChange={(e) =>
                                setProductForm({
                                  ...productForm,
                                  specifications: { ...productForm.specifications, alcoholContent: e.target.value },
                                })
                              }
                              placeholder="ej. 40%"
                              className="border-border/50 focus:border-gold"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="agave-type" className="text-xs">
                              Tipo de Agave
                            </Label>
                            <Input
                              id="agave-type"
                              value={productForm.specifications.agaveType}
                              onChange={(e) =>
                                setProductForm({
                                  ...productForm,
                                  specifications: { ...productForm.specifications, agaveType: e.target.value },
                                })
                              }
                              placeholder="ej. Espadín"
                              className="border-border/50 focus:border-gold"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bottle-size" className="text-xs">
                              Tamaño de Botella
                            </Label>
                            <Input
                              id="bottle-size"
                              value={productForm.specifications.bottleSize}
                              onChange={(e) =>
                                setProductForm({
                                  ...productForm,
                                  specifications: { ...productForm.specifications, bottleSize: e.target.value },
                                })
                              }
                              placeholder="ej. 750ml"
                              className="border-border/50 focus:border-gold"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="accessories" className="text-xs">
                              Accesorios Decorativos
                            </Label>
                            <Input
                              id="accessories"
                              value={productForm.specifications.decorativeAccessories}
                              onChange={(e) =>
                                setProductForm({
                                  ...productForm,
                                  specifications: { ...productForm.specifications, decorativeAccessories: e.target.value },
                                })
                              }
                              placeholder="ej. Caja de madera"
                              className="border-border/50 focus:border-gold"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 border-t pt-4">
                        <Label className="text-xs uppercase tracking-[0.15em]">Producto Combinado</Label>
                        <Select
                          value={productForm.combinationType}
                          onValueChange={(value: any) => setProductForm({ ...productForm, combinationType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Sin combinación</SelectItem>
                            <SelectItem value="bundle">Bundle</SelectItem>
                            <SelectItem value="personalization">Personalización</SelectItem>
                          </SelectContent>
                        </Select>

                        {productForm.combinationType !== 'none' && (
                          <div className="space-y-2">
                            <Label htmlFor="combined-product" className="text-xs">
                              Seleccionar Producto
                            </Label>
                            <Select
                              value={productForm.combinedProductId}
                              onValueChange={(value) => setProductForm({ ...productForm, combinedProductId: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un producto" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableProductsForCombination.map((product) => (
                                  <SelectItem key={product.id.toString()} value={product.id.toString()}>
                                    {product.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="product-image" className="text-xs uppercase tracking-[0.15em]">
                          Imagen del Producto
                        </Label>
                        <Input
                          id="product-image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="border-border/50 focus:border-gold"
                        />
                        {imagePreview && (
                          <div className="mt-4">
                            <img
                              src={imagePreview}
                              alt="Vista previa"
                              className="w-full h-48 object-cover rounded-lg border border-border/30"
                            />
                          </div>
                        )}
                        {uploadProgress > 0 && uploadProgress < 100 && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gold h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                            <p className="text-xs text-center mt-1 text-muted-foreground">
                              Subiendo: {uploadProgress}%
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsProductDialogOpen(false);
                            resetProductForm();
                          }}
                          className="flex-1"
                          disabled={isSubmitting}
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-gold hover:bg-gold/90 text-background"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Guardando...
                            </>
                          ) : (
                            editingProduct ? 'Actualizar' : 'Crear Producto'
                          )}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {productsLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-gold" />
                </div>
              ) : products && products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card key={product.id.toString()} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <img
                          src={product.image.getDirectURL()}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6 space-y-4">
                        <div>
                          <h3 className="font-serif text-xl tracking-wide mb-2">{product.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-medium text-gold">
                            ${(Number(product.price) / 100).toFixed(2)}
                          </span>
                          <Badge variant={product.isOutOfStock ? 'destructive' : 'default'}>
                            {product.isOutOfStock ? 'Sin Stock' : `Stock: ${product.stock.toString()}`}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Método de venta:</span>
                            <span>{getSaleMethodLabel(product.saleMethod)}</span>
                          </div>
                          {product.shippingCarrier && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Paquetería:</span>
                              <span>{getShippingCarrierLabel(product.shippingCarrier)}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Envío:</span>
                            <span>
                              {Number(product.shippingPrice) === 0
                                ? 'Gratis'
                                : `$${(Number(product.shippingPrice) / 100).toFixed(2)}`}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                            className="flex-1"
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteProductDialog({ open: true, productId: product.id })}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No hay productos registrados</p>
                </div>
              )}
            </FadeIn>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-6">
            <FadeIn>
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <CardTitle className="font-serif text-2xl tracking-[0.15em]">Contactos / Leads</CardTitle>
                    <Select value={leadFilter} onValueChange={(value: any) => setLeadFilter(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="new">Nuevos</SelectItem>
                        <SelectItem value="contacted">Contactados</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  {leadsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-gold" />
                    </div>
                  ) : filteredLeads.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Teléfono</TableHead>
                            <TableHead>Producto</TableHead>
                            <TableHead>Cantidad</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredLeads.map((lead) => (
                            <TableRow key={lead.id.toString()}>
                              <TableCell className="font-medium">{lead.name}</TableCell>
                              <TableCell>{lead.email}</TableCell>
                              <TableCell>{lead.phone}</TableCell>
                              <TableCell>{getProductName(lead.productId)}</TableCell>
                              <TableCell>{lead.desiredQuantity?.toString() || 'N/A'}</TableCell>
                              <TableCell className="text-sm">{formatDate(lead.createdAt)}</TableCell>
                              <TableCell>
                                {lead.contacted ? (
                                  <Badge variant="default" className="bg-green-600">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Contactado
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary">Nuevo</Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  {!lead.contacted && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleMarkLeadAsContacted(lead.id)}
                                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                    >
                                      <CheckCircle2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setDeleteLeadDialog({ open: true, leadId: lead.id })}
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No hay contactos registrados</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          </TabsContent>

          {/* WhatsApp Tab */}
          <TabsContent value="whatsapp" className="space-y-6">
            <FadeIn>
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <CardTitle className="font-serif text-2xl tracking-[0.15em]">Contactos de WhatsApp</CardTitle>
                    <Select value={whatsappFilter} onValueChange={(value: any) => setWhatsappFilter(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="new">Nuevos</SelectItem>
                        <SelectItem value="contacted">Contactados</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  {whatsappContactsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-gold" />
                    </div>
                  ) : filteredWhatsAppContacts.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Motivo</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredWhatsAppContacts.map((contact) => (
                            <TableRow key={contact.id.toString()}>
                              <TableCell className="font-medium">{contact.name}</TableCell>
                              <TableCell>{contact.reason}</TableCell>
                              <TableCell className="text-sm">{formatDate(contact.createdAt)}</TableCell>
                              <TableCell>
                                {contact.contacted ? (
                                  <Badge variant="default" className="bg-green-600">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Contactado
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary">Nuevo</Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  {!contact.contacted && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleMarkWhatsAppContactAsContacted(contact.id)}
                                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                    >
                                      <CheckCircle2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setDeleteWhatsAppDialog({ open: true, contactId: contact.id })}
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No hay contactos de WhatsApp registrados</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <FadeIn>
              <div className="space-y-8">
                {/* Logo Section */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="font-serif text-2xl tracking-[0.15em]">Logo del Sitio</CardTitle>
                      <Dialog open={isLogoDialogOpen} onOpenChange={setIsLogoDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-gold hover:bg-gold/90 text-background">
                            <Upload className="h-4 w-4 mr-2" />
                            {logo ? 'Actualizar Logo' : 'Subir Logo'}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="font-serif text-2xl tracking-[0.15em]">
                              {logo ? 'Actualizar Logo' : 'Subir Logo'}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="logo-file" className="text-xs uppercase tracking-[0.15em]">
                                Seleccionar Imagen
                              </Label>
                              <Input
                                id="logo-file"
                                type="file"
                                accept="image/*"
                                onChange={handleLogoFileChange}
                                className="border-border/50 focus:border-gold"
                              />
                            </div>
                            {logoPreview && (
                              <div className="mt-4">
                                <img
                                  src={logoPreview}
                                  alt="Vista previa del logo"
                                  className="w-full h-48 object-contain rounded-lg border border-border/30 bg-gray-50"
                                />
                              </div>
                            )}
                            {logoUploadProgress > 0 && logoUploadProgress < 100 && (
                              <div className="mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-gold h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${logoUploadProgress}%` }}
                                  />
                                </div>
                                <p className="text-xs text-center mt-1 text-muted-foreground">
                                  Subiendo: {logoUploadProgress}%
                                </p>
                              </div>
                            )}
                            <div className="flex gap-4 pt-4">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  setIsLogoDialogOpen(false);
                                  setLogoFile(null);
                                  setLogoPreview('');
                                }}
                                className="flex-1"
                                disabled={isUploadingLogo}
                              >
                                Cancelar
                              </Button>
                              <Button
                                onClick={handleLogoUpload}
                                className="flex-1 bg-gold hover:bg-gold/90 text-background"
                                disabled={isUploadingLogo || !logoFile}
                              >
                                {isUploadingLogo ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Subiendo...
                                  </>
                                ) : (
                                  'Guardar Logo'
                                )}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {logoLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-gold" />
                      </div>
                    ) : logo ? (
                      <div className="flex justify-center">
                        <img
                          src={logo.getDirectURL()}
                          alt="Logo actual"
                          className="max-h-48 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No hay logo configurado</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Gallery Images Section */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="font-serif text-2xl tracking-[0.15em]">Imágenes de Galería</CardTitle>
                      <Dialog open={isGalleryDialogOpen} onOpenChange={setIsGalleryDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-gold hover:bg-gold/90 text-background">
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar Imágenes
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="font-serif text-2xl tracking-[0.15em]">
                              Agregar Imágenes a la Galería
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="gallery-files" className="text-xs uppercase tracking-[0.15em]">
                                Seleccionar Imágenes (múltiples)
                              </Label>
                              <Input
                                id="gallery-files"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleGalleryFilesChange}
                                className="border-border/50 focus:border-gold"
                              />
                            </div>
                            {galleryPreviews.length > 0 && (
                              <div className="space-y-4 mt-4">
                                {galleryPreviews.map((preview, index) => (
                                  <div key={index} className="space-y-2 p-4 border border-border/30 rounded-lg">
                                    <img
                                      src={preview}
                                      alt={`Vista previa ${index + 1}`}
                                      className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <div className="space-y-2">
                                      <Label htmlFor={`description-${index}`} className="text-xs">
                                        Descripción (opcional)
                                      </Label>
                                      <Input
                                        id={`description-${index}`}
                                        value={galleryDescriptions[index] || ''}
                                        onChange={(e) => {
                                          const newDescriptions = [...galleryDescriptions];
                                          newDescriptions[index] = e.target.value;
                                          setGalleryDescriptions(newDescriptions);
                                        }}
                                        placeholder="Descripción de la imagen"
                                        className="border-border/50 focus:border-gold"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                            {galleryUploadProgress > 0 && galleryUploadProgress < 100 && (
                              <div className="mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-gold h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${galleryUploadProgress}%` }}
                                  />
                                </div>
                                <p className="text-xs text-center mt-1 text-muted-foreground">
                                  Subiendo: {galleryUploadProgress}%
                                </p>
                              </div>
                            )}
                            <div className="flex gap-4 pt-4">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  setIsGalleryDialogOpen(false);
                                  setGalleryFiles([]);
                                  setGalleryPreviews([]);
                                  setGalleryDescriptions([]);
                                }}
                                className="flex-1"
                                disabled={isUploadingGallery}
                              >
                                Cancelar
                              </Button>
                              <Button
                                onClick={handleGalleryUpload}
                                className="flex-1 bg-gold hover:bg-gold/90 text-background"
                                disabled={isUploadingGallery || galleryFiles.length === 0}
                              >
                                {isUploadingGallery ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Subiendo...
                                  </>
                                ) : (
                                  'Subir Imágenes'
                                )}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {galleryImagesLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-gold" />
                      </div>
                    ) : galleryImages && galleryImages.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {galleryImages.map((image) => (
                          <Card key={image.id.toString()} className="overflow-hidden">
                            <div className="aspect-square relative">
                              <img
                                src={image.image.getDirectURL()}
                                alt={image.description || 'Imagen de galería'}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <CardContent className="p-4 space-y-3">
                              {image.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {image.description}
                                </p>
                              )}
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleEditGalleryImage({
                                      id: image.id,
                                      description: image.description || null,
                                      imageUrl: image.image.getDirectURL(),
                                    })
                                  }
                                  className="flex-1"
                                >
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Editar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setDeleteGalleryDialog({ open: true, imageId: image.id })}
                                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No hay imágenes en la galería</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl tracking-[0.15em]">Configuración del Sistema</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <p>Configuraciones adicionales próximamente</p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Gallery Image Dialog */}
      <Dialog open={isEditGalleryDialogOpen} onOpenChange={setIsEditGalleryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl tracking-[0.15em]">Editar Imagen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-gallery-file" className="text-xs uppercase tracking-[0.15em]">
                Nueva Imagen (opcional)
              </Label>
              <Input
                id="edit-gallery-file"
                type="file"
                accept="image/*"
                onChange={handleEditGalleryFileChange}
                className="border-border/50 focus:border-gold"
              />
            </div>
            {editGalleryPreview && (
              <div className="mt-4">
                <img
                  src={editGalleryPreview}
                  alt="Vista previa"
                  className="w-full h-48 object-cover rounded-lg border border-border/30"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="edit-description" className="text-xs uppercase tracking-[0.15em]">
                Descripción
              </Label>
              <Textarea
                id="edit-description"
                value={editGalleryDescription}
                onChange={(e) => setEditGalleryDescription(e.target.value)}
                placeholder="Descripción de la imagen"
                rows={3}
                className="border-border/50 focus:border-gold resize-none"
              />
            </div>
            {galleryUploadProgress > 0 && galleryUploadProgress < 100 && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gold h-2 rounded-full transition-all duration-300"
                    style={{ width: `${galleryUploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-center mt-1 text-muted-foreground">
                  Actualizando: {galleryUploadProgress}%
                </p>
              </div>
            )}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditGalleryDialogOpen(false);
                  setEditingGalleryImage(null);
                  setEditGalleryFile(null);
                  setEditGalleryPreview('');
                  setEditGalleryDescription('');
                }}
                className="flex-1"
                disabled={isUploadingGallery}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdateGalleryImage}
                className="flex-1 bg-gold hover:bg-gold/90 text-background"
                disabled={isUploadingGallery}
              >
                {isUploadingGallery ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Actualizando...
                  </>
                ) : (
                  'Actualizar'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialogs */}
      <AlertDialog open={deleteOrderDialog.open} onOpenChange={(open) => setDeleteOrderDialog({ ...deleteOrderDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción es irreversible. El pedido será eliminado permanentemente del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteOrder} className="bg-destructive hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteLeadDialog.open} onOpenChange={(open) => setDeleteLeadDialog({ ...deleteLeadDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar contacto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción es irreversible. El contacto será eliminado permanentemente del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteLead} className="bg-destructive hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteWhatsAppDialog.open} onOpenChange={(open) => setDeleteWhatsAppDialog({ ...deleteWhatsAppDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar contacto de WhatsApp?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción es irreversible. El contacto será eliminado permanentemente del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteWhatsAppContact} className="bg-destructive hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteProductDialog.open} onOpenChange={(open) => setDeleteProductDialog({ ...deleteProductDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción es irreversible. El producto será eliminado permanentemente del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct} className="bg-destructive hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteGalleryDialog.open} onOpenChange={(open) => setDeleteGalleryDialog({ ...deleteGalleryDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar imagen?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción es irreversible. La imagen será eliminada permanentemente de la galería.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteGalleryImage} className="bg-destructive hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
