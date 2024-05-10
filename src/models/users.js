const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid!")
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value){
            if(value.toLowerCase() === 'password'){
                throw new Error("Password shouldn't contain the word 'password'")
            }
        }

    },   
    age:{
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0){
                throw new Error("Age must not be less than 0");
            }
        }
    }
})

userSchema.pre('save', async function (next){
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
})

const User = mongoose.model('User', userSchema)

module.exports = User