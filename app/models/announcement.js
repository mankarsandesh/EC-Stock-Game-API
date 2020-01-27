const DataTypes = require('sequelize');
const db = require('../db/db');

const Announcement = db.define('announcement', {
    PID: {
      type: DataTypes.BIGINT(20).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    adminID: {
      type: DataTypes.BIGINT(20).UNSIGNED,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    message: {
      type: DataTypes.STRING(1000),
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
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    freezeTableName: true,
    tableName: 'announcement'
});

module.exports = Announcement;