const { sequelize, Sequelize } = require('../dbconfig/dbConn')
const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const IP = require('./ip');
const TimeRecord = require('./timeRecord');
const Attendance = require('./attendance');

// Initializing Models
const UserModel = User(sequelize, Sequelize);
const ProductModel = Product(sequelize, Sequelize)
const CategoryModel = Category(sequelize, Sequelize)
const IpModel = IP(sequelize, Sequelize)
const TimeRecordModel = TimeRecord(sequelize, Sequelize)
const AttendanceModel = Attendance(sequelize, Sequelize)

// Define Associations here
UserModel.hasMany(TimeRecordModel, {
  foreignKey: 'userId'
});
TimeRecordModel.belongsTo(UserModel);

UserModel.hasMany(AttendanceModel, {
  foreignKey: 'userId'
});
AttendanceModel.belongsTo(UserModel);

CategoryModel.hasMany(ProductModel, {
  foreignKey: 'categoryId'
});
ProductModel.belongsTo(CategoryModel);


(async () => {
  try {
    // Sync the models with the database
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();

// Export the models
module.exports = {
  UserModel,
  ProductModel,
  CategoryModel,
  IpModel,
  TimeRecordModel,
  AttendanceModel
};
