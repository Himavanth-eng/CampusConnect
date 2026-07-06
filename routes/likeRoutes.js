const express =
require("express");

const router =
express.Router();

const auth =
require("../middleware/auth");

const likeController =
require("../controllers/likeController");

router.post(
"/posts/:id/like",
auth,
likeController.toggleLike
);

module.exports = router;