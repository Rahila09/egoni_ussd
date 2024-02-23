const express = require("express");

const foodController = require("../controllers/foodController");

const router = express.Router();

router
  .route("/")
  .post(foodController.sendCommodity)
  .get(foodController.retrieveAveragePrice);

router.route("/single").get(foodController.getCommodity);

module.exports = router;
