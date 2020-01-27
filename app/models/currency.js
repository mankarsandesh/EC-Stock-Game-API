const Sequelize = require('sequelize');
const sequelize = require('../db/db');

const Currency = sequelize.define('currency', {
    // Attributes
    PID: {
        type: Sequelize.BIGINT(20).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
    },
    rate: {
        type: Sequelize.DOUBLE(8, 2),
        allowNull: false
    },
    isActive: {
        type: Sequelize.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active'
    },
    symbol: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    abbreviation: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()'),
        field: 'created_at'
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()'),
        field: 'updated_at'
    }
}, {
    freezeTableName: true,
    tableName: 'currency'
});

module.exports = Currency;