"use client";
import { useAuth } from '@/context/AuthContext';
import Image from "next/image";

export default function Home() {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-8">Welcome to Our E-commerce Platform</h1>
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
    </div>
  );
}
