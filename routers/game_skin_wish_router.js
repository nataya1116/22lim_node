const { express } = require("../modules/common");

const router = express.Router();

const SkinWishController = require("../controllers/game_skin_wish_controller");


router.post("/create", SkinWishController.create);

router.post("/delete", SkinWishController.delete)

module.exports = router;