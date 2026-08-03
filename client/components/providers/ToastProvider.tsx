"use client";

import { Toaster } from "sonner";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={3000}
      toastOptions={{
        className: "font-medium",
      }}
    />
  );
}