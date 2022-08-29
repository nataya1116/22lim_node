const { express } = require("../modules/common");

const router = express.Router();

router.get("/", (req, res) => {
  // res.render("index");
  res.render("index");
});
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

module.exports = router;
