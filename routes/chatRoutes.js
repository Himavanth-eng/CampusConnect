const express =
require("express");

const router =
express.Router();

const auth =
require("../middleware/auth");

const chatController =
require("../controllers/chatController");

router.get(
    "/chat/:id",
    auth,
    chatController.chatPage
);

router.post(
    "/chat/:id",
    auth,
    chatController.sendMessage
);

module.exports = router;