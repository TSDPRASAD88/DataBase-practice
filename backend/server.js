const express=require('express');
const mongoose=require('mongoose');
const dotenv=require("dotenv");
dotenv.config();
const app=express();
app.use(express.json());
const Anime = require('./Schema');


app.get("/",(req,res)=>{
    res.send("this is practice")
})

mongoose.connect(process.env.MongoDB_URL)
.then(()=>{
    console.log("DB connected successfully");
    app.listen(5752,()=>{
      console.log("server connected sucessfully")
    })
}).catch((error)=>{
  console.log(error);
})

app.get("/get",(req,res)=>{
    try {
        const products=Anime.find();
        return res.status(200).send("Fethed products successfully",products);
    } catch (error) {
        console.log(error)
        return res.status(500).send("Enemy error");
    }
})

app.post("/post",(req,res)=>{
    try {
        const{name,email}=req.body;
        if(!name || !email){
            return res.status(400).send("fill  all the fields")
        }
        const newProduct=new Anime({
            name,email
        })
        newProduct.save();
        return res.status(201).send("New Data Added");
    } catch (error) {
        return res.status(500).send("Something went wrong");
    }
})

app.put("/put/:id",(req,res)=>{
      try {
        const{id}=req.params;
        if(!id){
            return res.status(400).send("please provide id")
        }
        const{name,email}=req.body;
        if(!name || !email){
            return res.status(400).send("fill  all the fields")
        }
        const updatedData=Anime.findByIdAndUpdate({_id:id},{name,email});
        if(!updatedData){
            return res.status(400).send("Updated data not found");

        }
        return res.status(200).send({msg:"updated sucessfully"});
      } catch (error) {
        return res.status(500).send("Something went wrong");
      }
})

app.delete("/delete/:id",(req,res)=>{
    try {
        const{id}=req.params;
        if(!id){
            return res.status(400).send("please provide id");
        }
        const deletedData=Anime.findByIdAndDelete({_id:id},{name,email});
        if(!deletedData){
            return res.status(400).send({msg:"Data not deleted"});
        }
        return res.status(201).send("data deleted successfully");
    } catch (error) {
        return res.status(500).send("Something went wrong");
    }
})

module.exports=app