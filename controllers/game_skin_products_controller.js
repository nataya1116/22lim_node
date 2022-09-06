const { GameSkinProductsService, 
        GameSkinUserService, 
        GameSkinWishService, 
        UserService,
        PointTotalService, 
        TokenService } = require("../service");

module.exports.list = async (req, res) => {
    const accessToken = req.session?.access_token;
    let User = TokenService.verifyAccessToken(accessToken);

    const pageNum = Number(req.params.page || "1");
    const limit = Number(req.params.perPage || "12");

    let offset = 0;

    if (pageNum > 1) {
    offset = limit * (pageNum - 1);
    }

    const result = await GameSkinProductsService.list(offset, limit);
    const list = result?.rows;
    const productNum = await GameSkinProductsService.count();

    const totalPage = Math.ceil(productNum / limit);
    const url = "/skin_products/list";

    const button = "all";

    const point = await PointTotalService.findPoint(User.userId);

    res.render("skin_list", { User, point, list, url, totalPage , pageNum, limit, button, searchWord : null });
};

module.exports.listWish = async (req, res) => {
    const accessToken = req.session?.access_token;
    let User = TokenService.verifyAccessToken(accessToken);

    const pageNum = Number(req.params.page || "1");
    const limit = Number(req.params.perPage || "12");

    let offset = 0;

    if (pageNum > 1) {
        offset = limit * (pageNum - 1);
    }
    
    const result = await GameSkinProductsService.listWish(User.userId, offset, limit);
    const list = result?.rows;
    const productNum = await GameSkinWishService.count(User.userId);

    const totalPage = Math.ceil(productNum / limit);
    const url = "/skin_products/list_wish";

    const button = "wish";

    const point = await PointTotalService.findPoint(User.userId);

    res.render("skin_list", { User, point, list, url, totalPage , pageNum, limit, button, searchWord : null });
};

module.exports.listOwn = async (req, res) => {
    const accessToken = req.session?.access_token;
    let User = TokenService.verifyAccessToken(accessToken);

    const pageNum = Number(req.params.page || "1");
    const limit = Number(req.params.perPage || "12");

    let offset = 0;

    if (pageNum > 1) {
        offset = limit * (pageNum - 1);
    }

    const result = await GameSkinProductsService.listOwn(User.userId, offset, limit);
    const list = result?.rows;
    const productNum = await GameSkinUserService.count(User.userId);

    const totalPage = Math.ceil(productNum / limit);
    const url = "/skin_products/list_own";

    const button = "own";
    
    const point = await PointTotalService.findPoint(User.userId);

    res.render("skin_list", { User, point, list, url, totalPage , pageNum, limit, button, searchWord : null });
};