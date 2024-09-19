const { Model, DataTypes } = require("sequelize");

const CLIENTE = "clientes";

class Clientes extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: CLIENTE,
      modelName: "Clientes",
      timestamp: true,
    };
  }
}

const ClienteSchema = {
  identificacion: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: "identificacion",
  },
  nombres: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "nombres",
  },
  apellidos: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "apellidos",
  },
  tipoIdentificacion: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "tipoIdentificacion",
  },
  fechaNacimiento: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "fechaNacimiento",
  },
  numeroCelular: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "numeroCelular",
  },
  correoElectronico: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "correoElectronico",
  },
};

module.exports = { Clientes, ClienteSchema };
