/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userPolicy', {
    PID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    userLockTime: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    invalidAttemptsAllowed: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    otpValidTime: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    passwordResetTime: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sessionLifetime: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '300'
    },
    isActive: {
      type: DataTypes.ENUM('active','inactive'),
      allowNull: false,
      defaultValue: 'active'
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
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'userPolicy'
  });
};
