const { express } = require("../modules/common");

const router = express.Router();

const SkinWishController = require("../controllers/game_skin_wish_controller");


router.get("/create/:userId/:productId", SkinWishController.create);

module.exports = router;