'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reportes_panico', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      latitud: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      longitud: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      direccion: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tipo_archivo: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      archivo_base64: {
        type: Sequelize.DataTypes.TEXT('long'),
        allowNull: true,
      },
      nombre_archivo: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      mime_type: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      fecha: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING(50),
        defaultValue: 'recibido',
        allowNull: false,
      },
      ip_origen: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('reportes_panico');
  },
};
