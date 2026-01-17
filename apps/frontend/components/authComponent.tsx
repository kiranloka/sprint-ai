"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "./ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

interface AuthComponentProps {
  isLogin: boolean;
  className?: string; // Add className prop
}

export default function AuthComponent({
  isLogin,
  className,
}: AuthComponentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div
      className={cn(
        "h-screen w-screen flex items-center justify-center",
        className
      )}
    >
      <Card>
        <CardHeader>
          <CardTitle>{isLogin ? "Sign in" : "Sign up"}</CardTitle>
          <CardDescription>
            {isLogin ? "Sign in to your account" : "Sign up to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Name"
                      {...register("name", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      {...register("email", { required: true })}
                    />
                  </div>
                </>
              )}
              {isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Username"
                    {...register("username", { required: true })}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </div>
              <Button type="submit" className="w-full">
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
              {/* Add a submit button or rely on parent handling? The original code had no button, just inputs. I will add a button for completeness or keep it minimal if user wants just the form structure. 
                Wait, original code was just inputs inside a form. I'll stick to the structure but ensure inputs are correct. 
                User asked "change this according to our backend endpoints". 
                I will add a Submit button to make it functional. */}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
