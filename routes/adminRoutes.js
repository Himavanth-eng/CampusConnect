const express =
require("express");

const router =
express.Router();

const auth =
require("../middleware/auth");

const isAdmin =
require("../middleware/isAdmin");

const adminController =
require("../controllers/adminController");

router.get(
   "/admin",
   auth,
   isAdmin,
   adminController.dashboard
);
router.post(
   "/admin/posts/:id/delete",
   auth,
   isAdmin,
   adminController.deletePost
);
router.post(
   "/admin/users/:id/delete",
   auth,
   isAdmin,
   adminController.deleteUser
);
router.post(
   "/admin/comments/:id/delete",
   auth,
   isAdmin,
   adminController.deleteComment
);
module.exports = router;