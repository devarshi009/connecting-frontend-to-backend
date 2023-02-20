const express=require("express")
const {PostModel}=require("../model/Post.model")
const postRouter=express.Router()
require("dotenv").config()
postRouter.use(express.json())

postRouter.get("/",async(req,res)=>{
    try{
        const posts=await PostModel.find()
        res.send(posts)
    }catch(err){
console.log({"msg":"something is fissy!",err:err});
    }
})

postRouter.post("/create",async(req,res)=>{
    const payload=req.body;
    try{
      const post=new PostModel(payload)
      await post.save() 
      res.send("post created") 
    }catch(err){
        console.log({"msg":"something is fissy!",err:err})
        res.send("error at the time of creating")
    }
})


postRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body;
    const id=req.params.id
    const post=await PostModel.find({_id:id})
    
    const postid=post[0].userID
    const postreqid=req.body.userID
    try{
      if(postid!==postreqid){
        res.send("You are not Authorized person") 
      }else{
        await PostModel.findByIdAndUpdate({_id:id},payload) 
        res.send("post updated")
      }
      
     
    }catch(err){
        console.log({"msg":"something is fissy!",err:err})
        res.send("error at the time of updating")
    }
})


postRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    try{
       await PostModel.findByIdAndDelete({_id:id})
          res.send("Post Deleted") 
        }catch(err){
          console.log({"msg":"something is fissy!",err:err})
          res.send("error at the time of deleting")
      }
})
module.exports={postRouter}