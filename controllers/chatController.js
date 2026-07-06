const Message = require("../models/Message");
const User = require("../models/User");

module.exports.chatPage =
async(req,res)=>{

    const currentUserId =
    req.session.userId;

    const otherUserId =
    req.params.id;

    const otherUser =
    await User.findById(
        otherUserId
    );

    const messages =
    await Message.find({

        $or:[

            {
                sender:currentUserId,
                receiver:otherUserId
            },

            {
                sender:otherUserId,
                receiver:currentUserId
            }

        ]

    }).sort({
        createdAt:1
    });

    res.render(
        "chat",
        {
            messages,
            otherUser,
            currentUserId
        }
    );
};
module.exports.sendMessage =
async(req,res)=>{

    const receiverId =
    req.params.id;

    const senderId =
    req.session.userId;

    const { text } =
    req.body;

    await Message.create({

        sender:senderId,

        receiver:receiverId,

        text:text

    });

    res.redirect(
        "/chat/" +
        receiverId
    );
};