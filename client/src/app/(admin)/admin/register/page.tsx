"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  Check,
  Shield,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/app/lib/AuthContext";
import { API_ENDPOINTS } from "@/lib/api";

export default function AdminRegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminKey: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (formData.name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.adminKey.trim()) {
      setError("Admin secret key is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // 1. Register as admin in backend FIRST (creates user with role: admin)
      console.log("Calling backend API:", API_ENDPOINTS.auth.adminRegister);
      const response = await fetch(API_ENDPOINTS.auth.adminRegister, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          adminKey: formData.adminKey,
        }),
      });

      console.log("Backend response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error response:", errorText);
        setError(
          `Server error (${response.status}): ${errorText || "Unknown error"}`,
        );
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Backend response data:", data);

      if (!data.success) {
        setError(data.message || "Admin registration failed");
        setLoading(false);
        return;
      }

      // Store token and user data from backend response
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setSuccess(
        "Admin registration successful! Redirecting to admin dashboard...",
      );

      // 2. Try to register with Firebase (best effort - don't block on failure)
      try {
        await registerUser(formData.email.trim(), formData.password);
        // Firebase registration successful - onAuthStateChanged will sync role
      } catch (firebaseError: any) {
        // If email already exists in Firebase, try to sign in silently
        if (firebaseError.code === "auth/email-already-in-use") {
          console.log("Email already exists in Firebase, proceeding...");
        } else {
          console.warn(
            "Firebase registration failed (non-blocking):",
            firebaseError.message,
          );
        }
        // Non-blocking: backend registration succeeded, so we can proceed
      }

      // Redirect to admin dashboard after a short delay
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1500);
    } catch (error: any) {
      console.error("Admin registration error:", error);
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        setError(
          "Cannot connect to server. Please ensure the backend server is running on http://localhost:8080",
        );
      } else {
        setError(error.message || "Admin registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-red-100 flex items-center justify-center">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Admin Registration
              </CardTitle>
              <p className="text-muted-foreground">
                Create an administrator account
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Error and Success Messages */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                  <Check className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10"
                      required
                      autoComplete="name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="adminKey"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Admin Secret Key
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="adminKey"
                      name="adminKey"
                      type="password"
                      placeholder="Enter admin secret key"
                      value={formData.adminKey}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Contact the system administrator for the secret key
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : null}
                  Register as Admin
                </Button>
              </form>

              {/* Sign In Link */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="text-center border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  Looking for regular registration?{" "}
                  <Link
                    href="/register"
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Register as User
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
