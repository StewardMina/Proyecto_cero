'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('colegios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nit: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ubicacion: Sequelize.STRING,
      rector: Sequelize.STRING,
      sector: Sequelize.STRING
    });

    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      correo: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rol: {
        type: Sequelize.ENUM('admin', 'rector', 'estudiante'),
        allowNull: false
      },
      grado: Sequelize.STRING,
      grupo: Sequelize.STRING,
      colegio_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'colegios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      must_change_password: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });

    await queryInterface.createTable('reportes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion: Sequelize.TEXT,
      ubicacion: Sequelize.STRING,
      usuario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      colegio_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'colegios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      estado: {
        type: Sequelize.STRING,
        defaultValue: 'nuevo'
      },
      fecha: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      seguimiento: Sequelize.TEXT,
      editado: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reportes');
    await queryInterface.dropTable('usuarios');
    await queryInterface.dropTable('colegios');
  }
};
