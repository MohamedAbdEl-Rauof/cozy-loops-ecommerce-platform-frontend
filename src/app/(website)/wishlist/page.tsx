"use client";
import WishlistCard from "@/components/wishlist/WishlistCard"
import { Box } from "@mui/material"

const mockWishlistItems = [
    {
        id: 1,
        title: "Premium Cotton T-Shirt",
        price: 299,
        image: "/api/placeholder/300/250",
        inStock: true,
    },
    {
        id: 2,
        title: "Wireless Bluetooth Headphones",
        price: 899,
        image: "/api/placeholder/300/250",
        inStock: true,
    },
    {
        id: 3,
        title: "Smart Watch Series 5",
        price: 1299,
        image: "/api/placeholder/300/250",
        inStock: false,
    },
    {
        id: 4,
        title: "Leather Wallet",
        price: 199,
        image: "/api/placeholder/300/250",
        inStock: true,
    },
];



const Page = () => {
    const handleDeleteItem = (itemId: number) => {
        console.log('Deleting item:', itemId);
        // Implement your delete logic here
        // e.g., call API to remove from wishlist
    };

    const handleAddToCart = (itemId: number) => {
        console.log('Adding to cart:', itemId);
        // Implement your add to cart logic here
        // e.g., call API to add to cart
    };

    const handleViewProduct = (itemId: number) => {
        console.log('Viewing product:', itemId);
        // Implement navigation to product page
        // e.g., router.push(`/products/${itemId}`)
    };

    const handleMoveAllToCart = () => {
        console.log('Moving all items to cart');
        // Implement logic to move all items to cart
    };

    const handleStartShopping = () => {
        console.log('Starting shopping');
        // Implement navigation to products page
        // e.g., router.push('/products')
    };

    return (
        <Box sx={{ bgcolor: 'white' }}>
            <WishlistCard
                items={mockWishlistItems}
                onDeleteItem={handleDeleteItem}
                onAddToCart={handleAddToCart}
                onViewProduct={handleViewProduct}
                onMoveAllToCart={handleMoveAllToCart}
                onStartShopping={handleStartShopping}
            />
        </Box>
    )
}
export default Page