"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Product data with real images
const mockProducts = [
  {
    id: "1",
    title: "Premium Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 299.99,
    originalPrice: 399.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
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
    description:
      "Comfortable and sustainable organic cotton t-shirt available in multiple colors.",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 892,
    category: "Fashion",
    isNew: true,
    isOnSale: false,
  },
  {
    id: "3",
    title: "Smart Home Speaker",
    description:
      "Voice-controlled smart speaker with premium sound quality and smart home integration.",
    price: 129.99,
    originalPrice: 159.99,
    image:
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 634,
    category: "Electronics",
    badge: "Hot Deal",
    isNew: false,
    isOnSale: true,
  },
  {
    id: "4",
    title: "Yoga Mat Premium",
    description:
      "Eco-friendly non-slip yoga mat with carrying strap and alignment lines.",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 445,
    category: "Sports",
    isNew: true,
    isOnSale: false,
  },
  {
    id: "5",
    title: "Stainless Steel Water Bottle",
    description:
      "Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 34.99,
    originalPrice: 44.99,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 2156,
    category: "Home",
    badge: "Best Seller",
    isNew: false,
    isOnSale: true,
  },
  {
    id: "6",
    title: "Leather Crossbody Bag",
    description:
      "Genuine leather crossbody bag with multiple compartments and adjustable strap.",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 328,
    category: "Fashion",
    isNew: true,
    isOnSale: false,
  },
  {
    id: "7",
    title: "Running Shoes",
    description:
      "Lightweight running shoes with cushioned sole and breathable mesh upper.",
    price: 119.99,
    originalPrice: 149.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 1567,
    category: "Sports",
    badge: "Popular",
    isNew: false,
    isOnSale: true,
  },
  {
    id: "8",
    title: "Ceramic Coffee Mug Set",
    description: "Set of 4 handcrafted ceramic coffee mugs in assorted colors.",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 423,
    category: "Home",
    isNew: true,
    isOnSale: false,
  },
  {
    id: "9",
    title: "4K Webcam",
    description:
      "Ultra HD 4K webcam with auto-focus and noise-canceling microphone.",
    price: 149.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 789,
    category: "Electronics",
    badge: "Sale",
    isNew: false,
    isOnSale: true,
  },
  {
    id: "10",
    title: "Denim Jacket",
    description: "Classic denim jacket with vintage wash and comfortable fit.",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 234,
    category: "Fashion",
    isNew: true,
    isOnSale: false,
  },
  {
    id: "11",
    title: "Resistance Bands Set",
    description:
      "Set of 5 resistance bands with different strength levels and handles.",
    price: 24.99,
    originalPrice: 34.99,
    image:
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 1123,
    category: "Sports",
    badge: "Best Value",
    isNew: false,
    isOnSale: true,
  },
  {
    id: "12",
    title: "Scented Candle Set",
    description: "Set of 3 soy candles with natural essential oil fragrances.",
    price: 44.99,
    image:
      "https://images.unsplash.com/photo-1602607688650-96c3c5c9b81f?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 567,
    category: "Home",
    isNew: true,
    isOnSale: false,
  },
  {
    id: "13",
    title: "Bluetooth Earbuds",
    description: "True wireless earbuds with charging case and touch controls.",
    price: 89.99,
    originalPrice: 119.99,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 987,
    category: "Electronics",
    isNew: false,
    isOnSale: true,
  },
  {
    id: "14",
    title: "Canvas Sneakers",
    description: "Classic canvas sneakers in white with rubber sole.",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 1456,
    category: "Fashion",
    isNew: true,
    isOnSale: false,
  },
  {
    id: "15",
    title: "Foam Roller",
    description: "High-density foam roller for muscle recovery and massage.",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 678,
    category: "Sports",
    isNew: false,
    isOnSale: false,
  },
  {
    id: "16",
    title: "Throw Pillow Covers",
    description:
      "Set of 4 decorative throw pillow covers with modern patterns.",
    price: 32.99,
    originalPrice: 42.99,
    image:
      "https://images.unsplash.com/photo-1629949009765-40fc74c9ec21?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 345,
    category: "Home",
    isNew: false,
    isOnSale: true,
  },
];

const categories = [
  "All Categories",
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Books",
  "Sports & Outdoors",
  "Toys & Games",
  "Health & Beauty",
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
  { value: "reviews", label: "Most Reviews" },
];

export default function ExplorePage() {
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedRating, setSelectedRating] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const productsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const filterAndSortProducts = useCallback(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply category filter
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Apply price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max,
    );

    // Apply rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter((product) => product.rating >= selectedRating);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case "reviews":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCategory,
    sortBy,
    priceRange,
    selectedRating,
    products,
  ]);

  useEffect(() => {
    filterAndSortProducts();
  }, [filterAndSortProducts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSortBy("featured");
    setPriceRange({ min: 0, max: 1000 });
    setSelectedRating(0);
  };

  const activeFiltersCount = [
    searchQuery,
    selectedCategory !== "All Categories" ? selectedCategory : "",
    selectedRating > 0 ? `Rating ${selectedRating}+` : "",
    priceRange.min > 0 || priceRange.max < 1000 ? "Price" : "",
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-muted/30 border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Explore Products
                </h1>
                <p className="text-muted-foreground">
                  Discover our amazing collection of {filteredProducts.length}{" "}
                  products
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside
              className={`${showFilters ? "block" : "hidden"} lg:block lg:w-64 space-y-6`}
            >
              <div className="bg-card border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground"
                  >
                    Clear all
                  </Button>
                </div>

                {/* Search */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Category
                    </label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Price Range
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={priceRange.min}
                          onChange={(e) =>
                            setPriceRange((prev) => ({
                              ...prev,
                              min: Number(e.target.value),
                            }))
                          }
                        />
                        <span className="text-muted-foreground">-</span>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={priceRange.max}
                          onChange={(e) =>
                            setPriceRange((prev) => ({
                              ...prev,
                              max: Number(e.target.value),
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Minimum Rating
                    </label>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <Button
                          key={rating}
                          variant={
                            selectedRating === rating ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedRating(rating)}
                          className="flex-1"
                        >
                          {rating === 0 ? "All" : `${rating}+`}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Sort and Filter Controls */}
              <div className="bg-card border rounded-xl p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden"
                    >
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>

                    {activeFiltersCount > 0 && (
                      <Badge
                        variant="secondary"
                        className="hidden lg:inline-flex"
                      >
                        {activeFiltersCount} filter
                        {activeFiltersCount > 1 ? "s" : ""} active
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground hidden sm:inline">
                      Sort by:
                    </span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Products Grid/List */}
              {loading ? (
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "grid-cols-1"
                  }`}
                >
                  {Array.from({ length: productsPerPage }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <>
                  {getCurrentPageProducts().length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-muted flex items-center justify-center">
                        <Search className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        No products found
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your filters or search terms
                      </p>
                      <Button onClick={clearFilters}>Clear Filters</Button>
                    </div>
                  ) : (
                    <div
                      className={`grid gap-6 ${
                        viewMode === "grid"
                          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                          : "grid-cols-1"
                      }`}
                    >
                      {getCurrentPageProducts().map((product) => (
                        <ProductCard key={product.id} {...product} />
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
