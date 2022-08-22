const { User } = require("../model/index")
// const { CreateToken, SetSessionToken } = require("../modules/Token");
const Token = require("../modules/token");

const Encryption = require("../modules/encryption");

module.exports.Login = (req) => {
    const id = req.body.user_id;
    const pw = req.body.user_pw;

    const result = this.findPw(id);

    
    // if(!!result?.userPw) return;

    // console.log(Encryption.PwEncryption(pw));
    console.log("............");
    console.log(result);
    console.log(result.userId);

    // const isLogin = Encryption.IsPwCheck(pw, result.userPw);

    // 로그인 실패 문구나 코드가 필요 일단 빈 값 리턴
    // if(!isLogin) return; 
    
    // 토큰 생성
    const accessToken = Token.CreateAccessToken(id);
    const refreshToken = Token.CreateRefreshToken(id);

    // 세션에 토큰 저장
    Token.SetSessionAccessToken(req, accessToken);
    Token.SetSessionRefreshToken(req, refreshToken);

    // User 테이블에 리프레쉬 토큰 저장
    this.UpdateRefreshToken(id, refreshToken);

    return id;
}

module.exports.UpdateRefreshToken = (userId, refreshToken) => {
    try {
        User.update(
            {
                refreshToken
            },
            {
                where : { userId }
            }
        );
    } catch (error) {
        console.error(err);
        return err;
    }
}

module.exports.findPw = (userId) => {
    try {
        return User.findOne(
            {
                // attributes: ["userPw"],
                where : { 
                            userId
                        }
            });
    } catch (err) {
        console.error(err);
        return null;
    }   
}