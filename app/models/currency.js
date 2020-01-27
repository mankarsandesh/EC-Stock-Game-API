const DataTypes = require('sequelize');
const db = require('../db/db');

const Currency = db.define('currency', {
    PID: {
      type: DataTypes.BIGINT(20).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    rate: {
        type: DataTypes.DOUBLE(8, 2),
        allowNull: false,
    },
    isActive: {
      type: DataTypes.ENUM('active','inactive'),
      allowNull: false,
      defaultValue: 'active'
    },
    symbol: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    abbreviation: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP()'),
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP()'),
        field: 'updated_at'
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
}, {
    freezeTableName: true,
    tableName: 'currency'
});

module.exports = Currency;