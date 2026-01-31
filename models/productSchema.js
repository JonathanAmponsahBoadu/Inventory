const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide product name"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"],
  },
  quantity: {
    type: Number,
    required: [true, "Please provide product quantity"],
    min: [0, "Quantity cannot be negative"],
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
    min: [0, "Price cannot be negative"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  category: {
    type: String,
    trim: true,
    maxlength: [50, "Category cannot exceed 50 characters"],
  },
  sku: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Product", productSchema);
