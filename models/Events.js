const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Events model
class Events extends Model {}


// create fields/columns for Events model
Events.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'categories',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        important:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        day: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'events'
    }
);

module.exports = Events;