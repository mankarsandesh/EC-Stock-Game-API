/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userSessions', {
    PID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userID: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    userIpAddress: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    balance: {
      type: "DOUBLE",
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    }
  }, {
    tableName: 'userSessions'
  });
};
