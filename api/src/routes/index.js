const express = require("express");

const clienteRouter = require("./cliente.router");
const servicioRouter = require("./servicio.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/celsia", router);
  router.use("/cliente", clienteRouter);
  router.use("/servicio", servicioRouter);
}

module.exports = routerApi;
