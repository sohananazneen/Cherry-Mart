import Order from "../../models/Order.js";
import asyncHandler from "express-async-handler";

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name email");
  res.json(orders);
});

// @desc    Get order stats for admin dashboard
// @route   GET /api/admin/orders/stats
// @access  Private/Admin
export const getAdminOrderStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const totalRevenue = await Order.aggregate([
    { $match: { isPaid: true } },
    { $group: { _id: null, total: { $sum: "$totalPrice" } } }
  ]);

  // Revenue trend for last 6 months
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonth = new Date().getMonth();
  const last6Months = [];
  
  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    last6Months.push({
      month: months[monthIndex],
      revenue: 0,
      orders: 0
    });
  }
  
  const orders = await Order.find({
    createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) }
  });

  orders.forEach(order => {
    const orderDate = new Date(order.createdAt);
    const orderMonth = months[orderDate.getMonth()];
    const monthData = last6Months.find(m => m.month === orderMonth);
    if (monthData) {
      monthData.orders += 1;
      if (order.isPaid) {
        monthData.revenue += order.totalPrice;
      }
    }
  });

  res.json({
    totalOrders,
    totalRevenue: totalRevenue[0]?.total || 0,
    revenueTrend: last6Months
  });
});
