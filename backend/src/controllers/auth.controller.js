import User from '../models/User.js';
import jwt from 'jsonwebtoken';


export async function signup(req,res){
    const { fullName, email, password } = req.body;

    try{
        if(!fullName || !email || !password){
        return res.status(400).json({ message: 'All fields are required' });
        }

        if(password.length < 6){
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: 'email already exists' });
        }

        const idx = Math.floor(Math.random() * 100)+1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}`

        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePicture: randomAvatar
        })

        const token = jwt.sign({userId : newUser._id}, process.env.JWT_SECRET,{expiresIn: '30d'});

        res.cookie("jwt", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            httpOnly: true,

        })
        res.status(201).json({
            message: 'User created successfully',
            user: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
                bio: newUser.bio,
                nativeLanguage: newUser.nativeLanguage,
                learningLanguage: newUser.learningLanguage,
                location: newUser.location,
                isOnboarded: newUser.isOnboarded
            }
        })
        
    }
    catch(error){
        return res.status(500).json({ message: 'Server error' });
    }

}
export async function login(req,res){
    try{
        const {email,password} =req.body();

        if(!email || !password) return res.status(400).json({message:"all fields are required"})
            
        let  user = User.findOne({email}) 
        if(!user) return res.satus(401).json({message:"Invalid email or password"});

        let isPasswordCorrect = await User.matchPassword(password);
        if(!isPasswordCorrect) return res.satus(401).json({message:"Invalid email or password"});

        res.status(200).json({success: true, user})

    }
    catch(error){
        console.log("error in auth controller (login):".error.message)
        res.status(500).json({message:"Internal Server Error"});
    }

}
export async function logout(req,res){
    res.clearCookie("jwt");
    res.status(200).json({success : true, message: "logout successful" });
}