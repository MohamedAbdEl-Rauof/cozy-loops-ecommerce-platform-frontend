
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

// ✅ Add interface for WishlistCard component
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
  onDeleteItem?: (itemId: string) => void;
  onAddToCart?: (itemId: string) => void;
  onViewProduct?: (itemId: string) => void;
  onMoveAllToCart?: () => void;
  onStartShopping?: () => void;
}