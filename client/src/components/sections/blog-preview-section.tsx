import React from "react"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Tech Gadgets You Need in 2024",
    excerpt: "Discover the latest and most innovative tech gadgets that are changing the way we live and work.",
    image: "/api/placeholder/400/250",
    category: "Technology",
    author: "Tech Team",
    date: "2024-01-15",
    readTime: "5 min read",
    featured: true
  },
  {
    id: 2,
    title: "Sustainable Shopping: How to Make Eco-Friendly Choices",
    excerpt: "Learn how to make environmentally conscious shopping decisions without compromising on quality.",
    image: "/api/placeholder/400/250",
    category: "Lifestyle",
    author: "Green Living",
    date: "2024-01-12",
    readTime: "3 min read",
    featured: false
  },
  {
    id: 3,
    title: "The Ultimate Guide to Home Organization",
    excerpt: "Transform your living space with these practical organization tips and storage solutions.",
    image: "/api/placeholder/400/250",
    category: "Home & Living",
    author: "Home Experts",
    date: "2024-01-10",
    readTime: "7 min read",
    featured: false
  }
]

export function BlogPreviewSection() {
  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and insights from our expert team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Post */}
          {featuredPost && (
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
                <Link href={`/blog/${featuredPost.id}`}>
                  <div className="aspect-video lg:aspect-[2/1] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl">📝</span>
                      </div>
                      <p className="text-muted-foreground">Featured Article</p>
                    </div>
                  </div>
                </Link>
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary">{featuredPost.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <Link href={`/blog/${featuredPost.id}`}>
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h3>
                  </Link>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center mr-3">
                        <span className="text-xs font-bold text-primary">
                          {featuredPost.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{featuredPost.author}</span>
                    </div>
                    
                    <Link href={`/blog/${featuredPost.id}`}>
                      <button className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                        Read More
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Regular Posts */}
          <div className="space-y-6">
            {regularPosts.map((post) => (
              <Card key={post.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
                <Link href={`/blog/${post.id}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex-shrink-0 flex items-center justify-center">
                        <span className="text-xl">📄</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">{post.category}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{post.readTime}</span>
                          <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/blog">
            <button className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
              View All Blog Posts
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
