const { express } = require("../modules/common");

const router = express.Router();

const tipBoardController = require("../controllers/tip_board_controller");

router.get("/list/:page/:perPage/", (req, res) => {
    console.log("router list호출하는 부분");
    tipBoardController.list(req, res);
});

router.get("/list/:page/:perPage/:searchKey/:searchWord", tipBoardController.listSearch);

router.get("/test/:tq", (req, res) => {
    console.log("router test호출하는 부분");
    tipBoardController.test(req, res);
});

module.exports = router;
