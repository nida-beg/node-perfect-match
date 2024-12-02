const mongoose  = require("mongoose");



mongoose.connect("mongodb://0.0.0.0:27017/perfect-match",{
    useNewUrlparser: true,
    useUnifiedtopology: true
})
.then(()=>{
    console.log("Connect to the database!");

})
.catch(err=>{
    console.log("cannot connect to the database!",err);
    process.exit();
    })