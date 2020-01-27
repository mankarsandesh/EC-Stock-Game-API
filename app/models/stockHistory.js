/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stockHistory', {
    PID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    stockID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'stock',
        key: 'PID'
      }
    },
    stockValue: {
      type: "DOUBLE",
      allowNull: false
    },
    createdDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    createdTime: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    tableName: 'stockHistory'
  });
};
