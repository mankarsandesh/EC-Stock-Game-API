/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('portalProvider', {
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
    currencyID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'currency',
        key: 'PID'
      }
    },
    creditBalance: {
      type: "DOUBLE",
      allowNull: false
    },
    mainBalance: {
      type: "DOUBLE",
      allowNull: false
    },
    UUID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: sequelize.fn('uuid'),
      unique: true
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
    tableName: 'portalProvider'
  });
};
