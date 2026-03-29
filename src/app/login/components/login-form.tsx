"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import BGHome from "@/public/assets/images/bg-home.webp";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [form, setForm] = useState({
    email: "admin@kopikan.com",
    password: "admin",
  });
  const { login, isLoading, error } = useAuth();

  const handleEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email: form.email, password: form.password });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {error && (
        <div className="p-3 text-sm text-white bg-red-500 rounded-md text-center">
          {error}
        </div>
      )}
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Kopikan Staff account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleEvent}
                  placeholder="staff@kopikan.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  value={form.password}
                  placeholder="*****"
                  onChange={handleEvent}
                  type="password"
                  required
                />
              </div>
              {/* {error && (
                <p className="text-xs text-red-700 text-center h-5">{error}</p>
              )} */}
              <Button type="submit" className="w-full">
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block w-full">
            <Image
              src={BGHome}
              alt="Image"
              fill
              className="absolute inset-0 object-cover dark:brightness-[0.2] dark:grayscale"
              priority
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
