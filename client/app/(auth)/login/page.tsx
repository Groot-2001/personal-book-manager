"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import AuthCard from "@/components/auth/AuthCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { LoginDto } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();

  const {
    login,
    user,
    loading: authLoading,
  } = useAuth();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] =
    useState<LoginDto>({
      email: "",
      password: "",
    });

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [authLoading, user, router]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(formData);

      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ??
            "Login failed"
        );
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to manage your books."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          loading={loading}
        >
          Sign In
        </Button>

        <p className="text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-emerald-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}