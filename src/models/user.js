module.exports = (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: {
        args: true,
        msg: "Email already in use!"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4] // Minimum length for the password
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      enum: ['user','admin']
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
    tableName: 'users',
  });
  

  return User;
};
