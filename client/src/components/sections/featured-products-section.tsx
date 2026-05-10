"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Featured products data
const featuredProducts = [
  {
    id: "1",
    title: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 1247,
    category: "Electronics",
    badge: "Best Seller",
    isNew: false,
    isOnSale: true,
  },
  {
    id: "2",
    title: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 892,
    category: "Fashion",
    isNew: true,
    isOnSale: false,
  },
  {
    id: "4",
    title: "Yoga Mat Premium",
    description: "Eco-friendly non-slip yoga mat with carrying strap and alignment lines.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 445,
    category: "Sports",
    isNew: true,
    isOnSale: false,
  },
  {
    id: "5",
    title: "Stainless Steel Water Bottle",
    description: "Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 34.99,
    originalPrice: 44.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 2156,
    category: "Home",
    badge: "Best Seller",
    isNew: false,
    isOnSale: true,
  },
];

export function FeaturedProductsSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Sparkles className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover our handpicked selection of premium products loved by thousands of customers
            </p>
          </div>

          <Link href="/explore">
            <Button variant="outline" className="group">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Explore our full collection of {featuredProducts.length}+ products
          </p>
          <Link href="/explore">
            <Button size="lg" className="group">
              Explore All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
