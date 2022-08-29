const { bcrypt } = require("../modules/common");

const TEN_TIMES = 10;

module.exports.pwEncryption = (pw) => {
  return bcrypt.hashSync(pw, TEN_TIMES);
};

module.exports.isPwCheck = (pw, encryptedPw) => {
  return bcrypt.compareSync(pw, encryptedPw);
};
