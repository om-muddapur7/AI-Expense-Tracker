const User = require('../models/User')
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//generate jwt
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});
}

//Google auth
exports.googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                message: "Google credential is required",
            });
        }

        // Verify Google ID Token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const {
            email,
            name,
            picture,
            email_verified,
        } = payload;

        if (!email_verified) {
            return res.status(400).json({
                message: "Google email not verified",
            });
        }

        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            // Create new user
            user = await User.create({
                fullName: name,
                email,
                password: Math.random().toString(36).slice(-12), // dummy password
                profileImageUrl: picture,
            });
        } else {
            // Update profile image if changed
            if (picture && user.profileImageUrl !== picture) {
                user.profileImageUrl = picture;
                await user.save();
            }
        }

        return res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Google authentication failed",
        });
    }
};

// Register user
exports.registerUser = async (req, res) => {
    const {fullName, email, password, profileImageUrl} = req.body;

    if(!fullName || !email || !password ){
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    try {
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message: "Email already in use"
            })
        }


        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })

    } catch (error) {
        res.status(500).json({
            message: "Error registering user"
        })
    }
}

// login user
exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password ){
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    try {
        const user = await User.findOne({email});

        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({
                message: "Invalid cresentials"
            })
        }

        res.status(200).json({
            id: user._id,
            user: user,
            token: generateToken(user._id)
        })

    } catch (error) {
        res.status(500).json({
            message: "Error logging user"
        })
    }
}

// getUserInfo 
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({
                message: "user not found"
            })
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            message: "Error finding user"
        })
    }
}