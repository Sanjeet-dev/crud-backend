const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


// Create the user
// const user = new User({
//     username:"sanmo",
//     password:"san456789",
//     email:"trymail101@email.com"
// })
// user.save();

router.post('/users', async(req,res)=>{
    let user=await User.findOne({email:req.body.email});
    if(user)return res.json({message:"User Already exist",user});
     user = new User({
        username: req.body.username,
        password:req.body.password,
        email:req.body.email
    })
    try{
        const newuser = await user.save();
        res.json(newuser);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

// Read single user by id
router.get('/users/:id',getUser,(req,res)=>{
    res.json(res.user);
    
})

// Read all users
router.get('/users', async(req,res)=>{
    try{
        const users = await User.find();
        res.json(users);

    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// Update the user 

router.patch('/users/:id',getUser, async(req,res)=>{
    if(req.body.username == null || req.body.password == null || req.body.email == null){
        res.status(404).json({message:"nothing specified"})
            
    }
    res.user.username = req.body.username
    res.user.password = req.body.password
    res.user.email = req.body.email
    try{
        
        const updatedUser = await res.user.save()
        res.json({message:"user updated using patch method",updatedUser})

    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// DELETE the specified user

router.delete('/users/:id', getUser, async(req,res)=>{
    
    try{
        const userId = req.params.id
        const result = await res.user.deleteOne({_id:userId})
        res.json({message:'user deleted', result});
    }catch(err){
        res.status(500).json({message:err.message})

    }
})

async function getUser(req,res,next){

    try{
        const user = await User.findById(req.params.id);
        if(user == null){
            return res.status(404).json({message:"User not found"})
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
    res.user = await User.findById(req.params.id);
    next();
}

module.exports = router;
