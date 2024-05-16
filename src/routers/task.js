const express = require('express');
const Task = require('../models/tasks');
const auth = require('../middleware/auth');
const User = require('../models/users');
const router = new express.Router();


router.post('/tasks',auth , async (req, res)=>{
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/tasks', auth, async (req, res)=>{
    const match = {};
    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }
    

    try {
        // const tasks = await Task.find(match);
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip) 
            }
        })
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send(error);
    }
  
})

router.get('/tasks/:id', auth ,async (req, res)=>{
    const _id = req.params.id;

    try {
        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id , owner: req.user._id})
        if(!task){
            return res.status(404).send('Task not found!')
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', auth, async(req,res)=>{
    const id = req.params.id;

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description','completed'];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));

    if(!isValidOperation){
        res.status(400).send('Invalid Updates');
    }

    try {
        const task = await Task.findOne({_id:id, owner: req.user._id})
        // const task = await Task.findById(id);
        
       
        // const task = await Task.findByIdAndUpdate(id, req.body, {new:true, runValidators:true});
        if(!task){
            res.status(404).send('Task not found')
        }
        updates.forEach((update)=>task[update] = req.body[update])

        await task.save();
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id',auth,  async(req,res)=>{
    try {
        const task = await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id});

        if(!task){
            return res.status(404).send("task not found");
        }

        res.send(task);
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router