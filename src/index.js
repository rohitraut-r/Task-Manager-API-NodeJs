const express = require('express')
require('./db/mongoose');
const User = require('./models/users')
const Task = require('./models/tasks');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();

const port = process.env.PORT || 3000 ;


const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits:{
        fileSize: 1000000
    },
    fileFilter (req, file, cb) {
       if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please upload a word document'))
       }

       cb(undefined, true);
    }
})






app.use(express.json());

app.use(userRouter);

app.use(taskRouter);


app.listen(port, ()=>{
    console.log('server is running on port '+ port)
});



