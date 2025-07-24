
"use client";
import WishlistCard from "@/components/wishlist/WishlistCard"
import ProtectedRoute from "@/provider/ProtectedRoute";
import { Box} from "@mui/material"


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