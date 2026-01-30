const moongoose=require("mongoose")

const userSchema=new moongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    list:[{
        type:moongoose.Types.ObjectId,
        ref:"List"
    }]
})

module.exports=moongoose.model("User",userSchema)