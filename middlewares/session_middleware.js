const UserService = require("../service/user_service");
const TokenService = require("../service/token_service");

module.exports.validity = async (req, res, next) => {
    const accessToken = await req.session?.access_token;
    const refreshToken = await req.session?.refresh_token;

    if(!accessToken || !refreshToken) {
        return  res.redirect("/user/login");
    }   
    const decodeAcc = TokenService.verifyAccessToken(accessToken);
    
    if(decodeAcc){
        return  next();
    }

    const decodeRe = TokenService.verifyRefreshToken(refreshToken);

    if (!decodeRe) {
        return res.redirect("/user/login");
    }

    const userId = decodeRe.userId;
    const result = await UserService.findUser(userId);
    const user = result.dataValues;

    if (refreshToken != user.refreshToken) {
        return res.redirect("/user/login");
    }
    const point = user.PointTotal.point;
    const authorityId = user.authorityId;
        
    const accessTokenRe = TokenService.createAccessToken(userId, point, authorityId);

    req.session.access_token = accessTokenRe;
    
    return next();
}

module.exports.pass = async (req, res, next) => {
    const accessToken = await req.session?.access_token;
    const refreshToken = await req.session?.refresh_token;

    if(!accessToken || !refreshToken) {
        return  next();
    }
    const decodeAcc = TokenService.verifyAccessToken(accessToken);
    
    if(decodeAcc){
        return  next();
    }

    const decodeRe = TokenService.verifyRefreshToken(refreshToken);

    if (!decodeRe) {
        return next();
    }

    const userId = decodeRe.userId;
    const result = await UserService.findUser(userId);
    const user = result.dataValues;

    if (refreshToken != user.refreshToken) {
        return next();
    }
    const point = user.PointTotal.point;
    const authorityId = user.authorityId;
        
    const accessTokenRe = TokenService.createAccessToken(userId, point, authorityId);

    req.session.access_token = accessTokenRe;
    
    return next();
}
