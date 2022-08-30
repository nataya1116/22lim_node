const UserService = require("../service/user_service");
const TokenService = require("../service/token_service");
const EncryptionService = require("../service/encryption_service");

module.exports.loginTmp = async (req, res) => {
  const id = req.body.user_id;
  const pw = req.body.user_pw;
  // const result = await UserService.Login(id, pw, req.session);
  const result = await UserService.loginTmp(id, pw);

  if (result) {
    req.session.userId = id;

    res.redirect("/");
  } else {
    res.redirect("/login");
  }
};

// 회원가입
module.exports.signUp =
  // 로그인
  module.exports.login = async (req, res) => {
    const id = req.body.user_id;
    const pw = req.body.user_pw;

    const resultPw = await UserService.login(id);

    const isLogin = EncryptionService.isPwCheck(pw, resultPw);

    if (resultPw && isLogin) {
      const accessToken = TokenService.createAccessToken(id);
      const refreshToken = TokenService.createRefreshToken(id);

      req.session.access_Token = accessToken;
      req.session.refresh_Token = refreshToken;

      UserService.updateRefreshToken(id, refreshToken);

      // console.log(req.session);

      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  };

// 마이페이지(수정 페이지)------------------------------
module.exports.userMyPageEdit = async (req, res) => {
  // userMyPage의 매개변수로 아이디를 넣어주면 된다
  // 나중에 데이터에서 가져올 유저의 아이디 값을 주면 됨
  UserService.userMyPageEdit("temp").then((e) => {
    // render의 두번째 매개변수로 받아올 데이터?...
    res.render("mypage_edit", { data: e });
  });
};
