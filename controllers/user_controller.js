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

module.exports.login = async (req, res) => {
  const id = req.body.user_id;
  const pw = req.body.user_pw;

  const resultPw = await UserService.login(id);

    const isLogin = EncryptionService.isPwCheck(pw, resultPw);
    
    if(resultPw && isLogin) {
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

module.exports.userMyPageEdit = async (req, res) => {
  UserService.userMyPage("temp").then((e) => {
    res.render("mypage_edit", { data: e });
  });
};
