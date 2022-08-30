const { express } = require("../modules/common");

const router = express.Router();

const userController = require("../controllers/user_controller");

router.get("/login2", (req, res) => {
  res.render("login");
});

router.get("/login", (req, res) => {
  res.render("login");
});

// 회원가입창
router.get("/signup", (req, res) => {
  // console.log(req);
  res.render("signup");
});

// 임시로 마이페이지 수정을 열었음 나중에 post방식으로 바꿀 것
router.get("/mypage_edit", (req, res) => {
  userController.userMyPageEdit(req, res);
});

// 임시로 만든 라우터! 헤더랑 푸터 붙임
router.get("/shop", (req, res) => {
  res.render("shop");
});

// router.post("/login", userController.loginTmp);
router.post("/login", userController.login);

module.exports = router;
