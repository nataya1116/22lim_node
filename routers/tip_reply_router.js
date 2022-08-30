const { express } = require("../modules/common");

const router = express.Router();

const tipReplyController = require("../controllers/tip_reply_controller");

router.post("/create",tipReplyController.create);

// router.get("/update/:id/:offset", tipBoardController.updatePrint);

// router.get("/delete/:id/", tipBoardController.delete)

module.exports = router;
