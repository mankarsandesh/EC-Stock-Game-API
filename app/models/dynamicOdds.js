/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dynamicOdds', {
    PID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    gameID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'game',
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
    isActive: {
      type: DataTypes.ENUM('active','inactive'),
      allowNull: false,
      defaultValue: 'active'
    },
    FD_BIG: {
      type: "DOUBLE",
      allowNull: false
    },
    FD_SMALL: {
      type: "DOUBLE",
      allowNull: false
    },
    FD_ODD: {
      type: "DOUBLE",
      allowNull: false
    },
    FD_EVEN: {
      type: "DOUBLE",
      allowNull: false
    },
    FD_UP: {
      type: "DOUBLE",
      allowNull: false
    },
    FD_MIDDLE: {
      type: "DOUBLE",
      allowNull: false
    },
    FD_LOW: {
      type: "DOUBLE",
      allowNull: false
    },
    FD_0: {
      type: "DOUBLE",
      allowNull: false
    },
    FD_1: {
      type: "DOUBLE",
      allowNull: false
    },
    FD_2: {
      type: "DOUBLE",
      allowNull: false
    },
    FD_3: {
      type: "DOUBLE",
      allowNull: false
    },
    FD_4: {
      type: "DOUBLE",
      allowNull: false
    },
    FD_5: {
      type: "DOUBLE",
      allowNull: false
    },
    FD_6: {
      type: "DOUBLE",
      allowNull: false
    },
    FD_7: {
      type: "DOUBLE",
      allowNull: false
    },
    FD_8: {
      type: "DOUBLE",
      allowNull: false
    },
    FD_9: {
      type: "DOUBLE",
      allowNull: false
    },
    LD_BIG: {
      type: "DOUBLE",
      allowNull: false
    },
    LD_SMALL: {
      type: "DOUBLE",
      allowNull: false
    },
    LD_ODD: {
      type: "DOUBLE",
      allowNull: false
    },
    LD_EVEN: {
      type: "DOUBLE",
      allowNull: false
    },
    LD_UP: {
      type: "DOUBLE",
      allowNull: false
    },
    LD_MIDDLE: {
      type: "DOUBLE",
      allowNull: false
    },
    LD_LOW: {
      type: "DOUBLE",
      allowNull: false
    },
    LD_0: {
      type: "DOUBLE",
      allowNull: false
    },
    LD_1: {
      type: "DOUBLE",
      allowNull: false
    },
    LD_2: {
      type: "DOUBLE",
      allowNull: false
    },
    LD_3: {
      type: "DOUBLE",
      allowNull: false
    },
    LD_4: {
      type: "DOUBLE",
      allowNull: false
    },
    LD_5: {
      type: "DOUBLE",
      allowNull: false
    },
    LD_6: {
      type: "DOUBLE",
      allowNull: false
    },
    LD_7: {
      type: "DOUBLE",
      allowNull: false
    },
    LD_8: {
      type: "DOUBLE",
      allowNull: false
    },
    LD_9: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_BIG: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_SMALL: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_ODD: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_EVEN: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_UP: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_MIDDLE: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_LOW: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_0: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_1: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_2: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_3: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_4: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_5: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_6: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_7: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_8: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_9: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_10: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_11: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_12: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_13: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_14: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_15: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_16: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_17: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_18: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_19: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_20: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_21: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_22: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_23: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_24: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_25: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_26: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_27: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_28: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_29: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_30: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_31: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_32: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_33: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_34: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_35: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_36: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_37: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_38: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_39: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_40: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_41: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_42: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_43: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_44: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_45: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_46: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_47: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_48: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_49: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_50: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_51: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_52: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_53: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_54: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_55: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_56: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_57: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_58: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_59: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_60: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_61: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_62: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_63: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_64: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_65: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_66: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_67: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_68: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_69: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_70: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_71: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_72: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_73: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_74: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_75: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_76: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_77: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_78: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_79: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_80: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_81: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_82: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_83: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_84: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_85: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_86: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_87: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_88: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_89: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_90: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_91: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_92: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_93: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_94: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_95: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_96: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_97: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_98: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_99: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_BIG: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_SMALL: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_ODD: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_EVEN: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_UP: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_MIDDLE: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_LOW: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_0: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_1: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_2: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_3: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_4: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_5: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_6: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_7: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_8: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_9: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_10: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_11: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_12: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_13: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_14: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_15: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_16: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_17: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_18: {
      type: "DOUBLE",
      allowNull: false
    },
    BD_TIE: {
      type: "DOUBLE",
      allowNull: false
    },
    TD_TIE: {
      type: "DOUBLE",
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    }
  }, {
    tableName: 'dynamicOdds'
  });
};
