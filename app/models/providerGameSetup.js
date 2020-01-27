/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('providerGameSetup', {
    PID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    portalProviderID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'portalProvider',
        key: 'PID'
      }
    },
    stockID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'stock',
        key: 'PID'
      }
    },
    FD_BigSmallGameID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'gameSetup',
        key: 'PID'
      }
    },
    FD_EvenOddGameID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'gameSetup',
        key: 'PID'
      }
    },
    FD_LowMiddleUpGameID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'gameSetup',
        key: 'PID'
      }
    },
    FD_NumberGameID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'gameSetup',
        key: 'PID'
      }
    },
    LD_BigSmallGameID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'gameSetup',
        key: 'PID'
      }
    },
    LD_EvenOddGameID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'gameSetup',
        key: 'PID'
      }
    },
    LD_LowMiddleUpGameID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'gameSetup',
        key: 'PID'
      }
    },
    LD_NumberGameID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'gameSetup',
        key: 'PID'
      }
    },
    BD_BigSmallTieGameID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'gameSetup',
        key: 'PID'
      }
    },
    BD_EvenOddGameID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'gameSetup',
        key: 'PID'
      }
    },
    BD_LowMiddleUpGameID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'gameSetup',
        key: 'PID'
      }
    },
    BD_NumberGameID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'gameSetup',
        key: 'PID'
      }
    },
    TD_BigSmallTieGameID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'gameSetup',
        key: 'PID'
      }
    },
    TD_EvenOddGameID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'gameSetup',
        key: 'PID'
      }
    },
    TD_LowMiddleUpGameID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'gameSetup',
        key: 'PID'
      }
    },
    TD_NumberGameID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'gameSetup',
        key: 'PID'
      }
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
    tableName: 'providerGameSetup'
  });
};
