const { express } = require("../modules/common");

const router = express.Router();

const userController = require("../controllers/user_controller");

router.get('/login', (req, res) => {
    res.render("login");
});

router.post("/login", userController.login);

module.exports = router;  