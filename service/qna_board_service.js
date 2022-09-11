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

  // 모델 유저에서 검색하기 위한 whereUser 객체
  const whereUser = {};
  if(searchKey == "userId" && !!searchWord) whereUser.userId = { [Op.like]: `%${searchWord}%` };

  // 모델 QnaBoard에서 검색하기 위한 where 객체
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

// 게시판의 목록(검색어가 없을 때)
// 게시판의 목록을 DB에서 가져온다
// 이걸 가져와서 페이지에 보여준다
// 페이지 네이션에서 필요한 것
module.exports.listSearching = async (offset, limit, searchKey, searchWord) => {

  // 모델 유저에서 검색하기 위한 whereUser 객체
  const whereUser = {};
  if(searchKey == "userId" && !!searchWord) whereUser.userId = { [Op.like]: `%${searchWord}%` };

  // 모델 QnaBoard에서 검색하기 위한 where 객체
  const where = {};
  if(searchKey == "title" && !!searchWord) where.title = { [Op.like]: `%${searchWord}%` };                  
  if(searchKey == "content" && !!searchWord) where.content = { [Op.like]: `%${searchWord}%` };

  try {
    // findAndCountAll 조건에 맞는걸 찾고 개수도 알려줌
    return await QnaBoard.findAndCountAll({
      attributes: ["id", "title", "createdAt", "view"],
      // include : 쿼리문의 join이랑 같은거(다른 테이블이랑 매핑하는 것)
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
    // 게시글이 삭제되면 댓글도 함께 삭제된다.
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
