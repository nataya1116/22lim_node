const { GameSkinProducts, GameSkinUser, GameSkinWish, User }= require("../model/index");

module.exports.list = async (offset, limit) => {
    try {
      return await GameSkinProducts.findAndCountAll({
        attributes: ["id", "name", "info", "point", "imgUrl", "positionX", "positionY"],
        include: [
          {
            model: GameSkinUser,
            include: [
                {
                  model: User,
                }
              ]
          }
        ],
        include: [
            {
              model: GameSkinWish,
              include: [
                  {
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