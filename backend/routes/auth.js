const router=require("express").Router();
const User=require('../models/user')
const bcrypt = require("bcrypt"); 

router.post("/register",async (req,res) => {

    try{
        const {email,username,password}=req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword= await bcrypt.hash(password,10)

        const user = new User({
            email,
            username,
            password: hashPassword,
        });

        await user.save()

        .then(()=>{
            res.status(200).json({user})
        })
        .catch((error)=>{
           console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
        })
    }
    catch(error){

       return res.status(400).json({message:"user Already Exists"})
        
    }

    
})


router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        return res.status(200).json({
            message: "Sign-in successfully",
            user
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports=router