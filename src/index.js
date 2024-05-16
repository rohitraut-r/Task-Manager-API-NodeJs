const express = require('express')
require('./db/mongoose');
const User = require('./models/users')
const Task = require('./models/tasks');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();

const port = process.env.PORT || 3000 ;

//middleware this runs between request and route handler 
// app.use((req, res, next)=>{
  
//         res.status(503).send("website is in maintainance mode please try again")
   
// })

app.use(express.json());

app.use(userRouter);

app.use(taskRouter);


app.listen(port, ()=>{
    console.log('server is running on port '+ port)
});

// const main = async () =>{
//     // const task = await Task.findById('6645b34eb1dcdf42eae61159');

//     // await task.populate('owner');

//     // console.log(task.owner);

//     const user = await User.findById('66422b1a8732b5cd914f4a0c');
//     await user.populate('tasks');
//     console.log(user.tasks)

// }
// main();

