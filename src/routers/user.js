const express = require('express');
const router = new express.Router();
const User = require('../models/users');


//to create a new user /signup
router.post('/users', async (req, res)=>{
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user,token});
    } catch (error) {
        res.status(400).send(error)
    }
   
})

//to login
router.post('/users/login', async (req, res)=>{
    try {
        //findByCredentials is custom made function created in user.js model 
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()
        res.send({user,token});
    } catch (error) {
        res.status(400).send('Unable to login '+error)
    }
    
})

//to read all users
router.get('/users', async (req, res)=>{

    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }

})

//to read a single user
router.get('/users/:id', async (req, res)=>{

    const _id = req.params.id;
    
    try {
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send("user not found");
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error)
    }
})

//to update user
router.patch('/users/:id', async (req,res)=>{
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','email','password','age'];
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send('invalid updates');
    }

    try {
        const user = await User.findById(id);

        updates.forEach((update)=>user[update] = req.body[update])

        await user.save();

        // const user = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
        if(!user){
            return res.status(404).send('not found');
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

//to delete a user
router.delete('/users/:id', async (req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user){
            return res.status(404).send("user not found");
        }

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})



module.exports = router