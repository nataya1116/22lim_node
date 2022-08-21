const { express } = require("../modules/common");

const router = express.Router();

router.get('/login', (req, res) => {
    res.render("login");
});

module.exports = router;  