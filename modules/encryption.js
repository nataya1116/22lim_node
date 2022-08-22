const { bcrypt } = require("../modules/common");

const TEN_TIMES = 10;

module.exports.PwEncryption = (pw) => {
    return bcrypt.hashSync(pw, TEN_TIMES);
}

module.exports.IsPwCheck = (pw, encryptedPw) => {
    return bcrypt.compareSync(pw, encryptedPw);
}