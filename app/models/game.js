/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game', {
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
      defaultValue: sequelize.fn('uuid'),
      unique: true
    },
    createdDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    createdTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    error: {
      type: DataTypes.STRING(5000),
      allowNull: true
    }
  }, {
    tableName: 'game'
  });
};
