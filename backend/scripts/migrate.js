const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function runMigrations() {
  try {
    const sequelize = new Sequelize(
      process.env.MYSQLDATABASE || 'proyecto_cero',
      process.env.MYSQLUSER || 'root',
      process.env.MYSQLPASSWORD || '',
      {
        host: process.env.MYSQLHOST || '127.0.0.1',
        port: process.env.MYSQLPORT || 3306,
        dialect: 'mysql',
        logging: console.log
      }
    );

    const { Umzug, SequelizeStorage } = require('umzug');
    const migrator = new Umzug({
      migrations: {
        glob: path.join(__dirname, '../migrations/*.js'),
        resolve: ({ name, path: filePath, context }) => {
          const migration = require(filePath);
          return {
            name,
            up: async () => migration.up(context.queryInterface, context.Sequelize),
            down: async () => migration.down(context.queryInterface, context.Sequelize)
          };
        }
      },
      context: {
        queryInterface: sequelize.getQueryInterface(),
        Sequelize: require('sequelize')
      },
      storage: new SequelizeStorage({ sequelize }),
      logger: console
    });

    console.log('Running migrations...');
    await migrator.up();
    console.log('✓ Migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('✗ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
