"use client";

import { Box } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
          {/* Flex column shell so the footer sticks to the bottom and short
              pages never expose the body background below the footer. */}
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                {children}
              </GoogleOAuthProvider>
            </Box>
            <Footer />
          </Box>
        </AuthProvider>
      </SnackbarProvider>
    </QueryProvider>
  );
}