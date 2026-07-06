const Notification =
require("../models/Notification");

module.exports.showNotifications =
async(req,res)=>{

    const notifications =
    await Notification.find({

        recipient:
        req.session.userId

    })
    .populate("sender")
    .sort({createdAt:-1});

    const unreadCount =
    await Notification.countDocuments({

        recipient:
        req.session.userId,

        isRead:false

    });

    await Notification.updateMany(

        {
            recipient:req.session.userId,
            isRead:false
        },

        {
            isRead:true
        }

    );

    res.render(
        "notifications",
        {
            notifications,
            unreadCount
        }
    );

};
