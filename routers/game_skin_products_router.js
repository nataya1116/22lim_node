const { express } = require("../modules/common");

const router = express.Router();

const SkinProdutsController = require("../controllers/game_skin_products_controller");


router.get("/list", SkinProdutsController.list);

module.exports = router;