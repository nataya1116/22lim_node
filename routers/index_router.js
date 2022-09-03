const { express } = require("../modules/common");
const indexController = require("../controllers/index_controller");
const SessionMiddleware = require("../middlewares/session_middleware");


const router = express.Router();

router.get("/", SessionMiddleware.pass, indexController.index);

router.get("/board_list", (req, res) => {
  // res.render("index");
  res.render("board_list");
});
router.get("/board_inside", (req, res) => {
  // res.render("index");
  res.render("board_inside");
});
router.get("/writing", (req, res) => {
  // res.render("index");
  res.render("writing");
});
router.get("/qna_list", (req, res) => {
  // res.render("index");
  res.render("qna_list");
});

module.exports = router;
