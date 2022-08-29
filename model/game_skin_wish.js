const Sequelize = require("sequelize");

class GameSkinWish extends Sequelize.Model {
    static init(sequelize){
        return super.init(
            {
                userId : {
                    type : Sequelize.INTEGER,
                    allowNull : false,
                },
                productId : {
                    type : Sequelize.INTEGER,
                    allowNull : false,
                }
            },
            {
                sequelize,
                underscored : true,
                modelName : "GameSkinWish",
                tableName : "game_skin_wish",
                timestamps : true,
                paranoid : true,
                charset: "utf8",
                collate: "utf8_general_ci"
            }
        )
    }

    static associate(db) {
        // N : 1
        db.GameSkinWish.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
        db.GameSkinWish.belongsTo(db.GameSkinProducts, { foreignKey: "productId", targetKey: "id" });
    }
}

module.exports = GameSkinWish;