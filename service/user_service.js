const { User } = require("../model/index");

// 서비스 단에는 req, res을 직접적으로 처리하지 않는다.
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

// 마이페이지 수정 DB 조회
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
