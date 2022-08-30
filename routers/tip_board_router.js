const { express } = require("../modules/common");

const router = express.Router();

const TipBoardController = require("../controllers/tip_board_controller");

router.post("/update", TipBoardController.update);

router.get("/list/:page/:perPage/", TipBoardController.list);

router.get("/list/:page/:perPage/:searchKey/:searchWord", TipBoardController.listSearch);

router.get("/read/:offset", TipBoardController.view);

router.get("/update/:id/:offset", TipBoardController.updatePrint);

router.get("/delete/:id/", TipBoardController.delete)

// router.get("/test/:tq", (req, res) => {
//     console.log("router test호출하는 부분");
//     TipBoardController.test(req, res);
// });

module.exports = router;
