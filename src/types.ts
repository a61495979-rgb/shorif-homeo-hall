export type CategoryType = 
  | 'all'
  | 'germany-special'
  | 'deshi-special'
  | 'mother-tincture'
  | 'dilutions'
  | 'biochemic'
  | 'tonics'
  | 'skin-hair'
  | 'chronic-care';

export type MedicineOrigin = 'germany' | 'deshi' | 'india';

export interface Product {
  id: string;
  name: string;
  bengaliName: string;
  brand: string;
  category: CategoryType;
  originType: MedicineOrigin;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  image: string;
  isFlashDeal?: boolean;
  soldCount?: number;
  stockCount?: number;
  availablePotencies?: string[];
  selectedPotency?: string;
  availableSizes?: string[];
  selectedSize?: string;
  indication: string;
  dosage: string;
  description: string;
  origin: string;
  isDarazMall?: boolean;
  freeShipping?: boolean;
}

export interface StoreSettings {
  topNotice: string;
  phone: string;
  whatsapp: string;
  email: string;
  ownerName: string;
  ownerEmail: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  potency: string;
  size: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  potency: string;
  size: string;
}

export interface Order {
  orderId: string;
  date: string;
  customerName: string;
  phone: string;
  district: string;
  address: string;
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'rocket' | 'card';
  transactionId?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'verified' | 'packed' | 'courier' | 'delivered';
  courierName: string;
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  designation: string;
  specialty: string;
  experienceYears: number;
  consultationFee: number;
  availableDays: string;
  rating: number;
  avatar: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
  productName: string;
}
