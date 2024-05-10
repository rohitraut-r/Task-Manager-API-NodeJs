const express = require('express')
require('./db/mongoose');
const User = require('./models/users')
const Task = require('./models/tasks');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();

const port = process.env.PORT || 3000 ;

app.use(express.json());

app.use(userRouter);

app.use(taskRouter);


app.listen(port, ()=>{
    console.log('server is running on port '+ port)
});

const bcrypt = require('bcryptjs');

const myFunc = async () =>{
    const password = 'Rohit123!';
    const hassedPassword = await bcrypt.hash(password, 8);

    console.log(password);
    console.log(hassedPassword);

    const isMatch = await bcrypt.compare('Rohit13!', hassedPassword);
    console.log(isMatch);
}

myFunc();