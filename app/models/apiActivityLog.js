/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('apiActivityLog', {
    PID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    service: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    method: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    responseCode: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    responseMessage: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    errorFound: {
      type: DataTypes.ENUM('YES','NO'),
      allowNull: false
    },
    requestTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    responseTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    timeTaken: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    request: {
      type: DataTypes.STRING(3000),
      allowNull: false
    },
    response: {
      type: DataTypes.STRING(3000),
      allowNull: false
    },
    adminID: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    userID: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    version: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    source: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ipAddress: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    exception: {
      type: DataTypes.STRING(3000),
      allowNull: false
    }
  }, {
    tableName: 'apiActivityLog'
  });
};
