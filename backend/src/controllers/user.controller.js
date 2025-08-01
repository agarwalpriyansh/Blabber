import User from '../models/user.model.js';
import FriendRequest from '../models/friend-request.js';

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

export async function acceptFriendRequest(req,res){
    try{
        const {id:requestId} = req.params;
        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({ message: "Friend request not found" });
        }

        // Verify the current user is the recipient
        if (friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to accept this request" });
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        // add each user to the other's friends array
        // $addToSet: adds elements to an array only if they do not already exist.
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient },
        });

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender },
        });

        res.status(200).json({ message: "Friend request accepted" });
    }
    catch(error){
        console.log("Error in acceptFriendRequest controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}