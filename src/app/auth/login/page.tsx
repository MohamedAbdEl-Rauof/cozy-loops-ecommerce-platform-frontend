const Page = () => {
  return <div>Page</div>;
};

// Add this to your login page's onSubmit handler
const onSubmit = async (data: FormData) => {
  setIsSubmitting(true);
  setError(null);

  try {
    await login(data.email, data.password);
    // Successful login will redirect via the AuthContext
  } catch (error) {
    console.error("Login error:", error);
    
    if (axios.isAxiosError(error) && error.response) {
      // Handle unverified email error specifically
      if (error.response.status === 403 && 
          error.response.data?.message?.includes("email not verified")) {
        setError("Your email is not verified. Please check your inbox for the verification link or request a new one.");
        setShowResendOption(true); // Add this state to your component
      } else {
        setError(error.response.data?.message || "Invalid email or password");
      }
    } else {
      setError("Network error. Please check your connection and try again.");
    }
  } finally {
    setIsSubmitting(false);
  }
};

// Add this to your login page JSX
{error && showResendOption && (
  <Box sx={{ mt: 2, textAlign: 'center' }}>
    <Button
      component={Link}
      href="/user/resend-verification"
      variant="text"
      color="primary"
      sx={{ textTransform: 'none' }}
    >
      Resend verification email
    </Button>
  </Box>
)}