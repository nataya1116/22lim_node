const UserService = require("../service/user_service");

module.exports.emailSend = (req, res) => {
    let email = req.body.email;
    req.session.email = email;
  
    UserService.useEmail(email).then((e) => {
      if (e == null) {
        let sendmail = {
          // toEmail: email.email,
          toEmail: email,
          subject: `22lim 아이디`,
          text: `${email}님의 아이디는.  <h1>${req.user.Id}</h1> 입니다.`,
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
          }
          else console.log("send success", info.response);
        });
        res.send("suc");
      } else {
        res.send("fail");
      }
    });
  };