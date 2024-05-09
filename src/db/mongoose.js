const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://rohitraut4033:RFpZQ60PyWZbZjGD@task-manager.fg93nwo.mongodb.net/?retryWrites=true&w=majority&appName=task-manager")
.then(()=>{
    console.log('connected!')
}).catch(()=>{
    console.log('not connected!')
})



