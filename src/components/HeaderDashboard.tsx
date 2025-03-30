"use client";

import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import request from "@/utils/axios";
import { User } from "@/types/carType";
import { useRouter } from "next/navigation";

export function Header() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useQuery({
    queryKey: ["user_info"],
    queryFn: async () => {
      return (await request.get("/users/me")) as User;
    },
    enabled: !!token,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => await request.post(`/auth/logout`, {}),
    onSuccess: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        setToken(null);
        router.push("/");
      }
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <div className="w-full flex-1 p-3"></div>
      <Button
        variant="outline"
        className="rounded-full"
        onClick={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin" />
          </>
        ) : (
          <>
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </>
        )}
      </Button>
    </header>
  );
}
