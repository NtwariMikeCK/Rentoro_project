"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function GoogleLogin() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      router.push("/");
    }

    if (token) {
      localStorage.setItem("token", token);
      router.push("/");
    }
  }, [searchParams, router]);

  return (
    <div>
      <h1>Spinner</h1>
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
