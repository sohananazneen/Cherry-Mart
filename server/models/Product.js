import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: [
        "Electronics",
        "Fashion",
        "Home & Garden",
        "Books",
        "Sports & Outdoors",
        "Toys & Games",
        "Health & Beauty",
      ],
    },
    brand: {
      type: String,
      required: [true, "Product brand is required"],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, "Product SKU is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    thumbnail: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    rating: {
      type: Number,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be more than 5"],
      default: 0,
    },
    numReviews: {
      type: Number,
      min: [0, "Number of reviews cannot be negative"],
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: true,
          maxlength: [500, "Review comment cannot exceed 500 characters"],
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    features: [
      {
        type: String,
        maxlength: [100, "Feature cannot exceed 100 characters"],
      },
    ],
    specifications: {
      type: Map,
      of: String,
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
    weight: {
      type: Number,
      min: [0, "Weight cannot be negative"],
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    shippingInfo: {
      weight: Number,
      dimensions: {
        length: Number,
        width: Number,
        height: Number,
      },
      freeShipping: {
        type: Boolean,
        default: false,
      },
    },
    seo: {
      title: String,
      description: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
  },
);

// Calculate discount percentage
productSchema.virtual("discountPercentage").get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100,
    );
  }
  return 0;
});

// Update average rating when reviews change
productSchema.methods.updateRating = function () {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.numReviews = 0;
  } else {
    const totalRating = this.reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );
    this.rating = totalRating / this.reviews.length;
    this.numReviews = this.reviews.length;
  }
  return this.save();
};

// Check if product is in stock
productSchema.methods.isInStock = function () {
  return this.stock > 0 && this.isActive;
};

// Get product URL
productSchema.virtual("url").get(function () {
  return `/product/${this._id}`;
});

// Hide sensitive fields when converting to JSON
productSchema.methods.toJSON = function () {
  const productObject = this.toObject();
  // Add virtuals to JSON output
  productObject.discountPercentage = this.discountPercentage;
  productObject.url = this.url;
  return productObject;
};

// Indexes for better query performance
productSchema.index({ name: "text", description: "text" });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ isActive: 1, isFeatured: 1 });
productSchema.index({ tags: 1 });

export default mongoose.model("Product", productSchema);
