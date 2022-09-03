const UserService = require("../service/user_service");
const TokenService = require("../service/token_service");
const EncryptionService = require("../service/encryption_service");
const { mailer, jwt } = require("../modules/common");
const { config } = require("../config/config");
const randomNum = require("../service/random");
const { AUTHORITY, CONDITION } = require("../config/config");

module.exports.signUp = async (req, res) => {
  const { userName, userId, userPw, phone, email } = req.body;

  const authorityId = AUTHORITY.USER;

  const conditionId = CONDITION.ACTIVITY;

  const encryptedPw = EncryptionService.pwEncryption(userPw);

  const result = await UserService.create({
    userName,
    userId,
    userPw: encryptedPw,
    phone,
    email,
    authorityId,
    conditionId,
  });
  if (!result) res.send("fail");
  else res.send("suc");
};

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
      const randNum = randomNum();
      // req.session.randomNum = ranNum;
      req.session.email_token = jwt.sign(
        { randNum },
        process.env.ET_SECRET_KEY,
        {
          expiresIn: "3m",
        }
      );

      let sendmail = {
        // toEmail: email.email,
        toEmail: email,
        subject: `안녕하세요 22lim 인증번호입니다.`,
        text: `${email}님 반갑습니다. 이메일 인증번호는 <h1>${randNum}</h1> 입니다. 인증번호 칸에 입력 후 인증 확인 부탁드립니다.`,
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
        if (err) {
          console.log(err);
          res.send("err");
        } else console.log("send success", info.response);
      });
      res.send("suc");
    } else {
      res.send("fail");
    }
  });
};

// 이메일 인증번호 체크
module.exports.emailNumCheck = (req, res) => {
  const randNum = req.body.randNum;
  const emailToken = req.session.email_token;
  let decode;
  try {
    decode = jwt.verify(emailToken, process.env.ET_SECRET_KEY);
    if (randNum === decode.randNum) {
      res.send("suc");
    } else {
      res.send("wrong");
    }
  } catch (error) {
    res.send("fail");
  }
};

// 로그인
module.exports.login = async (req, res) => {
  const userId = req.body.user_id;
  const userPw = req.body.user_pw;

  const result = await UserService.findUser(userId);
  const user = result.dataValues;
  const encryptedPw = user.userPw;
  const isLogin = EncryptionService.isPwCheck(userPw, encryptedPw);

  if (user && isLogin) {
    const point = user.PointTotal.point;
    const authorityId = user.authorityId;

    const accessToken = TokenService.createAccessToken(
      userId,
      point,
      authorityId
    );
    const refreshToken = TokenService.createRefreshToken(
      userId,
      point,
      authorityId
    );

    req.session.access_token = accessToken;
    req.session.refresh_token = refreshToken;

    UserService.updateRefreshToken(userId, refreshToken);

    res.redirect("/");
  } else {
    res.redirect("/login");
  }
};

module.exports.loginView = (req, res) => {
  const userId = null;
  res.render("login", { userId });
};

// 마이페이지------------------------------
module.exports.userMyPage = async (req, res) => {
  const accessToken = req.session?.access_token;
  const User = TokenService.verifyAccessToken(accessToken);
  const userId = User?.userId;

  // userMyPage의 매개변수로 아이디를 넣어주면 된다
  // 나중에 데이터에서 가져올 유저의 아이디 값을 주면 됨
  await UserService.userMyPage(userId).then((e) => {
    // render의 두번째 매개변수로 받아올 데이터?...
    res.render("mypage", { data: e });
  });
};

// 마이페이지에서 비밀번호 변경창
module.exports.myPageUpdatePw = async (req, res) => {
  const newPw = req.body.newPw;
  const encryptedPw = EncryptionService.pwEncryption(newPw);
  const accessToken = req.session?.access_token;
  const User = TokenService.verifyAccessToken(accessToken);
  const userId = User?.userId;
  await UserService.myPageUpdatePw(userId, encryptedPw).then((e) => {
    res.render("update_pw", { data: e });
  });
};

module.exports.useIdOverlap = async (req, res) => {
  const userId = req.body.userId;
  const result = await UserService.useIdOverlap(userId);
  res.send(result);
};

module.exports.emailOverlap = async (req, res) => {
  const email = req.body.email;
  const result = await UserService.emailOverlap(email);
  res.send(result);
};
