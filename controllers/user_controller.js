const userService = require("../service/user_service");


module.exports.login = async (req, res) => {
    const result = await userService.Login(req, res);
    // console.log(result);

    if(result) {res.redirect("/");}
    else {res.redirect("/login");}
}