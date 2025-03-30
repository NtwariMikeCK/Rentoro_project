import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/app/ReactQueryProvider";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Rentoro App",
  description: "Rentoro App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          {children}
          <ToastContainer
            limit={3}
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            pauseOnFocusLoss={false}
          />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
