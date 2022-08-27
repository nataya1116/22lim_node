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
                },
                createdAt : {
                    type: Sequelize.DATE,
                    allowNull : false,             
                  get() {
                        return moment(this.getDataValue('createdAt')).format('YYYY/MM/DD h:mm:ss');
                    }
                },
                updatedAt : {
                    type: Sequelize.DATE,
                    allowNull : false,
                    get() {
                        return moment(this.getDataValue('updatedAt')).format('YYYY/MM/DD h:mm:ss');
                    }
                },
                deletedAt : {
                    type: Sequelize.DATE,
                    get() {
                        return moment(this.getDataValue('deletedAt')).format('YYYY/MM/DD h:mm:ss');
                    }
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