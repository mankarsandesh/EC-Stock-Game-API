const DataTypes = require('sequelize');
const db = require('../db/db');

const PortalProvider = db.define('portalProvider', {
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
    currencyID: {
      type: DataTypes.BIGINT(20).UNSIGNED,
      allowNull: false,
      references: {
        model: 'currency',
        key: 'PID'
      }
    },
    creditBalance: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    mainBalance: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    UUID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    isActive: {
      type: DataTypes.ENUM('active','inactive'),
      allowNull: false,
      defaultValue: 'active'
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
    tableName: 'portalprovider'
});

module.exports = PortalProvider;

