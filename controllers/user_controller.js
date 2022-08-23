const { User } = require("../model");
const userService = require("../service/user_service");


module.exports.login = async (req, res) => {
    const id = req.body.user_id;
    const pw = req.body.user_pw;
    // const result = await userService.Login(id, pw, req.session);
    const result = await userService.LoginTmp(id, pw);
    
    if(result) {
        req.session.userId = id;

        res.redirect("/");
    }
    else {
        res.redirect("/login");
    }
}

