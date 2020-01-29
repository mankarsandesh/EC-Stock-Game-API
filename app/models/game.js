/* jshint indent: 2 */
const DataTypes = require('sequelize');
const db = require('../db/db');

  const GameSetup =  db.define('game', {
    PID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    providerGameSetupID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'providerGameSetup',
        key: 'PID'
      }
    },
    stockID: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    betCloseTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    gameStatus: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    endStockValue: {
      type: "DOUBLE",
      allowNull: true
    },
    UUID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: DataTypes.fn('uuid'),
      unique: true
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'createdDate'
    },
    createdTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP()'),
      field: 'updated_at'
    },
    error: {
      type: DataTypes.STRING(5000),
      allowNull: true
    }
  }, {
    freezeTableName: true,
    tableName: 'game'
  });

module.exports = GameSetup;
