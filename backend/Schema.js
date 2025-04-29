const mongoose=require('mongoose');

const schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const user=mongoose.model("details",schema)
module.exports=user