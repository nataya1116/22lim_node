const SkinUserService = require("../service/game_skin_user_service");
const SkinProductsService = require("../service/game_skin_products_service");
const TokenService = require("../service/token_service");
const UserService = require("../service/user_service");
const PointTotalService = require("../service/point_total_service");

module.exports.create = async (req, res) => {

    const accessToken = req.session?.access_token;
    let User = TokenService.verifyAccessToken(accessToken);

    // 최신 토탈 포인트 값을 가져오기 위해서 데이터 데이스에서 다시 값을 가져온다.
    if(!User) return "fail";

    User = await UserService.findUser(User.userId);
    
    const userId = req.body.userId;
    const productId = Number(req.body.productId);
    const point = await SkinProductsService.findPoint(productId);

    if(User.dataValues.point < point) return "lack";
    
    const result = await SkinUserService.create(userId, productId);
    if(!result) return res.send({ result : "fail" });
    
    const totalPoint = await PointTotalService.findPoint(userId);

    return res.send({ result : "suc", point : totalPoint.dataValues.point});
};

module.exports.use = async (req, res) => {

    const userId = req.body.userId;
    const productId = Number(req.body.productId);

    const result = await SkinUserService.use(userId, productId, true);

    if(!result) return res.send("fail");
    return res.send("suc");
};