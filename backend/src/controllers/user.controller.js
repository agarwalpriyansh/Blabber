import User from '../models/user.model.js';
import friendRequest from '../models/friend-request.js';

export async function getRecommendedUsers (req,res){
    try{
        const currentUserId = req.user._id;
        const currentUser = req.user;

        const recommenededUsers = await User.find({
            $and:[
                { _id: { $ne: currentUserId } }, // Exclude current user
                { _id: { $nin: currentUser.friends } }, // Exclude friends
                {isOnboarded: true} // Only include onboarded users
            ],
        })
        res.status(200).json(recommenededUsers);
    }
    catch(error){
        console.error("error fetching recommened users:", error);
        res.status(500).json({message : "Internal server error while fetching recommended users."} );
    }
}

export async function getMyFriends (req,res){

    try{
        const user = await User.findById(req.user._id).select('friends')
        .populate('friends', 'name profilePicture nativeLanguage learningLanguage')

        res.status(200).json(user.friends);
    }
    catch(error){
        console.error("error fetching friends:".error);
        res.status(500).json({message : "Internal server error while fetching friends."});
    }
}

export async function sendFreindRequest (req,res){
    try{
        const myId = req.user._id;
        const{id:recepientId} = req.params;

        if(myId === recepientId){
            return res.status(400).json({message: "You cannot send a friend request to yourself."});
        }

        const recepient = await User.findById(recepientId);

        if(!recepient) return res.status(400).json({message:"user not found"});

        // check is user already friend
        if(recepient.friends.includes(myId)) return res.status(400).json({message:"User is already ur friend"});

        // check if  already friend request send
        const existing = await friendRequest.findOne({
            $or:[
                { sender: myId, recipient: recepientId },
                { sender: recepientId, recipient: myId }
            ]
        })
        if(existing) return res.status(400).json({message:"Friend request already sent"});
        
        const friendRequest = await friendRequest.create({
            sender: myId,
            recepient: recepientId
        })

        res.status(201).json(friendRequest);

    }
    catch(error){
        console.error("error sending friend request:", error);
        res.status(500).json({message: "Internal server error while sending friend request."});
    }
}