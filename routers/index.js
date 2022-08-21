const { express } = require("../modules/common");

const router = express.Router();

router.get('/', (req, res) => {
    // res.render("index");
    res.render("login");
});


module.exports = router;  