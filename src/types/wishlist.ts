export interface WishlistItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    mainImage?: string;
    description?: string;
    isActive: boolean;
    stock: number;
    category: string;
    slug: string;
    priceBeforeDiscount?: number;
    discountPercentage?: number;
    sizes?: string[];
    colors?: string[];
  };
  addedAt: string;
}

export interface WishlistResponse {
  success: boolean;
  message?: string;
  wishlist: {
    items: WishlistItem[];
    totalItems: number;
    lastUpdated: string;
  };
}

export interface WishlistData {
  items: WishlistItem[];
  totalItems: number;
  lastUpdated: string;
}

export interface WishlistCardItem {
  id: string;
  title: string;
  price: number;
  image: string;
  stock?: number;
  inStock?: boolean;
  addedAt?: string;
  originalPrice?: number;
  discountPercentage?: number;
}

export interface WishlistCardProps {
  items?: WishlistCardItem[];
  onDeleteItem?: (_itemId: string) => void;
  onAddToCart?: (_itemId: string) => void;
  onViewProduct?: (_itemId: string) => void;
  onMoveAllToCart?: () => void;
  onStartShopping?: () => void;
}