const express = require("express");
const router = express.Router();

const { productList } = require("../controllers/product.controller");


router.route("/product-list").get(productList);

module.exports = router;
