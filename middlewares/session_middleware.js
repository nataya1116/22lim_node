const { jwt } = require("../modules/common");
const UserService = require("../service/user_service");
const TokenService = require("../service/token_service");

module.exports.validity = async (req, res, next) => {
    const accessToken = await req.session?.access_token;
    const refreshToken = await req.session?.refresh_token;

    if(!accessToken || !refreshToken) res.redirect("/user/login");

    const decodeAcc = TokenService.verifyAccessToken(accessToken);
    
    if(decodeAcc) next();

    const decodeRe = TokenService.verifyRefreshToken(refreshToken);

    if (!decodeRe) res.redirect("/user/login");

    const userId = decodeRe.userId;
    const user = await UserService.findUser(userId);

    if (refreshToken != user.refreshToken) res.redirect("/user/login");

    const point = user.PointTotal.point;
    const authorityId = user.authorityId;
    
    console.log(user);
        
    const accessTokenRe = TokenService.createAccessToken(userId, point, authorityId);

    req.session.access_token = accessTokenRe;
    
    next();
}

