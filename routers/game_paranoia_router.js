const { express } = require("../modules/common");

const router = express.Router();

router.get("/",(req,res)=>{
  res.render("game_paranoia")
});

module.exports = router;