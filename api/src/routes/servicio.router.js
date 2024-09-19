const express = require("express");
const router = express.Router();
const ServiciosController = require("../controllers/servicio.controller");

router
  .get("/", ServiciosController.get)
  .get("/:id", ServiciosController.getById)
  .post("/", ServiciosController.create)
  .put("/:id", ServiciosController.update)
  .delete("/:id", ServiciosController._delete);

module.exports = router;
