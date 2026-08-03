import { ReactNode } from "react";
import Card from "@/components/ui/Card";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  children,
}: AuthCardProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <Card>
        <h1 className="mb-2 text-3xl font-bold">
          {title}
        </h1>

        <p className="mb-6 text-slate-500">
          {subtitle}
        </p>

        {children}
      </Card>
    </main>
  );
}