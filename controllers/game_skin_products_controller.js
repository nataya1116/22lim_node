const SkinProductsService = require("../service/game_skin_products_service");
const UserService = require("../service/user_service");
const TokenService = require("../service/token_service");

module.exports.list = async (req, res) => {
    const accessToken = req.session?.access_token;
    let User = TokenService.verifyAccessToken(accessToken);

    if(User){
        User = await UserService.findUser(User.userId);
    }

    const pageNum = Number(req.params.page || "1");
    const limit = Number(req.params.perPage || "10");

    let offset = 0;
  
    if (pageNum > 1) {
      offset = limit * (pageNum - 1);
    }

    const result = await SkinProductsService.list(offset, limit);
    const list = result?.rows;
    const productNum = result?.count;
    const totalPage = Math.ceil(productNum / limit);
    const url = "/skin_products/list";
    
    res.render("skin_list", { User, list, url, totalPage , pageNum, limit, searchWord : null });
};

module.exports.listWish = async (req, res) => {
    const accessToken = req.session?.access_token;
    let User = TokenService.verifyAccessToken(accessToken);

    if(User){
        User = await UserService.findUser(User.userId);
    }

    const pageNum = Number(req.params.page || "1");
    const limit = Number(req.params.perPage || "10");

    let offset = 0;
  
    if (pageNum > 1) {
      offset = limit * (pageNum - 1);
    }

    const result = await SkinProductsService.listWish(User.userId, 0, 1000);
    const list = result?.rows;
    const productNum = result?.count;
    console.log("productNum",productNum);
    console.log(list);
    const totalPage = Math.ceil(productNum / limit);
    const url = "/skin_products/list_wish";

    res.render("skin_list", { User, list, url, totalPage , pageNum, limit, searchWord : null });
};

module.exports.listUse = async (req, res) => {
    const accessToken = req.session?.access_token;
    let User = TokenService.verifyAccessToken(accessToken);

    if(User){
        User = await UserService.findUser(User.userId);
    }

    const pageNum = Number(req.params.page || "1");
    const limit = Number(req.params.perPage || "10");

    let offset = 0;

    const result = await SkinProductsService.listUse(User.userId, 0, 1000);
    const list = result?.rows;
    const productNum = result?.count;
    console.log("productNum",productNum);
    const totalPage = Math.ceil(productNum / limit);
    const url = "/skin_products/list_use";

    res.render("skin_list", { User, list, url, totalPage , pageNum, limit, searchWord : null });
};