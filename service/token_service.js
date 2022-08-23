
const { jwt , dot } = require("../modules/common");

dot.config();

module.exports.CreateAccessToken = (userId) => {
    
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

module.exports.CreateRefreshToken = (userId) => {
    
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

