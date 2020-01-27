/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    PID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    portalProviderUserID: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    portalProviderID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'portalProvider',
        key: 'PID'
      }
    },
    userPolicyID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'userPolicy',
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    profileImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: "BLOB",
      allowNull: true
    },
    balance: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0'
    },
    canLogout: {
      type: DataTypes.ENUM('true','false'),
      allowNull: false,
      defaultValue: 'true'
    },
    isLoggedIn: {
      type: DataTypes.ENUM('true','false'),
      allowNull: false,
      defaultValue: 'false'
    },
    isActive: {
      type: DataTypes.ENUM('active','inactive'),
      allowNull: false,
      defaultValue: 'active'
    },
    lastCalledTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lastIP: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    loginTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    logoutTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    activeMinutes: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0'
    },
    UUID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: sequelize.fn('uuid'),
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
  }, {
    tableName: 'user'
  });
};
