module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const Category = sequelize.define(
        'category',
        {
            id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false
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
            timestamps: true,
            underscored: true,
            freezetableName: true,
            tableName: 'category'
        }
    )
    return Category;
};