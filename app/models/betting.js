/* jshint indent: 2 */
const DataTypes = require('sequelize');
const db = require('../db/db');

  const Betting = db.define('betting', {
    PID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    gameID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'game',
        key: 'PID'
      }
    },
    userID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'PID'
      }
    },
    ruleID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'rule',
        key: 'PID'
      }
    },
    betAmount: {
      type: "DOUBLE",
      allowNull: false
    },
    rollingAmount: {
      type: "DOUBLE",
      allowNull: true
    },
    payout: {
      type: "DOUBLE",
      allowNull: false
    },
    betResult: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '-1'
    },
    isBot: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    source: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    UUID: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
  }
  }, {
    freezeTableName: true,
    tableName: 'betting'
  });
  
  module.exports = Betting;
