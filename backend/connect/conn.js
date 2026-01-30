const moongoose=require("mongoose")


const conn=async (req,res) => {

    try{
       await moongoose.connect("mongodb://localhost:27017/ToDoList")
    .then(()=>{
        console.log("mongodb connect successfully");
        
    }) 
    }
    catch(error){
        res.status(400).json({
            message:"not connected"
        })
    }
    
    
}

conn();