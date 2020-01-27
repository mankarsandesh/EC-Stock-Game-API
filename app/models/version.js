/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('version', {
    PID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    version: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    previousVersion: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    }
  }, {
    tableName: 'version'
  });
};
