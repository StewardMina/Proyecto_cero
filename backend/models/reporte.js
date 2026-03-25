'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reporte extends Model {
    static associate(models) {
      Reporte.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
      Reporte.belongsTo(models.Colegio, { foreignKey: 'colegio_id', as: 'colegio' });
    }
  }
  Reporte.init({
    tipo: { type: DataTypes.STRING, allowNull: false },
    descripcion: DataTypes.TEXT,
    ubicacion: DataTypes.STRING,
    usuario_id: { type: DataTypes.INTEGER, references: { model: 'usuarios', key: 'id' } },
    colegio_id: { type: DataTypes.INTEGER, references: { model: 'colegios', key: 'id' } },
    estado: { type: DataTypes.STRING, defaultValue: 'nuevo' },
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    seguimiento: DataTypes.TEXT,
    editado: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    sequelize,
    modelName: 'Reporte',
    tableName: 'reportes',
    timestamps: false
  });
  return Reporte;
};
