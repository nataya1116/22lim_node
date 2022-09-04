const TokenService = require("../service/token_service");

module.exports.index = (req, res) => {
  const accessToken = req.session?.access_token;
  const User = TokenService.verifyAccessToken(accessToken);

  res.render("index", { User });
};
