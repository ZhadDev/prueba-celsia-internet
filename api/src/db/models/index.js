const { Clientes, ClienteSchema } = require("./cliente.model");
const { Servicios, ServicioSchema } = require("./servicio.model");

const setupModels = (sequelize) => {
  Clientes.init(ClienteSchema, Clientes.config(sequelize));
  Servicios.init(ServicioSchema, Servicios.config(sequelize));
};

module.exports = setupModels;
