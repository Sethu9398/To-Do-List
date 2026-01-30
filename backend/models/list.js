const { default: mongoose } = require("mongoose")
const moongoose=require("mongoose")

const listSchema=new moongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    user:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    ]
})

module.exports=moongoose.model("List",listSchema)