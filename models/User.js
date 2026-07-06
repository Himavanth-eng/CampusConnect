const mongoose=require("mongoose");
const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    followers:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
    ],

    following:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
    ],
    bio:{
        type:String,
        default:"",
    },
    branch:{
        type:String,
        default:""
    },
    isAdmin:{
    type:Boolean,
    default:false
    }
});
const User = mongoose.model("User", userSchema);

module.exports = User;