const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { Umzug, SequelizeStorage } = require('umzug');

async function waitForDatabase(maxRetries = 30) {
  const sequelize = new Sequelize(
    process.env.MYSQLDATABASE || 'proyecto_cero',
    process.env.MYSQLUSER || 'root',
    process.env.MYSQLPASSWORD || '',
    {
      host: process.env.MYSQLHOST || '127.0.0.1',
      port: process.env.MYSQLPORT || 3306,
      dialect: 'mysql',
      logging: false
    }
  );

  for (let i = 0; i < maxRetries; i++) {
    try {
      await sequelize.authenticate();
      console.log('✓ Database connection successful');
      return sequelize;
    } catch (error) {
      if (i < maxRetries - 1) {
        console.log(`⏳ Waiting for database... (attempt ${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        throw error;
      }
    }
  }
}

async function runMigrations() {
  try {
    console.log('🔄 Starting database migrations...');
    
    const sequelize = await waitForDatabase();

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

    const pendingMigrations = await migrator.pending();
    
    if (pendingMigrations.length === 0) {
      console.log('✓ All migrations already applied');
    } else {
      console.log(`Running ${pendingMigrations.length} pending migration(s)...`);
      await migrator.up();
      console.log('✓ Migrations completed successfully');
    }

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('✗ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

runMigrations();