const express = require("express");
const router = express.Router();

const customerController = require("../controller/customers.controller");

router.get("/customers/list", customerController.getData);
router.get("/customers/listById/:id", customerController.getDataById);
router.post("/customers/add", customerController.createData);
router.put("/customers/updateById/:id", customerController.updateDataById);
router.delete("/customers/deleteById/:id", customerController.deleteDataById);

module.exports = router;