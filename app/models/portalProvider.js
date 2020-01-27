/* jshint indent: 2 */
const DataTypes = require('sequelize');
const db = require('../db/db');


  const portalProvider =  db.define('portalProvider', {
    PID: {
      type: DataTypes.BIGINT,
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
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'currency',
        key: 'PID'
      }
    },
    creditBalance: {
      type: "DOUBLE",
      allowNull: false
    },
    mainBalance: {
      type: "DOUBLE",
      allowNull: false
    },
    UUID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: db.fn('uuid'),
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
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at'
    }
  }, {
    tableName: 'portalProvider'
  });

  module.exports = portalProvider;
