
// const dns = require("dns");
// dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const product = require("./models/productModel")

const app = express();
app.use(express.json());

console.log("SERVER STARTED");

/* --------------------------------------------- Basic Class-------------------------------------------------------------------*/

app.use((req,res,next)=>{           // middle ware
    const url = req.url;
    if(url == "/about"){
        return res.send("No permission to access about page");
    }
    next();
})

app.get("/",(req,res)=>{
    res.send("Its working fine")
})

app.get("/about",(req,res)=>{     // about is a endpoint. 
    res.send("This is about section") // this will not work because of the middleware we have defined above.
})

app.get("/item/:id",(req,res)=>{    // :id is a route parameter. it can be accessed using req.params.id. if we want to access query parameters then we can use req.query. for example, if we want to access title query parameter then we can use req.query.title.
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


/* -------------------------------------------- User DB --------------------------------------------------------------------*/

app.post("/users",async (req,res)=>{   // this is a post request to create a new user. we are using async await to handle the asynchronous code. we are using try catch block to handle the errors. we are sending the response back to the client after saving the user in the database. we are using res.send() to send the response back to the client. we can also use res.json() to send the response back to the client in json format.
try {
    const user = new User(req.body);   // we are creating a new user using the user model. we are passing the request body to the user model. the user model will validate the data and then save it to the database. if there is any error in the validation then it will throw an error and we can catch that error in the catch block.
    const savedUser = await user.save();   // we are saving the user to the database and waiting for the response. if the user is saved successfully then it will return the saved user object. if there is any error in saving the user then it will throw an error and we can catch that error in the catch block.
    res.send(savedUser)
} catch (error) {
    console.log("Error saving user:", error.message);
    res.status(500).send({error: error.message})
}
})

app.get("/users", async(req,res)=>{
    try {
        const users = await User.find();  // we are fetching all the users from the database and waiting for the response. if the users are fetched successfully then it will return an array of user objects. if there is any error in fetching the users then it will throw an error and we can catch that error in the catch block.
        res.send(users)
        
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get("/users/:id", async(req,res)=>{
    try {
        const user = await User.findById(req.params.id); // we are fetching a user by their ID from the database and waiting for the response. if the user is fetched successfully then it will return the user object. if there is any error in fetching the user then it will throw an error and we can catch that error in the catch block.
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put("/users/:id", async(req,res)=>{
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});   // we are updating a user by their ID in the database and waiting for the response. we are passing the request body to update the user. if the user is updated successfully then it will return the updated user object. if there is any error in updating the user then it will throw an error and we can catch that error in the catch block. we are passing {new:true} as the third parameter to return the updated user object instead of the old user object. if we don't pass {new:true} then it will return the old user object before the update. 
        res.send(updateUser)
    } catch (error) {
        res.status(500).send(error)
    }   
})

app.delete("/users/:id", async(req,res)=>{
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);     // we are deleting a user by their ID from the database and waiting for the response. if the user is deleted successfully then it will return the deleted user object. if there is any error in deleting the user then it will throw an error and we can catch that error in the catch block. if the user is not found then it will return null. we can check if the user is null or not and send the appropriate response back to the client.
        if(!deleteUser){
            return res.status(404).send("User not found")
        }
        res.send("User deleted successfully")
    } catch (error) {
        res.status(500).send(error)
    }   
})


/* -------------------------------------------- Products --------------------------------------------------------------------*/


app.get("/products",(req,res)=>{
    try {
        const productsDetails = new product(res);
         res.send(productsDetails)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post("/product",async(req,res)=>{
    try {
        console.log("req.body is :",req.body)
        const item = new product(req.body)
        const savedProduct = await item.save();
        res.send(savedProduct)

    } catch (error) {
        res.status(500).send(error)
    }
})





/* -------------------------------------------- Database Connection --------------------------------------------------------------------*/

mongoose.connect("mongodb://akhilesh:akhilesh@ac-myzs2ss-shard-00-00.cdpvqlx.mongodb.net:27017/mydb?authSource=admin&tls=true&retryWrites=true&w=majority")
.then(()=>{
    console.log("MongoDB database connected");
    app.listen(5000,()=>console.log("server started on port 5000"));
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