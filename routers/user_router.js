const { express } = require("../modules/common");

const router = express.Router();

const userController = require("../controllers/user_controller");

router.get("/login2", (req, res) => {
  res.render("login");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/login", userController.loginTmp);
// router.post("/login", userController.login);

module.exports = router;


