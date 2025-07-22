
export interface CartItem {
  _id: string;
  product: {
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
    reviews?: any[];
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
  lastUpdated: string;
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