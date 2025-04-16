import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
    description:{
        type: String,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    }

},
    {timestamps:true})

export const Product = mongoose.model('Product', productSchema)