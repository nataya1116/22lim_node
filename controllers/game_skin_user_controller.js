const { GameSkinUserService,
        GameSkinProductsService, 
        UserService, 
        TokenService,
        PointTotalService } = require("../service/index");

module.exports.create = async (req, res) => {

    const accessToken = req.session?.access_token;
    let User = TokenService.verifyAccessToken(accessToken);

    // 최신 토탈 포인트 값을 가져오기 위해서 데이터 데이스에서 다시 값을 가져온다.
    if(!User) return "fail";

    const user = await UserService.findUser(User.userId);
    User.point = user.dataValues.PointTotal.point
    
    const userId = req.body.userId;
    const productId = Number(req.body.productId);
    const point = await GameSkinProductsService.findPoint(productId);

    if(User.point < point) return "lack";
    
    const result = await GameSkinUserService.create(userId, productId);
    if(!result) return res.send({ result : "fail" });
    
    const totalPoint = await PointTotalService.findPoint(userId);

    return res.send({ result : "suc", point : totalPoint.dataValues.point});
};

module.exports.use = async (req, res) => {

    const userId = req.body.userId;
    const productId = Number(req.body.productId);

    const result = await GameSkinUserService.use(userId, productId, true);

    if(!result) return res.send("fail");
    return res.send("suc");
};