const { express } = require("../modules/common");

const router = express.Router();

const tipBoardController = require("../controllers/tip_board_controller");

router.get("/tip_board/:", (req, res) => {
  res.render("login");
});

// router.post("/login", userController.loginTmp);
router.post("/login", userController.login);

module.exports = router;
