const express=require('express')
const app=express()
const cors=require('cors')
app.use(express.json());
app.use(cors())
require("./connect/conn")
const auth=require("./routes/auth")
const list=require("./routes/list")



app.use("/api/v1",auth)
app.use("/api/v2",list)
app.get('/',(req,res)=>{
    res.send('<h1>this , my server</h1>')
})

app.listen('3000',(err)=>{
    if (err) {
        return err;
    }
    console.log("server is running successfully...");
})