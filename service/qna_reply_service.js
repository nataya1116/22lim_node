const { QnaReply, User, sequelize } = require("../model/index");
const Op = require("sequelize").Op;

module.exports.create = async ({ userId, boardId, content }) => {
  try {
    User.findOne({
      where: { userId },
    }).then((user) => {
      QnaReply.create({
        userId: user.id,
        boardId,
        content,
      });
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports.createNested = async ({ userId, boardId, replyId, content }) => {
  try {
    User.findOne({
      where: { userId },
    }).then((user) => {
      QnaReply.create({
        userId: user.id,
        boardId,
        replyId,
        content,
      });
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports.list = async (boardId) => {
  try {
    return await QnaReply.findAll({
      attributes: ["id", "replyId", "content", "createdAt"],
      include: [
        {
          attributes: ["userId"],
          model: User,
        },
      ],
      where: {
        boardId,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports.update = async (id, content) => {
  try {
    QnaReply.update(
      {
        content,
      },
      {
        where: {
          id,
        },
      }
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports.delete = async (id) => {
  try {
    QnaReply.destroy({
      where: {
        [Op.or]: [
          {
            id,
          },
          {
            replyId: id, // 댓글이 삭제되면 해당 대댓글도 삭제
          },
        ],
      },
    });
  } catch (err) {
    console.error(err);
  }
};
