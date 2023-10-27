const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
      },
 
      rating: {
        type: Number,
        required: true,
        default: 0,
      },
  
      category:{
        type:String,
        required:true,
      },
    
  

    createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true }
  );
  
  const ProductModel = mongoose.model("products", productSchema);
  module.exports = ProductModel;    