"use client"

import React, { useState } from "react"
import Link from "next/link"
import { 
  Calendar, 
  Clock, 
  User, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  MessageCircle,
  Share2,
  ArrowRight,
  Tag
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "Top 10 Tech Gadgets You Need in 2024",
    excerpt: "Discover the latest and most innovative tech gadgets that are changing the way we live and work. From smart home devices to cutting-edge wearables.",
    image: "/api/placeholder/400/250",
    category: "Technology",
    author: "Tech Team",
    authorAvatar: "TT",
    date: "2024-01-15",
    readTime: "5 min read",
    featured: true,
    tags: ["gadgets", "technology", "2024"],
    likes: 234,
    comments: 45,
    views: 1523
  },
  {
    id: 2,
    title: "Sustainable Shopping: How to Make Eco-Friendly Choices",
    excerpt: "Learn how to make environmentally conscious shopping decisions without compromising on quality. Discover brands that prioritize sustainability.",
    image: "/api/placeholder/400/250",
    category: "Lifestyle",
    author: "Green Living",
    authorAvatar: "GL",
    date: "2024-01-12",
    readTime: "3 min read",
    featured: false,
    tags: ["sustainability", "eco-friendly", "shopping"],
    likes: 189,
    comments: 32,
    views: 892
  },
  {
    id: 3,
    title: "The Ultimate Guide to Home Organization",
    excerpt: "Transform your living space with these practical organization tips and storage solutions. Get ready for a clutter-free home.",
    image: "/api/placeholder/400/250",
    category: "Home & Living",
    author: "Home Experts",
    authorAvatar: "HE",
    date: "2024-01-10",
    readTime: "7 min read",
    featured: false,
    tags: ["organization", "home", "storage"],
    likes: 156,
    comments: 28,
    views: 743
  },
  {
    id: 4,
    title: "Fashion Trends 2024: What's Hot This Season",
    excerpt: "Stay ahead of the fashion curve with our comprehensive guide to the hottest trends for 2024. From colors to styles, we've got you covered.",
    image: "/api/placeholder/400/250",
    category: "Fashion",
    author: "Style Guide",
    authorAvatar: "SG",
    date: "2024-01-08",
    readTime: "6 min read",
    featured: false,
    tags: ["fashion", "trends", "2024"],
    likes: 298,
    comments: 67,
    views: 1834
  },
  {
    id: 5,
    title: "Healthy Eating on a Budget: Smart Tips",
    excerpt: "Discover how to maintain a healthy diet without breaking the bank. Learn about affordable nutritious foods and meal planning strategies.",
    image: "/api/placeholder/400/250",
    category: "Health",
    author: "Wellness Team",
    authorAvatar: "WT",
    date: "2024-01-05",
    readTime: "4 min read",
    featured: false,
    tags: ["health", "budget", "nutrition"],
    likes: 145,
    comments: 23,
    views: 612
  },
  {
    id: 6,
    title: "Smart Home Automation: Getting Started",
    excerpt: "Ready to make your home smarter? Learn the basics of home automation and discover the best devices to start with.",
    image: "/api/placeholder/400/250",
    category: "Technology",
    author: "Tech Team",
    authorAvatar: "TT",
    date: "2024-01-03",
    readTime: "8 min read",
    featured: false,
    tags: ["smart-home", "automation", "technology"],
    likes: 267,
    comments: 41,
    views: 1234
  }
]

const categories = [
  "All Categories",
  "Technology",
  "Fashion",
  "Home & Living",
  "Health",
  "Lifestyle",
  "Business"
]

const popularTags = [
  "technology",
  "sustainability",
  "fashion",
  "home",
  "health",
  "2024",
  "shopping",
  "lifestyle"
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)

  const postsPerPage = 6
  const totalPages = Math.ceil(blogPosts.length / postsPerPage)

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === "All Categories" || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "popular":
        return b.views - a.views
      case "comments":
        return b.comments - a.comments
      default:
        return 0
    }
  })

  const getCurrentPagePosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    return sortedPosts.slice(startIndex, endIndex)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Our Blog
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Stay updated with the latest trends, tips, and insights from our expert team. 
                Discover articles about technology, fashion, home living, and more.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search articles, topics, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Tags */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Popular:</span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Filters */}
              <div className="bg-card border rounded-xl p-4 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
                  
                  <div className="flex-1">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="comments">Most Comments</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Blog Posts Grid */}
              {getCurrentPagePosts().length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-muted flex items-center justify-center">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No articles found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters
                  </p>
                  <Button onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All Categories")
                  }}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {getCurrentPagePosts().map((post) => (
                    <Card key={post.id} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group">
                      <Link href={`/blog/${post.id}`}>
                        <div className="aspect-video overflow-hidden rounded-t-xl">
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center">
                                <span className="text-2xl">📝</span>
                              </div>
                              <p className="text-sm text-muted-foreground">Article Image</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary">{post.category}</Badge>
                          {post.featured && (
                            <Badge variant="default">Featured</Badge>
                          )}
                        </div>
                        
                        <Link href={`/blog/${post.id}`}>
                          <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => handleTagClick(tag)}
                              className="text-xs px-2 py-1 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              #{tag}
                            </button>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <span className="text-xs font-bold text-primary-foreground">
                                  {post.authorAvatar}
                                </span>
                              </div>
                              <span className="text-sm text-muted-foreground">{post.author}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(post.date).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      )
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:w-80">
              {/* Newsletter */}
              <Card className="border-0 shadow-sm mb-8">
                <CardHeader>
                  <CardTitle className="text-lg">Subscribe to Newsletter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Get the latest articles delivered straight to your inbox.
                  </p>
                  <div className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full"
                    />
                    <Button className="w-full">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="border-0 shadow-sm mb-8">
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.slice(1).map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-xl transition-colors ${
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map((post) => (
                      <Link key={post.id} href={`/blog/${post.id}`}>
                        <div className="group">
                          <h4 className="font-medium text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
