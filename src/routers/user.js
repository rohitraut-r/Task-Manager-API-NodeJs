const express = require('express');
const router = new express.Router();
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/users');
const auth = require('../middleware/auth');


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

router.post('/users/logout', auth, async (req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        })
        await req.user.save();
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/logoutAll', auth, async (req, res)=>{
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send('Logged out of all devices')
    } catch (error) {
        res.status(500).send(error)
    }
})

//to read the authenticated user
router.get('/users/me', auth, async (req, res)=>{

    res.send(req.user)

})


//to update user
router.patch('/users/:id', auth, async (req,res)=>{
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','email','password','age'];
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send('invalid updates');
    }

    try {
        // const user = await User.findById(id);

        updates.forEach((update)=>req.user[update] = req.body[update])

        await req.user.save();

        // const user = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
        
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
})

//to delete a user
router.delete('/users/me', auth,async (req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.user._id);
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

const avatar = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|png)/)){
            cb(new Error('File not supported'))
        }

        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, avatar.single('avatar'), async (req, res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next)=>{
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar',auth, async(req, res)=>{
    try {
        req.user.avatar = undefined;
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send({error: error.message})
    }
    
})



router.get('/users/:id/avatar', async (req, res)=>{
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error();
        }

         res.set('Content-Type', 'image/png');
         res.send(user.avatar);
    } catch (error) {
        res.status(404).send({error: error.message})
    }
})


module.exports = router