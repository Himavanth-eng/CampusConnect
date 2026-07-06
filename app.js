require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const Post = require("./models/Post");
const userRoutes =
require("./routes/userRoutes");

const postRoutes =
require("./routes/postRoutes");

const app = express();

const dbUrl =
process.env.MONGO_URL ||
"mongodb://127.0.0.1:27017/campusconnect";

mongoose.connect(dbUrl)
.then(()=>{
    console.log("Database Connected");
});

app.set("view engine","ejs");

app.use(expressLayouts);

app.set("layout","layout");

app.use(express.urlencoded({
    extended:true
}));

app.use(methodOverride("_method"));

app.use(session({
    secret:"secretkey",
    resave:false,
    saveUninitialized:false
}));
app.use("/",postRoutes);
app.use("/",userRoutes);
const commentRoutes =
require("./routes/commentRoutes");
app.use("/",commentRoutes);
const PORT =
process.env.PORT || 3000;

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const User = require("./models/User");
const likeRoutes =
require("./routes/likeRoutes");

app.use("/",likeRoutes);
const notificationRoutes =
require(
"./routes/notificationRoutes"
);

app.use("/",
notificationRoutes);
const followRoutes =
require("./routes/followRoutes");
app.use("/",followRoutes);
const adminRoutes =
require("./routes/adminRoutes");
app.use(adminRoutes);
const chatRoutes =
require("./routes/chatRoutes");

app.use("/",chatRoutes);
const Notification = require("./models/Notification");
const Message = require("./models/Message");
app.get("/", (req, res) => {
    res.redirect("/login");
});
const users = {};

io.on("connection", (socket) => {

    console.log("User Connected");

    socket.on("join", (userId) => {

        users[userId] = socket.id;

        io.emit("userOnline", userId);

        console.log(users);

    });

    socket.on(
"sendMessage",
async(data)=>{

    const savedMessage =
    await Message.create({

        sender:data.sender,
        receiver:data.receiver,
        text:data.text

    });

    await Notification.create({

        recipient:
        data.receiver,

        sender:
        data.sender,

        message:
        "sent you a message"

    });
    console.log("Notification Created");

    const receiverSocketId =
    users[data.receiver];

    if(receiverSocketId){

        io.to(
            receiverSocketId
        ).emit(
            "receiveMessage",
            savedMessage
        );

    }

    socket.emit(
        "receiveMessage",
        savedMessage
    );

});

    socket.on("disconnect", () => {

        for (let userId in users) {

            if (
                users[userId] ===
                socket.id
            ) {

                io.emit(
                    "userOffline",
                    userId
                );

                delete users[userId];

                break;
            }
        }
    });
});

server.listen(PORT, () => {
    console.log(
        `Server Running On ${PORT}`
    );
});
    