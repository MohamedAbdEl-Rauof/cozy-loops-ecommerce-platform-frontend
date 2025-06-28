'use client';

import HeroSection from '@/components/home/HeroSection';
import FeaturedCategories from '@/components/shared/FeaturedCategories';
// import { useAuth } from '@/context/AuthContext';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';


export default function Home() {
  // const { user, logout } = useAuth();
  // const router = useRouter();

  // const handleLogout = async () => {
  //   await logout();
  // };

  // const handleredirect = async () => {
  //   router.push('/auth/login');
  // }

  // Sample product images for the hero section

  return (
    <div>
      {/* <h1 className="text-4xl font-bold text-center my-8">
        Welcome to Our E-commerce Platform
      </h1>

      <div className="flex justify-center">
        {user ? (
          <div className="text-center">
            <Image
              src="/images/user-avatar.png"
              alt="User Avatar"
              width={100}
              height={100}
              className="rounded-full mb-4"
            />
            <h2 className="text-2xl">Hello, {user.firstName || user.email}!</h2>
          </div>
        ) : (
          <p className="text-lg">Please log in to access your account.</p>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleLogout}
          disabled={!user}
          className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleredirect}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </div> */}

      {/* <HeroSection
      /> */}




      <FeaturedCategories
        title="Need a gift? Make it personal."
        isTitleCenter={false}
        description="Custom handmade gifts that speak louder than words."
        ctaText=""
        buttonText="Explore Custom Picks"
        onButtonClick="/category"
      />




      {/* Add more sections of your homepage below */}
    </div>
  );
}