import AccountPage from "@/components/account/AccountPage"
import ProtectedRoute from "@/provider/ProtectedRoute"
import { Box } from "@mui/material"

const Page = () => {
    return (
        <Box sx={{ backgroundColor: '#f5f5f5' }}>
            <ProtectedRoute>
                <AccountPage />
            </ProtectedRoute>
        </Box>
    )
}
export default Page