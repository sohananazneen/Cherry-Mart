"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Shield,
  User as UserIcon,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Home,
  Package,
  ShoppingCart,
  FileText,
  Settings,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/app/lib/AuthContext";
import { API_ENDPOINTS } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";

const sidebarItems = [
  { href: "/admin/dashboard", icon: Home, label: "Overview", active: false },
  { href: "/admin/users", icon: Users, label: "Manage Users", active: true },
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

export default function ManageUsersPage() {
  const router = useRouter();
  const { user: currentUser, userRole, loading: authLoading } = useAuth();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    // Check authentication and admin role
    if (!authLoading) {
      if (!currentUser) {
        router.push("/login");
        return;
      }
      if (userRole !== "admin") {
        router.push("/dashboard");
        return;
      }
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.adminUsers.base, {
          credentials: "include",
        });
        
        if (!response.ok) {
          console.error("Fetch failed with status:", response.status);
          const errorData = await response.json();
          console.error("Error data:", errorData);
          return;
        }

        const data = await response.json();
        console.log("Fetched users data:", data);
        
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data && Array.isArray(data.users)) {
          setUsers(data.users);
        } else if (data && Array.isArray(data.data)) {
          setUsers(data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser && userRole === "admin" && !authLoading) {
      fetchUsers();
    }
  }, [currentUser, userRole, authLoading, router]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`${API_ENDPOINTS.adminUsers.base}/${userId}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (response.ok) {
          setUsers(users.filter((u) => u._id !== userId));
        } else {
          const data = await response.json();
          alert(data.message || "Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleVerifyUser = async (userId) => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.adminUsers.base}/${userId}/verify`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      if (response.ok) {
        setUsers(
          users.map((u) => (u._id === userId ? { ...u, emailVerified: true } : u))
        );
      }
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.adminUsers.base}/${userId}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
        credentials: "include",
      });
      if (response.ok) {
        setUsers(
          users.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading users...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
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
                      <span className="text-white font-bold">
                        {currentUser?.displayName
                          ? currentUser.displayName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                          : "AD"}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {currentUser?.displayName || "Admin User"}
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
                    Manage Users
                  </h1>
                  <p className="text-muted-foreground">
                    View and manage all registered users in the system
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/dashboard" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                  </Link>
                </Button>
              </div>

              {/* Filters */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-muted-foreground" />
                      <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-3 py-2 border rounded-xl text-sm"
                      >
                        <option value="all">All Roles</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Users Table */}
              <Card className="border-0 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50 border-b">
                          <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                            User
                          </th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                            Role
                          </th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                            Status
                          </th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                            Joined
                          </th>
                          <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user) => (
                            <tr
                              key={user._id}
                              className="border-b hover:bg-muted/30 transition-colors"
                            >
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                                    {user.avatar ? (
                                      <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <UserIcon className="w-5 h-5 text-muted-foreground" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium text-foreground">
                                      {user.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                      <Mail className="w-3 h-3" /> {user.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <Badge
                                  className={
                                    user.role === "admin"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-blue-100 text-blue-800"
                                  }
                                >
                                  {user.role}
                                </Badge>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-1 text-sm">
                                  {user.emailVerified ? (
                                    <>
                                      <CheckCircle className="w-4 h-4 text-green-500" />
                                      <span className="text-green-600">
                                        Verified
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <XCircle className="w-4 h-4 text-yellow-500" />
                                      <span className="text-yellow-600">
                                        Unverified
                                      </span>
                                    </>
                                  )}
                                </div>
                              </td>
                              <td className="py-4 px-6 text-sm text-muted-foreground">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-4 px-6 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    {!user.emailVerified && (
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleVerifyUser(user._id)
                                        }
                                        className="text-green-600 focus:text-green-600"
                                      >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Verify Email
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleUpdateRole(
                                          user._id,
                                          user.role === "admin"
                                            ? "user"
                                            : "admin"
                                        )
                                      }
                                    >
                                      <Shield className="w-4 h-4 mr-2" />
                                      Make {user.role === "admin" ? "User" : "Admin"}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-red-600 focus:text-red-600"
                                      onClick={() => handleDeleteUser(user._id)}
                                      disabled={user.role === "admin"}
                                    >
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Delete User
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={5}
                              className="py-12 text-center text-muted-foreground"
                            >
                              No users found matching your criteria.
                            </td>
                          </tr>
                        )}
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
