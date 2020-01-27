/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stock', {
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
    ReferenceURL: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    method: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    stockLoop: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    betCloseSec: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    closeDays: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    limitTag: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    openTimeRange: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    timeZone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    precision: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    responseType: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    responseStockOpenTag: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    responseStockTimeTag: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    responseStockTimeZone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    responseStockTimeFormat: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    responseStockDataTag: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    replaceJsonRules: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'stock'
  });
};
