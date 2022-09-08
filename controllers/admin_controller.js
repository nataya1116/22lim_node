const { UserService,
        InactiveUserService,
        TokenService} = require("../service");
const { AUTHORITY, CONDITION } = require("../config/config");

module.exports.listUser = async (req, res) => {
    const accessToken = req.session?.access_token;
    const User = TokenService.verifyAccessToken(accessToken);

    const pageNum = Number(req.params.page || "1");
    const limit = Number(req.params.perPage || "10");
    const authorityId = Number(req.params.authorityId || "0");
    const conditionId = Number(req.params.conditionId || "0");
    const searchUserId = (req.params.searchUserId || null);


    let offset = 0;

    if (pageNum > 1) {
        offset = limit * (pageNum - 1);
    }
  
    const result = await UserService.listUserSearching(offset, limit, searchUserId, authorityId, conditionId);

    const list = result?.rows;
    const postNum = result?.count;
    const totalPage = Math.ceil(postNum / limit);
    
    res.render("user_list", { User, list , totalPage , pageNum, limit, authorityId, conditionId, searchUserId, AUTHORITY, CONDITION });
} 

module.exports.approvalUser = async (req, res) => {
    const userId = req.body.userId;

    const result = await UserService.updateConditionApproval(userId);

    if(result) {
        res.send("suc");
    } else {
        res.send("fail");
    }
}

module.exports.stopUser = async (req, res) => {
    const userId = req.body.userId;
    const stopDay = Number(req.body.stopDay);

    const date = new Date();

    date.setDate(date.getDate() + stopDay);

    const result = await InactiveUserService.create(userId, date);

    if(result) {
        res.send({result : "suc", stopDay });
    } else {
        res.send({result :"fail" });
    }
}