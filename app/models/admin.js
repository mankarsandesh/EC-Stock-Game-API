/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin', {
    PID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    adminPolicyID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'adminPolicy',
        key: 'PID'
      }
    },
    portalProviderID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'portalProvider',
        key: 'PID'
      }
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    middleName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    emailID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: "BLOB",
      allowNull: false
    },
    invalidAttemptsCount: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    lastPasswordResetTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
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
    tableName: 'admin'
  });
};
