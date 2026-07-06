const express=require("express");

const router=express.Router();

const auth=require("../middleware/auth");

const userController=require("../controllers/userController");

router.get("/register",
userController.showRegister);

router.post("/register",
userController.registerUser);

router.get("/login",
userController.showLogin);

router.post("/login",
userController.loginUser);
router.get(
"/profile/edit",
auth,
userController.editProfilePage
);
router.get(
    "/profile",
    auth,
    userController.profile
);
router.get("/logout",
userController.logout);
router.get(
   "/user/:id",
   auth,
   userController.publicProfile
);

module.exports=router;