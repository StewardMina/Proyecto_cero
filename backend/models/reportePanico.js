'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReportePanico extends Model {}

  ReportePanico.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    latitud: DataTypes.FLOAT,
    longitud: DataTypes.FLOAT,
    direccion: DataTypes.STRING(500),
    descripcion: DataTypes.TEXT,
    tipo_archivo: DataTypes.STRING(20),
    archivo_base64: DataTypes.TEXT('long'),
    nombre_archivo: DataTypes.STRING(255),
    mime_type: DataTypes.STRING(100),
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    estado: {
      type: DataTypes.STRING(50),
      defaultValue: 'recibido',
    },
  }, {
    sequelize,
    modelName: 'ReportePanico',
    tableName: 'reportes_panico',
    timestamps: false,
  });

  return ReportePanico;
};
