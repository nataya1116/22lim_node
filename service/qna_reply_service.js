const { QnaReply, User, PointTotal, PointHistory, PointType, sequelize } = require("../model/index");
const Op = require("sequelize").Op;
const { POINT } = require("../config/config");

module.exports.create = async ({ userId, boardId, content }) => {
  try {
    await sequelize.transaction( async (t) => {
      await User.findOne({
                              where : { userId }
      }).then( async (user) => {
          await QnaReply.create({
                                      userId : user.id,
                                      boardId, 
                                      content
                                  },
                                  {
                                      transaction: t
                                  });
          const pointType = await PointType.findOne({
                                                      where : {
                                                          id : POINT.WRITE_REPLY
                                                      }
                                                      });
          await PointHistory.create({
                                      userId : user.id,
                                      typeId : POINT.WRITE_REPLY
                                  },
                                  {
                                      transaction: t
                                  });
          await PointTotal.increment({
                                          point : pointType.point
                                      },
                                      {
                                          where : { userId : user.id }
                                      },
                                      {
                                          transaction: t
                                      });
      });
  });

  } catch (err) {
    console.error(err);
  }
};

module.exports.createNested = async ({ userId, boardId, replyId, content }) => {
  try {
    await sequelize.transaction( async (t) => {
      await User.findOne({
                              where : { userId }
      }).then( async (user) => {
          await QnaReply.create({
                                      userId : user.id,
                                      boardId, 
                                      replyId,
                                      content
                                  },
                                  {
                                      transaction: t
                                  });
          const pointType = await PointType.findOne({
                                                      where : {
                                                          id : POINT.WRITE_REPLY
                                                      }
                                                      });
          await PointHistory.create({
                                      userId : user.id,
                                      typeId : POINT.WRITE_REPLY
                                  },
                                  {
                                      transaction: t
                                  });
          await PointTotal.increment({
                                          point : pointType.point
                                      },
                                      {
                                          where : { userId : user.id }
                                      },
                                      {
                                          transaction: t
                                      });
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
