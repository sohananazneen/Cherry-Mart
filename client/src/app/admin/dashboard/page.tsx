"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Settings,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/app/lib/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
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
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// Mock data for admin dashboard
const revenueData = [
  { month: "Jan", revenue: 45000, orders: 320, users: 1200 },
  { month: "Feb", revenue: 52000, orders: 380, users: 1350 },
  { month: "Mar", revenue: 48000, orders: 350, users: 1420 },
  { month: "Apr", revenue: 61000, orders: 420, users: 1580 },
  { month: "May", revenue: 55000, orders: 390, users: 1650 },
  { month: "Jun", revenue: 67000, orders: 460, users: 1780 },
];

const categoryRevenue = [
  { name: "Electronics", value: 35, color: "#dc2626" },
  { name: "Fashion", value: 25, color: "#fbbf24" },
  { name: "Home & Garden", value: 20, color: "#10b981" },
  { name: "Books", value: 10, color: "#3b82f6" },
  { name: "Sports", value: 10, color: "#8b5cf6" },
];

const recentOrders = [
  {
    id: "ORD-2024-001",
    customer: "John Doe",
    email: "john@example.com",
    amount: 299.99,
    status: "Completed",
    date: "2024-01-15",
    items: 3,
  },
  {
    id: "ORD-2024-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    amount: 189.99,
    status: "Processing",
    date: "2024-01-15",
    items: 2,
  },
  {
    id: "ORD-2024-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    amount: 549.99,
    status: "Shipped",
    date: "2024-01-14",
    items: 5,
  },
  {
    id: "ORD-2024-004",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    amount: 89.99,
    status: "Pending",
    date: "2024-01-14",
    items: 1,
  },
];

const topProducts = [
  {
    id: "PROD-001",
    name: "Premium Wireless Headphones",
    sales: 245,
    revenue: 73255,
    rating: 4.8,
    stock: 45,
  },
  {
    id: "PROD-002",
    name: "Smart Watch Pro",
    sales: 189,
    revenue: 37811,
    rating: 4.6,
    stock: 23,
  },
  {
    id: "PROD-003",
    name: "Laptop Stand",
    sales: 156,
    revenue: 7744,
    rating: 4.9,
    stock: 78,
  },
  {
    id: "PROD-004",
    name: "Mechanical Keyboard",
    sales: 134,
    revenue: 26766,
    rating: 4.7,
    stock: 12,
  },
];

const sidebarItems = [
  { href: "/admin/dashboard", icon: Home, label: "Overview", active: true },
  { href: "/admin/users", icon: Users, label: "Manage Users", active: false },
  {
    href: "/admin/products",
    icon: Package,
    label: "Manage Products",
    active: false,
  },
  { href: "/admin/orders", icon: ShoppingCart, label: "Orders", active: false },
  { href: "/admin/reports", icon: FileText, label: "Reports", active: false },
  { href: "/admin/settings", icon: Settings, label: "Settings", active: false },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, userRole, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("6months");

  useEffect(() => {
    // Check authentication and admin role
    if (!authLoading) {
      if (!user) {
        router.push("/login");
        return;
      }
      if (userRole !== "admin") {
        router.push("/dashboard");
        return;
      }
    }

    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [user, userRole, authLoading, router]);

  const overviewCards = [
    {
      title: "Total Revenue",
      value: "$328,000",
      change: "+15.3%",
      changeType: "increase",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Orders",
      value: "2,320",
      change: "+8.7%",
      changeType: "increase",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Users",
      value: "8,940",
      change: "+12.4%",
      changeType: "increase",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "-0.5%",
      changeType: "decrease",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading admin dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If not authenticated or not admin, don't render (will redirect)
  if (!user || userRole !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Admin Sidebar */}
            <aside className="lg:w-64">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                      <span className="text-white font-bold">AD</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Admin User
                      </h3>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">
                          Administrator
                        </p>
                        <span className="px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full font-medium">
                          Admin
                        </span>
                      </div>
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
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Admin Dashboard
                  </h1>
                  <p className="text-muted-foreground">
                    Manage your store and monitor performance
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-3 py-2 border rounded-xl text-sm"
                  >
                    <option value="7days">Last 7 days</option>
                    <option value="30days">Last 30 days</option>
                    <option value="6months">Last 6 months</option>
                    <option value="1year">Last year</option>
                  </select>
                  <Button variant="outline" size="sm">
                    Export Report
                  </Button>
                </div>
              </div>

              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewCards.map((card, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center`}
                        >
                          <card.icon className={`w-6 h-6 ${card.color}`} />
                        </div>
                        <div
                          className={`flex items-center text-sm ${
                            card.changeType === "increase"
                              ? "text-green-600"
                              : card.changeType === "decrease"
                                ? "text-red-600"
                                : "text-muted-foreground"
                          }`}
                        >
                          {card.changeType === "increase" && (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          )}
                          {card.changeType === "decrease" && (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          )}
                          {card.change}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        {card.value}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {card.title}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Chart */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Revenue & Orders Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Area
                          yAxisId="left"
                          type="monotone"
                          dataKey="revenue"
                          stroke="#dc2626"
                          fill="#dc2626"
                          fillOpacity={0.3}
                          name="Revenue ($)"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="orders"
                          stroke="#10b981"
                          name="Orders"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Category Distribution */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Revenue by Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={categoryRevenue}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name} ${((percent || 0) * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryRevenue.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders Table */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/orders">View All Orders</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                            Order ID
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                            Customer
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                            Amount
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                            Status
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                            Date
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr
                            key={order.id}
                            className="border-b hover:bg-muted/50"
                          >
                            <td className="py-3 px-4">
                              <span className="font-medium text-foreground">
                                {order.id}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-foreground">
                                  {order.customer}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {order.email}
                                </p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-medium text-foreground">
                                ${order.amount}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm text-muted-foreground">
                                {order.date}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Order
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Order
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Top Products</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/products">Manage Products</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                            Product
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                            Sales
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                            Revenue
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                            Rating
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                            Stock
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {topProducts.map((product) => (
                          <tr
                            key={product.id}
                            className="border-b hover:bg-muted/50"
                          >
                            <td className="py-3 px-4">
                              <span className="font-medium text-foreground">
                                {product.name}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-foreground">
                                {product.sales}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-medium text-foreground">
                                ${product.revenue.toLocaleString()}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                                <span className="text-foreground">
                                  {product.rating}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge
                                variant={
                                  product.stock < 20
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {product.stock} units
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Product
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
