const Sequelize = require("sequelize");
const moment = require("moment");

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
                },
                createdAt : {
                    type: Sequelize.DATE,
                    allowNull : false,             
                  get() {
                        return moment(this.getDataValue('createdAt')).format('YYYY/MM/DD hh:mm:ss');
                    }
                },
                updatedAt : {
                    type: Sequelize.DATE,
                    allowNull : false,
                    get() {
                        return moment(this.getDataValue('updatedAt')).format('YYYY/MM/DD hh:mm:ss');
                    }
                },
                deletedAt : {
                    type: Sequelize.DATE,
                    get() {
                        return moment(this.getDataValue('deletedAt')).format('YYYY/MM/DD hh:mm:ss');
                    }
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
                collate: "utf8_general_ci",
                uniqueKeys: {
                    actions_unique: {
                        fields: ['userId', 'productId']
                    }
                }
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