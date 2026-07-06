const Post = require("../models/Post");
const Notification =require("../models/Notification");
module.exports.toggleLike = async(req,res)=>{

    const { id } = req.params;

    const userId = req.session.userId;

    const post = await Post.findById(id);

    if(!post){
        return res.send("Post Not Found");
    }

    const alreadyLiked =
        post.likes.some(
            like => like.toString() === userId.toString()
        );
    if(alreadyLiked){

    await Post.findByIdAndUpdate(
        id,
        {
            $pull:{likes:userId}
        }
    );

}else{

    await Post.findByIdAndUpdate(
        id,
        {
            $push:{likes:userId}
        }
    );

    if(
        post.author.toString() !==
        userId.toString()
    ){

        await Notification.create({

            recipient: post.author,

            sender: userId,

            message: "liked your post"

        });

    }
}


    res.redirect("/posts");
};