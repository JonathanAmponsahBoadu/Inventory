const Product = require("../models/productSchema");

const createProduct = async (req, res) => {
  try {
    const { name, quantity, price, description, category, sku } = req.body;

    if (!name || quantity === undefined || !price) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, quantity, and price",
      });
    }

    const product = new Product({
      name,
      quantity,
      price,
      description,
      category,
      sku,
      createdBy: req.userId,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "createdBy",
      "username email",
    );

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate(
      "createdBy",
      "username email",
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price, description, category, sku } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (name) product.name = name;
    if (quantity !== undefined) product.quantity = quantity;
    if (price) product.price = price;
    if (description) product.description = description;
    if (category) product.category = category;
    if (sku) product.sku = sku;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide quantity",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.quantity = quantity;
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product quantity updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating quantity",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateQuantity,
};
