const mongoose=require('mongoose')

const Fileschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imgurl:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    tags:{
        type:String,
    }

})

const file=mongoose.model('file',Fileschema )
module.exports=file