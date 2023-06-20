module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const Attendance = sequelize.define(
        'attendance',
        {
            id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            attendance: {
                type: DataTypes.STRING,
                allowNull: true
            },
            remoteHours: {
                type: DataTypes.TIME,
                allowNull: false
            },
            onsiteHours: {
                type: DataTypes.TIME,
                allowNull: false
            },
            totalHours: {
                type: DataTypes.TIME,
                allowNull: false
            },
            date: {
                type: DataTypes.DATEONLY,
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
            timestamps: false,
            underscored: true,
            freezetableName: true,
            tableName: 'attendance'
        }
    )
    return Attendance;
};