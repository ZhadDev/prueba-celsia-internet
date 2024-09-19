const express = require("express");
const router = express.Router();
const ClienteController = require("../controllers/cliente.controller");

router
  .get("/", ClienteController.get)
  .get("/:id", ClienteController.getById)
  .post("/", ClienteController.create)
  .put("/:id", ClienteController.update)
  .delete("/:id", ClienteController._delete);

module.exports = router;
