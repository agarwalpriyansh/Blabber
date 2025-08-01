import User from '../models/user.model.js';

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