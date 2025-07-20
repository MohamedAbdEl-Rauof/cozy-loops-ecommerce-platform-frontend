
"use client";
import { Box } from "@mui/material";
import MyCart from "@/components/cart/MyCart"

const sampleCartItems = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 299.99,
        quantity: 2,
        image: "/api/placeholder/60/60"
    },
    {
        id: 2,
        name: "Smart Watch Series 5",
        price: 599.99,
        quantity: 1,
        image: "/api/placeholder/60/60"
    },
    {
        id: 3,
        name: "USB-C Fast Charger",
        price: 49.99,
        quantity: 3,
        image: "/api/placeholder/60/60"
    }
];

const Page = () => {

    // Handler functions - replace with actual implementations
    const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
        console.log(`Update item ${itemId} quantity to ${newQuantity}`);
        // Implement your quantity update logic here
    };

    const handleRemoveItem = (itemId: number) => {
        console.log(`Remove item ${itemId} from cart`);
        // Implement your item removal logic here
    };

    const handleProceedToCheckout = () => {
        console.log("Proceeding to checkout...");
        // Implement your checkout navigation logic here
    };

    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
            <MyCart
                items={sampleCartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onProceedToCheckout={handleProceedToCheckout}
                shippingCost={0} 
            />
        </Box>
    );
}
export default Page;