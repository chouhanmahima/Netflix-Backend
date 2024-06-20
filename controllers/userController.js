const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registration
const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(401).json({
                message: "Invalid data",
                success: false
            });
        }
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "This email is already used",
                success: false
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 16);

        await userModel.create({
            fullName,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message: "Account created successfully !",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

// Login
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Invalid data",
                success: false
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password so please create your account",
                success: false
            });
        }

        // Validation of password ( Bcrypt Password to check the password )
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        // Fetch user ID from DB
        const tokenData = {
            id : user._id
        }
        // Generate Token
        const token = await jwt.sign(tokenData, "hdbcsjdckdjcnbcdjkdnj", { expiresIn : "1d" });
        return res.status(200)
            .cookie("token", token, { httpOnly: true })
            .json({
                message: `Welcome back ${user.fullName}`,
                user,
                success: true
            });

    } catch (error) {
        console.log(error);
    }
}

const Logout = async(req, res) => {
    return res.status(200)
    .cookie("token", "", {expiresIn : new Date(Date.now()), httpOnly : true})
    .json({
        success : true,
        message : "User Logged Out Successfully !"
    });
}


const userContainer = {
    Register,
    Login,
    Logout
}

module.exports = userContainer;