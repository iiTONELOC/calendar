const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Reminders extends Model { }

Reminders.init(
    {
        // columns will go here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        before: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'reminders'
    }
);

module.exports = Reminders;