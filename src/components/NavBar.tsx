"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import SignUpModal from "@/components/signup";
import SignInModal from "@/components/signin";
import { useMutation, useQuery } from "@tanstack/react-query";
import request from "@/utils/axios";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";
import { User } from "@/types/carType";

export default function NavBar({
  isDark,
  isHost,
}: {
  isDark?: boolean;
  isHost?: boolean;
}) {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };
  const [token, setToken] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["user_info"],
    queryFn: async () => {
      return (await request.get("/users/me")) as User;
    },
    enabled: !!token,
  });

  const { mutate } = useMutation({
    mutationFn: async () => await request.post(`/auth/logout`, {}),
    onSuccess: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        setToken(null);
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

  const textColor = isDark ? "text-[#593CFB]" : "text-white";

  return (
    <>
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 bg-opacity-30">
        <div className="flex items-center">
          <Link href="/">
            <h1 className={`text-4xl font-black ${textColor}`}>Rentoro</h1>
          </Link>
        </div>
        <div className="flex items-center space-x-8">
          {token && data?.roles.includes("admin") && (
            <a
              href="/dashboard"
              className="text-white bg-[#593CFB] hover:bg-[#452CC9] px-4 py-2 rounded-md font-medium"
            >
              Dashboard
            </a>
          )}
          {token && (
            <a
              href="/orders"
              className="text-white bg-[#593CFB] hover:bg-[#452CC9] px-4 py-2 rounded-md font-medium"
            >
              Purchases
            </a>
          )}
          {!isHost && (
            <a
              href="/hosts"
              className="text-white bg-[#593CFB] hover:bg-[#452CC9] px-4 py-2 rounded-md font-medium"
            >
              Become a host
            </a>
          )}
          {isHost && (
            <Link href="/list-your-car">
              <button className="text-white bg-[#593CFB] hover:bg-[#452CC9] px-4 py-2 rounded-md font-medium">
                List Your Car
              </button>
            </Link>
          )}
          {token ? (
            <>
              {data && (
                <div className={"flex items-center gap-2"}>
                  {data.picture ? (
                    <div className={"relative w-12 h-12"}>
                      <Image
                        src={data?.picture}
                        alt={`${data?.firstName} ${data?.lastName}`}
                        className="w-12 h-12 rounded-full border-2 border-gray-400"
                        fill
                      />
                    </div>
                  ) : (
                    <CircleUserRound />
                  )}
                  <h2 className="text-lg font-semibold">{data?.firstName}</h2>
                  <button
                    className={
                      "cursor-pointer text-white bg-[#593CFB] hover:bg-[#452CC9] px-4 py-2 rounded-md font-medium"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      mutate();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <button
                onClick={openSignUpModal}
                className="bg-[#593CFB] text-white px-4 py-2 rounded-md font-medium hover:bg-[#452CC9]"
              >
                Sign up
              </button>
              <button
                className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md font-medium hover:bg-[#452CC9] hover:text-white"
                onClick={openSignUpModal}
              >
                Log in
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Existing Modals */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />

      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
      />
    </>
  );
}
