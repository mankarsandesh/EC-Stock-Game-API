/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gameSetup', {
    PID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    rulesID: {
      type: DataTypes.STRING(5000),
      allowNull: false
    },
    gameName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    initialOdds: {
      type: "DOUBLE",
      allowNull: false
    },
    commission: {
      type: "DOUBLE",
      allowNull: false
    },
    gameLoop: {
      type: DataTypes.INTEGER(4),
      allowNull: false
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
    tableName: 'gameSetup'
  });
};
