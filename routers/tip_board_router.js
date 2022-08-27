const { express } = require("../modules/common");

const router = express.Router();

const tipBoardController = require("../controllers/tip_board_controller");

router.get("/tip_board/list/:page/:perPage", tipBoardController.list);

module.exports = router;
