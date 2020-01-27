/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('followUser', {
    PID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    followerID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'PID'
      }
    },
    followToID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'PID'
      }
    },
    isFollowing: {
      type: DataTypes.ENUM('true','false'),
      allowNull: false,
      defaultValue: 'true'
    },
    followAmount: {
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
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'followUser'
  });
};
