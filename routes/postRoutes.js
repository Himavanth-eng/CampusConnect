const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const postController =
require("../controllers/postController");
const isAuthor =
require("../middleware/isAuthor");
const upload =require("../middleware/upload");
router.get(
   "/posts/:id/edit",
   auth,
   isAuthor,
   postController.editPostPage
);
router.get(
    "/posts/new",
    auth,
    postController.showNewPost
);
router.post(
    "/posts",
    auth,
    upload.single("postFile"),
    postController.createPost
);

router.get(
    "/posts",
    auth,
    postController.getPosts
);

router.get(
    "/myposts",
    auth,
    postController.getMyPosts
);

router.get(
    "/posts/:id/edit",
    auth,
    postController.editPostPage
);

router.put(
   "/posts/:id",
   auth,
   isAuthor,
   postController.updatePost
);

router.delete(
   "/posts/:id",
   auth,
   isAuthor,
   postController.deletePost
);
router.get(
    "/my-posts",
    auth,
    postController.myPosts
);
module.exports = router;