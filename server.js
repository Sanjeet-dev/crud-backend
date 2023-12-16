const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv  = require('dotenv')


dotenv.config()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(require('./routes/routes.js'));
app.use(require('./routes/users.js'));

app.get('/', (req,res)=>{
    res.send("Hello from HOME!!");
})


//database connection
const PORT = process.env.PORT || 5555
const Mongodb_URI = process.env.MONGODB_URI
mongoose.set('strictQuery',false);
const connectDB = async()=>{
    try{
        await mongoose.connect(Mongodb_URI)
        console.log("Successfully connected to database!!");
    }catch(err){
        console.log("Error! while connecting to database..",err.message);
    }
}
connectDB();
app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
})
