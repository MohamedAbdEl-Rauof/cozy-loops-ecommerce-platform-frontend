"use client";

import { SnackbarProvider } from "notistack";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import QueryProvider from "@/provider/QueryProvider";

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
          {children}
          <Footer />
        </AuthProvider>
      </SnackbarProvider>
    </QueryProvider>
  );
}