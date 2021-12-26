import { NextFunction, Request, Response } from "express";

const express = require("express");
const app = express();
const taskRouter = require('./routes/tasksRoutes');
const usersRouter = require('./routes/usersRoute');
const cors = require('cors')
const cookieParser = require('cookie-parser')


app.use(cookieParser())
const corsConfig = {
    origin: true,
    credentials: true,
  };
  
  app.use(cors(corsConfig));
  app.options('*', cors(corsConfig));
app.use((req:Request,res:Response,next:NextFunction)=>{
    res.header("Access-Control-Origin", "*");
    res.header("'Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Headers", "origin, X-Requested-Width, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Headers", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//the tasks routes
app.use('/tasks', taskRouter);
//users routes
app.use('/users', usersRouter)

app.listen(8080);