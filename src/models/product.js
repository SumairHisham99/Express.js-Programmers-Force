module.exports = (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const Product = sequelize.define('products',  {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id',
      }
    },
    price: {
      type: 'integer',
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
  },
  {
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    // define the table's name
    tableName: 'products',
  });

  return Product;
};
