const Post =
require("../models/Post");

module.exports =
async(req,res,next)=>{

    const {id} = req.params;

    const post = await Post.findById(id);
    if(
        post.author.toString()!==  req.session.userId.toString()
    ){
        return res.send(
            "Access Denied"
        );
    }

    next();

};