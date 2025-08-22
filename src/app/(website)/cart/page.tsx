
"use client";

import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

import MyCart from "@/components/cart/MyCart";
import { useCart, useUpdateCart, useRemoveFromCart } from "@/hooks/useCart";
import ProtectedRoute from "@/provider/ProtectedRoute";
import { cartService } from "@/services/cartServices";
import { Cart, CartItem, TransformedCartItem, CheckoutData } from "@/types/cart";

const transformCartData = (cart: Cart): TransformedCartItem[] => {
  if (!cart?.items) return [];

  return cart.items.map((item: CartItem) => ({
    id: item._id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    image:
      item.product.mainImage ||
      item.product.images?.[0] ||
      item.product.image ||
      "",
    productId: item.product._id,
    slug: item.product.slug,
    totalPrice: item.product.price * item.quantity,
  }));
};

const Page = () => {
  const { data: cart, isLoading: cartLoading, error } = useCart();
  const { updateCart } = useUpdateCart();
  const { removeFromCart } = useRemoveFromCart();
  const router = useRouter();
  const [isCheckoutLoading, setIsCheckoutLoading] = React.useState(false);

  const cartItems: TransformedCartItem[] = cart ? transformCartData(cart) : [];

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    if (cartItem && cartItem.productId) {
      updateCart({
        productId: cartItem.productId,
        quantity: newQuantity,
      });
    }
  };

  const handleRemoveItem = (itemId: string) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    if (cartItem && cartItem.productId) {
      removeFromCart({
        productId: cartItem.productId,
      });
    }
  };

  const handleProceedToCheckout = async () => {
    setIsCheckoutLoading(true);
    try {
      const checkoutData: CheckoutData = {
        shippingCost: 0,
        shippingAddress: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "US",
        },
      };

      const order = await cartService.checkout(checkoutData);

      await router.push(`/payment?orderId=${order._id}`);
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  if (cartLoading) {
    return (
      <ProtectedRoute>
        <Box
          sx={{
            bgcolor: "white",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <Box
          sx={{
            bgcolor: "white",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>Error loading cart: {error.message}</div>
        </Box>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Box sx={{ bgcolor: "white", minHeight: "100vh" }}>
        <MyCart
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onProceedToCheckout={handleProceedToCheckout}
          shippingCost={0}
          isCheckoutLoading={isCheckoutLoading}
        />
      </Box>
    </ProtectedRoute>
  );
};

export default Page;
