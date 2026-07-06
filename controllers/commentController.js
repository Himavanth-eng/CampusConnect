const Comment =
require("../models/Comment");
const Notification =
require("../models/Notification");
const Post =
require("../models/Post");

module.exports.createComment =
async(req,res)=>{

    const {id}=req.params;
    const {text}=req.body;

    const comment = new Comment({

        text,
        author:req.session.userId,
        post:id

    });

    await comment.save();

    const post =
    await Post.findById(id);

    if(
        post.author.toString() !==
        req.session.userId.toString()
    ){

        await Notification.create({

            recipient:post.author,

            sender:req.session.userId,

            message:"commented on your post"

        });

    }

    post.comments.push(
        comment._id
    );

    await post.save();

    res.redirect("/posts");
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
         "/posts"
      );
   }

   if(
      comment.author.toString()
      !==
      req.session.userId.toString()
   ){
      return res.send(
         "Access Denied"
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
   res.redirect("/posts");

};
module.exports.editComment =
async(req,res)=>{

   const commentId =
   req.params.id;

   const { text } =
   req.body;

   const comment =
   await Comment.findById(
      commentId
   );

   if(!comment){
      return res.redirect(
         "/posts"
      );
   }

   if(
      comment.author.toString()
      !==
      req.session.userId.toString()
   ){
      return res.send(
         "Access Denied"
      );
   }
   comment.text = text;
   await comment.save();
   res.redirect("/posts");

};