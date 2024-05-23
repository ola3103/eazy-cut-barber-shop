const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/serviceController");
const authController = require("../controllers/authController");

router.post(
  "/",
  authController.protect,
  authController.authorizedUser("admin"),
  serviceController.createService
);

router.get("/", serviceController.getAllService);

router.get(
  "/:serviceId",
  authController.protect,
  authController.authorizedUser("admin"),
  serviceController.getOneService
);

router.patch(
  "/:serviceId",
  authController.protect,
  authController.authorizedUser("admin"),
  serviceController.updateService
);

router.delete(
  "/:serviceId",
  authController.protect,
  authController.authorizedUser("admin"),
  serviceController.deleteService
);

module.exports = router;
