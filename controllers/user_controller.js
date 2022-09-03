const UserService = require("../service/user_service");
const TokenService = require("../service/token_service");
const EncryptionService = require("../service/encryption_service");
const { mailer, jwt } = require("../modules/common");
const { config } = require("../config/config");
const randomNum = require("../service/random");

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
// module.exports.signUp =

// 이메일 인증하기
// module.exports.emailSend = {
//   mailSend: function (tomail) {
//     let transpoter = mailer.createTransport({
//       service: "Naver",
//       port: 587, // 25 587
//       host: "smtp.naver.com",
//       auth: {
//         user: mail.mailer.user,
//         pass: mail.mailer.pw,
//       },
//     });
//     let mailoption = {
//       from: mail.mailer.user,
//       to: tomail.toEmail,
//       subject: tomail.subject,
//       html: tomail.text,
//     };
//     transpoter.sendMail(mailoption, (err, info) => {
//       if (err) console.log(err);
//       else console.log("send success", info.response);
//     });
//   },
// };
module.exports.emailSend = (req, res) => {
  let email = req.body.email;
  req.session.email = email;

  UserService.useEmail(email).then((e) => {
    if (e == null) {
      let ranNum = randomNum();
      req.session.randomNum = ranNum;
      req.session.emailToken = jwt.sign({}, process.env.ET_SECRET_KEY, {
        expiresIn: "3m",
      });

      let sendmail = {
        // toEmail: email.email,
        toEmail: email,
        subject: `안녕하세요 22lim 인증번호입니다.`,
        text: `${email}님 반갑습니다. 이메일 인증번호는 <h1>${ranNum}</h1> 입니다. 인증번호 칸에 입력 후 인증 확인 부탁드립니다.`,
      };

      let transpoter = mailer.createTransport({
        service: "Naver",
        port: 587, // 25 587
        host: "smtp.naver.com",
        auth: {
          user: config.mailer.user,
          pass: config.mailer.pw,
        },
      });

      let mailoption = {
        from: config.mailer.user,
        to: sendmail.toEmail,
        subject: sendmail.subject,
        html: sendmail.text,
      };

      transpoter.sendMail(mailoption, (err, info) => {
        if (err) console.log(err);
        else console.log("send success", info.response);
      });
      res.send("suc");
    } else {
      res.send("fail");
    }
  });
};

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

// 마이페이지------------------------------
module.exports.userMyPage = async (req, res) => {
  // userMyPage의 매개변수로 아이디를 넣어주면 된다
  // 나중에 데이터에서 가져올 유저의 아이디 값을 주면 됨
  UserService.userMyPage("temp").then((e) => {
    // render의 두번째 매개변수로 받아올 데이터?...
    res.render("mypage", { data: e });
  });
};

// 마이페이지에서 비밀번호 변경창
module.exports.myPageUpdatePw = async (req, res) => {
  UserService.myPageUpdatePw("temp").then((e) => {
    res.render("update_pw", { data: e });
  });
};
