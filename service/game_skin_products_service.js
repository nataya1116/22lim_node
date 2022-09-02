const { GameSkinProducts, GameSkinUser, GameSkinWish, User }= require("../model/index");

module.exports.list = async (offset, limit) => {
    try {
      return await GameSkinProducts.findAndCountAll({
        attributes: ["id", "name", "info", "point", "imgUrl", "positionX", "positionY"],
        include: [
          {
            attributes: ["isUse"],
            model: GameSkinUser,
            include: [
                {
                  attributes: ["userId"],
                  model: User,
                }
              ]
          },
          {
            attributes: ["id"],
            model: GameSkinWish,
            include: [
                {
                  attributes: ["userId"],
                  model: User,
                }
              ]
          }
        ],
        order: [["id", "ASC"]],
        offset,
        limit,
      });
    } catch (err) {
      console.log(err);
    }
  };