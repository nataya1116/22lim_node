const { User, PointHistory, PointTotal, PointType, GameSkinUser, InactiveUser, Authority, ConditionUser, sequelize } = require("../model/index");
const Op = require("sequelize").Op;
const { POINT, CONDITION } = require("../config/config");

// GameSkinUser/PointHistory/PointTotal 추가
module.exports.create = async ({
  userName,
  userId,
  userPw,
  phone,
  email,
  authorityId,
  conditionId,
}) => {
  try {
    await sequelize.transaction(async (t) => {
      const result = await User.create(
        {
          userName,
          userId,
          userPw,
          phone,
          email,
          authorityId,
          conditionId,
        },
        {
          transaction: t,
        }
      );

      const user = result.dataValues;

      const pointType = await PointType.findOne({
        where: {
          id: POINT.JOIN,
        },
      });
      const point = pointType?.dataValues.point;
      const typeId = POINT.JOIN;

      await PointHistory.create(
        {
          userId: user.id,
          typeId,
        },
        {
          transaction: t,
        }
      );
      await PointTotal.create(
        {
          userId: user.id,
          point,
        },
        {
          transaction: t,
        }
      );

      await GameSkinUser.create(
        {
          userId: user.id,
          productId: 1, // 기본 사용 스킨
          isUse: true,
        },
        {
          transaction: t,
        }
      );
    });

    return await User.findOne({
      where: {
        userId,
      },
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports.login = async (id) => {
  const result = await this.findPw(id);

  return result?.dataValues.userPw;
};

module.exports.loginTmp = async (id, pw) => {
  const result = await this.findPw(id);

  if (!result) return;

  if (result?.dataValues.userPw != pw) return;

  return id;
};

module.exports.updateRefreshToken = async (userId, refreshToken) => {
  try {
    await User.update(
                      {
                        refreshToken,
                        lastLogin : new Date()
                      },
                      {
                        where: { userId },
                      }
                    );
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports.findPw = async (userId) => {
  try {
    return await User.findOne({
      attributes: ["userPw"],
      where: {
        userId,
      },
      // raw: true
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};


module.exports.findUser = async (userId) => {
  try {
    return await User.findOne({
      attributes: ["userId", "userPw", "authorityId", "conditionId", "refreshToken"],
      where: {
        userId,
      },
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports.useIdOverlap = async (userId) => {
  try {
    const user = await User.findOne({
      attributes: ["userId"],
      where: {
        userId,
      },
    });

    if (!user) return false;
    else return true;
  } catch (err) {
    console.error(err);
    return "err";
  }
};

// 마이페이지 조회
module.exports.userMyPage = async (userId) => {
  try {
    return await User.findOne({
      where: {
        userId,
      },
      // raw: true
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};

// 마이페이지 내에서 비밀번호 변경
module.exports.myPageUpdatePw = async (userId, userPw) => {
  try {
    return await User.update(
      {
        userPw,
      },
      {
        where: { userId },
      }
    );
  } catch (err) {
    console.error(err);
    return err;
  }
};

// 이메일
module.exports.useEmail = async (email) => {
  // console.log(email);
  // result는 *전체 객체로 나오기 때문에 꼭!! 키에 접근을 해주어야한다.
  try {
    return await User.findOne({
      where: {
        email,
      },
      // raw: true
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};
// 이메일
module.exports.findId = async (email) => {
  try {
    return await User.findOne({
      where: {
        email,
      },
      // raw: true
    },console.log(email));
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports.listUserSearching = async (offset, limit, userId, authorityId, conditionId) => {
  const where = {};
  if(!!userId) where.userId = { [Op.like]: `%${userId}%` }
  if(!!authorityId) where.authorityId = authorityId;                   
  if(!!conditionId) where.conditionId = conditionId;
  try {
    return await User.findAndCountAll({
                                    attributes : ["userId", "authorityId", "conditionId", "createdAt", "lastLogin"],
                                    include : [
                                      {
                                        attributes : ["stopFewDays"],
                                        model : InactiveUser
                                      },
                                      {
                                        attributes : ["name"],
                                        model : Authority
                                      },
                                      {
                                        attributes : ["name"],
                                        model : ConditionUser
                                      }
                                    ],
                                    where,
                                    offset,
                                    limit
                                });
  } catch (err) {
    console.error(err);
    return false;
  }
  
}

module.exports.updateConditionApproval = async (userId) => {
  try {
    return await User.update({
      conditionId : CONDITION.ACTIVITY
    },
    {
      where : { userId }
    });
  } catch (err) {
    console.error(err);
    return false;
  }

}