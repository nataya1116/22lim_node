const Sequelize = require("sequelize");

class GameSkinUser extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                userId : {
                    type : Sequelize.INTEGER,
                    allowNull : false,
                },
                productId : {
                    type : Sequelize.INTEGER,
                    allowNull : false,
                },
                isUse : {
                    type : Sequelize.BOOLEAN,
                    allowNull : false,
                    defaultValue : false,
                }
            },
            {
                sequelize,
                underscored : true,
                modelName : "GameSkinUser",
                tableName : "game_skin_user",
                timestamps : true,
                paranoid : true,
                charset: "utf8",
                collate: "utf8_general_ci"
            }
        )
    }

    static associate(db) {
        // N : 1
        db.GameSkinUser.belongsTo(db.User, { foreignKey: "userId", sourceKey: "id" });
        db.GameSkinUser.belongsTo(db.GameSkinProducts, { foreignKey: "productId", sourceKey: "id" });
    }
}

module.exports = GameSkinUser;