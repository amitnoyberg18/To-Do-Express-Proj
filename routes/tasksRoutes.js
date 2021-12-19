const express = require('express');
const router = express.Router();
const TokenAuth = require('../auth/TokenAuth')
const data = require('../db/data.json').data;
const jwt = require('jsonwebtoken');


//all the tasks
router.get('/',TokenAuth,(req,res)=>{
    res.json(data)
})
//by id
router.get('/taskId/:id',TokenAuth,(req,res)=>{
    const Id = req.params.id;
    const theTask = data.filter((item)=>item.id === Number(Id));
    res.json(theTask);
})

//tsks of a user
// all the tasks of the user
router.get('/userTasks',TokenAuth,(req,res)=>{
    const token = req.cookies.token;
    const user = jwt.decode(token);
    const userId = user.id;
    const theTask = data.filter((item)=>item.userId === Number(userId));
    res.json(theTask);
})



//by status
//relevent
router.get('/relevent',TokenAuth, (req,res)=>{
    const releventData = data.filter((item)=>item.status === "relevent");
    res.json(releventData)
})
//not relevent
router.get('/notrelevent',TokenAuth, (req,res)=>{
    const releventData = data.filter((item)=>item.status === "not relevent");
    res.json(releventData)
})
//completed
router.get('/completed',TokenAuth, (req,res)=>{
    const releventData = data.filter((item)=>item.status === "completed");
    res.json(releventData)
})

module.exports = router