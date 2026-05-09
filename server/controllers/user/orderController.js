import Order from "../../models/Order.js";
import asyncHandler from "express-async-handler";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get order stats for dashboard
// @route   GET /api/orders/mystats
// @access  Private
export const getMyStats = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((acc, item) => acc + (item.isPaid ? item.totalPrice : 0), 0);
  
  // Last 6 months spending trend
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonth = new Date().getMonth();
  const last6Months = [];
  
  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    last6Months.push({
      month: months[monthIndex],
      orders: 0,
      spending: 0
    });
  }
  
  orders.forEach(order => {
    const orderDate = new Date(order.createdAt);
    const orderMonth = months[orderDate.getMonth()];
    const monthData = last6Months.find(m => m.month === orderMonth);
    if (monthData) {
      monthData.orders += 1;
      if (order.isPaid) {
        monthData.spending += order.totalPrice;
      }
    }
  });

  res.json({
    totalOrders,
    totalSpent,
    monthlyData: last6Months
  });
});
