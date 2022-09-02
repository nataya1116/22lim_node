const { User, PointHistory, PointTotal, PointType, sequelize } = require("../model/index");
const { POINT } = require("../config/config");

// GameSkinUser/PointHistory/PointTotal 추가
module.exports.create = async ({userName, userId, userPw, phone, email, }) => {

  try {
    sequelize.transaction(async (t) => {
      const user = await User.create({
                                        userName, 
                                        userId, 
                                        userPw, 
                                        phone, 
                                        email
                                      },
                                      {
                                        transaction: t
                                      });
      const userId = user.dataValues.id;

      const pointType = await PointType.findOne({
                                                  where : {
                                                    id : POINT.JOIN
                                                  }
                                                });
      const point = pointType.dataValues.point;
      const typeId = POINT.JOIN;

      await PointHistory.create({
                                  userId,
                                  typeId
                                },
                                {
                                  transaction: t
                                });
      await PointTotal.create({
                                userId,
                                point
                              },
                              {
                                transaction: t
                              });

    });
  } catch (err) {
    console.log(err);
    return false;
  }
   
}

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
      include : [
        {
          attributes : ["point"],
          model : PointTotal
        }
      ],
      where: {
        userId,
      }
    });
  } catch (err) {
    console.error(err);
    return null;
  }
}

// 마이페이지 수정 DB 조회
module.exports.userMyPageEdit = async (userId) => {
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
