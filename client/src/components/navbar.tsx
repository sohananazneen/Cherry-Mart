"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/app/lib/AuthContext";

export function Navbar() {
  const router = useRouter();
  const { user, userRole, logout } = useAuth();
  const isAuthenticated = !!user;
  const isAdmin = userRole === "admin";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Use state for client detection to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Set mounted after hydration completes
  React.useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loggedOutRoutes = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const loggedInRoutes = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/blog", label: "Blog" },
  ];

  const adminRoutes = [
    { href: "/admin/dashboard", label: "Admin Dashboard" },
    { href: "/admin/users", label: "Manage Users" },
    { href: "/admin/products", label: "Manage Products" },
    { href: "/admin/reports", label: "Reports" },
  ];

  const categories = [
    { href: "/products/electronics", label: "Electronics" },
    { href: "/products/fashion", label: "Fashion" },
    { href: "/products/home", label: "Home & Living" },
    { href: "/products/beauty", label: "Beauty" },
    { href: "/products/sports", label: "Sports" },
  ];

  const currentRoutes = isAuthenticated ? loggedInRoutes : loggedOutRoutes;

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
              <span className="text-sm font-bold text-primary-foreground">
                LC
              </span>
            </div>
            <span className="text-xl font-bold text-foreground">
              Cherry Mart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {currentRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {route.label}
              </Link>
            ))}

            {mounted && isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    Profile <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {mounted && !isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    Categories <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.href} asChild>
                      <Link href={category.href}>{category.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {mounted && isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    Admin
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {adminRoutes.map((route) => (
                    <DropdownMenuItem key={route.href} asChild>
                      <Link href={route.href}>{route.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />

            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-3">
              {currentRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {route.label}
                </Link>
              ))}

              <div className="border-t pt-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Categories
                </p>
                {categories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 pl-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.label}
                  </Link>
                ))}
              </div>

              {isAuthenticated && userRole === "admin" && (
                <>
                  <div className="border-t pt-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Admin
                    </p>
                    {adminRoutes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 pl-4"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {route.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
