const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        lowercase:true,
        required:true
    }
},{timestamps:true}
)

module.exports = mongoose.model("User",userSchema);
