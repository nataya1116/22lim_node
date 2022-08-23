const { User } = require("../model/index")
// const { CreateToken, SetSessionToken } = require("../modules/Token");
const Token = require("../service/token_service");

const Encryption = require("../service/encryption_service");

// 서비스 단에는 req, res을 직접적으로 처리하지 않는다.
// module.exports.Login = async (id, pw, session) => {

//     const result = await this.findPw(id);

//     if(!result?.dataValues.userPw) return;

//     const isLogin = Encryption.IsPwCheck(pw, result.userPw);

//     // 로그인 실패 문구나 코드가 필요 일단 빈 값 리턴
//     if(!isLogin) return; 
    
//     // 토큰 생성
//     const accessToken = Token.CreateAccessToken(id);
//     const refreshToken = Token.CreateRefreshToken(id);

//     // 세션에 토큰 저장
//     Token.SetSessionAccessToken(session, accessToken);
//     Token.SetSessionRefreshToken(session, refreshToken);

//     // User 테이블에 리프레쉬 토큰 저장
//     this.UpdateRefreshToken(id, refreshToken);

//     return id;
// }

module.exports.LoginTmp = async (id, pw) => {
    
    const result = await this.findPw(id);

    if(!result) return;

    if(result?.dataValues.userPw != pw) return;

    return id;
}

module.exports.UpdateRefreshToken = async (userId, refreshToken) => {
    try {
        await User.update(
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

module.exports.findPw = async (userId) => {
    try {
        return await User.findOne({
                                // attributes: ["userPw"],
                                where : { 
                                            userId
                                        },
                                // raw: true
                            });
    } catch (err) {
        console.error(err);
        return null;
    }   
}