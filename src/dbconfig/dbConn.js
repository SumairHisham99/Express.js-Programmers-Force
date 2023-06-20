const { Sequelize } = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize(
    'ecommerce',
    'root',
    '',
    {
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          }
  });

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = {
    sequelize,
    Sequelize
};
