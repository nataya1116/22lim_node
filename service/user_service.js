const { User } = require("../model/index")

const Token = require("../service/token_service");

// 서비스 단에는 req, res을 직접적으로 처리하지 않는다.
module.exports.Login = async (id, pw, session) => {

    const result = await this.findPw(id);

    if(!result?.dataValues.userPw) return;

    return result?.dataValues.userPw;
}

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
                                attributes: ["userPw"],
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