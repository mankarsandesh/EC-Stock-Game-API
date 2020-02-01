const DataTypes = require('sequelize');
const db = require('../db/db');

const User = db.define('user', {
    PID: {
      type: DataTypes.BIGINT(20).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    portalProviderUserID: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    portalProviderID: {
      type: DataTypes.BIGINT(20).UNSIGNED,
      allowNull: false,
      references: {
        model: 'portalProvider',
        key: 'PID'
      }
    },
    userPolicyID: {
      type: DataTypes.BIGINT(20).UNSIGNED,
      allowNull: false,
      references: {
        model: 'userPolicy',
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    profileImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0'
    },
    canLogout: {
      type: DataTypes.ENUM('true','false'),
      allowNull: false,
      defaultValue: 'true'
    },
    isLoggedIn: {
      type: DataTypes.ENUM('true','false'),
      allowNull: false,
      defaultValue: 'false'
    },
    isActive: {
      type: DataTypes.ENUM('active','inactive'),
      allowNull: false,
      defaultValue: 'active'
    },
    lastCalledTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lastIP: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    loginTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    logoutTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    activeMinutes: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0'
    },
    UUID: {
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
    tableName: 'user'
});

module.exports = User;