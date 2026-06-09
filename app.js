
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");

const app = express();
app.use(express.json());

console.log("SERVER STARTED");

app.use((req,res,next)=>{           // middle ware
    const url = req.url;
    if(url == "/about"){
        return res.send("No permission to access about page");
    }
    next();
})

/* --------------------------------------------- Basic Clss-------------------------------------------------------------------*/

app.get("/",(req,res)=>{
    res.send("Its working fine")
})

app.get("/about",(req,res)=>{
    res.send("This is about section")
})

app.get("/item/:id",(req,res)=>{
    res.send(`item id is ${req.params.id}`)
})

app.get("/usersDt",(req,res)=>{
    res.send(req.query.title)
})

app.get("/product/:id",(req,res)=>{
    const id = req.params.id;
    const search = req.query.phone;

    res.send(`id = ${id} product = ${search}`);
})


/* -------------------------------------------- Class 3 --------------------------------------------------------------------*/

app.post("/users",async (req,res)=>{
try {
    console.log("req.body is : ",req.body)

    const user = new User(req.body);
    const savedUser = await user.save();
    res.send(savedUser)
} catch (error) {
    console.log("Error saving user:", error.message);
    res.status(500).send({error: error.message})
}
})

app.get("/users", async(req,res)=>{
    try {
        const users = await User.find();
        res.send(users)
        
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get("/users/:id", async(req,res)=>{
    try {
        const user = await User.findById(req.params.id); 
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put("/users/:id", async(req,res)=>{
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true}); // new:true is used to return the updated document instead of the original document
        res.send(updateUser)
    } catch (error) {
        res.status(500).send(error)
    }   
})

app.delete("/users/:id", async(req,res)=>{
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.send("User deleted successfully")
    } catch (error) {
        res.status(500).send(error)
    }   
})


mongoose.connect("mongodb://akhilesh:akhilesh@ac-myzs2ss-shard-00-00.cdpvqlx.mongodb.net:27017/mydb?authSource=admin&tls=true&retryWrites=true&w=majority")
.then(()=>{
    console.log("MongoDB database connected");
    app.listen(5001,()=>console.log("server started on port 5001"));
})
.catch((err)=>console.log("MongoDB connection error:", err));





























// mongoose.connect(
//   "mongodb+srv://akhilesh:akhi123@cluster0.cdpvqlx.mongodb.net/testdb"
// )
// .then(() => {
//   console.log("MongoDB database connected");
//   app.listen(5001, () => {
//     console.log("Server started on port 5001");
//   });
// })
// .catch((err) => {
//   console.log("MongoDB Error:", err);
// });