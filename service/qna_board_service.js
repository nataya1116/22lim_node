const { QnaBoard, QnaReply, User, PointTotal, PointHistory, PointType, sequelize } = require("../model");
const Op = require("sequelize").Op;
const { POINT } = require("../config/config");


module.exports.create = async ({ userId, title, content }) => {

  try {
    await sequelize.transaction( async (t)=> {
      await User.findOne({
                            where : { userId }
      })
      .then(async (user) => {
          await QnaBoard.create({
                                  userId : user.id, 
                                  title, 
                                  content
                                },
                                {
                                  transaction: t
                                });
          const pointType = await PointType.findOne({
                                                      where : {
                                                        id : POINT.WRITE_POST
                                                      }
                                                    });
          await PointHistory.create({
                                      userId : user.id,
                                      typeId : POINT.WRITE_POST
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

module.exports.viewId = async (id) => {
  try {
    return await QnaBoard.findOne({
      include: [
        {
          attributes: ["userId"],
          model: User,
        },
      ],
      where: {
        id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports.viewOffset = async (offset, searchKey, searchWord) => {

  // ?????? ???????????? ???????????? ?????? whereUser ??????
  const whereUser = {};
  if(searchKey == "userId" && !!searchWord) whereUser.userId = { [Op.like]: `%${searchWord}%` };

  // ?????? QnaBoard?????? ???????????? ?????? where ??????
  const where = {};
  if(searchKey == "title" && !!searchWord) where.title = { [Op.like]: `%${searchWord}%` };                  
  if(searchKey == "content" && !!searchWord) where.content = { [Op.like]: `%${searchWord}%` };

  try {
    return await QnaBoard.findAndCountAll({
      include: [
        {
          attributes: ["userId"],
          model: User,
          where : whereUser
        },
      ],
      where,
      order: [["id", "DESC"]],
      offset,
      limit: 1,
    });
  } catch (err) {
    console.error(err);
  }
};

// ???????????? ??????(???????????? ?????? ???)
// ???????????? ????????? DB?????? ????????????
// ?????? ???????????? ???????????? ????????????
// ????????? ??????????????? ????????? ???
module.exports.listSearching = async (offset, limit, searchKey, searchWord) => {

  // ?????? ???????????? ???????????? ?????? whereUser ??????
  const whereUser = {};
  if(searchKey == "userId" && !!searchWord) whereUser.userId = { [Op.like]: `%${searchWord}%` };

  // ?????? QnaBoard?????? ???????????? ?????? where ??????
  const where = {};
  if(searchKey == "title" && !!searchWord) where.title = { [Op.like]: `%${searchWord}%` };                  
  if(searchKey == "content" && !!searchWord) where.content = { [Op.like]: `%${searchWord}%` };

  try {
    // findAndCountAll ????????? ????????? ?????? ????????? ?????????
    return await QnaBoard.findAndCountAll({
      attributes: ["id", "title", "createdAt", "view"],
      // include : ???????????? join?????? ?????????(?????? ??????????????? ???????????? ???)
      include: [
        {
          attributes: ["userId"],
          model: User,
          where : whereUser
        },
      ],
      where,
      order: [["id", "DESC"]],
      offset,
      limit,
    });
  } catch (err) {
    console.error(err);
    return false;
  }
  
};

module.exports.update = async ({ id, title, content }) => {
  try {
    return await QnaBoard.update(
      {
        title,
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
    return false;
  }
};

module.exports.delete = async (id) => {
  try {
    // ???????????? ???????????? ????????? ?????? ????????????.
    await sequelize.transaction(async (t) => {
      await QnaBoard.destroy({
        where: { id },
        transaction: t,
      });

      await QnaReply.destroy({
        where: { boardId: id },
        transaction: t,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateViewsCount = async (id) => {
  try {
    await QnaBoard.increment(
      {
        view: 1,
      },
      {
        where: { id },
      }
    );
  } catch (err) {
    console.error(err);
  }
};
