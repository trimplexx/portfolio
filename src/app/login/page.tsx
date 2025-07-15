"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/projekty";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        password,
        callbackUrl,
      });

      if (res?.error) {
        setError("Nieprawidłowe hasło.");
      } else if (res?.url) {
        router.push(res.url);
      }
    } catch {
      setError("Wystąpił błąd podczas logowania.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-muted/50 border border-border shadow-md rounded-lg px-8 pt-6 pb-8"
        >
          <h1 className="text-center text-2xl font-bold mb-6">Panel Admina</h1>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Hasło</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Logowanie..." : "Zaloguj się"}
            </Button>
          </div>
          {error && (
            <p className="text-destructive text-xs italic mt-4 text-center">
              {error}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
