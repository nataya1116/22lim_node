const { QnaBoard, QnaReply, User, PointTotal, PointHistory, PointType, sequelize } = require("../model/index");
const Op = require("sequelize").Op;
const { POINT } = require("../config/config");

module.exports.count = async () => {
  try {
    return await QnaBoard.count();
  } catch (err) {
    console.error(err);
  }
};

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

module.exports.viewOffset = async (offset) => {
  try {
    return await QnaBoard.findAll({
      include: [
        {
          attributes: ["userId"],
          model: User,
        },
      ],
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
module.exports.list = async (offset, limit) => {
  try {
    // findAndCountAll 조건에 맞는걸 찾고 개수도 알려줌
    return await QnaBoard.findAndCountAll({
      // attributes(내가 가져와서 사용할 컬럼명) : [배열에 문자열로 들어가있음]
      attributes: ["id", "title", "createdAt", "view"],
      // include : 쿼리문의 join이랑 같은거(다른 테이블이랑 매핑하는 것)
      include: [
        {
          // 매핑한 모델의 컬럼명을 가져온다
          // 리스트를 적은 작성자를 보려고 userId를 가져옴
          attributes: ["userId"],
          // 연결한 모델
          model: User,
        },
        //    {
        //         attributes :  [[sequelize.fn('COUNT', 'boardId'), 'replyCount']],
        //         model : TipReply,
        //    }
      ],
      // order : 어떤걸 기준으로 내림차순을 할지, 오름차순을 할지 정할 수 있다.
      // DESC : 내림차순(숫자가 큰게 위로), ASC : 오름차순(숫자가 작은게 위로)
      order: [["id", "DESC"]],
      // 내림차순에 오프셋 값이 0이고 리미트 값이 10이면 가장 큰 숫자부터 10개씩 보여준다
      offset,
      limit,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports.listSearchUserId = async (offset, limit, userId) => {
  console.log("s listSearchUserId");
  try {
    return await User.findOne({
      attributes: ["id"],
      where: {
        userId: {
          [Op.like]: `%${userId}%`,
        },
      },
    }).then((user) => {
      return QnaBoard.findAndCountAll({
        attributes: ["id", "title", "createdAt", "view"],
        include: [
          {
            attributes: ["userId"],
            model: User,
          },
        ],
        where: {
          userId: user.id,
        },
        order: [["id", "DESC"]],
        //
        offset,
        limit,
      });
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports.listSearchTitle = async (offset, limit, searchWord) => {
  console.log("s listSearchTitle");
  try {
    return await QnaBoard.findAndCountAll({
      attributes: ["id", "title", "createdAt", "view"],
      include: [
        {
          attributes: ["userId"],
          model: User,
        },
      ],
      where: {
        title: {
          [Op.like]: `%${searchWord}%`,
        },
      },
      order: [["id", "DESC"]],
      offset,
      limit,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports.listSearchContent = async (offset, limit, searchWord) => {
  console.log("s listSearchContent");
  try {
    return await QnaBoard.findAndCountAll({
      attributes: ["id", "title", "createdAt", "view"],
      include: [
        {
          attributes: ["userId"],
          model: User,
        },
      ],
      where: {
        content: {
          [Op.like]: `%${searchWord}%`,
        },
      },
      order: [["id", "DESC"]],
      offset,
      limit,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports.update = async ({ id, title, content }) => {
  try {
    await QnaBoard.update(
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
  }
};

module.exports.delete = async (id) => {
  try {
    // 게시글이 삭제되면 댓글도 함께 삭제된다.
    await sequelize.transaction(async (t) => {
      QnaBoard.destroy({
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
