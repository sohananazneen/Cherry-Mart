"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
  RefreshCw,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Check,
  Info,
  Package,
  Award,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock product data
const mockProduct = {
  id: "premium-product-1",
  title: "Premium Wireless Headphones with Active Noise Cancellation",
  description:
    "Experience crystal-clear audio with our premium wireless headphones featuring advanced active noise cancellation technology.",
  price: 299.99,
  originalPrice: 399.99,
  images: [
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
  ],
  rating: 4.8,
  reviews: 1247,
  category: "Electronics",
  brand: "AudioTech Pro",
  sku: "ATP-WH-001",
  inStock: true,
  badge: "Best Seller",
  features: [
    "Active Noise Cancellation",
    "40-hour battery life",
    "Premium leather cushions",
    "Bluetooth 5.0 connectivity",
    "Built-in microphone",
    "Foldable design",
  ],
  specifications: {
    "Driver Size": "40mm",
    "Frequency Response": "20Hz - 20kHz",
    Impedance: "32 Ohms",
    "Battery Life": "40 hours",
    "Charging Time": "2 hours",
    Weight: "250g",
    Connection: "Bluetooth 5.0, 3.5mm jack",
    Warranty: "2 years",
  },
  description_long: `Our Premium Wireless Headphones are designed for audiophiles who demand the best in sound quality and comfort. With advanced active noise cancellation technology, you can immerse yourself in your music without any distractions.

The headphones feature premium leather cushions that provide exceptional comfort even during extended listening sessions. The 40mm drivers deliver rich, detailed sound with deep bass and crystal-clear highs.

With up to 40 hours of battery life, you can enjoy your music all day long. The quick charge feature gives you 5 hours of playback with just 10 minutes of charging.`,
  shipping: {
    "Standard Shipping": "5-7 business days - Free",
    "Express Shipping": "2-3 business days - $15",
    "Overnight Shipping": "1 business day - $30",
  },
  warranty:
    "2 years manufacturer warranty covering defects in materials and workmanship.",
};

const relatedProducts = Array.from({ length: 4 }, (_, i) => ({
  id: `related-${i + 1}`,
  title: `Related Product ${i + 1}`,
  description: "Great companion product with excellent features",
  price: Math.floor(Math.random() * 300) + 100,
  originalPrice:
    Math.random() > 0.5 ? Math.floor(Math.random() * 400) + 150 : undefined,
  image: "/api/placeholder/300/300",
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviews: Math.floor(Math.random() * 500) + 50,
  category: "Electronics",
  isNew: Math.random() > 0.7,
  isOnSale: Math.random() > 0.5,
}));

const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    date: "2024-01-15",
    title: "Amazing sound quality!",
    content:
      "These headphones exceeded my expectations. The noise cancellation is incredible and the battery life is fantastic.",
    helpful: 23,
    verified: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    date: "2024-01-10",
    title: "Great value for money",
    content:
      "Excellent headphones overall. Comfortable for long sessions and the sound quality is top-notch.",
    helpful: 15,
    verified: true,
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 5,
    date: "2024-01-05",
    title: "Best purchase I've made",
    content:
      "I use these daily for work calls and music. The microphone quality is excellent and people can hear me clearly.",
    helpful: 18,
    verified: true,
  },
];

export default function ProductPage() {
  const params = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState("description");

  const product = mockProduct;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length,
    );
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/explore" className="hover:text-foreground">
              Explore
            </Link>
            <span>/</span>
            <Link
              href={`/category/${product.category.toLowerCase()}`}
              className="hover:text-foreground"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <div className="text-center">
                    <Package className="w-24 h-24 text-primary/20 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Product Image {currentImage + 1}
                    </p>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border flex items-center justify-center hover:bg-background transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border flex items-center justify-center hover:bg-background transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="secondary"
                      className="bg-green-500 text-white"
                    >
                      {product.badge}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`relative aspect-square w-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImage === index
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">
                        {index + 1}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{product.category}</Badge>
                  <Badge variant="outline">{product.brand}</Badge>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {product.title}
                </h1>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-foreground">
                    {product.rating}
                  </span>
                  <span className="text-muted-foreground">
                    ({product.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <Badge variant="destructive">-{discountPercentage}%</Badge>
                  </>
                )}
              </div>

              {/* Features */}
              <div className="space-y-2">
                {product.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-foreground">
                    Quantity:
                  </span>
                  <div className="flex items-center border rounded-xl">
                    <button
                      onClick={decrementQuantity}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors rounded-l-xl"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="w-12 h-10 flex items-center justify-center border-x">
                      {quantity}
                    </div>
                    <button
                      onClick={incrementQuantity}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors rounded-r-xl"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="flex-1"
                    disabled={!product.inStock}
                  >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground">
                    2 Year Warranty
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground">
                    30-Day Returns
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mb-16">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {product.description_long}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between py-2 border-b"
                          >
                            <span className="font-medium text-foreground">
                              {key}
                            </span>
                            <span className="text-muted-foreground">
                              {value}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b pb-6 last:border-b-0"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-foreground">
                                  {review.name}
                                </h4>
                                {review.verified && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Verified Purchase
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? "fill-primary text-primary"
                                          : "text-muted-foreground"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <h5 className="font-medium text-foreground mb-2">
                            {review.title}
                          </h5>
                          <p className="text-muted-foreground mb-2">
                            {review.content}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <button className="hover:text-foreground">
                              Helpful ({review.helpful})
                            </button>
                            <button className="hover:text-foreground">
                              Report
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shipping" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping & Returns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">
                          Shipping Options
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(product.shipping).map(
                            ([method, details]) => (
                              <div
                                key={method}
                                className="flex justify-between py-2 border-b"
                              >
                                <span className="font-medium text-foreground">
                                  {method}
                                </span>
                                <span className="text-muted-foreground">
                                  {details}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3">
                          Warranty
                        </h4>
                        <p className="text-muted-foreground">
                          {product.warranty}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3">
                          Return Policy
                        </h4>
                        <p className="text-muted-foreground">
                          We offer a 30-day return policy for all unused items
                          in original packaging. Please contact our customer
                          service team to initiate a return.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
