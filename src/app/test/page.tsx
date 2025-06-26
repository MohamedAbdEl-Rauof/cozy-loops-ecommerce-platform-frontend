"use client"
import { SuccessAnimation } from "@/components/shared/SuccessAnimation";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
  return <div>
    <SuccessAnimation message="Success" onComplete={() => router.push('/test')} count={20} />
  </div>;
};

export default Page;