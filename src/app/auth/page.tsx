"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

function GoogleLogin() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      toast.error("Authentication Failed");
      router.push("/");
    }

    if (token) {
      localStorage.setItem("token", token);
      router.push("/");
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center space-y-5">
        <h1 className="text-3xl font-bold text-gray-800">Rentoro</h1>
        <p className="text-gray-600 mt-2">Authenticating, please wait...</p>
        <div className="mt-4 animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 m-auto"></div>
      </div>
    </div>
  );
}

export default function GoogleAuthPage() {
  return (
    <Suspense>
      <GoogleLogin />
    </Suspense>
  );
}
