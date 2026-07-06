const express =
require("express");

const router =
express.Router();

const auth =
require("../middleware/auth");

const commentController =
require("../controllers/commentController");

router.post(
"/posts/:id/comments",
auth,
commentController.createComment
);
router.post(
   "/comments/:id/delete",
   auth,
   commentController.deleteComment
);
router.post(
   "/comments/:id/edit",
   auth,
   commentController.editComment
);

module.exports = router;