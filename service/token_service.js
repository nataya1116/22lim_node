
const { jwt , dot } = require("../modules/common");

dot.config();

module.exports.createAccessToken = (userId) => {
    
    return jwt.sign(
                    {
                        userId
                    },
                    process.env.ACCESS_TOKEN_KEY,
                    {
                        expiresIn : "10m"
                    }
                );
}

module.exports.createRefreshToken = (userId) => {
    
    return jwt.sign(
                    {
                        userId
                    },
                    process.env.REFRESH_TOKEN_KEY,
                    {
                        expiresIn : "1d"
                    }
                );
}

// module.exports.CheckToken = 

