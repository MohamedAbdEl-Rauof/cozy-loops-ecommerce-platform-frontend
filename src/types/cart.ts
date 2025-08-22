import { ApiReview } from './Testimonial';

export interface CartItem {
  _id: string;
  product: {
    id: string;
    _id: string;
    name: string;
    price: number;
    image: string;
    slug: string;
    stock: number;
    mainImage: string;
    images: string[];
    description?: string;
    shortDescription?: string;
    priceBeforeDiscount?: number;
    discountPercentage?: number;
    category?: string;
    maker?: string;
    tags?: string[];
    sku?: string;
    attributes?: Array<{
      _id: string;
      name: string;
      value: string;
    }>;
    variants?: Array<{
      _id: string;
      name: string;
      price: number;
      stock: number;
      sku: string;
      attributes: Array<{
        _id: string;
        name: string;
        value: string;
      }>;
    }>;
    featured?: boolean;
    isActive?: boolean;
    averageRating?: number;
    numReviews?: number;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    reviews?: ApiReview[];
  };
  quantity: number;
  variant?: string | null;
  size?: string;
  color?: string;
  price?: number;
  totalPrice?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  status: 'active' | 'processing' | 'completed';
  orderId?: string | null;
  lastUpdated: string;
  canModify?: boolean;
  isProcessing?: boolean;
}

export interface AddToCartData {
  productId: string;
  quantity?: number;
  variant?: string;
  size?: string;
  color?: string;
}

export interface UpdateCartData {
  productId: string;
  quantity: number;
  variant?: string;
}

export interface RemoveFromCartData {
  productId: string;
  variant?: string;
}

export interface CartApiResponse {
  success: boolean;
  message: string;
  cart: Cart;
}

export interface CartCountResponse {
  success: boolean;
  count: number;
}

export interface TransformedCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  productId: string;
  slug: string;
  totalPrice: number;
}

export interface MyCartProps {
  items?: TransformedCartItem[];
  onUpdateQuantity?: (_itemId: string, _newQuantity: number) => void;
  onRemoveItem?: (_itemId: string) => void;
  onProceedToCheckout?: () => void;
  shippingCost?: number;
  isCheckoutLoading?: boolean;
}

export interface Order {
  _id: string;
  orderNumber: string;
  items: Array<{
    product: string;
    quantity: number;
    price: number;
    totalPrice: number;
    variant?: string;
  }>;
  subtotal: number;
  shippingCost: number;
  tax: number;
  totalAmount: number;
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
}

export interface CheckoutData {
  shippingCost?: number;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface CartUpdateData {
  cart: unknown;
  action: string;
  item?: unknown;
}

export interface CheckoutResponse {
  clientSecret: string;
  paymentIntentId: string;
  orderId: string;
  orderNumber: string;
  amount: number;
  breakdown: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  publishableKey: string;
}