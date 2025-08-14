"use client";

import { SnackbarProvider } from "notistack";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import QueryProvider from "@/provider/QueryProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <AuthProvider>
          <Navbar />
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
            {children}
          </GoogleOAuthProvider>
          <Footer />
        </AuthProvider>
      </SnackbarProvider>
    </QueryProvider>
  );
}