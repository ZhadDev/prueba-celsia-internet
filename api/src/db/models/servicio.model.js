const { Model, DataTypes } = require("sequelize");
const { Clientes } = require("./cliente.model");

const SERVICIOS = "servicios";

class Servicios extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: SERVICIOS,
      modelName: "Servicios",
      timestamp: true,
    };
  }
}

const ServicioSchema = {
  identificacion: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: "identificacion",
    references: {
      model: Clientes,
      key: "identificacion",
    },
  },
  servicio: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: "servicio",
  },
  fechaInicio: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "fechaInicio",
  },
  ultimaFacturacion: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "ultimaFacturacion",
  },
  ultimoPago: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: "ultimoPago",
    defaultValue: 0,
  },
};

module.exports = { Servicios, ServicioSchema };
