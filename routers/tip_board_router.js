const { express } = require("../modules/common");

const router = express.Router();

const tipBoardController = require("../controllers/tip_board_controller");

router.get("/list/:page/:perPage/", tipBoardController.list);

router.get("/list/:page/:perPage/:searchKey/:searchWord", tipBoardController.listSearch);

router.get("/read/:offset", tipBoardController.view);

router.get("/update/:id/:offset", tipBoardController.update);

router.get("/delete/:id/", tipBoardController.delete)

// router.get("/test/:tq", (req, res) => {
//     console.log("router test호출하는 부분");
//     tipBoardController.test(req, res);
// });

module.exports = router;
