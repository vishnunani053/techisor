import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: Number, require: true },
    qty: { type: Number, require: true },
    info: { type: String, require: true },
    created:{type:Date,require:Date.now}
})
let productModel = mongoose.model("product", productSchema)

export default productModel