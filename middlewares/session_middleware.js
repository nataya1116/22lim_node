const { UserService, TokenService } = require("../service");
const { CONDITION, AUTHORITY } = require("../config/config");

module.exports.validity = async (req, res, next) => {
  const accessToken = await req.session?.access_token;
  const refreshToken = await req.session?.refresh_token;
  // 모든 if의 조건이 아닐경우 엑세스토큰 재생성
  if (!accessToken || !refreshToken) {
    return res.redirect("/user/login");
  }
  const decodeAcc = TokenService.verifyAccessToken(accessToken);

  if(decodeAcc.conditionId == CONDITION.INACTIVITY){
    
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write("<script>alert('관리자만 이용 가능합니다.')</script>");
    res.write("<script>window.location='/user/login'</script>");
    return;
  }

  if (decodeAcc) {
    return next();
  }

  const decodeRe = TokenService.verifyRefreshToken(refreshToken);

  if (!decodeRe) {
    return res.redirect("/user/login");
  }

  const userId = decodeRe.userId;
  const result = await UserService.findUser(userId);
  const user = result.dataValues;

  if (refreshToken != user.refreshToken) {
    return res.redirect("/user/login");
  }

  const authorityId = user.authorityId;
  const conditionId = user.conditionId;

  const accessTokenRe = TokenService.createAccessToken(
                                                        userId,
                                                        authorityId,
                                                        conditionId
                                                      );

  req.session.access_token = accessTokenRe;

  return next();
};

module.exports.pass = async (req, res, next) => {
  const accessToken = await req.session?.access_token;
  const refreshToken = await req.session?.refresh_token;

  if (!accessToken || !refreshToken) {
    return next();
  }
  const decodeAcc = TokenService.verifyAccessToken(accessToken);

  if (decodeAcc) {
    return next();
  }

  const decodeRe = TokenService.verifyRefreshToken(refreshToken);

  if (!decodeRe) {
    return next();
  }

  const userId = decodeRe.userId;
  const result = await UserService.findUser(userId);
  const user = result.dataValues;

  if (refreshToken != user.refreshToken) {
    return next();
  }

  const authorityId = user.authorityId;
  const conditionId = user.conditionId;

  const accessTokenRe = TokenService.createAccessToken(
                                                        userId,
                                                        authorityId,
                                                        conditionId
                                                      );

  req.session.access_token = accessTokenRe;

  return next();
};

module.exports.validityAdmin = async (req, res, next) => {
  const accessToken = await req.session?.access_token;
  const refreshToken = await req.session?.refresh_token;

  if (!accessToken || !refreshToken) {
    return res.redirect("/user/login");
  }
  const decodeAcc = TokenService.verifyAccessToken(accessToken);

  if (decodeAcc?.authorityId == AUTHORITY.ADMIN) {
    return next();
  }

  if(decodeAcc){
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write("<script>alert('관리자만 이용 가능합니다.')</script>");
    res.write("<script>window.location='/user/login'</script>");
    return;
  }

  const decodeRe = TokenService.verifyRefreshToken(refreshToken);

  if (!decodeRe) {
    return res.redirect("/user/login");
  }

  if (decodeRe.authorityId != AUTHORITY.ADMIN){
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write("<script>alert('관리자만 이용 가능합니다.')</script>");
    res.write("<script>window.location='/user/login'</script>");
    return;
  }

  const userId = decodeRe.userId;
  const result = await UserService.findUser(userId);
  const user = result.dataValues;

  if (refreshToken != user.refreshToken) {
    return res.redirect("/user/login");
  }

  const authorityId = user.authorityId;
  const conditionId = user.conditionId;

  const accessTokenRe = TokenService.createAccessToken(
                                                        userId,
                                                        authorityId,
                                                        conditionId
                                                      );

  req.session.access_token = accessTokenRe;

  return next();
};
