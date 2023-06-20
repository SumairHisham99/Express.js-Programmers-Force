module.exports = ( sequelize, Sequelize ) => {
    const DataTypes = Sequelize.DataTypes;
    const IP = sequelize.define(
        'ip',
        {
            id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            ipAddress: {
                type: DataTypes.STRING,
                allowNull: false
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false
            },
            floor: {
                type: DataTypes.STRING,
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
            // timestamps: true,
            underscored: true,
            freezetableName: true,
            tableName: 'ip'
        }
    )
    return IP;
};