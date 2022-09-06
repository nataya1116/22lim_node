const { GameSkinUserService,
        GameSkinProductsService, 
        TokenService,
        PointTotalService } = require("../service");

module.exports.buy = async (req, res) => {

    const accessToken = req.session?.access_token;
    let User = TokenService.verifyAccessToken(accessToken);

    // 최신 토탈 포인트 값을 가져오기 위해서 데이터 데이스에서 다시 값을 가져온다.
    if(!User) return res.send({ result : "fail" });

    let userPoint = await PointTotalService.findPoint(User.userId);
    
    const productId = Number(req.body.productId);
    const productPoint = await GameSkinProductsService.findPoint(productId);

    if(userPoint < productPoint) return res.send({ result : "lack", point : userPoint });
    
    const result = await GameSkinUserService.create(User.userId, productId);
    if(!result) return res.send({ result : "fail" });
    
    userPoint = await PointTotalService.findPoint(User.userId);

    return res.send({ result : "suc", point : userPoint });
};

module.exports.use = async (req, res) => {

    const userId = req.body.userId;
    const productId = Number(req.body.productId);

    const result = await GameSkinUserService.use(userId, productId, true);

    if(!result) return res.send("fail");
    return res.send("suc");
};