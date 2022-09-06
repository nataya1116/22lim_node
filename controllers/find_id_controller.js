const UserService = require("../service/user_service");
const { mailer, jwt } = require("../modules/common");
const { config } = require("../config/config");
const TokenService = require("../service/token_service");

module.exports.idEmailSend = (req, res) => {
  let userEmail = req.body.userEmail;
  const accessToken = req.session?.access_token;
  const User = TokenService.verifyAccessToken(accessToken);
  const userId = User?.userId;

  UserService.findId(userEmail).then((e) => {
    if (e !== null) {
      let sendmail = {
        toEmail: userEmail,
        subject: `안녕하세요 22lim 아이디 조회 결과입니다.`,
        text: `${userEmail}님의 아이디는, <h1>${e.userId}</h1> 입니다.`,
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
module.exports.findIdView = (req, res) => {
  const accessToken = req.session?.access_token;
  const User = TokenService.verifyAccessToken(accessToken);
  res.render("find_id", { User });
};
