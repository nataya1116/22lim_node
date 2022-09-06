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
        order: [["id", "DESC"]],
        offset,
        limit
      });
    } catch (err) {
      console.log(err);
    }
};

module.exports.listWish = async (userId, offset, limit) => {
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
                                                              where : {
                                                                userId
                                                              }
                                                            }
                                                        ]
                                                      }
                                                    ],
                                                    // group: ['GameSkinWishes.id'],
                                                    order: [["id", "DESC"]],
                                                    offset,
                                                    limit
    });
  } catch (err) {
    console.log(err);
  }
};


module.exports.listOwn = async (userId, offset, limit) => {
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
                where : {
                  userId
                }
              }
            ]
        },
        {
          attributes: ["id"],
          model: GameSkinWish,
          include: [
              {
                attributes: ["userId"],
                model: User
              }
          ]
        }
      ],
      order: [["id", "DESC"]],
      offset,
      limit
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.findPoint = async (productId) => {
  try {
    const result = await GameSkinProducts.findOne({
                                      attributes: ["point"],
                                      where : { id : productId }
                                    });
    const point = result.dataValues.point;
    return point;
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports.count = async () => {
  try {
    return await GameSkinProducts.count();
  } catch (err) {
    console.error(err);
    return false;
  }
}