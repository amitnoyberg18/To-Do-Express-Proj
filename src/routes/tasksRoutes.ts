import { Request, Response } from "express";

const express = require('express');
const router = express.Router();
const TokenAuth = require('../auth/TokenAuth')
const data = require('../db/data.json').data;
const jwt = require('jsonwebtoken');


//POST
//add new Task
router.post('/AddTask',(req:Request,res:Response)=>{
    console.log(req.body)
    res.json({'hello':'world'});
})
//GET
//all the tasks
router.get('/',TokenAuth,(req:Request,res:Response)=>{
    res.json(data)
})
//by id
router.get('/taskId/:id',TokenAuth,(req:Request,res:Response)=>{
    const Id = req.params.id;
    const theTask = data.filter((item:any)=>item.id === Number(Id));
    res.json(theTask);
})

//tsks of a user
// all the tasks of the user
router.get('/userTasks',TokenAuth,(req:Request,res:Response)=>{
    const token = req.cookies.token;
    const user = jwt.decode(token);
    const userId = user.id;
    const theTask = data.filter((item:any)=>item.userId === Number(userId));
    res.json(theTask);
})



//by status
//relevent
router.get('/relevent',TokenAuth, (req:Request,res:Response)=>{
    const releventData = data.filter((item:any)=>item.status === "relevent");
    res.json(releventData)
})
//not relevent
router.get('/notrelevent',TokenAuth, (req:Request,res:Response)=>{
    const releventData = data.filter((item:any)=>item.status === "not relevent");
    res.json(releventData)
})
//completed
router.get('/completed',TokenAuth, (req:Request,res:Response)=>{
    const releventData = data.filter((item:any)=>item.status === "completed");
    res.json(releventData)
})

module.exports = router