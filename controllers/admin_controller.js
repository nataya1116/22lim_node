const { UserService,
        TokenService} = require("../service");
const { AUTHORITY, CONDITION } = require("../config/config");
module.exports.listUser = async (req, res) => {
    const accessToken = req.session?.access_token;
    const User = TokenService.verifyAccessToken(accessToken);

    const pageNum = Number(req.params.page || "1");
    const limit = Number(req.params.perPage || "10");
    const conditionId = Number(req.params.conditioId || "0");
    const authorityId = Number(req.params.authorityId || "0");
    const searchUserId = (req.params.searchUserId || null);
  
    let offset = 0;

    if (pageNum > 1) {
        offset = limit * (pageNum - 1);
    }
  
    const result = await UserService.listUserSearching(offset, limit, searchUserId, authorityId, conditionId);

    const list = result?.rows;
    const postNum = result?.count;
    const totalPage = Math.ceil(postNum / limit);
    
    res.render("user_lits", { User, list , totalPage , pageNum, limit, authorityId, conditionId, searchUserId, AUTHORITY, CONDITION });
} 