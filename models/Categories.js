const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Categories model
class Categories extends Model {}


// create fields/columns for Categories model
Categories.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'categories'
    }
);

module.exports = Categories;