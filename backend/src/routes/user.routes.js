import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import {
        getOutgoingRequest,
        acceptFriendRequest,
        getFriendRequests,
        getRecommendedUsers,
        getMyFriends,
        sendFreindRequest
    } from '../controllers/user.controller.js'

const router = express.Router();

// apply authMiddleware to all routes
router.use(protectRoute);

router.get('/' , getRecommendedUsers);
router.get('/friends' , getMyFriends);
router.post('/friend-request/:id' , sendFreindRequest);
router.put('/friend-request/:id/accept' , acceptFriendRequest);
router.get('/friend-requests' , getFriendRequests);
router.get('/outgoing-friend-requests' , getOutgoingRequest);


export default router;