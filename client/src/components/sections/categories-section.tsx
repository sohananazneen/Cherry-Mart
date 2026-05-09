import React from "react";
import Link from "next/link";
import {
  Smartphone,
  Laptop,
  Home,
  Shirt,
  Book,
  Gamepad2,
  Heart,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    name: "Electronics",
    icon: Smartphone,
    count: 1234,
    color: "bg-blue-500",
    href: "/category/electronics",
  },
  {
    name: "Computers",
    icon: Laptop,
    count: 856,
    color: "bg-purple-500",
    href: "/category/computers",
  },
  {
    name: "Home & Garden",
    icon: Home,
    count: 2341,
    color: "bg-green-500",
    href: "/category/home-garden",
  },
  {
    name: "Fashion",
    icon: Shirt,
    count: 3456,
    color: "bg-pink-500",
    href: "/category/fashion",
  },
  {
    name: "Books",
    icon: Book,
    count: 1876,
    color: "bg-yellow-500",
    href: "/category/books",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    count: 654,
    color: "bg-red-500",
    href: "/category/gaming",
  },
  {
    name: "Health",
    icon: Heart,
    count: 987,
    color: "bg-emerald-500",
    href: "/category/health",
  },
  {
    name: "More",
    icon: MoreHorizontal,
    count: 456,
    color: "bg-gray-500",
    href: "/categories",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through our wide range of categories and find exactly what
            you&apos;re looking for
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={index} href={category.href}>
              <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-xl ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count.toLocaleString()} items
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/categories">
            <button className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
              View All Categories
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
