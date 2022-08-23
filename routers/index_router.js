const { express } = require("../modules/common");

const router = express.Router();

router.get('/', (req, res) => {
    // res.render("index");
    res.render("index");
});

router.get('/gg', (req, res) => {
    // res.render("index");
    res.render("index");
});

module.exports = router;  