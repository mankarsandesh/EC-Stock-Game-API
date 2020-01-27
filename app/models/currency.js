/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('currency', {
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
    rate: {
<<<<<<< HEAD
        type: Sequelize.DOUBLE(8, 2),
        allowNull: false
=======
      type: "DOUBLE(8,2)",
      allowNull: false
>>>>>>> c831be556d477bd0e20451c7e757279fe8905fb2
    },
    isActive: {
      type: DataTypes.ENUM('active','inactive'),
      allowNull: false,
      defaultValue: 'active'
    },
    symbol: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    abbreviation: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
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
<<<<<<< HEAD
}, {
    freezeTableName: true,
    tableName: 'currency'
});

module.exports = Currency;
=======
  }, {
    tableName: 'currency'
  });
};
>>>>>>> c831be556d477bd0e20451c7e757279fe8905fb2
