const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect(
   "mongodb://127.0.0.1:27017/campusconnect"
)
.then(async()=>{

   await User.updateOne(
      {
         email:"himavanth.s2006@gmail.com"
      },
      {
         isAdmin:true
      }
   );

   console.log("Admin Created");

   process.exit();
});