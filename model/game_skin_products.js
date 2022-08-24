const Sequelize = require("sequelize");

class GameSkinProducts extends Sequelize.Model {
    static init(sequelize){
        return super.init(
            {
                name : {
                    type : Sequelize.STRING(50),
                    allowNull : false,
                    unique : true
                },
                imgUrl : {
                    type : Sequelize.STRING,
                    allowNull : false,
                    unique : true
                },
                price : {
                    type : Sequelize.INTEGER,
                    allowNull : false,
                }
            },
            {
                sequelize,
                underscored : true,
                modelName : "GameSkinProducts",
                tableName : "game_skin_products",
                timestamps : true,
                paranoid : true,
                charset: "utf8",
                collate: "utf8_general_ci"
            }
        )
    }

    static associate(db) {
        db.GameSkinProducts.hasMany(db.GameSkinUser, { foreignKey: "productId", sourceKey: "id" });
        db.GameSkinProducts.hasMany(db.GameSkinWish, { foreignKey: "productId", sourceKey: "id" });
    }
}

module.exports = GameSkinProducts;