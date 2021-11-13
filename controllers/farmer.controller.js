const _ = require("lodash");
// const config = require("../config/config");
// const client = require("twilio")(config.accountSID, config.authToken);
const Farmer = require("../models/Farmer");
const Product = require("../models/Product");

// @desc Farmers Requests
// @route POST api/farmer/register
// @access Public
exports.farmerRegister = async (req, res, next) => {
  try {
    const farmer = new Farmer(req.body);

    if (farmer.msisdn.includes("+") == true) {
      farmer.msisdn = farmer.msisdn.substring(1);
    }

    await farmer.save();
    return res.status(201).json({ success: true, data: farmer });
  } catch (err) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "This email or phone number already exists" });
    }
    return res.status(400).json({
      message: "Error occured while sending Farmer Request",
      error: err,
    });
  }
};

// @desc Farmers Login
// @route POST api/farmer/login
// @access Public
exports.farmerLogin = async (req, res, next) => {
  try {
    const farmer = await Farmer.findOne({ msisdn: req.body.msisdn });
    if (!farmer) {
      return res.status(404).send("User not found!");
    }
    const data = await client.verify
      .services(config.serviceID)
      .verifications.create({
        to: `+${farmer.msisdn}`,
        channel: "sms",
      });
    console.log(data);
    return res
      .status(200)
      .send(_.pick(data, ["to", "channel", "status", "dateCreated"]));
  } catch (err) {
    return res.status(400).send("Error occured while login", err);
  }
};

// @desc Verify the code
// @route GET api/farmer/verify
// @access Public
exports.verifyUser = async (req, res, next) => {
  try {
    const farmer = await Farmer.findOne({ msisdn: req.query.msisdn });
    if (!farmer) {
      throw new Error("Unable to login");
    }
    const info = await client.verify
      .services(config.serviceID)
      .verificationChecks.create({
        to: `+${farmer.msisdn}`,
        code: req.query.code,
      });
    if (info.status == "approved") {
      const token = farmer.generateAuthToken();
      return res
        .header("auth-user", token)
        .send(_.pick(info, ["to", "channel", "status", "dateCreated"]));
    }
  } catch (error) {
    return res.status(400).send("ERROR", error);
  }
};

// @desc Add Product
// @route POST api/farmer/add-product
// @access Private
exports.addProduct = async (req, res, next) => {
  try {
    var images = [];
    var keys = [];
    for (var i = 0; i < req.files.length; i++) {
      images.push(req.files[i].location);
    }

    for (var i = 0; i < images.length; i++) {
      var ext = images[i].lastIndexOf("m/");
      keys.push({ Key: images[i].substr(ext + 2) });
    }

    const product = new Product({
      ownerId: req.body.ownerId,
      title: req.body.title,
      expectationPrice: req.body.expectationPrice,
      productAreaSize: req.body.productAreaSize,
      description: req.body.description,
      viloyat: req.body.viloyat,
      tuman: req.body.tuman,
      photos: images,
    });

    await product.save();
    return res
      .status(201)
      .json({ success: true, product: product, images: images });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: `Error occured! ERROR: ${err}` });
  }
};

// @desc Get Products By A User
// @route GET api/farmer/products/:farmerId
// @access Private
exports.getProductsByUserId = async (req, res, next) => {
  try {
    const { farmerId } = req.params;
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res
        .status(404)
        .json({ success: false, message: "Farmer Not Found!" });
    }

    const products = await Product.find({ ownerId: farmer._id });
    return res
      .status(200)
      .json({ success: true, data: { products: products, farmer: farmer } });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, data: `Error Occured. ERROR: ${err}` });
  }
};
