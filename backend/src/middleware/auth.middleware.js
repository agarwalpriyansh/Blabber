import jwt from 'jsonwebtoken';
import User from '../models/User.js'


export const protectRoute = async (req,res,next) => {
    try{
         const token = req.cookies.jwt;

        if(!token){
            res.status(401).json({message: "Unauthorized - No token"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            res.status(401).json({message: "Unauthorized - Invalid token"});
        }

        const user = await User.findById(decoded.userId);

        if(!user){
            res.status(401).json({message: "Unauthorized - No User Found"});
        }

        req.user = user;
        next();

    }
    catch(error){
        console.error("error in protectRoute middleware");
        res.status(500).json({message: "Internal Server Error "});
    }
}