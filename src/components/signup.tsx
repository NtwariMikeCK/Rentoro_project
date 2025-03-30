"use client"

import React, { useState } from "react";
import { X } from "lucide-react";
import SignInModal from "./signin";
import {redirect} from "next/navigation";

const SignUpModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {

  async function googleRedirect() {
    return redirect(`${process.env.BASE_BACKEND_URL}/auth/google`);
  }

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[440px] relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Modal content */}
        <div className="p-8">
          <h2 className="text-[32px] font-bold text-center text-gray-900 mb-2">
            Welcome to Rentoro
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Find the perfect vehicle for your next adventure
          </p>

          {/* Sign-up options */}
          <div className="space-y-3">
            <button onClick={()=>googleRedirect()} className="flex items-center justify-center w-full border-2 border-gray-200 bg-white text-gray-700 rounded-lg py-3.5 px-4 hover:border-gray-300 transition-colors font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                viewBox="0 0 20 20"
              >
                <path
                  d="M17.8 10.2a8 8 0 0 0-.12-1.3H10v2.5h4.4a3.7 3.7 0 0 1-1.63 2.47v2.05h2.64A8 8 0 0 0 17.8 10.2z"
                  fill="#4285F4"
                />
                <path
                  d="M10 18c2.2 0 4.06-.73 5.41-1.97l-2.64-2.05a4.97 4.97 0 0 1-7.4-2.63H2.6v2.12A8 8 0 0 0 10 18z"
                  fill="#34A853"
                />
                <path
                  d="M5.37 11.35c-.2-.56-.31-1.16-.31-1.78 0-.62.11-1.22.3-1.78V5.67H2.6a8 8 0 0 0 0 7.8l2.77-2.12z"
                  fill="#FBBC05"
                />
                <path
                  d="M10 6.58c1.24 0 2.35.42 3.22 1.25l2.34-2.34A8 8 0 0 0 10 2c-3.01 0-5.73 1.34-7.4 3.67l2.77 2.12A4.8 4.8 0 0 1 10 6.58z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Terms section */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              By signing up, you agree to Rentoros{" "}
              <a
                href="#"
                className="text-[#593CFB] hover:text-[#452CC9] hover:underline transition-colors"
              >
                terms of service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-[#593CFB] hover:text-[#452CC9] hover:underline transition-colors"
              >
                privacy policy
              </a>
            </p>
          </div>
        </div>
      </div>

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </div>
  );
};

export default SignUpModal;

