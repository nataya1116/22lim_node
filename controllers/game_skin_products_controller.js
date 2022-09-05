const { GameSkinProductsService, 
        GameSkinUserService, 
        GameSkinWishService, 
        UserService, 
        TokenService } = require("../service/index");

module.exports.list = async (req, res) => {
    const accessToken = req.session?.access_token;
    let User = TokenService.verifyAccessToken(accessToken);

    if(User){
        const user = await UserService.findUser(User.userId);
        console.log(user);
        User.point = user.dataValues.PointTotal.point
    }

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
    
    res.render("skin_list", { User, list, url, totalPage , pageNum, limit, searchWord : null });
};

module.exports.listWish = async (req, res) => {
    const accessToken = req.session?.access_token;
    let User = TokenService.verifyAccessToken(accessToken);

    if(User){
        const user = await UserService.findUser(User.userId);
        User.point = user.dataValues.PointTotal.point
    }

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

    res.render("skin_list", { User, list, url, totalPage , pageNum, limit, searchWord : null });
};

module.exports.listUse = async (req, res) => {
    const accessToken = req.session?.access_token;
    let User = TokenService.verifyAccessToken(accessToken);

    if(User){
        const user = await UserService.findUser(User.userId);
        User.point = user.dataValues.PointTotal.point
    }

    const pageNum = Number(req.params.page || "1");
    const limit = Number(req.params.perPage || "12");

    let offset = 0;

    const result = await GameSkinProductsService.listUse(User.userId, offset, limit);
    const list = result?.rows;
    const productNum = await GameSkinUserService.count(User.userId);

    const totalPage = Math.ceil(productNum / limit);
    const url = "/skin_products/list_use";

    res.render("skin_list", { User, list, url, totalPage , pageNum, limit, searchWord : null });
};