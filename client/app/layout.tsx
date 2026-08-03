import type {Metadata} from "next";
import "./globals.css";

import {AuthProvider} from "@/context/AuthContext";
import {BookProvider} from "@/context/BookContext";
import ToastProvider from "@/components/providers/ToastProvider";

export const metadata: Metadata = {
  title: "Personal Book Manager",
  description: "Manage your personal book collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <BookProvider>{children}</BookProvider>
        </AuthProvider>

        <ToastProvider />
      </body>
    </html>
  );
}
