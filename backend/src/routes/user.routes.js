import express from 'express'
import { protectRoute } from '../middleware/auth.middleware';

const router = express.Router();

// apply authMiddleware to all routes
router.use(protectRoute);

router.get('/' , getRecommendedUsers);
router.get('/friends' , getMyFriends);


export default router;