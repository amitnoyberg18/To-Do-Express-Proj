const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const users = require('../db/users.json').users;
const TokenAuth = require('../auth/TokenAuth')

//create a user

//a post req to logIn
router.post('/loginIn',(req,res)=>{
    const userName = req.body.userName;
    const password = req.body.password;
    let token = null;
    users.map((item)=>{
        if(item.userName === userName && item.password === password){
            token = jwt.sign(item,"secretKey",{expiresIn:'1H'})
        }
    })
    if(token !== null){
        res.cookie('token',token)
        res.json({
            token:token
        })
    }
    res.status(404).json("user not exist");
})
//all Users
router.get('/users',TokenAuth,(req,res)=>{
    
    res.json(users);
})
//Chacking if the user token is still available
router.get('/checkAuth',TokenAuth,(req,res)=>{
    res.json({message:'Auth sucess'})
})


module.exports = router;