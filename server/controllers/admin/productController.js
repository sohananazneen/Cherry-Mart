import Product from "../../models/Product.js";
import asyncHandler from "express-async-handler";

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const productData = {
    ...req.body,
    user: req.user._id,
  };

  const product = await Product.create(productData);

  res.status(201).json({
    success: true,
    data: product,
    message: "Product created successfully",
  });
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
  );

  res.status(200).json({
    success: true,
    data: updatedProduct,
    message: "Product updated successfully",
  });
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  // Soft delete by setting isActive to false
  product.isActive = false;
  await product.save();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// @desc    Get product statistics
// @route   GET /api/products/stats
// @access  Private/Admin
export const getProductStats = asyncHandler(async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const activeProducts = await Product.countDocuments({ isActive: true });
  const featuredProducts = await Product.countDocuments({ isFeatured: true });
  const outOfStockProducts = await Product.countDocuments({
    stock: 0,
    isActive: true,
  });

  // Category distribution
  const categoryStats = await Product.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  // Average rating
  const avgRating = await Product.aggregate([
    { $match: { isActive: true, rating: { $gt: 0 } } },
    { $group: { _id: null, avgRating: { $avg: "$rating" } } },
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalProducts,
      activeProducts,
      featuredProducts,
      outOfStockProducts,
      categoryStats,
      averageRating: avgRating[0]?.avgRating || 0,
    },
  });
});
