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

const jwt = require('jsonwebtoken');

const myFunc = async () =>{
   const token = jwt.sign({_id:'rohit123'}, 'thisissig', { expiresIn: '7 days'});
   console.log(token);

   const data = jwt.verify(token, 'thisissig');
   console.log(data)
}

myFunc();