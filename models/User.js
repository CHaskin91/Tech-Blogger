const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create our User Model
class User extends Model {}

// Define Table Columns and Configuration
User.init(
    {
        // Table Column Definitions Go Here
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5]
            }
        }
    },
    {
            // Set Up beforeCreate lifecycle hook functionality
            
        
        // Pass in our Imported Sequelize Connection
        sequelize,
        // Don't Automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // Don't Pluralize name of Database Table
        freezeTableName: true,
        // Use Underscores instead of camel-casing
        underscored: true,
        // Make it so our Model Name stays Lowercase in the Database
        modelName: 'user'
    }
);

module.exports = User;