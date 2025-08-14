import { useState } from 'react';

interface GoogleUser {
  credential: string;
}

interface UseGoogleAuthReturn {
  signInWithGoogle: () => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

export const useGoogleAuth = (): UseGoogleAuthReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = async (): Promise<string> => {
    setIsLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Google Sign-In is only available in the browser'));
        return;
      }

      // Load Google Identity Services script if not already loaded
      if (!window.google) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => initializeGoogleSignIn();
        document.head.appendChild(script);
      } else {
        initializeGoogleSignIn();
      }

      function initializeGoogleSignIn() {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: (response: GoogleUser) => {
            setIsLoading(false);
            resolve(response.credential);
          },
          error_callback: () => {
            setIsLoading(false);
            setError('Google Sign-In failed');
            reject(new Error('Google Sign-In failed'));
          }
        });

        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Fallback to popup if prompt is not displayed
            window.google.accounts.id.renderButton(
              document.createElement('div'),
              {
                theme: 'outline',
                size: 'large',
                type: 'standard',
              }
            );
            
            // Trigger popup manually
            window.google.accounts.oauth2.initTokenClient({
              client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
              scope: 'email profile',
              callback: (response: any) => {
                setIsLoading(false);
                resolve(response.access_token);
              },
            }).requestAccessToken();
          }
        });
      }
    });
  };

  return {
    signInWithGoogle,
    isLoading,
    error
  };
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    google: any;
  }
}