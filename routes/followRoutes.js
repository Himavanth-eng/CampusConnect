const express = require("express");

const router = express.Router();

const auth =
require("../middleware/auth");

const userController =
require("../controllers/userController");

router.post(
   "/follow/:id",
   auth,
   userController.followUser
);

module.exports = router;