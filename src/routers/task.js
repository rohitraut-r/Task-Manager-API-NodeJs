const express = require('express');
const Task = require('../models/tasks')
const router = new express.Router();


router.post('/tasks', async (req, res)=>{
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/tasks', async (req, res)=>{

    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
  
})

router.get('/tasks/:id', async (req, res)=>{
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if(!task){
            return res.status(404).send('Task not found!')
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', async(req,res)=>{
    const id = req.params.id;

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description','completed'];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));

    if(!isValidOperation){
        res.status(400).send('Invalid Updates');
    }

    try {
        const task = await Task.findById(id);
        
        updates.forEach((update)=>task[update] = req.body[update])

        await task.save();
        // const task = await Task.findByIdAndUpdate(id, req.body, {new:true, runValidators:true});
        if(!task){
            res.status(404).send('Task not found')
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id', async(req,res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if(!task){
            return res.status(404).send("task not found");
        }

        res.send(task);
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router