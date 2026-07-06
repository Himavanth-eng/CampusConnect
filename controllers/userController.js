const User = require("../models/User");
const bcrypt = require("bcrypt");
module.exports.showRegister = (req,res)=>{
    res.render("register");
};

module.exports.registerUser = async(req,res)=>{
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.send(
            "Email already registered"
        );
    }
    const hashedPassword =
    await bcrypt.hash(password,10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    await newUser.save();
    res.redirect("/login");
};

module.exports.showLogin = (req,res)=>{
    res.render("login");
};

module.exports.loginUser = async(req,res)=>{
    const users = await User.find();
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.send("User Not Found");
    }

    const isMatch =
        await bcrypt.compare(
        password,
        user.password
    );
    if(!isMatch){
        return res.send("Wrong Password");
    }

    req.session.userId = user._id;
    res.redirect("/profile");
};

module.exports.profile = async(req,res)=>{
    const user = await User.findById(
        req.session.userId
    );
    res.render("profile",{user});
};

module.exports.logout = (req,res)=>{
    req.session.destroy();
    res.redirect("/login");
};
module.exports.profile =
async(req,res)=>{

   const user =
   await User.findById(
      req.session.userId
   );

   const followersCount =
      user.followers.length;

   const followingCount =
      user.following.length;

   res.render(
      "profile",
      {
         user,
         followersCount,
         followingCount
      }
   );

};
module.exports.updateProfile =
async(req,res)=>{
    const {username,bio,branch} = req.body;
    await User.findByIdAndUpdate(
        req.session.userId,
        {
            username,
            bio,
            branch
        }
    );

    res.redirect(
        "/profile"
    );

};
module.exports.editProfilePage =
async(req,res)=>{

   const user =
   await User.findById(
      req.session.userId
   );

   res.render(
      "editProfile",
      {user}
   );

};

module.exports.followUser = async(req,res)=>{

   const currentUserId = req.session.userId;
   const targetUserId = req.params.id;

   if(
      currentUserId.toString() ===
      targetUserId.toString()
   ){
      return res.redirect("/posts");
   }

   const currentUser =
   await User.findById(currentUserId);

   const targetUser =
   await User.findById(targetUserId);

   if(!currentUser || !targetUser){
      return res.redirect("/posts");
   }

   const alreadyFollowing =
   currentUser.following.includes(
      targetUserId
   );

   if(alreadyFollowing){

      currentUser.following.pull(
         targetUserId
      );

      targetUser.followers.pull(
         currentUserId
      );

      console.log("UNFOLLOWED");

   }else{

      currentUser.following.addToSet(
         targetUserId
      );

      targetUser.followers.addToSet(
         currentUserId
      );

      console.log("FOLLOWED");

   }

   await currentUser.save();
   await targetUser.save();
   res.redirect("/posts");
};

const Post = require("../models/Post");

module.exports.publicProfile =
async(req,res)=>{

   const userId =
   req.params.id;

   const user =
   await User.findById(userId);

   if(!user){
      return res.send(
         "User Not Found"
      );
   }

   const posts =
   await Post.find({
      author:userId
   })
   .populate("author")
   .populate("comments");

   const currentUser =
   await User.findById(
      req.session.userId
   );

   const isFollowing =
   currentUser.following.some(
      id =>
      id.toString() ===
      userId.toString()
   );

   res.render(
      "publicProfile",
      {
         user,
         posts,
         isFollowing
      }
   );

};