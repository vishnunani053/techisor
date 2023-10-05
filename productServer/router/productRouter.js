import express, { response } from "express"
import productModel from "../model/product.js";

const router = express.Router()

//create product
router.post("/create", async (request, response) => {
  try {
    const newProduct = {
      name: request.body.name,
      image: request.body.image,
      price: request.body.price,
      qty: request.body.qty,
      info: request.body.info
    }
    const verifyProduct = await productModel.findOne({ name: newProduct.name })
    if (verifyProduct) {
      return response.status(404).json({
        message: "product already exists"
      })
    }

    const product = productModel(newProduct)
    console.log(product)
    let saveProduct = await product.save()
    response.status(202).json({
      message: "product created sucesfully",
      productDetails: product
    })
  }
  catch (err) {
    console.log(err)
    response.status(201).json({
      msg: err.message
    })
  }
})
//get all products

router.get("/all", async (request, response) => {
  try {
    let product = await productModel.find()
    console.log(product)
    response.status(202).json({
      result: product
    })
  }
  catch (err) {

  }
})
//get single product
router.get("/:id",async(req,resp)=>{
  const productId = req.params.id
try{
  let product = await productModel.findById(productId)
 
    resp.status(200).json(product)
}
catch(err){}
})
//update product
router.put("/:id", async (request, response) => {
  const productId = request.params.id
  console.log(productId)
  try {
    let updateProduct = {
      name: request.body.name,
      image: request.body.image,
      price: request.body.price,
      qty: request.body.qty,
      info: request.body.info
    }
    let product = productModel.findById(productId)
    if (!product) {
      return response.status(404).json({
        msg: 'no products found'
      })
    }
    let productOne = await productModel.findByIdAndUpdate(productId, { $set: updateProduct }, { new: true })
    response.status(202).json({
      msg: "product updated sucessfully",
      productDetails: updateProduct
    })
  } catch (err) {

  }
})
// delete product
router.delete("/:id", async (request, response) => {
  try {
    let productId = request.params.id
    console.log(productId)
    let product = productModel.findById(productId)
    if (!product) {
      return response.status(404).json({
        msg: "no product found"
      })
    }
    let delProduct =await productModel.findByIdAndDelete(productId)
    response.status(200).json({
      msg: "product deleted sucessfully",
      productDetails: delProduct
    })
  }
  catch (err) {

  }
})


export default router