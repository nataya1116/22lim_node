const Sequelize = require("sequelize");
const moment = require("moment");

class GameSkinProducts extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        info: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        point: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        imgUrl: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        positionX: {
          type: Sequelize.SMALLINT,
          allowNull: false
        },
        positionY: {
          type: Sequelize.SMALLINT,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          get() {
            return moment(this.getDataValue("createdAt")).format(
              "YYYY/MM/DD hh:mm:ss"
            );
          },
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          get() {
            return moment(this.getDataValue("updatedAt")).format(
              "YYYY/MM/DD hh:mm:ss"
            );
          },
        },
      },
      {
        sequelize,
        underscored: true,
        modelName: "GameSkinProducts",
        tableName: "game_skin_products",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.GameSkinProducts.hasMany(db.GameSkinUser, {
      foreignKey: "productId",
      sourceKey: "id",
    });
    db.GameSkinProducts.hasMany(db.GameSkinWish, {
      foreignKey: "productId",
      sourceKey: "id",
    });
  }
}

module.exports = GameSkinProducts;
