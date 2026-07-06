const express =
require("express");

const router =
express.Router();

const auth =
require("../middleware/auth");

const notificationController =
require(
"../controllers/notificationController"
);

router.get(

    "/notifications",

    auth,

    notificationController
    .showNotifications

);

module.exports = router;