'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.belongsTo(models.Colegio, { foreignKey: 'colegio_id' });
      Usuario.hasMany(models.Reporte, { foreignKey: 'usuario_id' });
    }
  }
  Usuario.init({
    nombre: { type: DataTypes.STRING, allowNull: false },
    correo: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    rol: { type: DataTypes.ENUM('admin', 'rector', 'estudiante'), allowNull: false },
    grado: DataTypes.STRING,
    grupo: DataTypes.STRING,
    colegio_id: { type: DataTypes.INTEGER, references: { model: 'colegios', key: 'id' } },
    must_change_password: { type: DataTypes.INTEGER, defaultValue: 0 },
    correo_recuperacion: { type: DataTypes.STRING, allowNull: true },
    reset_token: { type: DataTypes.STRING, allowNull: true },
    reset_token_expires: { type: DataTypes.DATE, allowNull: true }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: false
  });
  return Usuario;
};
