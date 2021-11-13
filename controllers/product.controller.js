const Product = require("../models/Product");
const router = require("../routes/farmer.route");

// @desc Get Products List
// @route GET /api/products/product-list
// @access Private
exports.productList = async (req, res, next) => {
  try {
    var count = await Product.countDocuments();
    const product = await Product.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ count: count, product: product });
  } catch (error) {
    return res.status(400).send("Bad Request", error);
  }
};
