const User =
require("../models/User");

const Post =
require("../models/Post");

const Comment =
require("../models/Comment");

module.exports.dashboard =
async(req,res)=>{

   const usersCount =
   await User.countDocuments();

   const postsCount =
   await Post.countDocuments();

   const commentsCount =
   await Comment.countDocuments();

   const users =
   await User.find();

   const posts =
   await Post.find()
   .populate("author");
   const comments = await Comment.find()
   .populate("author")
   .populate("post");
   res.render("admin",
      {
         usersCount,
         postsCount,
         commentsCount,
         users,
         posts,
         comments
      }
   );

};
module.exports.deletePost =
async(req,res)=>{
   const postId =
   req.params.id;

   await Post.findByIdAndDelete(
      postId
   );
   res.redirect("/admin");
};

module.exports.deleteUser =
async(req,res)=>{
   const userId =
   req.params.id;

   if(
      userId.toString() ===
      req.session.userId.toString()
   ){
      return res.send(
         "You cannot delete yourself"
      );
   }
   const user =
   await User.findById(
      userId
   );
   if(!user){
      return res.redirect(
         "/admin"
      );
   }
   // Delete user's comments
   await Comment.deleteMany({
      author:userId
   });
   // Delete user's posts
   await Post.deleteMany({
      author:userId
   });
   // Remove from followers arrays
   await User.updateMany(
      {},
      {
         $pull:{
            followers:userId,
            following:userId
         }
      }
   );
   // Delete user
   await User.findByIdAndDelete(
      userId
   );
   res.redirect("/admin");

};
module.exports.deleteComment =
async(req,res)=>{

   const commentId =
   req.params.id;

   const comment =
   await Comment.findById(
      commentId
   );

   if(!comment){
      return res.redirect(
         "/admin"
      );
   }

   await Post.findByIdAndUpdate(
      comment.post,
      {
         $pull:{
            comments:commentId
         }
      }
   );
   await Comment.findByIdAndDelete(
      commentId
   );
   res.redirect("/admin");
};