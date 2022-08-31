const { Model } = require("sequelize");
const { QnaBoard, User, sequelze } = require("../model/index");
const Op = require("sequelize").Op;

module.exports.create = async ({ userId, title, content }) => {
  try {
    User.findOne({
      where: { userId },
    }).then((user) => {
      QnaBoard.create({
        userId: user.id,
        title,
        content,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.read = async (id) => {
  try {
    return QnaBoard.findOne({
      where: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.list = async (offset, limit) => {
  try {
    return await QnaBoard.findAndCountAll({
      attributes: ["id", "title", "updatedAt", "view"],
      include: [
        {
          attributes: ["userId"],
          model: User,
        },
      ],
      order: [["id", "ASC"]],
      offset,
      limit,
    });
  } catch (err) {
    console.log(err);
  }
};
