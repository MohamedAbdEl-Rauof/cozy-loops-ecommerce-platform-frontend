
"use client";
import { Box} from "@mui/material"

import WishlistCard from "@/components/wishlist/WishlistCard"
import ProtectedRoute from "@/provider/ProtectedRoute";


const Page = () => {
    return (
        <ProtectedRoute>
            <Box sx={{ bgcolor: 'white' }}>
                <WishlistCard/>
            </Box>
        </ProtectedRoute>
    );
};

export default Page;