const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(

{
    title:String,

    content:String,

    fileUrl:String,

    fileType:String,

    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],

    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},

{
    timestamps:true
}

);

module.exports = mongoose.model("Post", postSchema);