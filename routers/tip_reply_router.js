const { express } = require("../modules/common");

const router = express.Router();

const tipReplyController = require("../controllers/tip_reply_controller");

router.post("/create",tipReplyController.create);

router.post("/create_nested",tipReplyController.createNested);

router.post("/update", tipReplyController.update);

// router.get("/update/:id/:offset", tipReplyController.updatePrint);

router.get("/delete/:id/:offset", tipReplyController.delete)



module.exports = router;
