"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Home, 
  Package, 
  User, 
  Settings, 
  ShoppingCart, 
  Heart, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  DollarSign,
  Users,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

// Mock data for charts
const monthlyData = [
  { month: "Jan", orders: 4, spending: 120 },
  { month: "Feb", orders: 3, spending: 89 },
  { month: "Mar", orders: 7, spending: 234 },
  { month: "Apr", orders: 5, spending: 167 },
  { month: "May", orders: 9, spending: 312 },
  { month: "Jun", orders: 6, spending: 198 },
]

const categoryData = [
  { name: "Electronics", value: 45, color: "#dc2626" },
  { name: "Fashion", value: 30, color: "#fbbf24" },
  { name: "Home", value: 15, color: "#10b981" },
  { name: "Books", value: 10, color: "#3b82f6" },
]

const recentOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    items: 3,
    total: 129.99,
    status: "Delivered",
    statusColor: "bg-green-100 text-green-800"
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    items: 2,
    total: 89.99,
    status: "Shipped",
    statusColor: "bg-blue-100 text-blue-800"
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    items: 1,
    total: 199.99,
    status: "Processing",
    statusColor: "bg-yellow-100 text-yellow-800"
  },
]

const wishlistItems = [
  {
    id: "WISH-001",
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "/api/placeholder/100/100",
    discount: 20
  },
  {
    id: "WISH-002",
    name: "Smart Watch Pro",
    price: 199.99,
    image: "/api/placeholder/100/100",
    discount: 0
  },
  {
    id: "WISH-003",
    name: "Laptop Stand",
    price: 49.99,
    image: "/api/placeholder/100/100",
    discount: 15
  },
]

const sidebarItems = [
  { href: "/dashboard", icon: Home, label: "Overview", active: true },
  { href: "/dashboard/orders", icon: Package, label: "My Orders", active: false },
  { href: "/dashboard/wishlist", icon: Heart, label: "Wishlist", active: false },
  { href: "/dashboard/profile", icon: User, label: "Profile", active: false },
  { href: "/dashboard/settings", icon: Settings, label: "Settings", active: false },
]

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const overviewCards = [
    {
      title: "Total Orders",
      value: "34",
      change: "+12%",
      changeType: "increase",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Total Spent",
      value: "$1,234.56",
      change: "+23%",
      changeType: "increase",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Wishlist Items",
      value: "12",
      change: "-5%",
      changeType: "decrease",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "Member Since",
      value: "Jan 2023",
      change: "1 year",
      changeType: "neutral",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-white font-bold">JD</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">John Doe</h3>
                      <p className="text-sm text-muted-foreground">Premium Member</p>
                    </div>
                  </div>
                  
                  <nav className="space-y-2">
                    {sidebarItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
                          item.active
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome back, John! Here's what's happening with your account.</p>
              </div>

              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewCards.map((card, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center`}>
                          <card.icon className={`w-6 h-6 ${card.color}`} />
                        </div>
                        <div className={`flex items-center text-sm ${
                          card.changeType === "increase" ? "text-green-600" :
                          card.changeType === "decrease" ? "text-red-600" : "text-muted-foreground"
                        }`}>
                          {card.changeType === "increase" && <TrendingUp className="w-4 h-4 mr-1" />}
                          {card.changeType === "decrease" && <TrendingDown className="w-4 h-4 mr-1" />}
                          {card.change}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">{card.value}</h3>
                      <p className="text-sm text-muted-foreground">{card.title}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Monthly Orders Chart */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Monthly Orders & Spending
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsLineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="orders" fill="#dc2626" name="Orders" />
                        <Line yAxisId="right" type="monotone" dataKey="spending" stroke="#10b981" name="Spending ($)" />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Category Distribution */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Shopping by Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/orders">View All</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                            <Package className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date} • {order.items} items</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">${order.total}</p>
                          <Badge className={order.statusColor}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Wishlist Preview */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Wishlist</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/wishlist">View All</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 border rounded-xl">
                        <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center">
                          <Package className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{item.name}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-foreground">${item.price}</span>
                            {item.discount > 0 && (
                              <Badge variant="destructive" className="text-xs">-{item.discount}%</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
