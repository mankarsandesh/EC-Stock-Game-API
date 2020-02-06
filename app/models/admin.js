const DataTypes = require('sequelize');
const db = require('../db/db');

const Admin = db.define('admin', {
    PID: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    adminPolicyID: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
      references: {
        model: 'adminPolicy',
        key: 'PID'
      }
    },
    portalProviderID: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
      references: {
        model: 'portalProvider',
        key: 'PID'
      }
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    middleName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    emailID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    invalidAttemptsCount: {
      type: DataTypes.TINYINT(4),
      allowNull: false,
      defaultValue: '0'
    },
    lastPasswordResetTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP()')
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
    tableName: 'admin'
});

module.exports = Admin;