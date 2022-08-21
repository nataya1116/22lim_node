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

module.exports = config ;