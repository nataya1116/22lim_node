const {
  User,
  PointHistory,
  PointTotal,
  PointType,
  GameSkinUser,
  sequelize,
} = require("../model/index");
const { POINT } = require("../config/config");

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
      },
      {
        where: { userId },
      }
    );
  } catch (error) {
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
      attributes: ["userPw", "authorityId", "refreshToken"],
      include: [
        {
          attributes: ["point"],
          model: PointTotal,
        },
      ],
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

// module.exports.emailOverlap = async (email) => {
//   try {
//     const user = await User.findOne({
//       attributes: ["email"],
//       where: {
//         email,
//       }
//     });

//     if (!user) return false;

//     else return true;

//   } catch (err) {
//     console.error(err);
//     return "err";
//   }
// }

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
    await User.update(
      {
        userPw,
      },
      {
        where: { userId },
      }
    );
  } catch (error) {
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
