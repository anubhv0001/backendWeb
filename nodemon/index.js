const express=require("express");
const app=express();


app.get("/home",(req,res)=>{
    res.send("This is homepage")
})

app.get("/Contact us",(req,res)=>{
    res.send("contact us at anubhv0001@gmail.com")
})

app.listen(3000,()=>{
    console.log("Servers is running on port localhost/3000")
})