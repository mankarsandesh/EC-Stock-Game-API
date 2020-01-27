/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('adminOTPLog', {
    emailID: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    OTP: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    sendTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'adminOTPLog'
  });
};
