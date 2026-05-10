"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Plus,
  X,
  DollarSign,
  Package,
  MapPin,
  Star,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const categories = [
  "Electronics",
  "Fashion",
  "Home",
  "Sports",
  "Books",
  "Health & Beauty",
  "Toys",
  "Automotive",
];

const locations = [
  "New York, USA",
  "Los Angeles, USA",
  "Chicago, USA",
  "Houston, USA",
  "Phoenix, USA",
  "Philadelphia, USA",
  "San Antonio, USA",
  "San Diego, USA",
  "Dallas, USA",
  "San Jose, USA",
];

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    price: "",
    originalPrice: "",
    category: "",
    location: "",
    stock: "",
    rating: "4.5",
    reviews: "0",
    badge: "",
    image: "",
    isNew: false,
    isOnSale: false,
    featured: false,
    status: "active",
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push("/admin/products");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/admin/products">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Add New Product</h1>
              <p className="text-muted-foreground">Create a new product for your store</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">
                        Product Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        placeholder="Enter product title"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shortDescription">
                        Short Description <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="shortDescription"
                        placeholder="Brief description (shown in product cards)"
                        value={formData.shortDescription}
                        onChange={(e) => handleChange("shortDescription", e.target.value)}
                        required
                      />
                      <p className="text-sm text-muted-foreground">
                        This appears on product cards and listings
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Full Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Detailed product description"
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        rows={5}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Pricing */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Pricing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">
                          Current Price <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            value={formData.price}
                            onChange={(e) => handleChange("price", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="originalPrice">Original Price (Optional)</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="originalPrice"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            value={formData.originalPrice}
                            onChange={(e) => handleChange("originalPrice", e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          For showing discount/sale price
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Media */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Product Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="image">
                        Image URL <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="image"
                        placeholder="https://example.com/image.jpg"
                        value={formData.image}
                        onChange={(e) => handleChange("image", e.target.value)}
                        required
                      />
                      <p className="text-sm text-muted-foreground">
                        Enter a valid image URL from Unsplash or your CDN
                      </p>
                    </div>

                    {formData.image && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Preview:</p>
                        <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={formData.image}
                            alt="Product preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/400x400?text=Invalid+Image";
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Meta Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Meta Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">
                          Category <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleChange("category", value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">
                          Location <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.location}
                          onValueChange={(value) => handleChange("location", value)}
                          required
                        >
                          <SelectTrigger>
                            <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((loc) => (
                              <SelectItem key={loc} value={loc}>
                                {loc}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stock">
                          Stock Quantity <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="stock"
                            type="number"
                            min="0"
                            placeholder="0"
                            value={formData.stock}
                            onChange={(e) => handleChange("stock", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="badge">Badge (Optional)</Label>
                        <Input
                          id="badge"
                          placeholder="e.g., Best Seller, New, Hot Deal"
                          value={formData.badge}
                          onChange={(e) => handleChange("badge", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Status & Visibility */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Status & Visibility</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="status">Product Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => handleChange("status", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="featured">Featured Product</Label>
                        <p className="text-sm text-muted-foreground">
                          Show on homepage
                        </p>
                      </div>
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => handleChange("featured", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="isNew">Mark as New</Label>
                        <p className="text-sm text-muted-foreground">
                          Display "New" badge
                        </p>
                      </div>
                      <Switch
                        id="isNew"
                        checked={formData.isNew}
                        onCheckedChange={(checked) => handleChange("isNew", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="isOnSale">On Sale</Label>
                        <p className="text-sm text-muted-foreground">
                          Display sale badge
                        </p>
                      </div>
                      <Switch
                        id="isOnSale"
                        checked={formData.isOnSale}
                        onCheckedChange={(checked) => handleChange("isOnSale", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Rating (Optional) */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Rating Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="rating">Rating</Label>
                      <div className="relative">
                        <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="rating"
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          placeholder="4.5"
                          value={formData.rating}
                          onChange={(e) => handleChange("rating", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reviews">Review Count</Label>
                      <Input
                        id="reviews"
                        type="number"
                        min="0"
                        placeholder="0"
                        value={formData.reviews}
                        onChange={(e) => handleChange("reviews", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Product
                      </>
                    )}
                  </Button>

                  <Link href="/admin/products" className="w-full">
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
