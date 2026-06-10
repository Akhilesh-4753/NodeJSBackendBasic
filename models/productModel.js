
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title:String,
    price:Number,
    description:String,
    category:String,
    brand:String,
    stock:Number,
    rating:Number,
    image:String,
    reviews:[
        {
            userName:String,
            comment:String,
            rating:Number
        }
    ]

})

const product = mongoose.model("product",productSchema);

module.exports = product;