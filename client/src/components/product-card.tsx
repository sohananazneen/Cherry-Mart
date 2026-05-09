import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Heart, ShoppingCart, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  badge?: string
  isNew?: boolean
  isOnSale?: boolean
}

export function ProductCard({
  id,
  title,
  description,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  category,
  badge,
  isNew,
  isOnSale
}: ProductCardProps) {
  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <Card className="group border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden bg-card">
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <div className="text-center">
              <ShoppingCart className="w-16 h-16 text-primary/20 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Product Image</p>
            </div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <Badge variant="secondary" className="bg-green-500 text-white">
                New
              </Badge>
            )}
            {isOnSale && (
              <Badge variant="destructive">
                -{discountPercentage}%
              </Badge>
            )}
            {badge && (
              <Badge variant="outline">
                {badge}
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="secondary"
              size="icon"
              className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Add Button */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <div className="mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {category}
            </span>
          </div>

          {/* Title */}
          <Link href={`/product/${id}`}>
            <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {rating} ({reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Skeleton Loader Component
export function ProductCardSkeleton() {
  return (
    <Card className="border-0 shadow-sm overflow-hidden bg-card">
      <CardContent className="p-0">
        {/* Image Skeleton */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted-foreground/10 to-muted animate-pulse" />
        </div>

        {/* Content Skeleton */}
        <div className="p-4 space-y-3">
          {/* Category Skeleton */}
          <div className="h-3 w-16 bg-muted rounded animate-pulse" />

          {/* Title Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
          </div>

          {/* Description Skeleton */}
          <div className="space-y-1">
            <div className="h-3 bg-muted rounded animate-pulse" />
            <div className="h-3 w-5/6 bg-muted rounded animate-pulse" />
          </div>

          {/* Rating Skeleton */}
          <div className="flex items-center gap-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-muted rounded animate-pulse" />
              ))}
            </div>
            <div className="h-3 w-16 bg-muted rounded animate-pulse" />
          </div>

          {/* Price Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-20 bg-muted rounded animate-pulse" />
            <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
