const express = require("express");

const farmerController = require("../controllers/farmerController");

const router = express.Router();

router
  .route("/")
  .post(farmerController.createFarmer)
  .get(farmerController.getAllFarmers);

  router.route("/data").get(farmerController.getFarmersByCriteria)

module.exports = router;
