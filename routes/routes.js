const express = require('express');
const router = express.Router()
const Task = require('../models/task.js');

//Get all tasks
router.get('/tasks', async(req,res)=>{
    try{
        const tasks = await Task.find()
        res.json(tasks);

    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Get one task
router.get('/tasks/:id',getTask,(req,res)=>{
    res.json(res.task);
});

// Create one task
const task = new Task({
    title:"study web-development",
    description:"It is consists of javascript, css, HTML with their respective working"
})


router.post('/tasks', async(req,res)=>{
    const task = new Task({
        title: req.body.title,
        description: req.body.description
    });
    try{
        const newTask = await task.save()
        console.log(req.body)
        res.send(req.body);
        res.status(201).json({newTask})
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

// update one task using patch method
router.patch('/tasks/:id', getTask, async(req,res)=>{
    if(req.body.title != null){
        res.task.title = req.body.title
    }
    if(req.body.description != null){
        res.task.description= req.body.description
    }
    try{
        const updatedTask = await res.task.save()
        res.json(updatedTask)
    }catch(err){
        res.status(400).json({message:err.message});
    }
})

// update one task using put method
router.put('/tasks/:id', getTask, async(req,res)=>{
    if(req.body.title == null || req.body.description == null){
        return res.status(400).json({message: 'Invalid request body'})
    }
    res.task.title = req.body.title
    res.task.description= req.body.description

    try{
        const updatedTask = await res.task.save()
        res.json(updatedTask)
        
    }catch(err){
        res.status(400).json({message:err.message})
    }

})

// Delete one task
router.delete('/tasks/:id', getTask ,async(req,res)=>{
    try{
        const taskID = req.params.id;
        const result = await task.deleteOne({
            _id:taskID
        });
        // await res.task.remove()
        res.json({message:'Task deleted'})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// used function inside delete, patch, put, read
async function  getTask(req,res,next){
    try{
        let task = await Task.findById(req.params.id)
        if(task == null){
            return res.status(404).json({message:'Cannot find task'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.task = task
    next()
}

module.exports = router;