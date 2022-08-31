const { dot } = require("../modules/common");

dot.config();

const config = {
    dev : {
        username : "22lim",
        password : process.env.DATABASE_PASSWORD_DEV,
        database : "22lim_test2",
        host : "127.0.0.1",
        dialect : "mysql"
    }
}

const AUTHORITY = {
    MANAGER : 1,
    USER : 2
}

const BOARDS = {
    TIP_BOARD : "tipBoard",
    QNA_BOARD : "qnaBoard",
    FREE_BOARD : "freeBoard"
}
module.exports = { config, AUTHORITY, BOARDS };