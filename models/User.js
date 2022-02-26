const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// Create our User Model
class User extends Model {
    // Check Password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

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
        hooks: {
            // Set Up beforeCreate lifecycle hook functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
            
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