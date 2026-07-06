const Post = require("../models/Post");
const User = require("../models/User");
module.exports.showNewPost = (req,res)=>{
    res.render("new");
};

module.exports.createPost =
async(req,res)=>{
    const {title,content} = req.body;
    let fileUrl = "";
    let fileType = "";
    if(req.file){
        fileUrl =
        "/uploads/" +
        req.file.filename;
        fileType =
        req.file.mimetype;
    }
    const post = new Post({
        title,
        content,
        fileUrl,
        fileType,
        author:req.session.userId
    });
    await post.save();
    res.redirect("/posts");
};
module.exports.getPosts =
async(req,res)=>{

   const search = req.query.search || "";

   const posts = await Post.find({

      $or:[

         {
            title:{
               $regex:search,
               $options:"i"
            }
         },

         {
            content:{
               $regex:search,
               $options:"i"
            }
         }

      ]

   })
   .populate("author")
   .populate("comments");

   const currentUser =
   await User.findById(
      req.session.userId
   );

   res.render(
      "posts",
      {
         posts,
         search,
         currentUserId:
         req.session.userId,
         currentUser
      }
   );
};

module.exports.getMyPosts = async(req,res)=>{

    const posts = await Post.find({
        author:req.session.userId
    })
    .populate("author")
    .populate("comments");

    res.render("posts",{
        posts,
        search:"",
        currentUserId:req.session.userId
    });
};

module.exports.editPostPage = async(req,res)=>{

    const {id} = req.params;

    const post = await Post.findById(id);

    res.render("edit",{post});
};

module.exports.updatePost = async(req,res)=>{

    const {id} = req.params;

    const {title,content} = req.body;

    await Post.findByIdAndUpdate(id,{
        title,
        content
    });

    res.redirect("/posts");
};

module.exports.deletePost = async(req,res)=>{

    const {id} = req.params;

    await Post.findByIdAndDelete(id);

    res.redirect("/posts");
};

module.exports.myPosts=async(req,res)=>{
    const posts=await Post.find({
        author :req.session.userId
    })
    .populate("author")
    .populate("comments");
    res.render("myPosts",{posts});
};