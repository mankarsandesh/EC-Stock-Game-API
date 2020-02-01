const DataTypes = require('sequelize');
const db = require('../db/db');

const UserSessions = db.define('userSessions', {
    PID: {
      type: DataTypes.BIGINT(20).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userID: {
      type: DataTypes.BIGINT(20).UNSIGNED,
      allowNull: false
    },
    userIpAddress: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false
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
    }
  }, {
    freezeTableName: true,
    tableName: 'usersessions',
});

module.exports = UserSessions;