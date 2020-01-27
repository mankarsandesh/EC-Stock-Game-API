/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('betting', {
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
    }
  }, {
    tableName: 'betting'
  });
};
