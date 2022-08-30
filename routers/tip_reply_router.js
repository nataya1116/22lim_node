const { express } = require("../modules/common");

const router = express.Router();

const TipReplyController = require("../controllers/tip_reply_controller");

router.post("/create",TipReplyController.create);

router.post("/create_nested",TipReplyController.createNested);

router.post("/update", TipReplyController.update);

// router.get("/update/:id/:offset", TipReplyController.updatePrint);

router.get("/delete/:id/:offset", TipReplyController.delete)



module.exports = router;
