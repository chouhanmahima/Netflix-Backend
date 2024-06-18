const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const  Register = async (req, res) => {
    try{
        const {fullName, email, password} = req.body;
        if(!fullName || !email || !password){
            return res.status(401).json({
                message: "Invalid data",
                success: false
            });
        }
        const user = await userModel.findOne({ email });
        if(user){
            return res.status(401).json({
                message: "This email is already used",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash( password, 16);

        await userModel.create({
            fullName,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message: "Account created successfully !"
        });
    } catch(error){
        console.log(error);
    }
}


const userContainer = {
    Register,
}

module.exports = userContainer;