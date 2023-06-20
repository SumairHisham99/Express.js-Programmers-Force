module.exports = ( sequelize, Sequelize ) => {
    const DataTypes = Sequelize.DataTypes;
    const timeRecord = sequelize.define(
        'time_record',
        {
            id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            hostName: {
                type: DataTypes.STRING,
                allowNull: true,
                enum: ['local', 'remote']
            },
            loginTime: {
                type: DataTypes.TIME,
                allowNull: true,                
            },
            logoutTime: {
                type: DataTypes.TIME,
                allowNull: true
            },
            totalTime: {
                type: DataTypes.TIME,
                allowNull: true,
                defaultValue: null
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                }
            },
            ipId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'ip',
                    key: 'id',
                }
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
        },{
            timestamps: false,
            underscored: true,
            freezetableName: true,
            tableName: 'time_record',
        }
    )
    return timeRecord;
};