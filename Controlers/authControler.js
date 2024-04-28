const TodoUser = require('../Models/auth_Model')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

// USER REGISTER
const registerUser = asyncHandler(async (req,res) =>{
    const {name, email, password} = req.body

    // CHECK IF ALL FIELDS ARE COMING
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please fill all details")
    }

    // CHECK IF USETR ALRADY EXIEST
    const userExiest = await TodoUser.findOne({email: email})
        if(userExiest){
            res.status(400)
            res.json({
                msg: "User alrady exiest!"
            })
        }

    // HASHED PASSWORD
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    

    const registerd = await TodoUser.create({
        name,
        email,
        password: hashedPassword
    })
    if(registerd){
        res.status(200).json({
            id: registerd._id,
            name: registerd.name,
            email: registerd.email,
            password: registerd.password
        })
    }
    else{
        res.status(400)
        throw new Error("Something went wrong")
    }
})

// USER LOGIN
const loginUser = asyncHandler (async (req,res) =>{
    const {email, password} = req.body

    // CHECK IF ALL FIELDS ARE CIMING
    if(!email || !password){
        res.status(400)
        throw new Error('Please fill all details')
    }

    const user = await TodoUser.findOne({email: email})

    if(user && bcrypt.compare(password, user.password)){
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Inavalid cridintials!')
    }
})

// GENERATE TOKEN
const generateToken = (id) =>{
    return jwt.sign({id: id}, process.env.JWT_SECRET,{expiresIn: '30d'})
}

module.exports = {registerUser, loginUser}