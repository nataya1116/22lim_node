const { express } = require("../modules/common");

const router = express.Router();

router.get("/",(req,res)=>{
  res.render("find_pw")
});

module.exports = router;