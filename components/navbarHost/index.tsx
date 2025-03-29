import React, { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

// Define a type for the modal state
type ModalState = {
  isOpen: boolean;
  mode: 'signin' | 'signup' | null;
};

// Define a type for the mode parameter
type AuthMode = 'signin' | 'signup';

// Define props for the Navbar component
type NavbarProps = {
  isDarkBackground?: boolean; // Optional prop to determine text color
  isHostPage?: boolean; // New prop to identify if this is the host page
};

const NavbarHost: React.FC<NavbarProps> = ({ isDarkBackground = false, isHostPage = false }) => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: null
  });

  // Open modal with specific mode
  const openModal = (mode: AuthMode) => {
    setModalState({
      isOpen: true,
      mode: mode
    });
  };

  // Close modal
  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: null
    });
  };

  // Toggle between signin and signup modes without closing the modal
  const toggleMode = () => {
    setModalState({
      ...modalState,
      mode: modalState.mode === 'signin' ? 'signup' : 'signin'
    });
  };

  // Determine text color based on background
  const logoTextColor = isDarkBackground ? "text-white" : "text-[#593CFB]";

  return (
    <>
      {/* Navigation bar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 bg-white">
        <div className="flex items-center">
          <Link href="/">
            <h1 className={`text-4xl font-black ${logoTextColor}`}>Rentoro</h1>
          </Link>
        </div>
        <div className="flex items-center space-x-8">
          {!isHostPage && (
            <a
              href="/host"
              className="text-white bg-[#593CFB] hover:bg-[#452CC9] px-4 py-2 rounded-md font-medium"
            >
              Become a host
            </a>
          )}
          {isHostPage && (
            <Link href="/list-your-car">
              <button className="text-white bg-[#593CFB] hover:bg-[#452CC9] px-4 py-2 rounded-md font-medium">
                List Your Car
              </button>
            </Link>
          )}
          <button
            onClick={() => openModal('signup')}
            className="bg-[#593CFB] text-white px-4 py-2 rounded-md font-medium hover:bg-[#452CC9]"
          >
            Sign up
          </button>
          <button 
            onClick={() => openModal('signin')}
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md font-medium hover:bg-[#452CC9] hover:text-white"
          >
            Log in
          </button>
        </div>
      </nav>

      {/* Combined Authentication Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[440px] relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Modal content */}
            <div className="p-8">
              {modalState.mode === 'signin' ? (
                <>
                  {/* Sign In Content */}
                  <h2 className="text-[32px] font-bold text-center text-gray-900 mb-2">
                    Login
                  </h2>
                  <p className="text-center text-gray-600 mb-8">Welcome back</p>
                </>
              ) : (
                <>
                  {/* Sign Up Content */}
                  <h2 className="text-[32px] font-bold text-center text-gray-900 mb-2">
                    Signup
                  </h2>
                  <p className="text-center text-gray-600 mb-8">
                    Welcome to Rentoro
                  </p>
                </>
              )}

              {/* Auth options */}
              <div className="space-y-3">
                <button className="flex items-center justify-center w-full bg-black text-white rounded-lg py-3.5 px-4 hover:bg-gray-800 transition-colors font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2C5.582 2 2 5.582 2 10s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 15.5c-4.136 0-7.5-3.364-7.5-7.5S5.864 2.5 10 2.5s7.5 3.364 7.5 7.5-3.364 7.5-7.5 7.5z" />
                    <path d="M13.5 10c0 1.933-1.567 3.5-3.5 3.5S6.5 11.933 6.5 10 8.067 6.5 10 6.5s3.5 1.567 3.5 3.5z" />
                  </svg>
                  Continue with Apple
                </button>

                <button className="flex items-center justify-center w-full border-2 border-gray-200 bg-white text-gray-700 rounded-lg py-3.5 px-4 hover:border-gray-300 transition-colors font-medium">
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

                <button className="flex items-center justify-center w-full border-2 border-gray-200 bg-white text-gray-700 rounded-lg py-3.5 px-4 hover:border-gray-300 transition-colors font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Continue with email
                </button>
              </div>

              {/* Toggle section */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                {modalState.mode === 'signin' ? (
                  <>
                    <p className="text-gray-600 mb-2">Don't have an account?</p>
                    <button
                      onClick={toggleMode}
                      className="font-semibold text-[#593CFB] hover:text-[#452CC9] transition-colors"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600 mb-2">Already have an account?</p>
                    <button
                      onClick={toggleMode}
                      className="font-semibold text-[#593CFB] hover:text-[#452CC9] transition-colors"
                    >
                      Log in
                    </button>
                  </>
                )}
              </div>

              {/* Terms section */}
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  By signing up, you agree to Rentoro's{" "}
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
        </div>
      )}
    </>
  );
};

export default NavbarHost;