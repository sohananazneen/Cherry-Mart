import Product from "../../models/Product.js";
import asyncHandler from "express-async-handler";

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 12,
    category,
    brand,
    minPrice,
    maxPrice,
    rating,
    sortBy = "createdAt",
    sortOrder = "desc",
    search,
    tags,
    featured,
    isNewArrival,
    onSale,
  } = req.query;

  // Build query
  const query = { isActive: true };

  // Category filter
  if (category && category !== "all") {
    query.category = category;
  }

  // Brand filter
  if (brand) {
    query.brand = { $regex: brand, $options: "i" };
  }

  // Price range filter
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // Rating filter
  if (rating) {
    query.rating = { $gte: Number(rating) };
  }

  // Search filter
  if (search) {
    query.$text = { $search: search };
  }

  // Tags filter
  if (tags) {
    const tagArray = Array.isArray(tags) ? tags : tags.split(",");
    query.tags = { $in: tagArray };
  }

  // Featured products
  if (featured === "true") {
    query.isFeatured = true;
  }

  // New products
  if (isNewArrival === "true") {
    query.isNewArrival = true;
  }

  // Sale products
  if (onSale === "true") {
    query.isOnSale = true;
  }

  // Sort options
  const sortOptions = {};
  sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

  // Pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  // Execute query
  const products = await Product.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNum)
    .populate("reviews.user", "name");

  // Get total count for pagination
  const total = await Product.countDocuments(query);

  res.status(200).json({
    success: true,
    data: products,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
    },
  });
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "reviews.user",
    "name",
  );

  if (!product || !product.isActive) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const { limit = 8 } = req.query;

  const products = await Product.find({ isActive: true, isFeatured: true })
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: products,
  });
});

// @desc    Get new products
// @route   GET /api/products/new
// @access  Public
export const getNewProducts = asyncHandler(async (req, res) => {
  const { limit = 8 } = req.query;

  const products = await Product.find({ isActive: true, isNewArrival: true })
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: products,
  });
});

// @desc    Get products on sale
// @route   GET /api/products/sale
// @access  Public
export const getSaleProducts = asyncHandler(async (req, res) => {
  const { limit = 8 } = req.query;

  const products = await Product.find({
    isActive: true,
    isOnSale: true,
    originalPrice: { $exists: true, $gt: 0 },
  })
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: products,
  });
});

// @desc    Get related products
// @route   GET /api/products/:id/related
// @access  Public
export const getRelatedProducts = asyncHandler(async (req, res) => {
  const { limit = 4 } = req.query;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  // Find related products by category or tags
  const relatedProducts = await Product.find({
    _id: { $ne: product._id },
    isActive: true,
    $or: [{ category: product.category }, { tags: { $in: product.tags } }],
  })
    .limit(parseInt(limit))
    .sort({ rating: -1 });

  res.status(200).json({
    success: true,
    data: relatedProducts,
  });
});

// @desc    Add product review
// @route   POST /api/products/:id/reviews
// @access  Private
export const addProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res.status(400).json({
      success: false,
      message: "Rating and comment are required",
    });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: "Rating must be between 1 and 5",
    });
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  // Check if user already reviewed
  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString(),
  );

  if (alreadyReviewed) {
    return res.status(400).json({
      success: false,
      message: "You have already reviewed this product",
    });
  }

  // Add review
  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment,
  };

  product.reviews.push(review);

  // Update rating
  await product.updateRating();

  res.status(201).json({
    success: true,
    message: "Review added successfully",
    data: product,
  });
});

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
export const getProductCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct("category", { isActive: true });

  res.status(200).json({
    success: true,
    data: categories,
  });
});

// @desc    Get product brands
// @route   GET /api/products/brands
// @access  Public
export const getProductBrands = asyncHandler(async (req, res) => {
  const brands = await Product.distinct("brand", { isActive: true });

  res.status(200).json({
    success: true,
    data: brands,
  });
});
