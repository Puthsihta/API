const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/", userController.findAll);
router.get("/:id", userController.findById);
router.post("/address/:id", userController.addNewAddress);
router.post("/", userController.create);
router.put("/:id", userController.updateById);
router.delete("/:id", userController.deleteById);

module.exports = router;
