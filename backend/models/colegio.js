'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Colegio extends Model {
    static associate(models) {
      Colegio.hasMany(models.Usuario, { foreignKey: 'colegio_id' });
      Colegio.hasMany(models.Reporte, { foreignKey: 'colegio_id' });
    }
  }
  Colegio.init({
    nit: { type: DataTypes.STRING, unique: true, allowNull: false },
    nombre: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    ubicacion: DataTypes.STRING,
    rector: DataTypes.STRING,
    sector: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Colegio',
    tableName: 'colegios',
    timestamps: false
  });
  return Colegio;
};
